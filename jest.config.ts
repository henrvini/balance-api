export default {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: true,
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "__tests__",
        "/dto/",
        "index.ts",
        "/routes/",
        "/models/",
    ],
    testMatch: ["**/__tests__/**/*.test.ts"],
};
