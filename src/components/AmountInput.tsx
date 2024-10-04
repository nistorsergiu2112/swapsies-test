// src/components/AmountInput.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
}

const AmountInput: React.FC<AmountInputProps> = React.memo(({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = event.target.value;
    onChange(amount);
  };

  return (
    <TextField
      label="Amount"
      value={value}
      onChange={handleChange}
      type="number"
      fullWidth
    />
  );
});

export default AmountInput;