import express from 'express'
import * as wordle from '../../'

const router = express.Router()

router.get('/', (req, res) => {
  const state = wordle.serialize(wordle.play())
  res.redirect(`/play/${state}`)
})

router.get('/:state/', (req, res) => {
  const state = wordle.deserialize(req.params.state)
  res.render('index', {
    renderMarkdown: true,
    context: { state },
  })
})

router.get('/:state/:move', (req, res) => {
  const state = wordle.deserialize(req.params.state)
  // @ts-ignore
  const nextState = wordle.serialize(wordle.play(state, req.params.move))
  res.redirect(`/play/${nextState}`)
})

export default router
