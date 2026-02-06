import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
    },
    alt: {
      control: "text",
    },
    width: {
      control: "number",
    },
    height: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "/images/icon-search.svg",
    alt: "Search icon",
    width: 20,
    height: 20,
  },
};

export const Small: Story = {
  args: {
    src: "/images/icon-search.svg",
    alt: "Search icon",
    width: 16,
    height: 16,
  },
};

export const Large: Story = {
  args: {
    src: "/images/icon-search.svg",
    alt: "Search icon",
    width: 32,
    height: 32,
  },
};

export const UnitsIcon: Story = {
  args: {
    src: "/images/icon-units.svg",
    alt: "Units icon",
    width: 20,
    height: 20,
  },
};

export const DropdownIcon: Story = {
  args: {
    src: "/images/icon-dropdown.svg",
    alt: "Dropdown icon",
    width: 20,
    height: 20,
  },
};
