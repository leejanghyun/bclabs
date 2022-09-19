import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import { Loader as LoaderComp } from '../components/Atom';

export default {
  title: 'Atom/Loader',
  component: LoaderComp,
} as ComponentMeta<typeof LoaderComp>;

const Template: ComponentStory<typeof LoaderComp> = () => {
  return <LoaderComp />;
};

export const Loader = Template.bind({});
