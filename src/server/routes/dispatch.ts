import express from 'express'
import { Octokit } from '@octokit/core'

const router = express.Router()
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

router.get('/:owner/:repo/:event/:state/:move', (req, res) => {
  const {owner, repo, event, state, move} = req.params
  octokit.request(`POST /repos/${owner}/${repo}/dispatches`, {
    event_type: event,
    client_payload: {
      owner,
      repo,
      event,
      state,
      move
    },
  }).then(({status}) => {
    res.status(status).end()
  }).catch((reason) => {
    res.status(500).send(reason).end()
  })
})

export default router