targetScope = 'resourceGroup'

// Existing resources: references only. This template does not modify them.

resource cosmos 'Microsoft.DocumentDB/databaseAccounts@2024-05-15' existing = {
  name: 'portfolio-cosmos-midhun'
}

resource functionApp 'Microsoft.Web/sites@2023-12-01' existing = {
  name: 'portfolio-visitor-api-midhun'
}

resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' existing = {
  name: 'ASP-azurefinalprojectRG-a264'
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' existing = {
  name: 'portfolio-visitor-api-midhun'
}

resource storage 'Microsoft.Storage/storageAccounts@2023-05-01' existing = {
  name: 'portfoliostoremidhun'
}

resource staticWebApp 'Microsoft.Web/staticSites@2022-09-01' existing = {
  name: 'midhun-azure-portfolio'
}

resource keyVault 'Microsoft.KeyVault/vaults@2026-02-01' existing = {
  name: 'kv-midhun-portfolio-01'
}

resource communicationService 'Microsoft.Communication/communicationServices@2023-03-31' existing = {
  name: 'acs-midhun-portfolio'
}

resource emailService 'Microsoft.Communication/emailServices@2023-03-31' existing = {
  name: 'ecs-midhun-portfolio'
}

resource smartDetectionGroup 'Microsoft.Insights/actionGroups@2023-01-01' existing = {
  name: 'Application Insights Smart Detection'
}

resource portfolioAlerts 'Microsoft.Insights/actionGroups@2023-01-01' existing = {
  name: 'portfolio-alerts'
}

resource failedRequestsAlert 'Microsoft.Insights/metricAlerts@2018-03-01' existing = {
  name: 'portfolio-alerts'
}

resource exceptionsAlert 'Microsoft.Insights/metricAlerts@2018-03-01' existing = {
  name: 'portfolio-exception-alert'
}

output resourceInventory object = {
  cosmosDb: cosmos.id
  functionApp: functionApp.id
  appServicePlan: appServicePlan.id
  applicationInsights: appInsights.id
  storageAccount: storage.id
  staticWebApp: staticWebApp.id
  keyVault: keyVault.id
  communicationService: communicationService.id
  emailService: emailService.id
  smartDetectionActionGroup: smartDetectionGroup.id
  portfolioActionGroup: portfolioAlerts.id
  failedRequestsAlert: failedRequestsAlert.id
  exceptionsAlert: exceptionsAlert.id
}
