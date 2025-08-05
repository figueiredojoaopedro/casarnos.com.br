import { NextResponse } from "next/server";
import db_status from "./db_status";

export const GET = async () => {
  try {
    const max_connections = await db_status.getMaxConnections();

    const opened_connections = await db_status.getOpenedConnections();

    const db_version = await db_status.getDatabaseVersion();

    const body = {
      max_connections,
      opened_connections,
      db_version,
    };

    return NextResponse.json({
      message: "Request performed successfully.",
      body,
    });
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json(
      {
        message: "Error getting the status",
      },
      { status: 500 }
    );
  }
};
