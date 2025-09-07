import packageJson from "@/../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Jinson E B",
  version: packageJson.version,
  copyright: `© ${currentYear}, Jinson.`,
  meta: {
    title: "Jinson",
    description:
      "A fullstack developer to make the life easier for the managers.",
  },
};