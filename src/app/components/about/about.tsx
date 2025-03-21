import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface QuestionAnswerType {
  question: string;
  answer: string;
}

const questionsAnswers: QuestionAnswerType[] = [];
const About = () => {
  return (
    <section className="w-full pb-20 pt-16 flex flex-col items-center justify-center space-y-4">
      <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-500 to-rose-500 text-transparent bg-clip-text px-2 md:px-10 py-2 md:py-6 z-10">
        Perguntas Frequentes
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          {questionsAnswers.map((obj, index) => (
            <></>
          ))}
          <AccordionTrigger className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-rose-500 text-transparent bg-clip-text">
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default About;
