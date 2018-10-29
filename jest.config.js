module.exports = {
  displayName: "jest-tsc",
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.json"
    }
  },
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: [
    "**/tests/**/*.test.(ts|js)"
  ],
  moduleDirectories: ["node_modules"],
  testPathIgnorePatterns: ["node_modules", "dist"],
  testEnvironment: "node",
  collectCoverage: true,
  verbose: true
};
