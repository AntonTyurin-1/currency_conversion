module.exports = {
  rules: {
    "vue/multi-word-component-names": "off",
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-recommended", "eslint:recommended"],
};
