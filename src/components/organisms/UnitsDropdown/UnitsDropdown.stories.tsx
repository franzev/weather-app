import type { Meta, StoryObj } from "@storybook/react-vite";
import { UnitsDropdown } from "./UnitsDropdown";

const meta: Meta<typeof UnitsDropdown> = {
  title: "Organisms/UnitsDropdown",
  component: UnitsDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          padding: "2rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
