import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { FileText, Plus, Trash2, User } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-sidebar text-sidebar-foreground p-4 flex flex-col">
        <Button className="w-full mb-4 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Novo chat
        </Button>
        <h2 className="text-lg font-semibold mb-2">Chats</h2>
        <div className="flex-1 space-y-2">
          {/* Placeholder for chat history */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <span className="text-sm">Chat antigo {i}</span>
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive cursor-pointer" />
            </div>
          ))}
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
            <Textarea placeholder="Digite a notícia aqui..." rows={6} className="w-full" />
            <Button className="w-full">Analisar a notícia digitada</Button>
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
            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" /> Enviar arquivo para análise
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;