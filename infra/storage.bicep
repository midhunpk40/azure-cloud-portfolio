@description('Globally unique name for the storage account')
@minLength(3)
@maxLength(24)
param storageAccountName string

@description('Azure region for the storage account')
param location string = 'centralindia'

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
  }
}

output storageAccountId string = storageAccount.id
