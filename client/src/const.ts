export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = "SDSURABHI";
export const APP_LOGO = "/logo.png";
export const TAGLINE = "Test Your Cricket IQ";
export const COMPANY_NAME = "SDSURABHI INFRA PRIVATE LIMITED";
export const COMPANY_ADDRESS = "Ram Acchayvar 48/2, Ayodhya Puri 2 Bijnour, Sarojini Nagar, Lucknow, Uttar Pradesh 226008, India";
export const DOMAIN = "sportiqplay.com";
export const CONTACT_EMAIL = "contact@sportiqplay.com";

// Geo-restricted states
export const RESTRICTED_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Nagaland",
  "Odisha",
  "Sikkim",
  "Telangana"
];

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
