"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMarkdown = exports.getReleaseNotes = void 0;
const formatDate_1 = require("./formatDate");
const getNextReleaseType_1 = require("./getNextReleaseType");
const IGNORE_COMMIT_TYPE = ['chore'];
async function getReleaseNotes(commits) {
    const releaseNotes = new Map();
    for (const commit of commits) {
        const { type, merge } = commit;
        if (!type || merge || IGNORE_COMMIT_TYPE.includes(type)) {
            continue;
        }
        const noteType = (0, getNextReleaseType_1.isBreakingChange)(commit)
            ? 'breaking'
            : type;
        const nextCommits = releaseNotes.get(noteType) || new Set();
        releaseNotes.set(noteType, nextCommits.add(commit));
    }
    return releaseNotes;
}
exports.getReleaseNotes = getReleaseNotes;
function toMarkdown(context, notes) {
    const markdown = [];
    const releaseDate = (0, formatDate_1.formatDate)(context.nextRelease.publishedAt);
    markdown.push(`## ${context.nextRelease.tag} (${releaseDate})`);
    const sections = {
        breaking: [],
        feat: [],
        fix: [],
    };
    for (const [noteType, commits] of notes) {
        const section = sections[noteType];
        if (!section) {
            continue;
        }
        for (const commit of commits) {
            const releaseItem = createReleaseItem(commit, noteType === 'breaking');
            if (releaseItem) {
                section.push(...releaseItem);
            }
        }
    }
    if (sections.breaking.length > 0) {
        markdown.push('', '### ⚠️ BREAKING CHANGES');
        markdown.push(...sections.breaking);
    }
    if (sections.feat.length > 0) {
        markdown.push('', '### Features', '');
        markdown.push(...sections.feat);
    }
    if (sections.fix.length > 0) {
        markdown.push('', '### Bug Fixes', '');
        markdown.push(...sections.fix);
    }
    return markdown.join('\n');
}
exports.toMarkdown = toMarkdown;
function createReleaseItem(commit, includeNotes = false) {
    const { subject, scope, hash } = commit;
    if (!subject) {
        return [];
    }
    const commitLine = [
        ['-', scope && `**${scope}:**`, subject, `(${hash})`]
            .filter(Boolean)
            .join(' '),
    ];
    if (includeNotes) {
        const notes = commit.notes.reduce((all, note) => {
            return all.concat('', note.text);
        }, []);
        if (notes.length > 0) {
            commitLine.unshift('');
            commitLine.push(...notes);
        }
    }
    return commitLine;
}
//# sourceMappingURL=getReleaseNotes.js.map