/**
 * Typed environment variables helper.
 * Provides safe access to Vite build-time environment variables.
 */

export interface AppEnv {
  readonly contactEndpoint?: string
  readonly siteUrl?: string
  readonly isDev: boolean
  readonly isProd: boolean
}

/**
 * Access typed application environment configuration.
 */
export function getEnv(): AppEnv {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
  const siteUrl = import.meta.env.VITE_SITE_URL

  return {
    contactEndpoint: endpoint && endpoint.length > 0 ? endpoint : undefined,
    siteUrl: siteUrl && siteUrl.length > 0 ? siteUrl : undefined,
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
  }
}
