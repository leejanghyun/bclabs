import { ComponentStory, ComponentMeta } from '@storybook/react';

// Components
import { Card as MICard } from '../components/Atom';

export default {
  title: 'Atom/Card',
  component: MICard,
} as ComponentMeta<typeof MICard>;

export const Card: ComponentStory<typeof MICard> = (args) => <MICard {...args} />;
