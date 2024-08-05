import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useBot } from '../hooks/useBot';

const BotList = ({ bots, onUpdateBotStatus }) => {
  return (
    <div className="space-y-4">
      {bots.map((bot) => (
        <BotCard key={bot.id} bot={bot} />
      ))}
    </div>
  );
};

const BotCard = ({ bot, onUpdateBotStatus }) => {
  const { tokens, trackedToken } = useBot(bot);

  const getStatusIndicator = (status) => {
    switch (status) {
      case 'active': return '🟢';
      case 'inactive': return '🔴';
      case 'testing': return '🟡';
      default: return '⚪';
    }
  };

  const handleStatusChange = (newStatus) => {
    onUpdateBotStatus(bot.id, newStatus);
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
          <span>Bot {bot.id} {getStatusIndicator(bot.status)}</span>
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange(bot.status === 'active' ? 'inactive' : 'active')}
              className="mr-2"
            >
              {bot.status === 'active' ? 'Deactivate' : 'Activate'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange('testing')}
            >
              Test Run
            </Button>
          </div>
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
