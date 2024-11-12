import ora from 'ora'
import simpleGit from 'simple-git'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { createNewBranch } from './create-new-branch'

interface Args {
  name: string
}

async function main() {
  const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 <name>')
    .command(
      '$0 <name>',
      'Creates a new Git branch.',
      (yargs) => {
        return yargs
          .positional('name', {
            describe: 'The name of the new branch.',
            type: 'string'
          })
      }
    ).help()
    .alias('help', 'h')
    .parse()

  const args = (argv as unknown) as Args

  if (!args.name || args.name.trim() === '') {
    throw new Error('Branch name is required.')
  }

  const git = simpleGit()
  const spinner = ora('Creating branch name').start()

  try {
    await createNewBranch(git, spinner, args.name)
  } catch (error: any) {
    spinner.fail(error.message)

    process.exit(1)
  }

  process.exit(0)
}

main().catch((err) => {
  console.error(err)

  process.exit(1)
})