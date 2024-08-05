import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BotList from '../components/BotList';
import CreateBotForm from '../components/CreateBotForm';
import { Bot } from 'lucide-react';

const Index = () => {
  const [bots, setBots] = useState([]);

  const addBot = (bot) => {
    setBots([...bots, bot]);
  };

  const updateBotStatus = (botId, newStatus) => {
    setBots(bots.map(bot => 
      bot.id === botId ? { ...bot, status: newStatus } : bot
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Bot className="w-12 h-12 text-indigo-600 mr-4" />
          <h1 className="text-4xl font-bold text-indigo-800">Solana Wallet Tracker Bot</h1>
        </div>
        <Card className="w-full max-w-4xl mx-auto shadow-xl">
          <CardContent className="p-0">
            <Tabs defaultValue="bots" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-t-lg bg-indigo-100">
                <TabsTrigger value="create" className="data-[state=active]:bg-white py-3">Create Bot</TabsTrigger>
                <TabsTrigger value="bots" className="data-[state=active]:bg-white py-3">Bots</TabsTrigger>
              </TabsList>
              <div className="p-6">
                <TabsContent value="create">
                  <CardTitle className="text-2xl font-semibold mb-4 text-indigo-800">Create New Bot</CardTitle>
                  <CreateBotForm onAddBot={addBot} />
                </TabsContent>
                <TabsContent value="bots">
                  <CardTitle className="text-2xl font-semibold mb-4 text-indigo-800">All Bots</CardTitle>
                  <BotList bots={bots} onUpdateBotStatus={updateBotStatus} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
