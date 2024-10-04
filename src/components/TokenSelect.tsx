// src/components/TokenSelect.tsx
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { getTokens } from '@lifi/sdk';
import { Token, ExtendedChain, TokensRequest, TokensResponse } from '@lifi/types';

interface TokenSelectProps {
  label: string;
  chain: ExtendedChain | null;
  onChange: (token: Token) => void;
}

const TokenSelect: React.FC<TokenSelectProps> = React.memo(({ label, chain, onChange }) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedTokenAddress, setSelectedTokenAddress] = useState('');

  useEffect(() => {
    const fetchTokens = async () => {
      if (chain) {
        try {
          const tokensRequest: TokensRequest = { chains: [chain.key] };
          const tokensResponse: TokensResponse = await getTokens(tokensRequest);
          const tokensList = tokensResponse.tokens[chain.id] || [];
          setTokens(tokensList);
        } catch (error) {
          console.error('Error fetching tokens:', error);
        }
      }
    };
    fetchTokens();
  }, [chain]);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const tokenAddress = event.target.value;
  //   setSelectedTokenAddress(tokenAddress);
  //   const selectedToken = tokens.find(
  //     (token) => token.address.toLowerCase() === tokenAddress.toLowerCase()
  //   );
  //   if (selectedToken) {
  //     onChange(selectedToken);
  //   }
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tokenAddress = event.target.value;
    if (tokenAddress !== selectedTokenAddress) {
      setSelectedTokenAddress(tokenAddress);
      const selectedToken = tokens.find(
        (token) => token.address.toLowerCase() === tokenAddress.toLowerCase()
      );
      if (selectedToken) {
        onChange(selectedToken);
      }
    }
  };

  return (
    <TextField
      select
      label={label}
      value={selectedTokenAddress}
      onChange={handleChange}
      fullWidth
      disabled={!chain}
    >
      {tokens.map((token) => (
        <MenuItem key={token.address} value={token.address}>
          {token.symbol}
        </MenuItem>
      ))}
    </TextField>
  );
});

export default TokenSelect;