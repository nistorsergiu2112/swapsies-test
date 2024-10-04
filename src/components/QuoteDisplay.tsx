// src/components/QuoteDisplay.tsx
import React, { useMemo } from 'react';
import Grid from '@mui/material/Grid2';
import { Typography, Divider } from '@mui/material';
import { formatUnits } from 'ethers';
import { LiFiStep, Token } from '@lifi/types';

interface QuoteDisplayProps {
  quote: LiFiStep;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = React.memo(({ quote }) => {
  const fromToken: Token = quote.action.fromToken;
  const toToken: Token = quote.action.toToken;
  const estimatedTransferTime = quote.estimate.executionDuration; // in seconds

  const estimatedGasFees = useMemo(() => {
    if (quote.estimate.gasCosts) {
      return quote.estimate.gasCosts.reduce((total, gasCost) => {
        return total + BigInt(gasCost.amount || '0');
      }, BigInt(0));
    }
    return BigInt(0);
  }, [quote.estimate.gasCosts]);
  
  const formattedGasFees = useMemo(() => {
    return formatUnits(estimatedGasFees.toString(), fromToken.decimals);
  }, [estimatedGasFees, fromToken.decimals]);
  
  const estimatedReceivedAmount = useMemo(() => {
    return formatUnits(quote.estimate.toAmountMin, toToken.decimals);
  }, [quote.estimate.toAmountMin, toToken.decimals]);

  return (
    <div>
      <Typography variant="h6">Quote Details</Typography>
      <Divider style={{ margin: '16px 0' }} />

      {/* Token Information with Logos */}
      <Grid container alignItems="center" spacing={2}>
        {/* From Token */}
        <Grid size={8} display="flex" alignItems="center">
          {fromToken.logoURI && (
            <img
              src={fromToken.logoURI}
              alt={`${fromToken.symbol} logo`}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
          )}
          <Typography>
            From: {fromToken.symbol} on Chain ID {quote.action.fromChainId}
          </Typography>
        </Grid>

        {/* To Token */}
        <Grid size={8} display="flex" alignItems="center">
          {toToken.logoURI && (
            <img
              src={toToken.logoURI}
              alt={`${toToken.symbol} logo`}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
          )}
          <Typography>
            To: {toToken.symbol} on Chain ID {quote.action.toChainId}
          </Typography>
        </Grid>
      </Grid>

      {/* Additional Quote Details */}
      <Typography>
        Estimated Gas Fees: {formattedGasFees} {fromToken.symbol}
      </Typography>
      <Typography>
        Estimated Transfer Time: {Math.round(estimatedTransferTime / 60)} minutes
      </Typography>
      <Typography>
        Estimated Received Amount: {estimatedReceivedAmount} {toToken.symbol}
      </Typography>
    </div>
  );
});

export default QuoteDisplay;