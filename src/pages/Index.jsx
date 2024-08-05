import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BotList from '../components/BotList';
import CreateBotForm from '../components/CreateBotForm';

const Index = () => {
  const [bots, setBots] = useState([]);

  const addBot = (bot) => {
    setBots([...bots, bot]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Solana Wallet Tracker Bot</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Bot</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateBotForm onAddBot={addBot} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Bots</CardTitle>
          </CardHeader>
          <CardContent>
            <BotList bots={bots} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
