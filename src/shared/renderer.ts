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

const renderer: renderFn = (source, options) => {
  let rendered = nunjucks.renderString(source, options.context)
  if (options.renderMarkdown) rendered = markdown.render(rendered)
  return rendered
}

export default renderer
