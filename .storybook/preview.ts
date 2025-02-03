import type { Preview } from '@storybook/react'

import '../packages/client/src/index.css'
import './index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [{ name: 'Primary', value: '#9b5cf0' }],
      default: 'Primary',
    },
  },
}

export default preview
