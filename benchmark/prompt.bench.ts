import { bench, describe } from 'vitest'
import { prompt } from '../src/index'

describe('prompt formatting benchmarks', () => {
  bench('simple string without variables', () => {
    prompt`Hello, world!`
  })

  bench('string with single variable', () => {
    const name = 'John'
    prompt`Hello, ${name}!`
  })

  bench('string with multiple variables', () => {
    const name = 'John'
    const age = 30
    prompt`User: ${name}, Age: ${age}`
  })

  bench('multiline prompt with whitespace', () => {
    prompt`
      This is a multiline
      prompt with lots of
      extra whitespace
    `
  })

  bench('complex prompt with variables and whitespace', () => {
    const role = 'security guard'
    const categories = 'spam/scam/toxicity'
    prompt`
      You are a ${role} that analyzes the given email for ${categories}:
      
      Score each category and provide recommendation. Focus on:
        * Spam: unsolicited bulk/promotional content
        * Scam: phishing, fraud, identity theft attempts
        * Toxicity: hate speech, threats, harassment
    `
  })

  bench('prompt with leading/trailing whitespace', () => {
    prompt`
      
      
      Content with extra leading and trailing whitespace
      
      
    `
  })

  bench('prompt with tabs and mixed whitespace', () => {
    prompt`
		Content with tabs
			and mixed whitespace
				indentation
    `
  })

  bench('prompt with multiple consecutive newlines', () => {
    prompt`
      Line 1
      
      
      
      Line 2
      
      Line 3
    `
  })

  bench('large prompt with many variables', () => {
    const var1 = 'value1'
    const var2 = 'value2'
    const var3 = 'value3'
    const var4 = 'value4'
    const var5 = 'value5'
    prompt`
      Variable 1: ${var1}
      Variable 2: ${var2}
      Variable 3: ${var3}
      Variable 4: ${var4}
      Variable 5: ${var5}
      
      This is a large prompt with multiple variables
      and lots of whitespace that needs to be collapsed
      for optimal token usage.
    `
  })

  bench('prompt with object interpolation', () => {
    const config = { demo: 1, array: [1, 2, 3], nested: { a: 'b' } }
    prompt`
      Configuration:
      ${JSON.stringify(config, null, 2)}
      
      Process this configuration
    `
  })
})
