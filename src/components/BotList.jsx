import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useBot } from '../hooks/useBot';

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Tracking': return 'bg-green-500';
      case 'Waiting': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateProgress = () => {
    if (trackedToken) {
      const currentPrice = trackedToken.currentPrice || trackedToken.entryPrice;
      const targetPrice = trackedToken.entryPrice * (1 + bot.exitPercentage / 100);
      return ((currentPrice - trackedToken.entryPrice) / (targetPrice - trackedToken.entryPrice)) * 100;
    }
    return 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Bot {bot.id}
          <Badge className={getStatusColor(trackedToken ? 'Tracking' : 'Waiting')}>
            {trackedToken ? 'Tracking' : 'Waiting'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Wallet:</strong> {bot.walletAddress.slice(0, 6)}...{bot.walletAddress.slice(-4)}</p>
        <p><strong>Investment Range:</strong> {bot.minInvestment} - {bot.maxInvestment} SOL</p>
        <p><strong>Exit Percentage:</strong> {bot.exitPercentage}%</p>
        {trackedToken && (
          <div className="mt-4">
            <p><strong>Tracked Token:</strong> {trackedToken.mint.slice(0, 6)}...{trackedToken.mint.slice(-4)}</p>
            <p><strong>Entry Price:</strong> ${trackedToken.entryPrice.toFixed(4)}</p>
            <p><strong>Current Price:</strong> ${(trackedToken.currentPrice || trackedToken.entryPrice).toFixed(4)}</p>
            <div className="mt-2">
              <Progress value={calculateProgress()} className="w-full" />
            </div>
          </div>
        )}
        <p className="mt-4"><strong>Wallet Tokens:</strong> {tokens.length}</p>
      </CardContent>
    </Card>
  );
};

export default BotList;
