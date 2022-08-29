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
    const payload = github.context.payload
    const eventName = github.context.eventName
    const repo = github.context.repo
    console.log({ readmeFile, readmeTag, payload, eventName, repo })
    // const oldReadme = (await readFile(readmeFile)).toString()
    // const newState = wordle.play(wordle.deserialize(payload.state), payload.move)
    // const newReadme = renderer(template, {
    //   renderAsHTML: false,
    //   context: {
    //     baseUrl: `/dispatch/${payload.owner}/${payload.repo}/${payload.event}/${payload.state}/`,
    //     id: wordle.serialize(newState),
    //     imgBaseUrl: '/images/',
    //     isDev: false,
    //     message: wordle.getMessageString(newState.msg),
    //     state: newState,
    //     tag: readmeTag,
    //   },
    // })
  } catch (error) {
    // @ts-ignore
    core.setFailed(error.message)
  }
})()
