import database from "infra/database.js";

async function status(req, res) {
  const result = await database.query("Select 1 + 1 AS SUM;");
  console.log(result.rows);

  res
    .status(200)
    .json({ message: "Endpoint de Status sendo acessado com sucessoô" });
  console.log(database);
}

export default status;
