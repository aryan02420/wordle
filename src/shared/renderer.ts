import nunjucks from 'nunjucks'
import markdownit from 'markdown-it'

export interface renderOptions {
  renderAs: 'text' | 'markdown' | 'html'
  context: Record<string, any>
}

type renderFn = (source: string, options: renderOptions) => string

const textRenderer = new markdownit({ html: false })
const htmlRenderer = new markdownit({ html: true })

const renderer: renderFn = (source, options) => {
  let rendered = nunjucks.renderString(source, options.context)
  switch (options.renderAs) {
    case 'text':
      return textRenderer.render(rendered)
    case 'markdown':
      return rendered
    case 'html':
      return htmlRenderer.render(rendered)
  }
}

export default renderer
