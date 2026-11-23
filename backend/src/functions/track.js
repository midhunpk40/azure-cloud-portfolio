
const { app } = require("@azure/functions");
const { getContainer } = require("../shared/cosmos");

app.http("track", {
    methods: ["POST"],
    authLevel: "anonymous",
    route: "track",

    handler: async (request, context) => {
        try {
            const body = await request.json();
            const pageId = body.pageId;

            // Validate the page identifier
            if (
                typeof pageId !== "string" ||
                !/^[a-zA-Z0-9_-]{1,50}$/.test(pageId)
            ) {
                return {
                    status: 400,
                    jsonBody: {
                        error: "Invalid pageId"
                    }
                };
            }

            const container = await getContainer();
            const item = container.item(pageId, pageId);

            try {
                // Atomically increment the existing counter
                const result = await item.patch([
                    {
                        op: "incr",
                        path: "/total",
                        value: 1
                    }
                ]);

                context.log(`Visitor count updated for ${pageId}`);

                return {
                    status: 200,
                    jsonBody: {
                        success: true,
                        total: result.resource.total
                    }
                };

            } catch (error) {
                if (error.code !== 404) {
                    throw error;
                }

                // Create the counter on its first visit
                try {
                    const result = await container.items.create({
                        id: pageId,
                        pageId: pageId,
                        total: 1
                    });

                    return {
                        status: 200,
                        jsonBody: {
                            success: true,
                            total: result.resource.total
                        }
                    };

                } catch (createError) {
                    // Another request may have created it simultaneously
                    if (createError.code !== 409) {
                        throw createError;
                    }

                    const result = await item.patch([
                        {
                            op: "incr",
                            path: "/total",
                            value: 1
                        }
                    ]);

                    return {
                        status: 200,
                        jsonBody: {
                            success: true,
                            total: result.resource.total
                        }
                    };
                }
            }

        } catch (error) {
            context.error("Visitor tracking failed", error);

            return {
                status: 500,
                jsonBody: {
                    error: "Unable to track visitor"
                }
            };
        }
    }
});
