import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

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

  console.log(`Creating new branch: ${args.name}`)
}

main().catch((err) => {
  console.error(err)

  process.exit(1)
})