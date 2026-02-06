import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoadingDots } from "./LoadingDots";

const meta: Meta<typeof LoadingDots> = {
  title: "Atoms/LoadingDots",
  component: LoadingDots,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
