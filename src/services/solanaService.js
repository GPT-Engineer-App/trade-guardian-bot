import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import Decimal from 'decimal.js';

const connection = new Connection('https://api.devnet.solana.com');

export const getWalletTokens = async (walletAddress) => {
  const pubKey = new PublicKey(walletAddress);
  const tokens = await connection.getParsedTokenAccountsByOwner(pubKey, {
    programId: TOKEN_PROGRAM_ID,
  });

  return tokens.value.map((accountInfo) => ({
    mint: accountInfo.account.data.parsed.info.mint,
    amount: new Decimal(accountInfo.account.data.parsed.info.tokenAmount.amount)
      .div(Math.pow(10, accountInfo.account.data.parsed.info.tokenAmount.decimals))
      .toNumber(),
  }));
};

export const getTokenPrice = async (tokenMint) => {
  // This is a placeholder. In a real-world scenario, you'd need to integrate with a price feed service.
  // For demonstration purposes, we're returning a random price between 0.01 and 10.
  return (Math.random() * 9.99 + 0.01).toFixed(4);
};
