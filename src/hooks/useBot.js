import { useState, useEffect } from 'react';
import { getWalletTokens, getTokenPrice } from '../services/solanaService';

const useBot = (bot) => {
  const [tokens, setTokens] = useState([]);
  const [trackedToken, setTrackedToken] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      const walletTokens = await getWalletTokens(bot.walletAddress);
      setTokens(walletTokens);
    };

    const interval = setInterval(fetchTokens, 60000); // Check every minute
    fetchTokens();

    return () => clearInterval(interval);
  }, [bot.walletAddress]);

  useEffect(() => {
    if (trackedToken) {
      const checkPrice = async () => {
        const currentPrice = await getTokenPrice(trackedToken.mint);
        if (currentPrice >= trackedToken.entryPrice * (1 + bot.exitPercentage / 100)) {
          console.log(`Exit condition met for ${trackedToken.mint}. Current price: ${currentPrice}`);
          setTrackedToken(null);
        }
      };

      const interval = setInterval(checkPrice, 60000); // Check every minute
      checkPrice();

      return () => clearInterval(interval);
    }
  }, [trackedToken, bot.exitPercentage]);

  useEffect(() => {
    if (!trackedToken && tokens.length > 0) {
      const newToken = tokens.find(token => !trackedToken || token.mint !== trackedToken.mint);
      if (newToken) {
        getTokenPrice(newToken.mint).then(price => {
          setTrackedToken({
            ...newToken,
            entryPrice: price,
          });
          console.log(`New token tracked: ${newToken.mint}. Entry price: ${price}`);
        });
      }
    }
  }, [tokens, trackedToken]);

  return { tokens, trackedToken };
};

export default useBot;
