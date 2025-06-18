import { Client } from "pg";
type SSLObj = {
  rejectUnauthorized: boolean;
  ca?: string;
};

const getSSLValues = (): SSLObj | boolean => {
  if (process.env.POSTGRES_CA) {
    return {
      rejectUnauthorized: true,
    };
  }
  return false;
};

const query = async (text: string, params?: any[]) => {
  if (!text) {
    console.error("Missing text param.");
    return null;
  }

  const clientConfig = {
    host: process.env.POSTGRES_HOSTS,
    port: process.env.POSTGRES_PORT
      ? parseInt(process.env.POSTGRES_PORT, 10)
      : undefined,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: getSSLValues(),
  };

  const client = new Client(clientConfig);

  try {
    await client.connect();

    const result = await client.query(text, params);

    return result;
  } catch (error) {
    console.error("Error: ", error);
    throw {
      message: "Error making the query",
    };
  } finally {
    client.end();
  }
};

export default {
  query,
};
