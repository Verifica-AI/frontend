import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { FileText, Plus, Trash2, User, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ChatItem {
  id: string;
  title: string;
  newsText: string;
  probability: number;
  isFake: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [newsInput, setNewsInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatItem[]>(() => {
    // Initialize chat history from localStorage
    const savedHistory = localStorage.getItem("fake-news-chat-history");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("fake-news-chat-history", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleAnalyze = (text: string) => {
    if (!text.trim()) {
      toast.error("Por favor, digite uma notícia para analisar.");
      return;
    }

    setIsLoading(true);
    toast.loading("Analisando a notícia...", { id: "analysis-toast" });

    setTimeout(() => {
      setIsLoading(false);
      toast.dismiss("analysis-toast");

      const probability = Math.floor(Math.random() * 100);
      const isFake = probability > 50; // Example logic: if probability > 50%, it's fake

      const newChat: ChatItem = {
        id: `chat-${Date.now()}`,
        title: text.substring(0, 20) + (text.length > 20 ? "..." : ""),
        newsText: text,
        probability,
        isFake,
      };

      setChatHistory((prev) => [newChat, ...prev]);
      setCurrentChatId(newChat.id); // Set current chat to the newly analyzed one
      setNewsInput(""); // Clear input after analysis

      navigate("/analysis-result", { state: newChat });
    }, 2000); // Simulate 2-second analysis time
  };

  const handleNewChat = () => {
    setNewsInput("");
    setCurrentChatId(null);
    navigate("/dashboard"); // Navigate back to the dashboard to clear any displayed result
  };

  const handleDeleteChat = (id: string) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== id));
    if (currentChatId === id) {
      setCurrentChatId(null);
      navigate("/dashboard");
    }
    toast.success("Chat removido com sucesso!");
  };

  const handleLoadChat = (chat: ChatItem) => {
    setCurrentChatId(chat.id);
    navigate("/analysis-result", { state: chat });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-sidebar text-sidebar-foreground p-4 flex flex-col">
        <Button
          className="w-full mb-4 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
          onClick={handleNewChat}
        >
          <Plus className="mr-2 h-4 w-4" /> Novo chat
        </Button>
        <h2 className="text-lg font-semibold mb-2">Chats</h2>
        <div className="flex-1 space-y-2 overflow-y-auto">
          {chatHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum chat ainda.</p>
          ) : (
            chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors
                  ${currentChatId === chat.id ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}`}
                onClick={() => handleLoadChat(chat)}
              >
                <span className="text-sm truncate">{chat.title}</span>
                <Trash2
                  className="h-4 w-4 text-muted-foreground hover:text-destructive cursor-pointer ml-2"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering load chat
                    handleDeleteChat(chat.id);
                  }}
                />
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Nome do usuário</span>
            <User className="h-6 w-6" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Envie uma notícia para analisarmos se ela é falsa ou não.</h1>
          
          <div className="space-y-4 mb-6">
            <Textarea
              placeholder="Digite a notícia aqui..."
              rows={6}
              className="w-full"
              value={newsInput}
              onChange={(e) => setNewsInput(e.target.value)}
              disabled={isLoading}
            />
            <Button
              className="w-full"
              onClick={() => handleAnalyze(newsInput)}
              disabled={isLoading || !newsInput.trim()}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Analisar a notícia digitada
            </Button>
          </div>

          <div className="flex items-center my-6">
            <Separator className="flex-1" />
            <span className="px-4 text-muted-foreground">ou</span>
            <Separator className="flex-1" />
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Faça o upload de um arquivo de no máximo 5MB para a análise. (.pdf, .txt ou .docx)
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleAnalyze("Conteúdo do arquivo enviado para análise.")} // Simulate file upload
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <FileText className="mr-2 h-4 w-4" /> Enviar arquivo para análise
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;