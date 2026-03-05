import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  const responseBefore = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );
  expect(responseBefore.status).toBe(201);

  const responseBeforeBody = await responseBefore.json();

  expect(Array.isArray(responseBeforeBody)).toBe(true);
  expect(responseBeforeBody.length).toBeGreaterThan(0);

  // Verificar o pós
  const responseAfter = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(responseAfter.status).toBe(200);

  const responseAfterBody = await responseAfter.json();

  expect(Array.isArray(responseAfterBody)).toBe(true);
  expect(responseAfterBody.length).toBe(0);
});
