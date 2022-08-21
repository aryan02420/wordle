import fs from 'node:fs'
import express from 'express'
import { renderer } from '../shared'
import playRouter from './routes/play'
import dispatchRouter from './routes/dispatch'
import type { renderOptions } from '../shared'

const PORT = process.env.port ?? 3000
const MILLISECS_IN_A_DAY = 1000*60*60*24

const app = express()

app.use(express.static('public', {
  maxAge: MILLISECS_IN_A_DAY,
}))

app.engine('tmpl', (filePath, options, callback) => {
  const content = fs.readFileSync(filePath).toString()
  const rendered = renderer(content, options as renderOptions)
  callback(null, rendered)
})

app.set('views', './views')
app.set('view engine', 'tmpl')

app.get('/', (req, res) => {
  res.send('<a href="https://github.com/aryan02420/wordle">aryan02420/wordle</a>')
})

app.use('/play/', playRouter)

app.use('/dispatch/', dispatchRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
