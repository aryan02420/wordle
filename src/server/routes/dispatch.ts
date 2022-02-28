import express from 'express'

const router = express.Router()

router.get('/:user/:repo/:type', (req, res) => {
  res.send(`dispatch ${req.params.user}/${req.params.repo} ${req.params.type} ${req.query.state} ${req.query.move}`)
})

export default router