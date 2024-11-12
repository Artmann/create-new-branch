import { describe, expect, it, vi } from 'vitest'

import { createNewBranch } from './create-new-branch'

describe('createNewBranch', () => {
  it('throws an error if there are uncommitted changes.', async () => {
    const status = vi.fn().mockResolvedValue({
      files: ['file1.txt']
    })

    const git = {
      status
    } as any

    const spinner = {
      text: '',
      succeed: vi.fn(),
      fail: vi.fn()
    } as any

    await expect(createNewBranch(git, spinner, 'my feature')).rejects.toThrow('There are changes in the working directory. Please commit or stash them before creating a new branch.')
  })

  it('creates a new branch.', async () => {
    const git = {
      checkout: vi.fn(),
      pull: vi.fn(),
      raw: vi.fn().mockResolvedValue('ref: refs/heads/main HEAD'),
      status: vi.fn().mockResolvedValue({
        files: []
      }),
    } as any

    const spinner = {
      text: '',
      succeed: vi.fn(),
      fail: vi.fn()
    } as any

    await createNewBranch(git, spinner, 'my feature')

    expect(git.checkout).toHaveBeenCalledWith('main')
    expect(git.pull).toHaveBeenCalledWith('origin', 'main')
  })
})