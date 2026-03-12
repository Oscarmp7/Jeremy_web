import process from 'node:process'
import test from 'node:test'
import assert from 'node:assert/strict'

test('vite defaults to root base for production builds', async () => {
  delete process.env.DEPLOY_TARGET
  const { default: viteConfig } = await import('../vite.config.js')

  const config = await viteConfig({ command: 'build', mode: 'production' })

  assert.equal(config.base, '/')
})

test('vite only uses the repository subpath for explicit GitHub Pages builds', async () => {
  process.env.DEPLOY_TARGET = 'github-pages'
  const { default: viteConfig } = await import('../vite.config.js')

  const config = await viteConfig({ command: 'build', mode: 'production' })

  assert.equal(config.base, '/Jeremy_web/')
  delete process.env.DEPLOY_TARGET
})
