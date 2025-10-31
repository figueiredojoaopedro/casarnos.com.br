import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import functions from "../../functions/functions";
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

    const verificationEmailCode = utils.generateEmailVerificationCode();

    if (!verificationEmailCode) {
      throw new Error("Error during email verification code generation.");
    }

    const hashedVerificationEmailCode = await bcrypt.hash(
      verificationEmailCode,
      12
    );

    const insertionResult = await models.insertNewUserAtUsersTable(
      name,
      email,
      hashedPassword,
      hashedVerificationEmailCode
    );

    if (!insertionResult) {
      throw new Error("Error during insertion.");
    }

    const verificationEmailLink = `https://casarnos.com.br/pages/emailVerification?email=${email}`;

    // send email verification code to the user be verified
    const resultSendingEmailVerificationCode =
      await functions.sendVerificationEmail(
        verificationEmailCode,
        email,
        name.split(" ")[0],
        verificationEmailLink
      );

    if (!resultSendingEmailVerificationCode) {
      throw new Error("Error sending the email verification code");
    }

    return NextResponse.json(
      {
        message: "Success!",
        user: email,
        ok: true,
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
          ok: false,
        },
        {
          status: error?.status,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Error during the POST performance.",
        ok: false,
      },
      { status: 500 }
    );
  }
};
