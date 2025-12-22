import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/hckhanh/format-prompt',
    nav: {
      title: (
        <span>
          ✨<span className='ml-2'>format-prompt</span>
        </span>
      ),
      url: '/docs',
    },
  }
}
