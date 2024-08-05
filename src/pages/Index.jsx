import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BotList from '../components/BotList';
import CreateBotForm from '../components/CreateBotForm';
import { Bot, Plus, Wallet } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const [bots, setBots] = useState([]);
  const [walletBalance, setWalletBalance] = useState(100); // Mock wallet balance
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addBot = (bot) => {
    setBots([...bots, bot]);
    setIsDialogOpen(false);
  };

  const updateBot = (updatedBot) => {
    setBots(bots.map(bot => bot.id === updatedBot.id ? updatedBot : bot));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8">
      <div className="container mx-auto">
        <Card className="w-full max-w-4xl mx-auto shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Bot className="w-12 h-12 text-indigo-600 mr-4" />
                <h1 className="text-3xl font-bold text-indigo-800">Solana Wallet Tracker Bot</h1>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow">
                <Wallet className="w-5 h-5 text-indigo-600 mr-2" />
                <span className="font-semibold text-indigo-800">{walletBalance.toFixed(2)} SOL</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-indigo-800">Your Bots</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsDialogOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" /> New Bot
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <CreateBotForm onAddBot={addBot} />
                  </DialogContent>
                </Dialog>
              </div>
              <BotList bots={bots} onUpdateBot={updateBot} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
