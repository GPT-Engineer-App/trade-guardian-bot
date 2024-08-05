import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useBot } from '../hooks/useBot';
import { Activity, DollarSign, Percent, Wallet } from 'lucide-react';

const BotList = ({ bots, onUpdateBotStatus }) => {
  return (
    <div className="space-y-6">
      {bots.map((bot) => (
        <BotCard key={bot.id} bot={bot} onUpdateBotStatus={onUpdateBotStatus} />
      ))}
    </div>
  );
};

const BotCard = ({ bot, onUpdateBotStatus }) => {
  const { tokens, trackedToken } = useBot(bot);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-red-500';
      case 'testing': return 'bg-yellow-500';
      default: return 'bg-gray-500';
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
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">{bot.name || `Bot ${bot.id}`}</span>
            <span className="text-sm opacity-75">({bot.walletAddress.slice(0, 6)}...{bot.walletAddress.slice(-4)})</span>
          </div>
          <Badge className={`${getStatusColor(bot.status)} text-white`}>
            {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-indigo-600" />
            <span className="text-sm text-gray-600">Investment: {bot.minInvestment} - {bot.maxInvestment} SOL</span>
          </div>
          <div className="flex items-center">
            <Percent className="w-5 h-5 mr-2 text-indigo-600" />
            <span className="text-sm text-gray-600">Exit: {bot.exitPercentage}%</span>
          </div>
          <div className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-indigo-600" />
            <span className="text-sm text-gray-600">Tokens: {tokens.length}</span>
          </div>
        </div>
        {trackedToken && (
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <h4 className="font-semibold mb-2">Tracked Token</h4>
            <p className="text-sm text-gray-600 mb-1">Token: {trackedToken.mint.slice(0, 6)}...{trackedToken.mint.slice(-4)}</p>
            <p className="text-sm text-gray-600 mb-1">Entry: ${trackedToken.entryPrice.toFixed(4)}</p>
            <p className="text-sm text-gray-600 mb-2">Current: ${(trackedToken.currentPrice || trackedToken.entryPrice).toFixed(4)}</p>
            <Progress value={calculateProgress()} className="w-full h-2" />
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStatusChange(bot.status === 'active' ? 'inactive' : 'active')}
            className="border-indigo-500 text-indigo-500 hover:bg-indigo-50"
          >
            {bot.status === 'active' ? 'Deactivate' : 'Activate'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStatusChange('testing')}
            className="border-yellow-500 text-yellow-500 hover:bg-yellow-50"
          >
            Test Run
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotList;
