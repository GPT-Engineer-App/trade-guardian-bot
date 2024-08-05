import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BotList from '../components/BotList';
import CreateBotForm from '../components/CreateBotForm';

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Solana Wallet Tracker Bot</h1>
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create Bot</TabsTrigger>
          <TabsTrigger value="active">Active Bots</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Bot</CardTitle>
            </CardHeader>
            <CardContent>
              <CreateBotForm onAddBot={addBot} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Bots</CardTitle>
            </CardHeader>
            <CardContent>
              <BotList bots={bots} onUpdateBotStatus={updateBotStatus} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
