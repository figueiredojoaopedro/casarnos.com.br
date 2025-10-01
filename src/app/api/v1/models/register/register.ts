import database from "@/app/infra/database";

const insertNewUserAtUsersTable = async (
  name: string,
  email: string,
  hashedPassword: string,
  email_verification_code: string
) => {
  try {
    const text = `
      INSERT INTO users (name, email, password, created_at, email_verification_code)
      VALUES ($1, $2, $3, NOW(), $4)
      RETURNING email, created_at
    `;

    const values = [name, email, hashedPassword, email_verification_code];

    const result = await database.query(text, values);

    const newUser = result?.rows?.[0];

    return newUser;
  } catch (error: any) {
    if (error?.code === "23505") {
      throw {
        message: "Email already in use.",
        status: 409, // conflict
      };
    }

    return null;
  }
};

export default { insertNewUserAtUsersTable };
