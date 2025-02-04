import type { Meta, StoryObj } from '@storybook/react'
import { IntlProvider } from 'react-intl'
import { MemoryRouter } from 'react-router'
import { Layout } from './Layout'

type DemoContentProps = {
  count: number
  prefix?: string
  className?: string
}

const DemoContent = ({
  count,
  prefix = 'Content block',
  className = 'p-4 bg-white rounded-lg shadow',
}: DemoContentProps) =>
  Array.from({ length: count }).map((_, idx) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: demo data
    <div key={idx} className={className}>
      {prefix} {idx + 1}
    </div>
  ))

const meta = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <IntlProvider messages={{}} locale="en">
          <Story />
        </IntlProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof Layout>

export const WithShortContent: Story = {
  args: {
    children: (
      <div className="p-4">Short content that doesn't fill the page</div>
    ),
  },
}

export const WithLongContent: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <DemoContent count={20} />
      </div>
    ),
  },
}

export const WithGridContent: Story = {
  args: {
    children: (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DemoContent
          count={12}
          prefix="Grid item"
          className="aspect-square bg-white rounded-lg shadow flex items-center justify-center"
        />
      </div>
    ),
  },
}

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    children: (
      <div className="grid grid-cols-1 gap-4">
        <DemoContent count={6} prefix="Mobile content" />
      </div>
    ),
  },
}

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: {
    children: (
      <div className="grid grid-cols-1 gap-4">
        <DemoContent count={6} prefix="Mobile content" />
      </div>
    ),
  },
}
