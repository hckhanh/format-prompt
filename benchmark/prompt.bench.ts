import { bench, describe } from 'vitest'
import { prompt } from '../src'

describe('prompt formatting', () => {
  bench('simple prompt without interpolation', () => {
    prompt`
      You are a helpful assistant.
      Please provide accurate information.
    `
  })

  bench('prompt with single interpolation', () => {
    const name = 'John'
    prompt`Hello ${name}, how can I help you today?`
  })

  bench('prompt with multiple interpolations', () => {
    const name = 'John'
    const age = 30
    const city = 'New York'
    prompt`User: ${name}, Age: ${age}, City: ${city}`
  })

  bench('complex multiline prompt', () => {
    const email = 'test@example.com'
    prompt`
      You are a security guard that analyze the given email for spam/scam/toxicity/business relevance:
      
      Email: ${email}
      
      Score each category and provide recommendation. Focus on:
        * Spam: unsolicited bulk/promotional content
        * Scam: phishing, fraud, identity theft attempts
        * Toxicity: hate speech, threats, harassment
        * Business relevance: legitimate business inquiries, job opportunities
        * Suspicious patterns: urgent language, poor grammar, suspicious URLs, sensitive info requests
        * Advertisement: explicit promotional content, product/service offers, marketing campaigns

      If you are not sure about any links, emails or any information, use tools.
    `
  })

  bench('prompt with heavy indentation', () => {
    prompt`
                        This is heavily indented
                          More indentation here
                        Back to previous level
                      Even less indentation
    `
  })

  bench('prompt with many line breaks', () => {
    prompt`
      Line 1
      
      
      
      Line 2
      
      
      Line 3
    `
  })

  bench('prompt with mixed whitespace', () => {
    prompt`Text   with     lots    of     spaces    and		tabs	mixed	together`
  })

  bench('small inline prompt', () => {
    prompt`Quick message`
  })

  bench('prompt with object interpolation', () => {
    const data = { id: 1, name: 'John', values: [1, 2, 3] }
    prompt`Data: ${data}`
  })

  bench('empty prompt', () => {
    prompt``
  })
})
