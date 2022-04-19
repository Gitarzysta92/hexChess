@description('Name for the container group')
param name string = 'webservice'

@description('Location for all resources.')
param location string = resourceGroup().location

@description('Container image to deploy. Should be of the form repoName/imagename:tag for images stored in public Docker Hub, or a fully qualified URI for other registries. Images from private registries require additional registry credentials.')
param image string = 'mcr.microsoft.com/azuredocs/aci-helloworld'

@description('Port to open on the container and the public IP address.')
param port int = 80

@description('The number of CPU cores to allocate to the container.')
param cpuCores int = 1

@description('The amount of memory to allocate to the container in gigabytes.')
param memoryInGb int = 2

@description('The behavior of Azure runtime if container has stopped.')
@allowed([
  'Always'
  'Never' 
  'OnFailure'
])
param restartPolicy string = 'Always'

@secure()
param password string = ''

@secure()
param server string = ''

@secure()
param username string = ''

@secure()
param databaseUsername string = ''

@secure()
param databasePassword string = ''

@secure()
param smtpUsername string = ''

@secure()
param smtpPassword string = ''

@secure()
param blobConnectionString string = ''


resource containerGroup 'Microsoft.ContainerInstance/containerGroups@2021-09-01' = {
  name: name
  location: location
  properties: {
    imageRegistryCredentials: [
      {
        password: password
        server: server
        username: username
      }
    ]
    containers: [
      {
        name: name
        properties: {
          image: image
          environmentVariables: [
            {
              name: 'MYSQL_DATABASE_DIALECT'
              secureValue: 'mysql'
            }
            {
              name: 'MYSQL_DATABASE_HOST'
              secureValue: 'mn26.webd.pl'
            }
            {
              name: 'MYSQL_DATABASE_PORT'
              secureValue: '3306'
            }
            {
              name: 'MYSQL_DATABASE_NAME'
              secureValue: databaseUsername
            }
            {
              name: 'MYSQL_DATABASE_USER'
              secureValue: databaseUsername
            }
            {
              name: 'MYSQL_DATABASE_PASSWORD'
              secureValue: databasePassword
            }
            {
              name: 'SMTP_HOST'
              secureValue: 'mich002.webd.pl'
            }
            {
              name: 'SMTP_PORT'
              secureValue: '465'
            }
            {
              name: 'SMTP_USERNAME'
              secureValue: smtpUsername
            }
            {
              name: 'SMTP_PASSWORD'
              secureValue: smtpPassword
            }
            {
              name: 'BLOB_CONNECTION_STRING'
              secureString: blobConnectionString
            }
            {
              name: 'AUTH_TOKEN_SECRET'
              secureString: 'asd'
            }
          ]
          ports: [
            {
              port: port
              protocol: 'TCP'
            }
          ]
          resources: {
            requests: {
              cpu: cpuCores
              memoryInGB: memoryInGb
            }
          }
        }
      }
    ]
    osType: 'Linux'
    restartPolicy: restartPolicy
    ipAddress: {
      type: 'Public'
      ports: [
        {
          port: port
          protocol: 'TCP'
        }
      ]
    }
  }
}

output containerIPv4Address string = containerGroup.properties.ipAddress.ip
