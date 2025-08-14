import packageJson from "@/../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Workforce",
  version: packageJson.version,
  copyright: `© ${currentYear}, Workforce.`,
  meta: {
    title: "Workforce",
    description:
      "A modern, workforce management system to make the life easier for the managers.",
  },
};