"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demandGitHubToken = void 0;
const outvariant_1 = require("outvariant");
const validateAccessToken_1 = require("./github/validateAccessToken");
async function demandGitHubToken() {
    const { GITHUB_TOKEN } = process.env;
    (0, outvariant_1.invariant)(GITHUB_TOKEN, 'Failed to publish the package: the "GITHUB_TOKEN" environmental variable is not provided.');
    await (0, validateAccessToken_1.validateAccessToken)(GITHUB_TOKEN);
}
exports.demandGitHubToken = demandGitHubToken;
//# sourceMappingURL=env.js.map