"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCommits = void 0;
const stream_1 = require("stream");
const conventional_commits_parser_1 = __importDefault(require("conventional-commits-parser"));
async function parseCommits(commits) {
    const through = new stream_1.PassThrough();
    const commitMap = {};
    for (const commit of commits) {
        commitMap[commit.subject] = commit;
        const message = [commit.subject, commit.body].filter(Boolean).join('\n');
        through.write(message, 'utf8');
    }
    through.end();
    const commitParser = (0, conventional_commits_parser_1.default)();
    const results = await new Promise((resolve, reject) => {
        const commits = [];
        through
            .pipe(commitParser)
            .on('error', (error) => reject(error))
            .on('data', (parsedCommit) => {
            const { header } = parsedCommit;
            if (!header) {
                return;
            }
            const originalCommit = commitMap[header];
            const commit = Object.assign({}, parsedCommit, {
                hash: originalCommit.hash,
            });
            commits.push(commit);
        })
            .on('end', () => resolve(commits));
    });
    through.destroy();
    return results;
}
exports.parseCommits = parseCommits;
//# sourceMappingURL=parseCommits.js.map