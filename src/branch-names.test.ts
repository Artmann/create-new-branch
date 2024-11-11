import { describe, expect, it } from 'vitest'

import { createBranchName } from './branch-names'

describe('Branch names', () => {
  describe('createBranchName', () => {
    it('slugifies the branch name.', () => {
      const branchName = createBranchName('GEN-25522 Improve data frame pagination for apps')

      expect(branchName).toBe('gen-25522-improve-data-frame-pagination-for-apps')
    })

    it('preserves Linear branch names.', () => {
      const branchName = createBranchName('artmann/gen-3044-write-graphql-docs')

      expect(branchName).toBe('artmann/gen-3044-write-graphql-docs')
    })

    it('trims the branch name.', () => {
      const branchName = createBranchName('  GEN-25522 Improve data frame pagination for apps  ')

      expect(branchName).toBe('gen-25522-improve-data-frame-pagination-for-apps')
    })

    it('replaces special characters with hyphens.', () => {
      const branchName = createBranchName('feature[gen-25522]~a?b:c')

      expect(branchName).toBe('feature-gen-25522]-a-b-c')
    })
  })
})