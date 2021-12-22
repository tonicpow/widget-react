import { ComponentMeta, Story } from "@storybook/react";
import React from "react";
import TonicPowWidget, { WidgetProps } from "../../dist/esm/";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Widget",
  component: TonicPowWidget,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof TonicPowWidget>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<WidgetProps> = (args) => <TonicPowWidget {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: "Widget",
  widgetID: "30934462fd0fc42e8f2775683974b432b6fdd7e29daee99551570e29f815cc75",
};
