import { encode } from '@toon-format/toon'
import { describe, expect, it } from 'vitest'
import { prompt } from '../src'

describe('prompt', () => {
  it('should remove leading and trailing whitespace', () => {
    const result = prompt`
      Hello world
    `
    expect(result).toBe('Hello world')
  })

  it('should collapse multiple spaces into single space', () => {
    const result = prompt`Hello     world`
    expect(result).toBe('Hello world')
  })

  it('should preserve single line breaks within text', () => {
    const result = prompt`Line 1
Line 2
Line 3`
    expect(result).toBe('Line 1\nLine 2\nLine 3')
  })

  it('should collapse multiple line breaks', () => {
    const result = prompt`Line 1


Line 2`
    // The function collapses whitespace but may preserve some line breaks
    expect(result).toBe('Line 1\n\nLine 2')
  })

  it('should handle template interpolation', () => {
    const name = 'John'
    const age = 30
    const result = prompt`Hello ${name}, you are ${age} years old`
    expect(result).toBe('Hello John, you are 30 years old')
  })

  it('should handle complex nested objects in interpolation', () => {
    const data = { demo: 1, array: [1, 2, 3], nested: { a: 'b' } }
    const result = prompt`Data: ${data}`
    expect(result).toContain('Data:')
    expect(result).toContain('[object Object]')
  })

  it('should trim lines within multiline strings', () => {
    const result = prompt`
      Line 1 with spaces
        Line 2 indented
      Line 3 normal
    `
    expect(result).toBe('Line 1 with spaces\nLine 2 indented\nLine 3 normal')
  })

  it('should handle empty template', () => {
    const result = prompt``
    expect(result).toBe('')
  })

  it('should handle only whitespace', () => {
    const result = prompt`   
      
    `
    expect(result).toBe('')
  })

  it('should preserve intentional spacing in lists', () => {
    const result = prompt`
      Items:
      * Item 1
      * Item 2
      * Item 3
    `
    expect(result).toBe('Items:\n* Item 1\n* Item 2\n* Item 3')
  })

  it('should handle multiple interpolations in sequence', () => {
    const a = 'A'
    const b = 'B'
    const c = 'C'
    const result = prompt`${a} ${b} ${c}`
    expect(result).toBe('A B C')
  })

  it('should handle numeric interpolations', () => {
    const result = prompt`The answer is ${42}`
    expect(result).toBe('The answer is 42')
  })

  it('should handle boolean interpolations', () => {
    const result = prompt`Is active: ${true}, Is disabled: ${false}`
    expect(result).toBe('Is active: true, Is disabled: false')
  })

  it('should handle null and undefined interpolations', () => {
    const result = prompt`Value: ${null}, Other: ${undefined}`
    expect(result).toBe('Value: null, Other: undefined')
  })

  it('should handle complex prompt example from README', () => {
    const result = prompt`
      You are a security guard that analyze the given email for spam/scam/toxicity/business relevance:
      
      Score each category and provide recommendation. Focus on:
        * Spam: unsolicited bulk/promotional content
        * Scam: phishing, fraud, identity theft attempts
        * Toxicity: hate speech, threats, harassment
        * Business relevance: legitimate business inquiries, job opportunities
        * Suspicious patterns: urgent language, poor grammar, suspicious URLs, sensitive info requests
        * Advertisement: explicit promotional content, product/service offers, marketing campaigns

      If you are not sure about any links, emails or any information, use tools.
    `

    expect(result).toContain('You are a security guard')
    expect(result).toContain('Score each category')
    expect(result).toContain('* Spam:')
    expect(result).toContain('If you are not sure')
    // Should not have excessive whitespace
    expect(result).not.toMatch(/ {4,}/)
  })

  it('should handle indented code blocks', () => {
    const result = prompt`
      Function example:
        function hello() {
          return "world"
        }
    `
    expect(result).toBe(
      'Function example:\nfunction hello() {\nreturn "world"\n}',
    )
  })

  it('should collapse leading whitespace on each line', () => {
    const result = prompt`
                  Heavily indented text
                    More indentation
                  Back to less
    `
    expect(result).toBe('Heavily indented text\nMore indentation\nBack to less')
  })

  it('should handle text with tabs', () => {
    const result = prompt`Line1		with	tabs`
    // Tabs are preserved in the output
    expect(result).toBe('Line1\t\twith\ttabs')
  })

  it('should handle mixed whitespace characters', () => {
    const result = prompt`Text   with	  mixed   whitespace`
    // Mixed whitespace including tabs
    expect(result).toBe('Text with\t mixed whitespace')
  })

  it('should preserve single newlines but collapse multiple', () => {
    const result = prompt`
      Paragraph 1
      
      Paragraph 2
      
      
      
      Paragraph 3
    `
    // Multiple blank lines are partially collapsed
    expect(result).toBe('Paragraph 1\n\nParagraph 2\n\nParagraph 3')
  })

  it('should handle interpolation with whitespace around it', () => {
    const value = 'VALUE'
    const result = prompt`
      Before   ${value}   After
    `
    expect(result).toBe('Before VALUE After')
  })

  it('should handle consecutive interpolations', () => {
    const a = 'A'
    const b = 'B'
    const result = prompt`${a}${b}`
    expect(result).toBe('AB')
  })

  it('should handle interpolation at start', () => {
    const value = 'Start'
    const result = prompt`${value} and end`
    expect(result).toBe('Start and end')
  })

  it('should handle interpolation at end', () => {
    const value = 'End'
    const result = prompt`Start and ${value}`
    expect(result).toBe('Start and End')
  })

  it('should handle array toString in interpolation', () => {
    const arr = [1, 2, 3]
    const result = prompt`Array: ${arr}`
    expect(result).toBe('Array: 1,2,3')
  })

  it('should not add extra spaces when collapsing whitespace', () => {
    const result = prompt`
      Line one
      Line two
      Line three
    `
    expect(result).toBe('Line one\nLine two\nLine three')
  })

  it('should handle many empty lines', () => {
    const result = prompt`        
  
  
  
                
                
                
                
                    
                    
                     
                      
                       
                        
                        You are a security guard that analyze the given email for spam/scam/toxicity/business relevance:
  
   
   
    
     
      
               
               
                 
                 
                  
                   
                    
                      
                       
                       
                        
                         
                          
                          
            Score each category and provide recommendation. Focus on:
              * Spam: unsolicited bulk/promotional content
              * Scam: phishing, fraud, identity theft attempts
              * Toxicity: hate speech, threats, harassment
              * Business relevance: legitimate business inquiries, job opportunities
              * Suspicious patterns: urgent language, poor grammar, suspicious URLs, sensitive info requests
              * Advertisement: explicit promotional content, product/service offers, marketing campaigns

                        If you are not sure about any links, emails or any information, use tools.
            
            ${encode({ demo: 1, array: [1, 2, 3], nested: { a: 'b' } })}

            If you are not sure about any links, emails or any information, use tools.
            
            
            ${encode({ demo: 1, array: [1, 2, 3], nested: { a: 'b' } })}
            
            
            
            
            
            asdasd
`

    expect(
      result,
    ).toBe(`You are a security guard that analyze the given email for spam/scam/toxicity/business relevance:

Score each category and provide recommendation. Focus on:
* Spam: unsolicited bulk/promotional content
* Scam: phishing, fraud, identity theft attempts
* Toxicity: hate speech, threats, harassment
* Business relevance: legitimate business inquiries, job opportunities
* Suspicious patterns: urgent language, poor grammar, suspicious URLs, sensitive info requests
* Advertisement: explicit promotional content, product/service offers, marketing campaigns

If you are not sure about any links, emails or any information, use tools.

demo: 1
array[3]: 1,2,3
nested:
  a: b

If you are not sure about any links, emails or any information, use tools.

demo: 1
array[3]: 1,2,3
nested:
  a: b

asdasd`)
  })
})
