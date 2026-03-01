import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'hckhanh',
  repo: 'format-prompt',
  branch: 'main',
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span>
          ✨<span className='ml-2'>format-prompt</span>
        </span>
      ),
      url: '/docs',
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  }
}
