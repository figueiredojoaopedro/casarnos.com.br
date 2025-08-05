"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {};

type Inputs = {
  name: string;
  value: string;
  placeholder?: string;
  label?: string;
  type?: string;
};

const page = (props: Props) => {
  const [inputs, setInputs] = useState<Inputs[]>([
    {
      name: "name",
      value: "",
      placeholder: "José da Silva",
      label: "Nome",
      type: "text",
    },
    {
      name: "email",
      value: "",
      placeholder: "josedasilva@gmail.com",
      label: "E-mail",
      type: "email",
    },
    {
      name: "password",
      value: "",
      placeholder: "",
      label: "Senha",
      type: "password",
    },
    {
      name: "confirmPassword",
      value: "",
      placeholder: "",
      label: "Confirme a senha",
      type: "password",
    },
  ]);

  const onChangeInputValues = (event: any) => {
    const { name, value } = event.target;

    const inputsReference = inputs.map((input) => {
      if (input.name === name) {
        input.value = value;
      }
      return input;
    });

    setInputs(inputsReference);
  };

  const handleRegister = async () => {
    try {
      console.log("test register");

      const headers = {
        "Content-Type": "application/json",
      };

      const body = JSON.stringify(
        inputs.reduce((acc, curr) => {
          acc[curr.name] = curr.value;
          return acc;
        }, {} as Record<string, string>)
      );
      const config = {
        method: "POST",
        headers,
        body,
      };

      const response = await fetch("/api/v1/controllers/register", config);

      console.log("test", await response.json());
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    <div className="min-h-screen min-w-full flex flex-col justify-center items-start">
      <div className="md:w-1/2 flex flex-col gap-4">
        <div className="w-full p-5 bg-white flex flex-col gap-4">
          <div>
            <h2 className="text-black opacity-50 font-extrabold text-3xl">
              Crie uma conta!
            </h2>
          </div>
          <div>
            {inputs &&
              inputs.map((input, index) => {
                return (
                  <div key={index}>
                    <p className="font-bold">{input.label}</p>
                    <Input
                      onChange={onChangeInputValues}
                      name={input.name}
                      value={input.value}
                      placeholder={input.placeholder}
                      type={input.type}
                    ></Input>
                  </div>
                );
              })}
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <Button
                className="w-full bg-pink-300 hover:bg-indigo-400"
                style={{ cursor: `pointer` }}
                onClick={handleRegister}
              >
                Registrar-se
              </Button>
            </div>
            <div className="min-full">
              <Button className="w-full" style={{ cursor: `pointer` }}>
                Já possui uma conta?
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
