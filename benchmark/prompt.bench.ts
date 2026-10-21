import { test } from 'vitest'
import { prompt } from '../src'

test('prompt formatting', { timeout: 120_000 }, async ({ bench }) => {
  await bench('simple prompt without interpolation', () => {
    prompt`
      You are a helpful assistant.
      Please provide accurate information.
    `
  }).run()

  await bench('prompt with single interpolation', () => {
    const name = 'John'
    prompt`Hello ${name}, how can I help you today?`
  }).run()

  await bench('prompt with multiple interpolations', () => {
    const name = 'John'
    const age = 30
    const city = 'New York'
    prompt`User: ${name}, Age: ${age}, City: ${city}`
  }).run()

  await bench('complex multiline prompt', () => {
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
  }).run()

  await bench('prompt with heavy indentation', () => {
    prompt`
                        This is heavily indented
                          More indentation here
                        Back to previous level
                      Even less indentation
    `
  }).run()

  await bench('prompt with many line breaks', () => {
    prompt`
      Line 1
      
      
      
      Line 2
      
      
      Line 3
    `
  }).run()

  await bench('prompt with mixed whitespace', () => {
    prompt`Text   with     lots    of     spaces    and		tabs	mixed	together`
  }).run()

  await bench('small inline prompt', () => {
    prompt`Quick message`
  }).run()

  await bench('prompt with object interpolation', () => {
    const data = { id: 1, name: 'John', values: [1, 2, 3] }
    prompt`Data: ${data}`
  }).run()

  await bench('empty prompt', () => {
    prompt``
  }).run()

  await bench('first use of a multiline template', () => {
    const strings = Object.freeze(
      Object.assign(['  Hello\n    world  '], {
        raw: Object.freeze(['  Hello\n    world  ']),
      }),
    )
    prompt(strings)
  }).run()

  await bench('mutable template parts', () => {
    const strings = Object.assign(['Hello  ', '  world'], {
      raw: ['Hello  ', '  world'],
    })
    prompt(strings, 'reader')
  }).run()
})
