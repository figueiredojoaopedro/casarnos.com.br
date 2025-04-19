import React from "react";
import Image from "next/image";
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
      <div className="flex flex-col items-center justify-center my-4 sm:my-8 md:my-10 lg:my-16">
        <div className="flex flex-col items-center justify-center my-4">
          <h3 className="text-center text-3xl md:text-5xl font-extrabold">
            📋{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-rose-400 text-transparent bg-clip-text">
              Podemos fazer isso se tornar realidade!
            </span>{" "}
            💍✨
          </h3>
          <div className="bg-white shadow-sm p-4 mt-8 my-4">
            <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-rose-400 text-transparent bg-clip-text my-6 text-center flex flex-col gap-3 ">
              <span>
                Conheça o Planejador de Casamentos com Inteligência Artificial
                da{" "}
                <span className="underline underline-offset-1">
                  casarnos.com.br
                </span>
              </span>
              <span>
                A solução perfeita para transformar o sonho do seu grande dia em
                realidade, sem estresse!
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-8 p-4 my-4 text-center">
            <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-rose-400 text-transparent bg-clip-text">
              <span className="font-bold">O que a nossa IA faz por você?</span>
            </div>
            <div>
              <h3 className="text-4xl ">⏰💸📝🏪📕✅</h3>
            </div>
            <div className="mx-auto xl:max-w-1/2 grid grid-cols-1 md:grid-cols-2 bg-gradient-to-r from-indigo-400 to-rose-400 text-transparent bg-clip-text list-disc list-inside text-lg font-semibold ">
              <span className="text-lg sm:text-xl md:text-3xl hover:shadow-md p-4 transition-all duration-300 ease-in-out">
                Cria cronogramas personalizados de acordo com o seu estilo,
                orçamento e preferências.
              </span>
              <span className="text-lg sm:text-xl md:text-3xl hover:shadow-md p-4 transition-all duration-300 ease-in-out">
                Sugere fornecedores da mais alta qualidade e reputação para o
                seu casamento.
              </span>
              <span className="text-lg sm:text-xl md:text-3xl hover:shadow-md p-4 transition-all duration-300 ease-in-out">
                Ajuda a criar uma lista de convidados e a calcular o orçamento
                do seu casamento.
              </span>
              <span className="text-lg sm:text-xl md:text-3xl hover:shadow-md p-4 transition-all duration-300 ease-in-out">
                Oferece dicas baseadas no seu estilo, gosto e requisitos.
              </span>
            </div>
          </div>
          <div className="w-full md:w-3/4 flex flex-col gap-6 items-center justify-center py-8 px-4 my-8 bg-white ">
            <div className="w-full md:w-2xl 2xl:w-full">
              <Image
                src="/images/marriage_ceremony_5.jpg"
                alt="casamento3"
                loading="lazy"
                width={1920}
                height={1080}
                className="rounded-sm object-cover hover:shadow-2xl w-full h-auto transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="flex flex-col gap-6 bg-gradient-to-r from-indigo-400 to-rose-400 text-transparent bg-clip-text">
              <h3 className="text-center text-3xl md:text-5xl font-extrabold">
                Experimente agora mesmo!
              </h3>
              <h4 className="text-center font-bold text-xl md:text-3xl">
                Com o Planejador de Casamentos, você pode relaxar e aproveitar
                cada momento do seu grande dia, sabendo que tudo está sob
                controle. Não perca mais tempo e comece a planejar o casamento
                dos seus sonhos agora mesmo!
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Cria cronogramas personalizados de acordo com o seu estilo, orçamento e preferências.
// Oferece dicas baseadas no seu estilo e gosto.
// Sugere fornecedores da mais alta qualidade e reputação para o seu casamento.
// Ajuda a criar uma lista de convidados e a calcular o orçamento do seu casamento.
//

export default Services;
