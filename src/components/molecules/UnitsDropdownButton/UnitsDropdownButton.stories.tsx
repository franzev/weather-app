import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { UnitsDropdownButton } from "./UnitsDropdownButton";

const meta: Meta<typeof UnitsDropdownButton> = {
  title: "Molecules/UnitsDropdownButton",
  component: UnitsDropdownButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen || false);
    return (
      <UnitsDropdownButton
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
    isOpen: false,
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
  },
};
