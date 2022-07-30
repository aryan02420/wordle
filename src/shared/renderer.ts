import nunjucks from 'nunjucks'
import markdownit from 'markdown-it'

export interface renderOptions {
  renderAsHTML?: boolean
  context: Record<string, any>
}

type renderFn = (source: string, options: renderOptions) => string

const markdown = new markdownit({
  html: true,
})

const renderer: renderFn = (source, options) => {
  let rendered = nunjucks.renderString(source, options.context)
  if (options.renderAsHTML) rendered = markdown.render(rendered)
  return rendered
}

export default renderer
