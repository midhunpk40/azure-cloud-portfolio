# Azure Infrastructure as Code

This folder contains Bicep templates for the Azure portfolio project.

## Files

- main.bicep: References the existing Azure resources without modifying them.
- storage.bicep: Defines a reusable Azure Storage Account deployment.
- main.json: Compiled ARM template generated from main.bicep.
- storage.json: Compiled ARM template generated from storage.bicep.

## Storage configuration

- Resource type: Microsoft.Storage/storageAccounts
- Kind: StorageV2
- SKU: Standard_LRS
- Location: Central India
- HTTPS traffic only: Enabled
- Minimum TLS version: TLS 1.2

## Validation

Both Bicep templates were compiled successfully.

The main template passed Azure Resource Manager validation and What-If preview.

The storage template passed validation and What-If preview:
- New storage account: 1 proposed creation.
- Existing storage account: No changes proposed.

## Deployment safety

No new storage account was deployed during these tests.
No existing portfolio resources were modified.

## Deployment commands

Build:
az bicep build --file infra/main.bicep

Validate:
az deployment group validate --resource-group azurefinalprojectRG --template-file infra/main.bicep

What-If:
az deployment group what-if --resource-group azurefinalprojectRG --template-file infra/main.bicep

Storage template:
az bicep build --file infra/storage.bicep
