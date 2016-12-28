import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import checkboxReadmeText from './README';
import ButtonCode from '!raw!kr-ui/KrDate';
import ExampleSimple from './ExampleSimple';
import ExampleSimpleCode from '!raw!./ExampleSimple';

const description = '';

const CheckboxPage = () => (
  <div>
    <Title render={(previousTitle) => `Checkbox - ${previousTitle}`} />

    <MarkdownElement text={checkboxReadmeText} />

    <CodeExample
      title="KrDate"
      description={description}
      code={ExampleSimpleCode}
    >
      <ExampleSimple />

    </CodeExample>

    <PropTypeDescription code={ButtonCode} />

  </div>
);

export default CheckboxPage;
