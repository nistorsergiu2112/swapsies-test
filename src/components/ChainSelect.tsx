// src/components/ChainSelect.tsx
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { getChains } from '@lifi/sdk';
import { ExtendedChain } from '@lifi/types';

interface ChainSelectProps {
  label: string;
  onChange: (chain: ExtendedChain) => void;
}

const ChainSelect: React.FC<ChainSelectProps> = React.memo(({ label, onChange }) => {
  const [chains, setChains] = useState<ExtendedChain[]>([]);
  const [selectedChainId, setSelectedChainId] = useState<string>("");

  useEffect(() => {
    const fetchChains = async () => {
      try {
        const availableChains = await getChains();
        setChains(availableChains);
      } catch (error) {
        console.error('Error fetching chains:', error);
      }
    };
    fetchChains();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const chainId = event.target.value;
    setSelectedChainId(chainId);
    const selectedChain = chains.find((chain) => chain.id.toString() === String(chainId));
    if (selectedChain) {
      onChange(selectedChain);
    }
  };

  return (
    <TextField
      select
      label={label}
      value={selectedChainId}
      onChange={handleChange}
      fullWidth
    >
      {chains.map((chain) => (
        <MenuItem key={chain.id} value={chain.id}>
          {chain.name}
        </MenuItem>
      ))}
    </TextField>
  );
});

export default ChainSelect;