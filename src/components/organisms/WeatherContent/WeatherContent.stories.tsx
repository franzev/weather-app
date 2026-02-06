import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loading } from "./WeatherContent";

const meta: Meta<typeof Loading> = {
  title: "Organisms/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
