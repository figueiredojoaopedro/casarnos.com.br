import database from "@/app/infra/database";
const databaseName = process.env.POSTGRES_DB;

const getMaxConnections = async (): Promise<number | null> => {
  try {
    const maxConnections = (
      await database.query(
        `SELECT name, setting as max FROM pg_settings WHERE name = 'max_connections';`
      )
    )?.rows[0].max;

    return parseInt(maxConnections);
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

const getDatabaseVersion = async (): Promise<string | null> => {
  try {
    const databaseVersion = (
      await database.query(
        "SELECT setting as version FROM pg_settings WHERE name = 'server_version';"
      )
    )?.rows[0]?.version;

    return databaseVersion;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

const getOpenedConnections = async (): Promise<number | null> => {
  try {
    const openedConnections = (
      await database.query(
        `SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;`,
        [databaseName]
      )
    )?.rows[0]?.count;

    return openedConnections;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

export default { getMaxConnections, getOpenedConnections, getDatabaseVersion };
