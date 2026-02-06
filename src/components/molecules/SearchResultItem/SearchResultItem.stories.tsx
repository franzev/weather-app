import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchResultItem } from "./SearchResultItem";

const meta: Meta<typeof SearchResultItem> = {
  title: "Molecules/SearchResultItem",
  component: SearchResultItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
    },
    details: {
      control: "text",
    },
    onClick: {
      action: "clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "New York",
    details: "New York, United States",
  },
};

export const WithState: Story = {
  args: {
    name: "Los Angeles",
    details: "California, United States",
  },
};

export const International: Story = {
  args: {
    name: "London",
    details: "England, United Kingdom",
  },
};

export const LongName: Story = {
  args: {
    name: "Buenos Aires",
    details: "Autonomous City of Buenos Aires, Argentina",
  },
};
