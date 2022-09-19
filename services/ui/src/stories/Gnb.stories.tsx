import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import { Gnb as MIGnb } from '@/components/Organism';

export default {
  title: 'Organism/Gnb',
  component: MIGnb,
} as ComponentMeta<typeof MIGnb>;

export const Gnb: ComponentStory<typeof MIGnb> = () => {
  return <MIGnb title='Title' subTitle='sub title'></MIGnb>;
};
