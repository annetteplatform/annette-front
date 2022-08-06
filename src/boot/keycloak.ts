import Keycloak, {KeycloakConfig} from 'keycloak-js'

function keycloakConfig(): KeycloakConfig | string {
  const DEFAULT_URI = '/api/annette/v1/auth/keycloak/annette'
  try {
    const config: KeycloakConfig = JSON.parse(process.env.KEYCLOAK_CONFIG as string)
    if (config) {
      return config
    } else {
      return DEFAULT_URI
    }
  } catch (ex) {
    console.warn(ex)
    return DEFAULT_URI
  }
}

console.log('Keycloak creating...')
export const keycloak: Keycloak = new Keycloak(keycloakConfig())
console.log('Keycloak created')
