"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {};

const Navbar = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-300 to-rose-300 shadow-md fixed w-full z-50">
      <div className="px-6 py-4 flex justify-between items-center">
        <Link href={`/`} className="w-full">
          <p className="text-white w-min hover:opacity-75 font-bold hover:underline hover:underline-offset-4">
            {"casarnos.com.br"}
          </p>
        </Link>
        <div className="text-white hidden md:flex space-x-6 items-center">
          <Link className="hover:underline hover:underline-offset-4" href={"/"}>
            Home
          </Link>
          <Link
            className="hover:underline hover:underline-offset-4"
            href={"/pages/services"}
          >
            Serviços
          </Link>
          <Link
            className="hover:underline hover:underline-offset-4"
            href={"/pages/about"}
          >
            Sobre
          </Link>
          <Link href={"/register"}>
            <Button className="bg-rose-400 hover:bg-rose-300 transition duration-150 ease-in-out">
              Comece já
            </Button>
          </Link>
          <Link href={"/login"}>
            <Button className="text-black" variant="outline">
              Login
            </Button>
          </Link>
        </div>
        <div className="md:hidden text-gray-700" aria-label="Toggle menu">
          <Button onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>
      <div>
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 items-center justify-center bg-white p-4">
            <Link href={"/"}>Home</Link>
            <Link href={"/pages/services"}>Serviços</Link>
            <Link href={"/pages/about"}>Sobre</Link>
            <Link href={"/register"}>
              <Button className="bg-rose-400 transition duration-150 ease-in-out">
                Comece já
              </Button>
            </Link>
            <Link href={"/login"}>
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
