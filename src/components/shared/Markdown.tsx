import {
  MarkdownBlockquote,
  MarkdownCode,
  MarkdownDelete,
  MarkdownEmphasis,
  MarkdownHeading,
  MarkdownHeadingDepth,
  MarkdownInlineCode,
  MarkdownLink,
  MarkdownList,
  MarkdownParagraph,
  MarkdownRoot,
  MarkdownStrong,
  MarkdownText,
  MarkdownThematicBreak,
} from '@/gen/evops/ext/v1/ext_pb'
import useApiExt from '@/hooks/useApiExt'
import { useEffect, useState } from 'react'

export interface Props {
  text: string
}
export default function Markdown(props: Props) {
  const apiExt = useApiExt()
  const [ast, setAst] = useState<MarkdownRoot | undefined>(undefined)
  useEffect(() => {
    async function parseMarkdown() {
      if (apiExt === undefined) {
        return
      }
      const parsedAst = await apiExt.parseMarkdown(props.text)
      setAst(parsedAst)
    }
    parseMarkdown()
  }, [apiExt])

  if (ast === undefined) {
    return <span className="loading loading-spinner"></span>
  }

  return <MdRoot ast={ast} />
}

function MdRoot({ ast }: { ast: MarkdownRoot }) {
  return ast.children.map((c) => {
    switch (c.child.case) {
      case 'blockquote':
        return <MdBlockquote ast={c.child.value} />
      case 'code': {
        return <MdCode ast={c.child.value} />
      }
      case 'heading': {
        return <MdHeading ast={c.child.value} />
      }
      case 'list': {
        return <MdList ast={c.child.value} />
      }
      case 'paragraph': {
        return <MdParagraph ast={c.child.value} />
      }
      case 'thematicBreak': {
        return <MdThematicBreak ast={c.child.value} />
      }
      default: {
        const _exhaustiveCheck: undefined = c.child.case
      }
    }
  })
}

function MdBlockquote({ ast }: { ast: MarkdownBlockquote }) {
  return (
    <blockquote className="bg-base-200 rounded-lg px-3 py-2">
      {ast.children.map((c) => {
        switch (c.child.case) {
          case 'blockquote':
            return <MdBlockquote ast={c.child.value} />
          case 'code': {
            return <MdCode ast={c.child.value} />
          }
          case 'heading': {
            return <MdHeading ast={c.child.value} />
          }
          case 'list': {
            return <MdList ast={c.child.value} />
          }
          case 'paragraph': {
            return <MdParagraph ast={c.child.value} />
          }
          case 'thematicBreak': {
            return <MdThematicBreak ast={c.child.value} />
          }
          default: {
            const _exhaustiveCheck: undefined = c.child.case
          }
        }
      })}
    </blockquote>
  )
}

function MdCode({ ast }: { ast: MarkdownCode }) {
  return (
    <pre className="bg-base-200 rounded-lg p-3">
      <code>{ast.value}</code>
    </pre>
  )
}

function MdHeading({ ast }: { ast: MarkdownHeading }) {
  const children = ast.children.map((c) => {
    switch (c.child.case) {
      case 'delete':
        return <MdDelete ast={c.child.value} />
      case 'emphasis': {
        return <MdEmphasis ast={c.child.value} />
      }
      case 'inlineCode': {
        return <MdInlineCode ast={c.child.value} />
      }
      case 'link': {
        return <MdLink ast={c.child.value} />
      }
      case 'strong': {
        return <MdStrong ast={c.child.value} />
      }
      case 'text': {
        return <MdText ast={c.child.value} />
      }
      default: {
        const _exhaustiveCheck: undefined = c.child.case
      }
    }
  })
  switch (ast.depth) {
    case MarkdownHeadingDepth.MARKDOWN_HEADING_DEPTH_1: {
      return <h1 className="text-3xl font-bold">{children}</h1>
    }
    case MarkdownHeadingDepth.MARKDOWN_HEADING_DEPTH_2: {
      return <h2 className="text-2xl font-bold">{children}</h2>
    }
    case MarkdownHeadingDepth.MARKDOWN_HEADING_DEPTH_3: {
      return <h3 className="text-lg font-bold">{children}</h3>
    }
    case MarkdownHeadingDepth.MARKDOWN_HEADING_DEPTH_4: {
      return <h4 className="font-bold">{children}</h4>
    }
    case MarkdownHeadingDepth.MARKDOWN_HEADING_DEPTH_5: {
      return <h5 className="text-sm font-bold">{children}</h5>
    }
    case MarkdownHeadingDepth.MARKDOWN_HEADING_DEPTH_6: {
      return <h6 className="text-xs font-bold">{children}</h6>
    }
    case MarkdownHeadingDepth.MARKDOWN_HEADING_DEPTH_UNSPECIFIED: {
      throw new Error()
    }
    default: {
      const _exhaustiveCheck: never = ast.depth
    }
  }
}

function MdList({ ast }: { ast: MarkdownList }) {
  const listItems = ast.children.map((c) => (
    <li>
      {c.children.map((c) => {
        switch (c.child.case) {
          case 'blockquote':
            return <MdBlockquote ast={c.child.value} />
          case 'code': {
            return <MdCode ast={c.child.value} />
          }
          case 'heading': {
            return <MdHeading ast={c.child.value} />
          }
          case 'list': {
            return <MdList ast={c.child.value} />
          }
          case 'paragraph': {
            return <MdParagraph ast={c.child.value} />
          }
          case 'thematicBreak': {
            return <MdThematicBreak ast={c.child.value} />
          }
          default: {
            const _exhaustiveCheck: undefined = c.child.case
          }
        }
      })}
    </li>
  ))
  if (ast.ordered) {
    return <ol className="list-outside list-decimal pl-6">{listItems}</ol>
  } else {
    return <ul className="list-outside list-disc pl-6">{listItems}</ul>
  }
}

function MdParagraph({ ast }: { ast: MarkdownParagraph }) {
  return (
    <p>
      {ast.children.map((c) => {
        switch (c.child.case) {
          case 'delete':
            return <MdDelete ast={c.child.value} />
          case 'emphasis': {
            return <MdEmphasis ast={c.child.value} />
          }
          case 'inlineCode': {
            return <MdInlineCode ast={c.child.value} />
          }
          case 'link': {
            return <MdLink ast={c.child.value} />
          }
          case 'strong': {
            return <MdStrong ast={c.child.value} />
          }
          case 'text': {
            return <MdText ast={c.child.value} />
          }
          default: {
            const _exhaustiveCheck: undefined = c.child.case
          }
        }
      })}
    </p>
  )
}

function MdThematicBreak({ ast }: { ast: MarkdownThematicBreak }) {
  return <div className="divider"></div>
}

function MdDelete({ ast }: { ast: MarkdownDelete }) {
  return (
    <del>
      {ast.children.map((c) => {
        switch (c.child.case) {
          case 'delete':
            return <MdDelete ast={c.child.value} />
          case 'emphasis': {
            return <MdEmphasis ast={c.child.value} />
          }
          case 'inlineCode': {
            return <MdInlineCode ast={c.child.value} />
          }
          case 'link': {
            return <MdLink ast={c.child.value} />
          }
          case 'strong': {
            return <MdStrong ast={c.child.value} />
          }
          case 'text': {
            return <MdText ast={c.child.value} />
          }
          default: {
            const _exhaustiveCheck: undefined = c.child.case
          }
        }
      })}
    </del>
  )
}

function MdEmphasis({ ast }: { ast: MarkdownEmphasis }) {
  return (
    <em>
      {ast.children.map((c) => {
        switch (c.child.case) {
          case 'delete':
            return <MdDelete ast={c.child.value} />
          case 'emphasis': {
            return <MdEmphasis ast={c.child.value} />
          }
          case 'inlineCode': {
            return <MdInlineCode ast={c.child.value} />
          }
          case 'link': {
            return <MdLink ast={c.child.value} />
          }
          case 'strong': {
            return <MdStrong ast={c.child.value} />
          }
          case 'text': {
            return <MdText ast={c.child.value} />
          }
          default: {
            const _exhaustiveCheck: undefined = c.child.case
          }
        }
      })}
    </em>
  )
}

function MdInlineCode({ ast }: { ast: MarkdownInlineCode }) {
  return <code className="bg-base-200 rounded-lg p-1">{ast.value}</code>
}

function MdLink({ ast }: { ast: MarkdownLink }) {
  return (
    <a href={ast.url} className="link">
      {ast.children.map((c) => {
        switch (c.child.case) {
          case 'delete':
            return <MdDelete ast={c.child.value} />
          case 'emphasis': {
            return <MdEmphasis ast={c.child.value} />
          }
          case 'inlineCode': {
            return <MdInlineCode ast={c.child.value} />
          }
          case 'strong': {
            return <MdStrong ast={c.child.value} />
          }
          case 'text': {
            return <MdText ast={c.child.value} />
          }
          default: {
            const _exhaustiveCheck: undefined = c.child.case
          }
        }
      })}
    </a>
  )
}

function MdStrong({ ast }: { ast: MarkdownStrong }) {
  return (
    <strong>
      {ast.children.map((c) => {
        switch (c.child.case) {
          case 'delete':
            return <MdDelete ast={c.child.value} />
          case 'emphasis': {
            return <MdEmphasis ast={c.child.value} />
          }
          case 'inlineCode': {
            return <MdInlineCode ast={c.child.value} />
          }
          case 'link': {
            return <MdLink ast={c.child.value} />
          }
          case 'strong': {
            return <MdStrong ast={c.child.value} />
          }
          case 'text': {
            return <MdText ast={c.child.value} />
          }
          default: {
            const _exhaustiveCheck: undefined = c.child.case
          }
        }
      })}
    </strong>
  )
}

function MdText({ ast }: { ast: MarkdownText }) {
  return <>{ast.value}</>
}
