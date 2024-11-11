import { describe, expect, it, vi } from 'vitest'

import { findDefaultBranch } from './git'

describe('git', () => {
  describe('findDefaultBranch', () => {
    it('should return the default branch name', async () => {
      const gitMock = {
        raw: vi.fn().mockResolvedValue(`ref: refs/heads/develop	HEAD
9e69d611c1cbfde6be69e063bb041dff3559def8	HEAD`)
      } as any

      const result = await findDefaultBranch(gitMock)

      expect(gitMock.raw).toHaveBeenCalledWith(['ls-remote', '--symref', 'origin', 'HEAD'])

      expect(result).toBe('develop')
    })

    it('should return "main" if the default branch name cannot be found', async () => {
      const gitMock = {
        raw: vi.fn().mockResolvedValue('')
      } as any

      const result = await findDefaultBranch(gitMock)

      expect(gitMock.raw).toHaveBeenCalledWith(['ls-remote', '--symref', 'origin', 'HEAD'])

      expect(result).toBe('main')
    })
  })
})