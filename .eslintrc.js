module.exports = {
  extends: ["airbnb-typescript-prettier"],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.test.js",
          "**/*.test.jsx",
          "**/*.test.ts",
          "**/*.test.tsx",
          "src/tests/**/*",
          "**/*.stories.js",
          "**/*.stories.ts",
          "**/*.stories.tsx",
        ],
      },
    ],
  },
};
