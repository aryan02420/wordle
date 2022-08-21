import express from 'express'
import { Octokit } from '@octokit/core'

const router = express.Router()
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

router.get('/:owner/:repo/:type/:move', (req, res) => {
  const {owner, repo, type, move} = req.params
  octokit.request(`POST /repos/${owner}/${repo}/dispatches`, {
    event_type: type,
    client_payload: {
      move,
    },
  }).then(({status}) => {
    res.status(status).end()
  }).catch((reason) => {
    res.status(500).send(reason).end()
  })
})

export default router