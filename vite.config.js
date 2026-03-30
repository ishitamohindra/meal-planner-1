import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function anthropicProxy() {
  let apiKey
  return {
    name: 'anthropic-proxy',
    configureServer(server) {
      apiKey = loadEnv('', process.cwd(), '').ANTHROPIC_API_KEY

      server.middlewares.use('/api/generate', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        if (!apiKey || apiKey === 'sk-ant-your-key-here') {
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Set ANTHROPIC_API_KEY in .env file' }))
          return
        }

        let body = ''
        for await (const chunk of req) body += chunk

        try {
          const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
            },
            body,
          })

          const data = await anthropicRes.text()
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = anthropicRes.status
          res.end(data)
        } catch (err) {
          res.statusCode = 502
          res.end(JSON.stringify({ error: err.message }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), anthropicProxy()],
})
