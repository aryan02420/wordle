import nunjucks from 'nunjucks'
import markdownit from 'markdown-it'

type renderFn = (
  source: string,
  options: {
    renderMarkdown?: boolean
    context: any
  },
) => string

const markdown = new markdownit({
  html: true
})

const renderer: renderFn = (source, options) => {
  let rendered = nunjucks.renderString(source, options.context)
  if (options.renderMarkdown) rendered = markdown.render(rendered)
  return rendered
}

export default renderer
