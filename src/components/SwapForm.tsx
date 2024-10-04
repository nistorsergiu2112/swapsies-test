// src/components/SwapForm.tsx
import React, { useState, useCallback } from "react";
import Grid from "@mui/material/Grid2";
import { Button, Alert, CircularProgress, Typography } from "@mui/material";
import ChainSelect from "./ChainSelect";
import TokenSelect from "./TokenSelect";
import AmountInput from "./AmountInput";
import QuoteDisplay from "./QuoteDisplay";
import { getQuote } from "@lifi/sdk";
import { ExtendedChain, Token, LiFiStep, QuoteRequest } from "@lifi/types";
import { parseUnits } from "ethers";
import { useMetaMask } from "../hooks/useMetaMask";
import { SwapHoriz } from "@mui/icons-material";

function SwapForm() {
  const [sourceChain, setSourceChain] = useState<ExtendedChain | null>(null);
  const [sourceToken, setSourceToken] = useState<Token | null>(null);
  const [destinationChain, setDestinationChain] =
    useState<ExtendedChain | null>(null);
  const [destinationToken, setDestinationToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState<LiFiStep | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    account,
    provider,
    error: walletError,
    connectWallet,
  } = useMetaMask();

  const displayError = error || walletError;

  const isFormValid = useCallback(() => {
    return (
      sourceChain &&
      sourceToken &&
      destinationChain &&
      destinationToken &&
      amount &&
      parseFloat(amount) > 0
    );
  }, [sourceChain, sourceToken, destinationChain, destinationToken, amount]);

  const amountToWei = (amount: string, decimals: number) => {
    return parseUnits(amount, decimals).toString();
  };

  const handleGetQuote = useCallback(async () => {
    if (!account) {
      setError("Please connect your wallet.");
      return;
    }

    if (!isFormValid()) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setLoading(true);
    setError("");
    setQuote(null);

    try {
      const quoteRequest: QuoteRequest = {
        fromChain: sourceChain!.id.toString(),
        fromToken: sourceToken!.address,
        fromAddress: account,
        fromAmount: amountToWei(amount, sourceToken!.decimals),
        toChain: destinationChain!.id.toString(),
        toToken: destinationToken!.address,
        toAddress: account,
        slippage: "0.005",
        integrator: "Swapsies",
        allowDestinationCall: true,
      };

      const quoteResponse = await getQuote(quoteRequest);
      setQuote(quoteResponse);
    } catch (err: any) {
      console.error("Error fetching quote:", err);
      setError(err.message || "Failed to fetch quote. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [
    account,
    amount,
    destinationChain,
    destinationToken,
    isFormValid,
    sourceChain,
    sourceToken,
  ]);

  const handleSourceChainChange = useCallback((chain: ExtendedChain | null) => {
    setSourceChain(chain);
  }, []);

  const handleDestinationChainChange = useCallback((chain: ExtendedChain | null) => {
    setDestinationChain(chain);
  }, []);
  
  const handleSourceTokenChange = useCallback((token: Token | null) => {
    setSourceToken(token);
  }, []);

  const handleDestinationTokenChange = useCallback((token: Token | null) => {
    setDestinationToken(token);
  }, []);

  return (
    <>
      {displayError && <Alert severity="error">{displayError}</Alert>}
      <Grid container spacing={2}>
        <Grid size={12} display="flex" justifyContent="flex-end">
          {account ? (
            <Typography variant="subtitle1">
              Connected:{" "}
              {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
            </Typography>
          ) : (
            <Button variant="outlined" onClick={connectWallet}>
              Connect Wallet
            </Button>
          )}
        </Grid>

        <Grid size={12}>
          <ChainSelect label="Source Chain" onChange={handleSourceChainChange} />
        </Grid>
        <Grid size={12}>
          <TokenSelect
            label="Source Token"
            chain={sourceChain}
            onChange={handleSourceTokenChange}
          />
        </Grid>

        <Grid size={12}>
          <ChainSelect
            label="Destination Chain"
            onChange={handleDestinationChainChange}
          />
        </Grid>
        <Grid size={12}>
          <TokenSelect
            label="Destination Token"
            chain={destinationChain}
            onChange={handleDestinationTokenChange}
          />
        </Grid>

        <Grid size={12}>
          <AmountInput value={amount} onChange={setAmount} />
        </Grid>

        <Grid size={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGetQuote}
            disabled={loading || !isFormValid()}
            fullWidth
            sx={{ mt: 2, height: "56px", fontSize: "18px" }}
            startIcon={<SwapHoriz />}
          >
            {loading ? <CircularProgress size={24} /> : "Get Quote"}
          </Button>
        </Grid>

        {quote && (
          <Grid size={12}>
            <QuoteDisplay quote={quote} />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default SwapForm;
