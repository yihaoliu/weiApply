import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import checkboxReadmeText from './README';
import checkboxCode from '!raw!kr-ui/Checkbox';
import CheckboxExampleSimple from './ExampleSimple';
import checkboxExampleSimpleCode from '!raw!./ExampleSimple';

const description = 'checkbox 复选框';

const CheckboxPage = () => (
  <div>
    <Title render={(previousTitle) => `Checkbox - ${previousTitle}`} />

    <MarkdownElement text={checkboxReadmeText} />

    <CodeExample
      title="Checkbox"
      description={description}
      code={checkboxExampleSimpleCode}
    >
      <CheckboxExampleSimple />

    </CodeExample>

    <PropTypeDescription code={checkboxCode} />

  </div>
);

export default CheckboxPage;
