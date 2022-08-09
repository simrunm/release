"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentBranch = void 0;
const execAsync_1 = require("../execAsync");
async function getCurrentBranch() {
    return (0, execAsync_1.execAsync)('git rev-parse --abbrev-ref HEAD').then((out) => out.trim());
}
exports.getCurrentBranch = getCurrentBranch;
//# sourceMappingURL=getCurrentBranch.js.map