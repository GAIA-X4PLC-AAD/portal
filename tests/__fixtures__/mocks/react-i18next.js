module.exports = {
  useTranslation: () => {
    return {
      t: (key) => key,  // Return the key as the translated value
      i18n: {
        changeLanguage: jest.fn(),
      },
    };
  },
};
