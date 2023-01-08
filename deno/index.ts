import { Application, Router } from 'https://deno.land/x/oak/mod.ts'
import { config } from 'https://deno.land/x/dotenv/mod.ts'

if (Deno.env.get('APP_ENV') === 'local') {
  config({ export: true })
}

const MILLISECS_IN_A_DAY = 1000 * 60 * 60 * 24

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

app.use(async (context, next) => {
  try {
    context.response.headers.set("max-age", MILLISECS_IN_A_DAY);
    await context.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    })
  } catch {
    await next()
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8080 })
