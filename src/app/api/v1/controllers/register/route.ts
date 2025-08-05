import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import models from "../../models/models";
import utils from "../../utils/utils";

export const POST = async (req: NextRequest) => {
  try {
    const requestBody = await req.json();

    const { name, email, password, confirmPassword } = requestBody;

    if (!name || !email || !password || !confirmPassword) {
      console.error("Missing mandatory parameters.");
      return NextResponse.json(
        { message: "Missing mandatory parameters." },
        { status: 400 }
      );
    }

    // basic validation to see if the email is really an email.
    if (!utils.emailValidationWithRegex(email)) {
      console.error("Invalid email format.");
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      console.error("Password and confirmation password provided diverge!");
      return NextResponse.json(
        {
          message: "Password and confirmation password provided diverge!",
        },
        {
          status: 400,
        }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const insertionResult = await models.insertNewUserAtUsersTable(
      name,
      email,
      hashedPassword
    );

    if (!insertionResult) {
      throw new Error("Error during insertion.");
    }

    console.log("test insertionResult", insertionResult);

    return NextResponse.json(
      {
        message: "Success! ",
        user: email,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error("Error: ", error);

    // conflict error
    if (error?.status === 409) {
      return NextResponse.json(
        {
          message: error?.message,
        },
        {
          status: error?.status,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Error during the POST performance.",
      },
      { status: 500 }
    );
  }
};
