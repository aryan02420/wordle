import fs from 'node:fs'
import nunjucks from 'nunjucks'
import markdownit from 'markdown-it'

type renderFn = (
  filePath: string,
  options: {
    renderMarkdown?: boolean
    context: any
  },
) => string

const markdown = new markdownit()

const renderer: renderFn = (filePath, options) => {
  const content = fs.readFileSync(filePath).toString()
  let rendered = nunjucks.renderString(content, options.context)
  if (options.renderMarkdown) rendered = markdown.render(rendered)
  return rendered
}

export default renderer
