import fs from 'node:fs'
import express from 'express'
import { renderer } from '../shared'
import playRouter from './routes/play'
import dispatchRouter from './routes/dispatch'

const PORT = process.env.port ?? 3000

const app = express()

app.engine('tmpl', (filePath, options, callback) => {
  const content = fs.readFileSync(filePath).toString()
  // @ts-ignore
  const rendered = renderer(content, options)
  callback(null, rendered)
})

app.set('views', './views')
app.set('view engine', 'tmpl')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/play/', playRouter)

app.use('/dispatch/', dispatchRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
