import React from "react";
import Image from "next/image";

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: "📋 Planejamento Personalizado",
    description:
      "Crie um plano de casamento sob medida com base nas suas preferências, orçamento e prazos.",
  },
  {
    title: "✅ Gestão de Tarefas e Checklist",
    description:
      "Mantenha-se organizado com uma lista inteligente de tarefas e lembretes automáticos.",
  },
  {
    title: "💰 Otimização do Orçamento",
    description:
      "Acompanhe seus gastos e receba recomendações econômicas para manter tudo dentro do orçamento.",
  },
  {
    title: "📍 Seleção de Fornecedores",
    description:
      "Encontre os melhores espaços, buffets e serviços com base na sua localização e preferências.",
  },
  {
    title: "🎁 Lista de Presentes",
    description:
      "Tenha a sua lista de presentes para os convidados saberem o que você mais deseja.",
  },
  {
    title: "🎟️ Lista de Convidados e Lugares",
    description:
      "Gerencie confirmações de presença e organize os assentos de forma otimizada.",
  },
  {
    title: "🎨 Sugestões de Estilo e Temas",
    description:
      "Descubra inspirações para decoração, cores e vestimentas com tendências atualizadas.",
  },
  {
    title: "🕒 Criação de Cronograma",
    description:
      "Receba um planejamento detalhado do dia do casamento para que tudo ocorra sem imprevistos.",
  },
  {
    title: "🤖 Assistente de Dúvidas e Suporte",
    description:
      "Obtenha respostas e orientações sobre qualquer aspecto do produto.",
  },
];

const FeatureCard = React.memo(
  ({ feature, isLarge }: { feature: Feature; isLarge: boolean }) => (
    <div
      className={`transition duration-200 ease-in-out hover:scale-102 px-3 py-2 lg:px-6 lg:py-4 bg-white rounded-2xl shadow-lg flex flex-col items-center text-center justify-center gap-4 border-4 border-b-8 border-rose-300 ${
        isLarge
          ? "col-span-1 md:col-span-2 row-span-1 md:row-span-2"
          : "col-span-1"
      }`}
    >
      <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  )
);

FeatureCard.displayName = "FeatureCard";

const Services = () => {
  return (
    <section
      id="services"
      className=" mx-auto py-8 sm:py-10 md:py-16 lg:py-20 h-full w-full flex flex-col items-center justify-center space-y-10"
    >
      <div className="text-center flex flex-col items-center justify-center sm:space-y-4 md:space-y-8">
        <div className="bg-gradient-to-r from-indigo-300 to-rose-300 text-transparent bg-clip-text px-2 md:px-10 py-2 md:py-6 z-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold">
            Imagine um casamento perfeito...
          </h2>
        </div>
        <div className="grid grid-flow-col grid-cols-1 md:grid-cols-2 grid-rows-2 gap-2 overflow-y-auto">
          <div className="col-span-1 hidden sm:block">
            <Image
              src="/images/marriage_ceremony_1.jpg"
              alt="casamento1"
              loading="lazy"
              width={500}
              height={500}
              className="rounded-sm object-cover h-full"
            />
          </div>
          <div className="col-span-1 hidden sm:block">
            <Image
              src="/images/marriage_ceremony_3.jpg"
              alt="casamento2"
              loading="lazy"
              width={500}
              height={500}
              className="rounded-sm object-cover h-full"
            />
          </div>
          <div className="col-span-1 row-span-2">
            <Image
              src="/images/marriage_ceremony_2.jpeg"
              alt="casamento3"
              loading="lazy"
              width={500}
              height={500}
              className="rounded-sm object-cover h-full"
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              isLarge={
                index === 0 ||
                index === 3 ||
                index === 4 ||
                index === features.length - 1
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
