import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AnalysisResult = () => {
  const location = useLocation();
  const { newsText, probability, isFake } = location.state || {
    newsText: "Esta é uma notícia de exemplo para análise.",
    probability: Math.floor(Math.random() * 100), // Random probability
    isFake: Math.random() > 0.5, // Random fake status
  };

  const resultColor = isFake ? "text-red-600" : "text-green-600";
  const resultText = isFake ? "Falsa" : "Verdadeira";

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Resultado da Análise</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Notícia Analisada</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-left text-gray-700 dark:text-gray-300 italic">"{newsText}"</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Probabilidade de ser Notícia {resultText}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-5xl font-extrabold ${resultColor} mb-4`}>{probability}%</p>
            <p className="text-lg text-gray-800 dark:text-gray-200">
              Esta notícia é <span className={`font-bold ${resultColor}`}>{resultText}</span> com {probability}% de certeza.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Análise Detalhada</CardTitle>
          </CardHeader>
          <CardContent className="text-left space-y-4">
            <p>
              A análise textual revelou padrões comuns em notícias falsas, como o uso de linguagem sensacionalista e a falta de fontes verificáveis. Termos como "chocante", "inacreditável" e "exclusivo" foram identificados, o que é um forte indicador de desinformação.
            </p>
            <p>
              Além disso, a estrutura da frase e a gramática apresentaram inconsistências que são frequentemente observadas em conteúdos gerados sem revisão profissional. A ausência de links para estudos ou reportagens originais também contribui para a baixa credibilidade.
            </p>
            <p>
              Recomendamos sempre verificar a fonte da informação e buscar por outras reportagens sobre o mesmo tema em veículos de comunicação confiáveis.
            </p>
          </CardContent>
        </Card>

        <Link to="/dashboard">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AnalysisResult;