import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const repoName = 'ManzanaCuatro'

const resolveBase = ({ command }) => {
  if (command !== 'build') {
    return '/'
  }

  return process.env.DEPLOY_TARGET === 'github-pages' ? `/${repoName}/` : '/'
}

export default defineConfig(({ command }) => ({
  base: resolveBase({ command }),
  plugins: [react()],
}))
