
import { SimpleGit } from 'simple-git'

import { createBranchName } from './branch-names'
import { findDefaultBranch, hasChanges } from './git'
import { Ora } from 'ora'

export async function createNewBranch(git: SimpleGit, spinner: Ora, name: string): Promise<void> {
  const branchName = createBranchName(name)

  const hasUncommittedChanges = await hasChanges(git)

  if (hasUncommittedChanges) {
    throw Error('There are changes in the working directory. Please commit or stash them before creating a new branch.')
  }

  spinner.text = 'Finding the default branch'

  const defaultBranchName = await findDefaultBranch(git)

  spinner.text = 'Checking out the default branch'

  await git.checkout(defaultBranchName)

  spinner.text = `Creating branch ${branchName}`

  spinner.succeed(`Created branch ${branchName}`)

}