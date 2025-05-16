
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Trash2, Send } from 'lucide-react';
import { sendChatMessage } from '@/utils/api';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message to chat
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // For development testing, we'll use a simulated response
      // In production, uncomment the API call
      
      // Simulate API call for development
      setTimeout(() => {
        const botResponse: Message = {
          role: 'assistant',
          content: 'This is a simulated response. In a real implementation, this would come from the FastAPI backend connecting to Azure OpenAI API.',
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
        setIsLoading(false);
      }, 1000);
      
      // Actual API call - uncomment for production use
      // const response = await sendChatMessage([...messages, userMessage]);
      // setMessages((prevMessages) => [...prevMessages, response.message]);
      // setIsLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast({
      title: 'Chat cleared',
      description: 'All messages have been removed.',
    });
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-[#EC0016]">UBS Chat Assistant</h1>
        </div>
        <Button 
          variant="outline" 
          onClick={clearChat}
          className="flex items-center gap-2 border-[#EC0016] text-[#EC0016] hover:bg-[#EC0016] hover:text-white"
        >
          <Trash2 size={16} />
          Clear Chat
        </Button>
      </header>
      <Separator className="bg-gray-200 mb-4" />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-xl mb-2">Welcome to UBS Chat Assistant</p>
            <p className="text-sm">Ask any question about UBS history and services</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Card
                className={`p-3 max-w-[80%] ${
                  msg.role === 'user'
                    ? 'bg-[#EC0016] text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </Card>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <Card className="p-3 bg-gray-100">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1 border-gray-300 focus-visible:ring-[#EC0016]"
        />
        <Button 
          type="submit" 
          disabled={isLoading || !input.trim()} 
          className="bg-[#EC0016] hover:bg-[#d00015]"
        >
          <Send size={18} />
        </Button>
      </form>

      {/* Footer */}
      <footer className="mt-4 text-xs text-gray-500 text-center">
        <p>UBS Chat Assistant © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default ChatInterface;
