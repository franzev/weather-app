import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DropdownTrigger } from "./DropdownTrigger";

const meta: Meta<typeof DropdownTrigger> = {
  title: "Molecules/DropdownTrigger",
  component: DropdownTrigger,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
    },
    ariaLabel: {
      control: "text",
    },
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen || false);
    return (
      <DropdownTrigger
        {...args}
        isOpen={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    children: "Select option",
    isOpen: false,
    ariaLabel: "Select option",
  },
};

export const Open: Story = {
  args: {
    children: "Select option",
    isOpen: true,
    ariaLabel: "Select option",
  },
};

export const WithSelectedValue: Story = {
  args: {
    children: "Today",
    isOpen: false,
    ariaLabel: "Select day",
  },
};

export const LongText: Story = {
  args: {
    children: "Switch to Imperial",
    isOpen: false,
    ariaLabel: "Switch units",
  },
};
