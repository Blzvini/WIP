import database from "infra/database.js";

async function status(req, res) {
  const updatedAt = new Date().toISOString();

  const databaseVersion = await database.query("SHOW server_version;");

  const databaseMaxConnections = await database.query("SHOW max_connections;");
  const maxConnectionsResult = parseInt(
    databaseMaxConnections.rows[0].max_connections,
  );

  const databaseName = process.env.POSTGRES_DB;
  const currentConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnections = currentConnections.rows[0].count;

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version_postgres: databaseVersion.rows[0],
        max_connections: maxConnectionsResult,
        current_connections: databaseOpenedConnections,
      },
    },
  });
  console.log(database);
}

export default status;
