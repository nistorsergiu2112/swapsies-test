# Cross-Chain Swap DApp ( Swapsies )

## Overview

This is a cross-chain swap decentralized application (DApp) built to facilitate seamless token swaps across different blockchain networks. The DApp leverages the [LI.FI SDK](https://docs.li.fi/li.fi-api/) to interact with various decentralized exchanges (DEXs) and bridges to ensure users get the best rates and most reliable routes for their transactions. The application supports cross-chain contract calls, source and destination chain selection, and token compatibility checks, making it a robust solution for multi-chain swaps.

## Features

- **Cross-Chain Token Swaps:** Supports swapping tokens between multiple chains.
- **Integrated Wallets:** Users can connect to the DApp using MetaMask or other supported wallets.
- **Quotes & Gas Estimation:** Fetches quotes and gas estimates in real-time, ensuring accurate information for transactions.
- **Interactive UI:** Clean and responsive UI built with React and MUI for a smooth user experience.

## Tech Stack

- **Frontend Framework:** React
- **UI Library:** MUI (Material-UI)
- **Blockchain Interaction:** ethers.js
- **SDK Integration:** LI.FI SDK
- **State Management:** React Hooks
- **Wallet Integration:** MetaMask
- **Deployment:** Vercel (Hosted on [Vercel](https://vercel.com/)) at (https://swapsies-test.vercel.app)
- **Language:** TypeScript

## Getting Started

Follow these steps to get the project up and running on your local environment.

### Prerequisites

- [Node.js](https://nodejs.org/) (Version 14 or higher)
- [Yarn](https://classic.yarnpkg.com/en/docs/install) or npm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/cross-chain-swap-dapp.git

2. **Navigate to the project directory:**
    cd swapsies

3. **Install dependencies:**
 ```npm install```

### Important Notes

	•	MetaMask Integration: The application is integrated with MetaMask for wallet connection. Ensure MetaMask is installed and connected to your preferred network.
	•	Chain and Token Compatibility: The app uses the LI.FI SDK to fetch token compatibility and supported routes. Make sure to set the correct chains and tokens for smooth operations. The application is not filtering out incompatible chains/tokens yet ( future feature )

    