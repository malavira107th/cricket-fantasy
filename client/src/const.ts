export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = "SDSURABHI";
export const APP_LOGO = "/logo.png";
export const TAGLINE = "Test Your Cricket IQ";
export const COMPANY_NAME = "SDSURABHI INFRA PRIVATE LIMITED";
export const COMPANY_ADDRESS = "Ram Acchayvar 48/2, Ayodhya Puri 2 Bijnour, Sarojini Nagar, Lucknow, Uttar Pradesh 226008, India";
export const DOMAIN = "sportsiqplay.com";
export const CONTACT_EMAIL = "contact@sportsiqplay.com";

// Geo-restricted states
export const RESTRICTED_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Nagaland",
  "Odisha",
  "Sikkim",
  "Telangana"
];

// GitHub OAuth login URL
export const getLoginUrl = () => {
  return `/api/auth/github/login`;
};
