import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="walletAddress">Wallet Address</Label>
        <Input
          id="walletAddress"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter Solana wallet address"
          required
        />
      </div>
      <div>
        <Label htmlFor="minInvestment">Minimum Investment (SOL)</Label>
        <Input
          id="minInvestment"
          type="number"
          value={minInvestment}
          onChange={(e) => setMinInvestment(e.target.value)}
          placeholder="Enter minimum investment"
          required
        />
      </div>
      <div>
        <Label htmlFor="maxInvestment">Maximum Investment (SOL)</Label>
        <Input
          id="maxInvestment"
          type="number"
          value={maxInvestment}
          onChange={(e) => setMaxInvestment(e.target.value)}
          placeholder="Enter maximum investment"
          required
        />
      </div>
      <div>
        <Label htmlFor="exitPercentage">Exit Percentage</Label>
        <Input
          id="exitPercentage"
          type="number"
          value={exitPercentage}
          onChange={(e) => setExitPercentage(e.target.value)}
          placeholder="Enter exit percentage (e.g., 40 for 40%)"
          required
        />
      </div>
      <Button type="submit">Create Bot</Button>
    </form>
  );
};

export default CreateBotForm;
