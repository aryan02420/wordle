import { Application, Router } from 'https://deno.land/x/oak/mod.ts'
import { config } from 'https://deno.land/x/dotenv/mod.ts'

if (Deno.env.get('APP_ENV') === 'local') {
  config({ export: true })
}

const router = new Router()

router.get('/', (ctx) => {
  ctx.response.body = 'Hello world!'
})

router.get('/:owner/:repo/:event/:move', async (ctx) => {
  const { owner, repo, event, move } = ctx.params
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/dispatches`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${Deno.env.get('GITHUB_TOKEN')}`,
      },
      body: JSON.stringify({
        event_type: event,
        client_payload: {
          event,
          move,
        },
      }),
    })
    ctx.response.status = res.status
    ctx.response.body = res.body
  } catch (error) {
    console.log(error)
    ctx.response.status = 500
    ctx.response.body = error
  }
})

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: parseInt(Deno.env.get('PORT') || '80') })
