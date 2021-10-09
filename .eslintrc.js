module.exports = {
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  rules: {
    "no-console": ["error", { allow: ["error"] }],
    "no-undef": "off", // eslintがtyped.d.tsを読めてないので無効化、tscに任せる
  },
};
