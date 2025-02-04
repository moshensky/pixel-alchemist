import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import type { PicsumImage } from '../../services/picsum'
import { IMAGE_HEIGHT, IMAGE_WIDTH } from './ImageCard'
import { ImageGrid } from './ImageGrid'

const sampleImages: ReadonlyArray<PicsumImage> = [
  { id: '237', author: 'John Doe' },
  { id: '238', author: 'Jane Smith' },
  { id: '239', author: 'Bob Wilson' },
  { id: '240', author: 'Alice Brown' },
  { id: '241', author: 'Charlie Davis' },
  { id: '242', author: 'Eve Johnson' },
].map((img) => ({
  ...img,
  width: IMAGE_WIDTH,
  height: IMAGE_HEIGHT,
  url: '',
  downloadUrl: '',
}))

const meta = {
  title: 'Components/ImageGrid',
  component: ImageGrid,
  parameters: {
    layout: 'padded',
  },
  args: {
    images: sampleImages,
    isLoading: false,
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ImageGrid>

export default meta
type Story = StoryObj<typeof ImageGrid>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}

export const Empty: Story = {
  args: {
    images: [],
  },
}

export const SingleItem: Story = {
  args: {
    images: sampleImages.slice(0, 1),
  },
}

export const TwoColumns = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}

export const SingleColumn = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
}
