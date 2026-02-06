import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownMenuItem } from "./DropdownMenuItem";

const meta: Meta<typeof DropdownMenuItem> = {
  title: "Molecules/DropdownMenuItem",
  component: DropdownMenuItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isActive: {
      control: "boolean",
    },
    onClick: {
      action: "clicked",
    },
  },
  decorators: [
    (Story) => (
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <Story />
      </ul>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Menu Item",
  },
};

export const Active: Story = {
  args: {
    children: "Active Item",
    isActive: true,
  },
};

export const Today: Story = {
  args: {
    children: "Today",
  },
};

export const LongText: Story = {
  args: {
    children: "This is a longer menu item text",
  },
};
