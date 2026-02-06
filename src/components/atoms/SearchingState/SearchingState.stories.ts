import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchingState } from "./SearchingState";

const meta: Meta<typeof SearchingState> = {
  title: "Atoms/SearchingState",
  component: SearchingState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
