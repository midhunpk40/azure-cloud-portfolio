
const { CosmosClient } = require("@azure/cosmos");
const { DefaultAzureCredential } = require("@azure/identity");

let client;
let container;

async function getContainer() {
    if (container) {
        return container;
    }

    const endpoint = process.env.COSMOS_ENDPOINT;
    const databaseName = process.env.COSMOS_DATABASE;
    const containerName = process.env.COSMOS_CONTAINER;

    if (!endpoint || !databaseName || !containerName) {
        throw new Error("Cosmos DB configuration is missing");
    }

    if (!client) {
        if (process.env.COSMOS_AUTH_MODE === "managed") {
            // Azure production: authenticate using Managed Identity
            client = new CosmosClient({
                endpoint,
                aadCredentials: new DefaultAzureCredential()
            });
        } else {
            // Local development: authenticate using account key
            const key = process.env.COSMOS_KEY;

            if (!key) {
                throw new Error("COSMOS_KEY is missing for local authentication");
            }

            client = new CosmosClient({
                endpoint,
                key
            });
        }
    }

    container = client
        .database(databaseName)
        .container(containerName);

    return container;
}

module.exports = { getContainer };
