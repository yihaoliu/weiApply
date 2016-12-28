import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import dividerReadmeText from './README';
import dividerCode from '!raw!kr-ui/Divider';

const descriptions = {
  simple: 'Here, `Divider` is used to separate [TextField](/#/components/text-field) components. ' +
  'It defaults to "full-bleed" (full width).',
  inset: 'The `inset` parameter allows the divider to to align with inset content, ' +
  'such as inset [List](/#/components/list) components.',
  menu: '`Divider` can also be used in [Menus](/#/components/menu).',
};

const DividerPage = () => {
  return (
    <div>
      <Title render={(previousTitle) => `Divider - ${previousTitle}`} />
      <MarkdownElement text={dividerReadmeText} />

      <PropTypeDescription code={dividerCode} />
    </div>
  );
};

export default DividerPage;
