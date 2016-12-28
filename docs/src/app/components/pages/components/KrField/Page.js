import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import checkboxReadmeText from './README';
import AppBarCode from '!raw!kr-ui/AppBar';
import ExampleSimple from './ExampleSimple';
import ExampleSimpleCode from '!raw!./ExampleSimple';

const description = '';

const CheckboxPage = () => (
  <div>
    <Title render={(previousTitle) => `Checkbox - ${previousTitle}`} />

    <MarkdownElement text={checkboxReadmeText} />

    <CodeExample
      title="KrField"
      description={description}
      code={ExampleSimpleCode}
    >
      <ExampleSimple />

    </CodeExample>

    <PropTypeDescription code={AppBarCode} />

  </div>
);

export default CheckboxPage;
