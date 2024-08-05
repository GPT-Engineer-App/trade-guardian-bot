import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, TrendingUp, ArrowUpDown, Percent, Tag, TestTube } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

const CreateBotForm = ({ onAddBot }) => {
  const [botName, setBotName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [minInvestment, setMinInvestment] = useState('');
  const [maxInvestment, setMaxInvestment] = useState('');
  const [exitPercentage, setExitPercentage] = useState('');
  const [isTestMode, setIsTestMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBot = {
      id: Date.now(),
      name: botName,
      walletAddress,
      minInvestment: parseFloat(minInvestment),
      maxInvestment: parseFloat(maxInvestment),
      exitPercentage: parseFloat(exitPercentage),
      status: isTestMode ? 'testing' : 'active',
    };
    onAddBot(newBot);
    setBotName('');
    setWalletAddress('');
    setMinInvestment('');
    setMaxInvestment('');
    setExitPercentage('');
    setIsTestMode(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="botName" className="text-sm font-bold text-gray-700 flex items-center">
          <Tag className="w-4 h-4 mr-2" />
          Bot Name
        </Label>
        <Input
          id="botName"
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
          placeholder="Enter bot name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="walletAddress" className="text-sm font-bold text-gray-700 flex items-center">
          <Wallet className="w-4 h-4 mr-2" />
          Wallet Address
        </Label>
        <Input
          id="walletAddress"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter Solana wallet address"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minInvestment" className="text-sm font-bold text-gray-700 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Min Investment (SOL)
          </Label>
          <Input
            id="minInvestment"
            type="number"
            value={minInvestment}
            onChange={(e) => setMinInvestment(e.target.value)}
            placeholder="Min"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxInvestment" className="text-sm font-bold text-gray-700 flex items-center">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Max Investment (SOL)
          </Label>
          <Input
            id="maxInvestment"
            type="number"
            value={maxInvestment}
            onChange={(e) => setMaxInvestment(e.target.value)}
            placeholder="Max"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="exitPercentage" className="text-sm font-bold text-gray-700 flex items-center">
            <Percent className="w-4 h-4 mr-2" />
            Exit Percentage
          </Label>
          <Input
            id="exitPercentage"
            type="number"
            value={exitPercentage}
            onChange={(e) => setExitPercentage(e.target.value)}
            placeholder="Exit %"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="test-mode"
          checked={isTestMode}
          onCheckedChange={setIsTestMode}
        />
        <Label htmlFor="test-mode" className="text-sm font-bold text-gray-700 flex items-center">
          <TestTube className="w-4 h-4 mr-2" />
          Test Mode
        </Label>
      </div>
      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
        Create Bot
      </Button>
    </form>
  );
};

export default CreateBotForm;
