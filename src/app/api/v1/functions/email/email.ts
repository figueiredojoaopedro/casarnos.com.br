import { Resend } from "resend";
import Templates from "./Templates/Templates";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailConfig {
  from: string;
  to: string[] | string;
  subject: string;
  react: any;
}

const sendVerificationEmail = async (
  code: string,
  email: string,
  name: string,
  link: string
): Promise<boolean> => {
  try {
    const config: EmailConfig = {
      from: "suporte-do-not-reply@casarnos.com.br",
      to: [email],
      subject: "Casarnos.com.br - Verificação de Email",
      react: Templates.VerificationCodeEmail({ code, name, link }),
    };

    const { data, error } = await resend.emails.send(config);

    if (error) {
      throw new Error(error?.message || "Houve um erro ao enviar o email.");
    }

    console.info(`E-mail data`, data);

    return true;
  } catch (error) {
    console.error("Error: ", error);
    return false;
  }
};

export default { sendVerificationEmail: sendVerificationEmail };
