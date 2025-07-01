module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["ru", "en"],
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
