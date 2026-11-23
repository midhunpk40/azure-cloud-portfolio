
const { app } = require("@azure/functions");
const {
    BlobServiceClient,
    StorageSharedKeyCredential,
    generateBlobSASQueryParameters,
    BlobSASPermissions
} = require("@azure/storage-blob");

app.http("resume", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        try {
            const connectionString =
                process.env.PORTFOLIO_STORAGE_CONNECTION_STRING_V2;

            if (!connectionString) {
                throw new Error("Storage connection string is missing.");
            }

            const accountName = connectionString.match(/AccountName=([^;]+)/)?.[1];
            const accountKey = connectionString.match(/AccountKey=([^;]+)/)?.[1];

            if (!accountName || !accountKey) {
                throw new Error("Invalid Storage connection string.");
            }

            const containerName = "portfolio-assets";
            const blobName = "MIDHUN_P_K.pdf";

            const credential = new StorageSharedKeyCredential(
                accountName,
                accountKey
            );

            const blobServiceClient =
                BlobServiceClient.fromConnectionString(connectionString);

            const blobClient = blobServiceClient
                .getContainerClient(containerName)
                .getBlobClient(blobName);

            const expiresOn = new Date(Date.now() + 5 * 60 * 1000);

            const sasToken = generateBlobSASQueryParameters(
                {
                    containerName,
                    blobName,
                    permissions: BlobSASPermissions.parse("r"),
                    expiresOn,
                    protocol: "https",
                    contentDisposition:
                        'attachment; filename="MIDHUN_P_K.pdf"'
                },
                credential
            ).toString();

            return {
                status: 200,
                jsonBody: {
                    downloadUrl: `${blobClient.url}?${sasToken}`
                }
            };
        } catch (error) {
            context.error("Resume download error:", error);

            return {
                status: 500,
                jsonBody: {
                    error: "Unable to generate resume download link."
                }
            };
        }
    }
});
