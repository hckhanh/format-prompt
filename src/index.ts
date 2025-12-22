import { collWhitespace } from 'string-collapse-leading-whitespace'
import { collapse } from 'string-collapse-white-space'

const startRegex = /^([\s\n\r]+)/
const endRegex = /([\s\n\r]+)$/

/**
 * Formats a string by collapsing internal whitespace while preserving leading and trailing whitespace.
 *
 * This function processes a string to remove excessive whitespace and empty lines, making it
 * more compact for token-efficient prompts. It preserves the string's leading and trailing
 * whitespace to maintain the original boundaries, but optimizes the internal content.
 *
 * The function performs the following operations:
 * - Preserves leading and trailing whitespace (spaces, newlines, carriage returns)
 * - Trims non-breaking spaces within the content
 * - Trims leading/trailing whitespace from individual lines
 * - Removes empty lines from the content
 * - Limits consecutive empty lines to a maximum of 1
 * - Collapses consecutive whitespace characters to a maximum of 2
 *
 * @param s - The string to format
 * @returns The formatted string with optimized whitespace
 *
 * @example
 * ```ts
 * // Collapses multiple spaces
 * formatString("Hello     world") // "Hello world"
 *
 * // Preserves leading/trailing whitespace
 * formatString("  Hello  ") // "  Hello  "
 *
 * // Removes excessive empty lines
 * formatString("Line 1\n\n\n\nLine 2") // "Line 1\n\nLine 2"
 * ```
 */
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

/**
 * A template literal tag function that formats prompts for cleaner presentation and optimal token usage.
 *
 * This function processes template literals to remove unnecessary whitespace and line breaks while
 * preserving the intended structure of your prompts. It's particularly useful for AI/LLM prompts
 * where you want readable, well-formatted code but need compact, token-efficient output.
 *
 * The function automatically:
 * - Collapses multiple spaces into single spaces
 * - Removes excessive empty lines (limiting to maximum 1 consecutive empty line)
 * - Trims leading whitespace from each line (removing indentation)
 * - Preserves intentional line breaks and list structures
 * - Handles template interpolations correctly
 * - Trims the final output
 *
 * @param strings - The template literal string parts
 * @param values - The interpolated values in the template literal
 * @returns The formatted prompt string with optimized whitespace
 *
 * @example
 * ```ts
 * import { prompt } from 'format-prompt'
 *
 * // Basic usage with multiline string
 * const formatted = prompt`
 *   Hello world
 *   This is a prompt
 * `
 * console.log(formatted) // "Hello world\nThis is a prompt"
 *
 * // With interpolation
 * const name = "John"
 * const age = 30
 * const result = prompt`
 *   Name: ${name}
 *   Age: ${age}
 * `
 * console.log(result) // "Name: John\nAge: 30"
 *
 * // Complex prompt with lists
 * const instructions = prompt`
 *   You are a helpful assistant. Please:
 *   * Be concise
 *   * Be accurate
 *   * Be helpful
 * `
 * ```
 */
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
