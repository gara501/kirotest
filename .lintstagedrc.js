export default {
  // TypeScript and JavaScript files
  "*.{ts,tsx,js,jsx}": [
    "eslint --fix",
    "prettier --write",
    // Run type check on TypeScript files
    () => "tsc --noEmit",
  ],

  // Markdown and JSON files
  "*.{md,json}": ["prettier --write"],

  // CSS and styling files
  "*.{css,scss,sass}": ["prettier --write"],

  // Test files - run related tests
  "*.test.{ts,tsx,js,jsx}": ["npm run test -- --run --reporter=verbose"],
};
