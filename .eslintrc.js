module.exports = {
  extends: [
    "react-app",
    "airbnb/base",
    "prettier",
  ],
  "plugins": [
    "prettier",
  ],
  rules: {
    "quotes": ["warn", "single"],
    "no-param-reassign": "off",
    "import/no-extraneous-dependencies": ["warn", { "devDependencies": true }],
    "import/order": ["error", {
      "groups": ["builtin", "external", "parent", "sibling", "index"],
      "newlines-between": "always-and-inside-groups",
    }]
  },
  overrides: [
    {
      "files": [
        "**/*.ts?(x)"
      ],
      "rules": {
        "additional-typescript-only-rule": "warn"
      }
    }
  ],
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js",".jsx",".ts",".tsx",".json",]
      }
    }
  }
}
