"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type Props = {};

type Templates = {
  template1: string;
  template2: string;
  template3: string;
};

const page = (props: Props) => {
  const [names, setNames] = useState("John & Mary");
  const [date, setDate] = useState("June 15, 2025");
  const [location, setLocation] = useState("Central Park, NY");
  const [template, setTemplate] = useState<keyof Templates>("template1");

  const templates: Templates = {
    template1: "bg-blue-100 text-gray-800 border border-blue-300",
    template2: "bg-pink-100 text-gray-800 border border-pink-300",
    template3: "bg-green-100 text-gray-800 border border-green-300",
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customize Your Invitation</h1>

      <div className="mb-4">
        <label className="block mb-1">Couple's Names:</label>
        <input
          type="text"
          value={names}
          onChange={(e) => setNames(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Date:</label>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Select a Template:</label>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value as keyof Templates)}
          className="border p-2 w-full"
        >
          <option value="template1">Blue Theme</option>
          <option value="template2">Pink Theme</option>
          <option value="template3">Green Theme</option>
        </select>
      </div>

      <div className={`p-6 text-center rounded-lg ${templates[template]}`}>
        <h2 className="text-xl font-semibold">{names}</h2>
        <p className="mt-2">Invite you to their wedding</p>
        <p className="mt-2 font-bold">{date}</p>
        <p className="mt-1">{location}</p>
      </div>

      <Button>Test me</Button>
    </div>
  );
};

export default page;
