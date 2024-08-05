import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, TrendingUp, ArrowUpDown, Percent } from 'lucide-react';

const CreateBotForm = ({ onAddBot }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [minInvestment, setMinInvestment] = useState('');
  const [maxInvestment, setMaxInvestment] = useState('');
  const [exitPercentage, setExitPercentage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBot = {
      id: Date.now(),
      walletAddress,
      minInvestment: parseFloat(minInvestment),
      maxInvestment: parseFloat(maxInvestment),
      exitPercentage: parseFloat(exitPercentage),
      status: 'active',
    };
    onAddBot(newBot);
    setWalletAddress('');
    setMinInvestment('');
    setMaxInvestment('');
    setExitPercentage('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="walletAddress" className="text-sm font-medium text-gray-700 flex items-center">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minInvestment" className="text-sm font-medium text-gray-700 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Minimum Investment (SOL)
          </Label>
          <Input
            id="minInvestment"
            type="number"
            value={minInvestment}
            onChange={(e) => setMinInvestment(e.target.value)}
            placeholder="Enter minimum investment"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxInvestment" className="text-sm font-medium text-gray-700 flex items-center">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Maximum Investment (SOL)
          </Label>
          <Input
            id="maxInvestment"
            type="number"
            value={maxInvestment}
            onChange={(e) => setMaxInvestment(e.target.value)}
            placeholder="Enter maximum investment"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="exitPercentage" className="text-sm font-medium text-gray-700 flex items-center">
          <Percent className="w-4 h-4 mr-2" />
          Exit Percentage
        </Label>
        <Input
          id="exitPercentage"
          type="number"
          value={exitPercentage}
          onChange={(e) => setExitPercentage(e.target.value)}
          placeholder="Enter exit percentage (e.g., 40 for 40%)"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300">
        Create Bot
      </Button>
    </form>
  );
};

export default CreateBotForm;
