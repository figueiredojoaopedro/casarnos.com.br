"use client";

import React, { useEffect, useState } from "react";

type Props = {};
interface StatusObject {
  max_connections: number | null;
  opened_connections: number | null;
  db_version: string | null;
}
const status = (props: Props) => {
  const [status, setStatus] = useState<StatusObject>({
    max_connections: 0,
    opened_connections: 0,
    db_version: "",
  });

  useEffect(() => {
    // call the function only if the user is admin...
    getStatus();
  }, []);

  const getStatus = async (): Promise<void> => {
    try {
      const headers = {
        "Content-Type": "Application/json",
      };
      const config = {
        headers,
      };

      const url = `/api/v1/controllers/health`;

      const result = await fetch(url, config);

      if (!result.ok) {
        throw new Error("There is something wrong! Try it again.");
      }

      const resultJson = (await result.json()).body;

      console.log("test resultJson", resultJson);

      setStatus({
        ...status,
        db_version: resultJson.db_version,
        max_connections: resultJson.max_connections,
        opened_connections: resultJson.opened_connections,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div>
        <h1>Status:</h1>
        <p>Max Connections: {status.max_connections || ""}</p>
        <p>Opened Connections: {status.opened_connections || null}</p>
        <p>Database version: {status.db_version || null}</p>
      </div>
    </div>
  );
};

export default status;
