import { collWhitespace } from 'string-collapse-leading-whitespace'
import { collapse } from 'string-collapse-white-space'

const startRegex = /^([\s\n\r]+)/
const endRegex = /([\s\n\r]+)$/

function formatString(s: string): string {
  const start = startRegex.exec(s)?.[0] ?? ''
  const end = endRegex.exec(s)?.[0] ?? ''

  const formatted = collapse(s, {
    trimnbsp: true,
    trimLines: true,
    removeEmptyLines: true,
    limitConsecutiveEmptyLinesTo: 1,
  }).result
  return collWhitespace(start + formatted + end, 2)
}

export function prompt(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  let promptString = ''
  for (let i = 0; i < strings.length; i++) {
    promptString += formatString(strings[i])
    if (i < values.length) {
      promptString += String(values[i])
    }
  }

  return promptString.trim()
}
