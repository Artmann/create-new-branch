export function createBranchName(name: string): string {
  let branchName = name.trim().toLowerCase().replace(/\s+/g, '-')

  const specialCharacters = [
    '~', '^', ':', '?', '*', '[', '\\'
  ]

  for (const specialCharacter of specialCharacters) {
    branchName = branchName.replace(new RegExp(`\\${specialCharacter}`, 'g'), '-')
  }

  return branchName
}