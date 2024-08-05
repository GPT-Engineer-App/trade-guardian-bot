import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useBot from '../hooks/useBot';

const BotList = ({ bots }) => {
  return (
    <div className="space-y-4">
      {bots.map((bot) => (
        <BotCard key={bot.id} bot={bot} />
      ))}
    </div>
  );
};

const BotCard = ({ bot }) => {
  const { tokens, trackedToken } = useBot(bot);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bot {bot.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Wallet:</strong> {bot.walletAddress}</p>
        <p><strong>Min Investment:</strong> {bot.minInvestment} SOL</p>
        <p><strong>Max Investment:</strong> {bot.maxInvestment} SOL</p>
        <p><strong>Exit Percentage:</strong> {bot.exitPercentage}%</p>
        <p><strong>Status:</strong> {trackedToken ? 'Tracking' : 'Waiting'}</p>
        {trackedToken && (
          <div>
            <p><strong>Tracked Token:</strong> {trackedToken.mint}</p>
            <p><strong>Entry Price:</strong> {trackedToken.entryPrice.toFixed(4)}</p>
          </div>
        )}
        <p><strong>Wallet Tokens:</strong> {tokens.length}</p>
      </CardContent>
    </Card>
  );
};

export default BotList;
