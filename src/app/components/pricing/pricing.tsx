"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isMonthly?: boolean;
  badge?: string;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Mensal",
    price: "R$ 15,90",
    description:
      "Não tem 50 reais para o planejamento? Tudo bem, veja como funciona por apenas 9,90 no mês!",
    features: [
      "Checklist de planejamento",
      "Lista de convidados (até 100)",
      "Calculadora de orçamento",
      "Lista de Presentes",
      "Lista de Convidados e Lugares",
      "Sugestões de Estilo e Temas",
      "Sugestões de fornecedores",
    ],
    isMonthly: true,
  },
  {
    name: "Pague uma vez",
    price: "R$ 59,90",
    description: "Ideal para casamentos médios e elaborados",
    features: [
      "Todas as features do plano Mensal",
      "Lista de convidados (até 500)",
      "Cronograma detalhado",
      "Análise de tendências no seu email",
    ],
    badge: "Mais Popular",
    popular: true,
  },
];

const PricingCard = ({ tier, index }: { tier: PricingTier; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card
      className={`relative ${
        tier.popular
          ? "border-rose-300 shadow-lg shadow-rose-100"
          : "border-gray-200"
      }`}
    >
      {tier.badge && (
        <Badge
          className="text-white absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-rose-500"
          variant="secondary"
        >
          {tier.badge}
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-rose-500 bg-clip-text text-transparent">
          {tier.name}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {tier.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold">{tier.price}</span>
          <span className="text-gray-500">/mês</span>
        </div>
        <ul className="space-y-3">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-rose-500" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full ${
            tier.popular
              ? "bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600"
              : "bg-gray-900 hover:bg-gray-800"
          }`}
        >
          Começar Agora
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const Pricing = () => {
  return (
    <section className="py-10 md:py-14 ">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <span className="text-rose-500 font-medium text-lg">
            Planos e Preços
          </span>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 to-rose-500 bg-clip-text text-transparent">
            Escolha o plano ideal
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Oferecemos diferentes opções para atender às necessidades
            específicas do seu casamento
          </p>
        </motion.div>

        <div
          className={`grid grid-cols-1 md:grid-cols-${pricingTiers.length} gap-8`}
        >
          {pricingTiers.map((tier, index) => (
            <PricingCard key={index} tier={tier} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
