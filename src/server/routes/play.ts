import express from 'express'
import * as wordle from '../../'
import type { renderOptions } from '../../shared'

const router = express.Router()

router.get('/', (req, res) => {
  const state = wordle.serialize(wordle.play())
  res.redirect(`/play/${state}`)
})

router.get('/:state/', (req, res) => {
  const state = wordle.deserialize(req.params.state)
  const options: renderOptions = {
    renderAsHTML: true,
    context: {
      baseUrl: `/play/${req.params.state}/`,
      id: req.params.state,
      imgBaseUrl: '/images/',
      isDev: process.env.NODE_ENV === 'development',
      message: wordle.getMessageString(state.msg),
      state,
      tag: 'wreadle',
    },
  }
  res.render('index', options)
})

router.get('/:state/:move', (req, res) => {
  const state = wordle.deserialize(req.params.state)
  const nextState = wordle.serialize(wordle.play(state, req.params.move))
  res.redirect(`/play/${nextState}`)
})

export default router
