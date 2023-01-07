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
    renderAs: 'html',
    context: {
      baseUrl: `/play/${req.params.state}/`,
      debugInfo: {
        renderAs: 'html',
      },
      id: req.params.state,
      imgBaseUrl: '/images/',
      isDev: process.env.NODE_ENV === 'development',
      message: wordle.getMessageString(state.msg),
      showTimer: false,
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
