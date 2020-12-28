import React from 'react'
import { ControlLabel, FormControl, FormGroup } from 'rsuite';

const TextField = (props) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <FormGroup>
      <ControlLabel>{label}</ControlLabel>
      <FormControl name={name} accepter={accepter} {...rest} />
    </FormGroup>
  );
}

export default TextField