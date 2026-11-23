
const { app } = require("@azure/functions");
const { getContainer } = require("../shared/cosmos");

app.http("stats", {
    methods: ["GET"],
    authLevel: "anonymous",
    route: "stats",

    handler: async (request, context) => {
        try {
            const pageId = request.query.get("pageId") || "home";

            if (!/^[a-zA-Z0-9_-]{1,50}$/.test(pageId)) {
                return {
                    status: 400,
                    jsonBody: {
                        error: "Invalid pageId"
                    }
                };
            }

            const container = await getContainer();

            try {
                const { resource } = await container
                    .item(pageId, pageId)
                    .read();

                return {
                    status: 200,
                    jsonBody: {
                        pageId: pageId,
                        total: resource.total
                    }
                };

            } catch (error) {
                if (error.code === 404) {
                    return {
                        status: 200,
                        jsonBody: {
                            pageId: pageId,
                            total: 0
                        }
                    };
                }

                throw error;
            }

        } catch (error) {
            context.error("Reading visitor statistics failed", error);

            return {
                status: 500,
                jsonBody: {
                    error: "Unable to retrieve visitor statistics"
                }
            };
        }
    }
});
