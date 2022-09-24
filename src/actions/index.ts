import { readFile, writeFile } from 'node:fs/promises'
import core from '@actions/core'
import github from '@actions/github'
import * as wordle from '../'
import { renderer } from '../shared'
import template from '../../views/index.tmpl'
;(async () => {
  try {
    const readmeFile = core.getInput('readme')
    const readmeTag = core.getInput('tag')
    const serverUrl = core.getInput('serverUrl')
    const { event, move } = github.context.payload.client_payload
    const { owner, repo } = github.context.repo

    const oldReadme = (await readFile(readmeFile)).toString()
    const oldStatePattern = new RegExp(`<!--VAR:${readmeTag}\\s+state=(.*?)-->`, 's')
    const oldStateCode = oldReadme.match(oldStatePattern)?.[1] || wordle.serialize(wordle.play())
    const newState = wordle.play(wordle.deserialize(oldStateCode), move)
    const newStateCode = wordle.serialize(newState)

    const newReadme = renderer(template, {
      renderAsHTML: false,
      context: {
        baseUrl: `${serverUrl}/${owner}/${repo}/${event}/`,
        id: newStateCode,
        imgBaseUrl: 'https://raw.githubusercontent.com/aryan02420/wordle/main/public/images/',
        isDev: false,
        message: wordle.getMessageString(newState.msg),
        state: newState,
        tag: readmeTag,
      },
    })

    const pattern = new RegExp(`<!--START_SECTION:${readmeTag}-->.*<!--END_SECTION:${readmeTag}-->`, 's')
    const finalReadme = oldReadme.replace(pattern, newReadme.trim())
    await writeFile(readmeFile, finalReadme)
    
  } catch (error) {
    console.trace()
    // @ts-ignore
    core.setFailed(error.message)
  }
})()
