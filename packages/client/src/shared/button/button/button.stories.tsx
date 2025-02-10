import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Button } from '..'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 's',
    color: 'primary',
    children: 'Button',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultButton: Story = {
  name: 'Button',
}

export const Sizes: Story = {
  render: () => {
    const sizes = ['s', 'm', 'l', 'xl'] as const

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
        {sizes.map(size => (
          <Button key={size} size={size}>{`${size.toUpperCase()} size`}</Button>
        ))}
      </div>
    )
  },
}

export const Colors: Story = {
  render: () => {
    const colors = ['primary', 'secondary', 'contrast'] as const

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
        {colors.map(color => (
          <Button key={color} color={color}>{`${color} color`}</Button>
        ))}
      </div>
    )
  },
}
