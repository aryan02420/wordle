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
    const payload = github.context.payload.client_payload
    const eventName = github.context.eventName
    const repo = github.context.repo
    console.log({ readmeFile, readmeTag, payload, eventName, repo })
    const oldReadme = (await readFile(readmeFile)).toString()
    const newState = wordle.play(wordle.deserialize(payload.state), payload.move)
    const newReadme = renderer(template, {
      renderAsHTML: false,
      context: {
        baseUrl: `/dispatch/${payload.owner}/${payload.repo}/${payload.event}/${payload.state}/`,
        id: wordle.serialize(newState),
        imgBaseUrl: 'https://raw.githubusercontent.com/aryan02420/wordle/main/public/images',
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
    // @ts-ignore
    core.setFailed(error.message)
  }
})()
