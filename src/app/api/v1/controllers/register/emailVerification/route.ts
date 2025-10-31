import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import functions from "../../../functions/functions";
import models from "../../../models/models";
import utils from "../../../utils/utils";

export const GET = async (req: NextRequest) => {
  try {
    const userEmail = req.nextUrl.searchParams.get("email");
    const userName = "novamente"; // a mais pura RTA

    if (!userEmail) {
      console.error("Missing email");
      return NextResponse.json({ message: "Missing email" }, { status: 400 });
    }

    if (!utils.emailValidationWithRegex(userEmail)) {
      console.error("Invalid email format");
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    const tokenExpirationRecord =
      await models.selectTokenExpirationDate(userEmail);

    if (tokenExpirationRecord) {
      const nowMs = new Date().getTime();
      const cooldownMs = 2 * 60 * 1000; // 2 minutes

      const tokenGeneratedAtMs =
        new Date(tokenExpirationRecord + "Z").getTime() - 15 * 60 * 1000;

      const timeSinceGenerationMs = nowMs - tokenGeneratedAtMs;

      if (timeSinceGenerationMs < cooldownMs) {
        const secondsLeft = Math.ceil(
          (cooldownMs - timeSinceGenerationMs) / 1000
        );
        const message = `Please wait ${secondsLeft} more seconds before requesting a new code.`;
        console.error(message);
        return NextResponse.json({ message }, { status: 429 });
      }
    }

    const emailVerificationCode = utils.generateEmailVerificationCode();

    if (!emailVerificationCode) {
      console.error("Unable to create new code, try again later.");
      return NextResponse.json(
        { message: "Unable to create new code, try again later." },
        { status: 500 }
      );
    }

    const hashedEmailVerificationCode = await bcrypt.hash(
      emailVerificationCode,
      12
    );

    const updateResult = await models.updateUserVerificationCode(
      userEmail,
      hashedEmailVerificationCode
    );

    if (!updateResult) {
      console.error("Unable to create new code, try again later.");
      return NextResponse.json(
        {
          message: "Unable to create new code, try again later.",
        },
        { status: 500 }
      );
    }

    const verificationEmailLink = `https://casarnos.com.br/pages/emailVerification?email=${userEmail}`;

    const sendResult = await functions.sendVerificationEmail(
      emailVerificationCode,
      userEmail,
      userName,
      verificationEmailLink
    );

    if (!sendResult) {
      console.error(
        "Verification code was not sent. Please, try again in 2 minutes"
      );
      return NextResponse.json(
        {
          message:
            "Verification code was not sent. Please, try again in 2 minutes",
        },
        { status: 500 }
      );
    }

    console.info("Verification code sent again", userEmail);

    return NextResponse.json(
      { message: "Verification code sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json(
      { message: "Houve um erro ao buscar o novo código" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const requestBody = await req.json();

    if (!requestBody.email || !requestBody.code) {
      return NextResponse.json(
        { message: "Email and code are required" },
        { status: 400 }
      );
    }

    const userToken = await models.getUserTokenHashAndTokenExpiresAtByEmail(
      requestBody.email
    );

    if (!userToken) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // making time verification
    const now = new Date().getTime();
    const timestampVerificationCodeExpiration = new Date(
      userToken.token_expires_at + "Z"
    ).getTime();

    if (!userToken.token_expires_at) {
      return NextResponse.json(
        {
          message: "Code expiring date is unavailable.",
        },
        { status: 500 }
      );
    }

    if (now > timestampVerificationCodeExpiration) {
      return NextResponse.json(
        {
          message:
            "Token provided is too old, try again by generating a new one",
        },
        { status: 400 }
      );
    }

    const codesMatch = await bcrypt.compare(
      requestBody.code,
      userToken.token_hash
    );

    if (!codesMatch) {
      return NextResponse.json({ message: "Invalid code" }, { status: 400 });
    }

    const updateResult = await models.updateUserEmailVerified(
      requestBody.email,
      true
    );

    if (!updateResult) {
      return NextResponse.json(
        {
          message: "Unable to save verification result, try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json(
      {
        message: "Houve um erro ao verificar o código.",
      },
      { status: 500 }
    );
  }
};
