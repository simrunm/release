import * as getStream from 'get-stream'
import * as gitLogParser from 'git-log-parser'

interface GetCommitsOptions {
  after?: string
}

export function getCommits({ after }: GetCommitsOptions = {}): Promise<
  gitLogParser.Commit[]
> {
  Object.assign(gitLogParser.fields, {
    hash: 'H',
    message: 'B',
  })

  return getStream.array<gitLogParser.Commit>(
    gitLogParser.parse({
      _: `${after ? `${after}..` : ''}HEAD`,
    })
  )
}