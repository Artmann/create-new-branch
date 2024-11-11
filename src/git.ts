import { SimpleGit } from 'simple-git'

export async function findDefaultBranch(git: SimpleGit): Promise<string> {
  const result = await git.raw(['ls-remote', '--symref', 'origin', 'HEAD'])

  // The output format should be like:
  // ref: refs/heads/main HEAD
  const match = result.match(/ref:\srefs\/heads\/([^\s]+)\sHEAD/)

  if (!match) {
    return 'main'
  }

  if (!match[1]) {
    return 'main'
  }

  return match[1]
}