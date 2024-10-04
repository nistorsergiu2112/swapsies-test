// src/hooks/useMetaMask.ts
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useMetaMask() {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [error, setError] = useState<string>('');

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const newProvider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await newProvider.send('eth_requestAccounts', []);
        const userAccount = accounts[0];
        setProvider(newProvider);
        setAccount(userAccount);
        setError('');
      } catch (err) {
        console.error('Error connecting wallet:', err);
        setError('Failed to connect wallet.');
      }
    } else {
      setError('MetaMask is not installed.');
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });

      window.ethereum.on('chainChanged', (_chainId: string) => {
        // To be added later for improvement
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  return { account, provider, error, connectWallet };
}