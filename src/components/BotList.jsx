import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useBot } from '../hooks/useBot';
import { Activity, DollarSign, Percent, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BotList = ({ bots, onUpdateBot }) => {
  return (
    <div className="space-y-6">
      {bots.length === 0 ? (
        <p className="text-center text-gray-500">No bots created yet. Create a new bot to get started!</p>
      ) : (
        bots.map((bot) => (
          <BotCard key={bot.id} bot={bot} onUpdateBot={onUpdateBot} />
        ))
      )}
    </div>
  );
};

const BotCard = ({ bot, onUpdateBot }) => {
  const { tokens, trackedToken } = useBot(bot);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBot, setEditedBot] = useState(bot);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-red-500';
      case 'testing': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleStatusChange = (newStatus) => {
    const updatedBot = { ...bot, status: newStatus };
    onUpdateBot(updatedBot);
  };

  const handleSettingsChange = (e) => {
    setEditedBot({ ...editedBot, [e.target.name]: e.target.value });
  };

  const saveSettings = () => {
    onUpdateBot(editedBot);
    setIsEditing(false);
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
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">{bot.name || `Bot ${bot.id}`}</span>
            <Badge className={`${getStatusColor(bot.status)} text-white`}>
              {bot.status.charAt(0).toUpperCase() + bot.status.slice(1)}
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange(bot.status === 'active' ? 'inactive' : 'active')}
              className={`${bot.status === 'active' ? 'border-red-500 text-red-500 hover:bg-red-50' : 'border-green-500 text-green-500 hover:bg-green-50'}`}
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
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-indigo-500 text-indigo-500 hover:bg-indigo-50">
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </Button>
              </DialogTrigger>
              <DialogContent>
                <h3 className="text-lg font-semibold mb-4">Edit Bot Settings</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Bot Name</Label>
                    <Input id="name" name="name" value={editedBot.name} onChange={handleSettingsChange} />
                  </div>
                  <div>
                    <Label htmlFor="minInvestment">Min Investment (SOL)</Label>
                    <Input id="minInvestment" name="minInvestment" type="number" value={editedBot.minInvestment} onChange={handleSettingsChange} />
                  </div>
                  <div>
                    <Label htmlFor="maxInvestment">Max Investment (SOL)</Label>
                    <Input id="maxInvestment" name="maxInvestment" type="number" value={editedBot.maxInvestment} onChange={handleSettingsChange} />
                  </div>
                  <div>
                    <Label htmlFor="exitPercentage">Exit Percentage</Label>
                    <Input id="exitPercentage" name="exitPercentage" type="number" value={editedBot.exitPercentage} onChange={handleSettingsChange} />
                  </div>
                  <Button onClick={saveSettings} className="w-full">Save Changes</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
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
      </CardContent>
    </Card>
  );
};

export default BotList;
