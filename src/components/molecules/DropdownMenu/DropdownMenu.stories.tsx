import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownMenuItem } from "../DropdownMenuItem";
import { DropdownMenu } from "./DropdownMenu";

const meta: Meta<typeof DropdownMenu> = {
  title: "Molecules/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: ["left", "right"],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", padding: "2rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RightAligned: Story = {
  args: {
    align: "right",
    children: (
      <>
        <DropdownMenuItem>Option 1</DropdownMenuItem>
        <DropdownMenuItem>Option 2</DropdownMenuItem>
        <DropdownMenuItem>Option 3</DropdownMenuItem>
      </>
    ),
  },
};

export const LeftAligned: Story = {
  args: {
    align: "left",
    children: (
      <>
        <DropdownMenuItem>Today</DropdownMenuItem>
        <DropdownMenuItem>Tomorrow</DropdownMenuItem>
        <DropdownMenuItem>Wednesday</DropdownMenuItem>
      </>
    ),
  },
};

export const WithActiveItem: Story = {
  args: {
    align: "right",
    children: (
      <>
        <DropdownMenuItem isActive>Selected Option</DropdownMenuItem>
        <DropdownMenuItem>Option 2</DropdownMenuItem>
        <DropdownMenuItem>Option 3</DropdownMenuItem>
      </>
    ),
  },
};
