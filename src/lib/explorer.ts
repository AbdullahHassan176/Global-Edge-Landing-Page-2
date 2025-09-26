/**
 * Blockchain explorer URL helpers
 * Uses @global/tokens-contracts chain adapter if available
 */

// Chain ID to explorer mapping
const EXPLORER_URLS: Record<number, string> = {
  // Ethereum Mainnet
  1: 'https://etherscan.io',
  // Ethereum Goerli
  5: 'https://goerli.etherscan.io',
  // Ethereum Sepolia
  11155111: 'https://sepolia.etherscan.io',
  // Polygon Mainnet
  137: 'https://polygonscan.com',
  // Polygon Mumbai
  80001: 'https://mumbai.polygonscan.com',
  // BSC Mainnet
  56: 'https://bscscan.com',
  // BSC Testnet
  97: 'https://testnet.bscscan.com',
  // Arbitrum One
  42161: 'https://arbiscan.io',
  // Arbitrum Goerli
  421613: 'https://goerli.arbiscan.io',
  // Optimism Mainnet
  10: 'https://optimistic.etherscan.io',
  // Optimism Goerli
  420: 'https://goerli-optimism.etherscan.io',
};

/**
 * Get transaction URL for a given chain ID and transaction hash
 */
export function getTxUrl(chainId: number, txHash: string): string {
  const baseUrl = EXPLORER_URLS[chainId];
  if (!baseUrl) {
    console.warn(`No explorer URL found for chain ID: ${chainId}`);
    return `https://etherscan.io/tx/${txHash}`; // Fallback to Etherscan
  }
  return `${baseUrl}/tx/${txHash}`;
}

/**
 * Get address URL for a given chain ID and address
 */
export function getAddressUrl(chainId: number, addr: string): string {
  const baseUrl = EXPLORER_URLS[chainId];
  if (!baseUrl) {
    console.warn(`No explorer URL found for chain ID: ${chainId}`);
    return `https://etherscan.io/address/${addr}`; // Fallback to Etherscan
  }
  return `${baseUrl}/address/${addr}`;
}

/**
 * Get block URL for a given chain ID and block number
 */
export function getBlockUrl(chainId: number, blockNumber: number): string {
  const baseUrl = EXPLORER_URLS[chainId];
  if (!baseUrl) {
    console.warn(`No explorer URL found for chain ID: ${chainId}`);
    return `https://etherscan.io/block/${blockNumber}`; // Fallback to Etherscan
  }
  return `${baseUrl}/block/${blockNumber}`;
}

/**
 * Get token URL for a given chain ID and token address
 */
export function getTokenUrl(chainId: number, tokenAddress: string): string {
  const baseUrl = EXPLORER_URLS[chainId];
  if (!baseUrl) {
    console.warn(`No explorer URL found for chain ID: ${chainId}`);
    return `https://etherscan.io/token/${tokenAddress}`; // Fallback to Etherscan
  }
  return `${baseUrl}/token/${tokenAddress}`;
}

/**
 * Get chain name for a given chain ID
 */
export function getChainName(chainId: number): string {
  const chainNames: Record<number, string> = {
    1: 'Ethereum',
    5: 'Ethereum Goerli',
    11155111: 'Ethereum Sepolia',
    137: 'Polygon',
    80001: 'Polygon Mumbai',
    56: 'BSC',
    97: 'BSC Testnet',
    42161: 'Arbitrum One',
    421613: 'Arbitrum Goerli',
    10: 'Optimism',
    420: 'Optimism Goerli',
  };
  
  return chainNames[chainId] || `Chain ${chainId}`;
}

/**
 * Check if a chain ID is supported
 */
export function isChainSupported(chainId: number): boolean {
  return chainId in EXPLORER_URLS;
}

/**
 * Get all supported chain IDs
 */
export function getSupportedChainIds(): number[] {
  return Object.keys(EXPLORER_URLS).map(Number);
}
