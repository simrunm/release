"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execAsync = void 0;
const node_child_process_1 = require("node:child_process");
const DEFAULT_CONTEXT = {
    cwd: process.cwd(),
};
exports.execAsync = ((command, options = {}) => {
    return new Promise((resolve, reject) => {
        (0, node_child_process_1.exec)(command, {
            ...exports.execAsync.contextOptions,
            ...options,
        }, (error, stdout) => {
            if (error) {
                return reject(error);
            }
            resolve(stdout);
        });
    });
});
exports.execAsync.mockContext = (options) => {
    exports.execAsync.contextOptions = options;
};
exports.execAsync.restoreContext = () => {
    exports.execAsync.contextOptions = DEFAULT_CONTEXT;
};
exports.execAsync.restoreContext();
//# sourceMappingURL=execAsync.js.map