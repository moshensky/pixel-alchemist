import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router'
import type { PicsumImage } from '../../services/picsum'
import { ImageCard } from './ImageCard'

const image: PicsumImage = {
  id: '777',
  author: 'Foobar',
  width: 1,
  height: 1,
  url: '',
  downloadUrl: '',
}

const meta = {
  title: 'Components/ImageCard',
  component: ImageCard,
  args: {
    image,
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ImageCard>

export default meta
type Story = StoryObj<typeof ImageCard>

export const Default: Story = {}

export const LongAuthorName: Story = {
  args: {
    image: {
      ...image,
      author: 'Dr. Roland von Richardson III, Professional Photographer',
    },
  },
}
