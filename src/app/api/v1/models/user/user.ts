import database from "@/app/infra/database";

const getUserTokenHashAndTokenExpiresAtByEmail = async (email: string) => {
  try {
    if (!email) {
      throw new Error("Email is a mandatory parameter");
    }

    const text = `SELECT token_hash, token_expires_at FROM users WHERE email = $1;`;

    const values = [email];

    const result = await database.query(text, values);

    return result?.rows?.[0];
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

const updateUserEmailVerified = async (email: string, isVerified: boolean) => {
  try {
    if (!email || !isVerified) {
      throw new Error("Email and isVefied are mandatory parameters.");
    }

    const text = `UPDATE users SET is_verified = $1 WHERE email = $2 RETURNING email;`;

    const values = [isVerified, email];

    const result = await database.query(text, values);

    return result?.rows?.[0];
  } catch (error) {
    return null;
  }
};

const updateUserVerificationCode = async (
  email: string,
  hashed_email_verification_code: string
) => {
  try {
    if (!email || !hashed_email_verification_code) {
      throw new Error("Email and hash are mandatory parameters");
    }

    const text = `
      UPDATE users
      SET token_hash = $1, token_expires_at = (now() AT TIME ZONE 'utc') + INTERVAL '15 minutes', attempts = attempts + 1
      WHERE email = $2
      RETURNING email
    `;

    const values = [hashed_email_verification_code, email];

    const result = await database.query(text, values);

    return result?.rows?.[0];
  } catch (error) {
    console.error("Error updating user verification code:", error);
    return null;
  }
};

const selectTokenExpirationDate = async (email: string) => {
  try {
    if (!email) {
      throw new Error("Email is a mandatory parameter");
    }

    const text = `
      SELECT token_expires_at
      FROM users
      WHERE email = $1
    `;

    const values = [email];

    const result = await database.query(text, values);

    const tokenExpiresAt = result?.rows?.[0]?.token_expires_at;

    return tokenExpiresAt;
  } catch (error) {
    console.error(
      "Error checking if user can resend verification code:",
      error
    );
    return null;
  }
};

const insertNewUserAtUsersTable = async (
  name: string,
  email: string,
  hashedPassword: string,
  hashed_email_verification_code: string
) => {
  try {
    if (!name || !email || !hashedPassword || !hashed_email_verification_code) {
      throw new Error(
        "name, email, hashedPassword, hashed_email_verification_code are mandatory parameters"
      );
    }

    const text = `
      INSERT INTO users (name, email, password, created_at, token_hash)
      VALUES ($1, $2, $3, now() AT TIME ZONE 'utc', $4)
      RETURNING email, created_at
    `;

    const values = [
      name,
      email,
      hashedPassword,
      hashed_email_verification_code,
    ];

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

export default {
  updateUserVerificationCode,
  insertNewUserAtUsersTable,
  selectTokenExpirationDate,
  getUserTokenHashAndTokenExpiresAtByEmail,
  updateUserEmailVerified,
};
