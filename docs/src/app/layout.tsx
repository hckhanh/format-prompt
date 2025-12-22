import './global.css'

import { RootProvider } from 'fumadocs-ui/provider/next'
import type { Metadata } from 'next'
import { inter, jetbrainsMono } from '@/lib/fonts'

export const metadata: Metadata = {
  title: {
    default: 'format-prompt - Format Prompts for Optimal Token Usage',
    template: '%s | format-prompt',
  },
  description:
    'A utility to format prompts for cleaner presentation and optimal token usage. Removes unused spaces and line breaks while preserving structure.',
  keywords: [
    'prompt',
    'format',
    'llm',
    'ai',
    'template',
    'string',
    'whitespace',
    'typescript',
    'javascript',
    'format-prompt',
  ],
  authors: [
    {
      name: 'Khánh Hoàng',
      url: 'https://www.khanh.id',
    },
  ],
  creator: 'Khánh Hoàng',
  metadataBase: new URL('https://format-prompt.khanh.id'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://format-prompt.khanh.id',
    title: 'format-prompt - Format Prompts for Optimal Token Usage',
    description:
      'A utility to format prompts for cleaner presentation and optimal token usage. Works with template literals.',
    siteName: 'format-prompt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'format-prompt - Format Prompts for AI',
    description:
      'A utility to format prompts for cleaner presentation and optimal token usage. Works with template literals.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      lang='en'
      suppressHydrationWarning
    >
      <body className='flex flex-col min-h-screen'>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
