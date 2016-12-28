import React from 'react';
import Checkbox from 'kr-ui/Checkbox';

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const CheckboxExampleSimple = () => (
  <div style={styles.block}>
    <Checkbox
      label="Simple"
      style={styles.checkbox}
    />
    <Checkbox
      label="Custom icon"
      style={styles.checkbox}
    />
  </div>
);

export default CheckboxExampleSimple;
