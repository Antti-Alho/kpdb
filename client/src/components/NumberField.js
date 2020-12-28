import React, { useState } from 'react'
import { InputNumber } from 'rsuite';

const NumberField = React.forwardRef((props, ref) => {
  const { value: valueProp, defalutValue, onChange } = props;
  const [number, setNumber] = useState(defalutValue);
  const value = typeof valueProp !== "undefined" ? valueProp : number;

  return (
    <InputNumber
      value={value}
      onChange={(v) => {
        onChange(v)
        setNumber(v)
      }}
      postfix="€"
      step={0.01} />
  );
});

export default NumberField