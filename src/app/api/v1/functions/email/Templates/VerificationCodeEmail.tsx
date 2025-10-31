import React from "react";

interface VerificationCodeEmailProps {
  name: string;
  code: string;
  link: string;
}

const VerificationCodeEmail: React.FC<VerificationCodeEmailProps> = ({
  name,
  code,
  link,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Casarnos.com.br Verification code</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </head>
      <body
        style={{
          background: "#f4f6f8",
          fontFamily: "Arial,sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{
            maxWidth: "600px",
            margin: "auto",
            background: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "20px",
                  background: "#4f46e5",
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                O seu código de verificação:
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "30px",
                  fontSize: "16px",
                  color: "#333",
                  lineHeight: 1.5,
                }}
              >
                <p style={{ margin: "0 0 16px" }}>Olá {name},</p>
                <p style={{ margin: "0 0 16px" }}>
                  Use o código de verificação abaixo para confirmar o seu
                  endereço de email. Esse código vai expirar em{" "}
                  <strong>15 minutos</strong>.
                </p>
                <div style={{ textAlign: "center", margin: "30px 0" }}>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "32px",
                      letterSpacing: "6px",
                      fontWeight: "bold",
                      color: "#111",
                      background: "#f1f5f9",
                      padding: "14px 28px",
                      borderRadius: "6px",
                    }}
                  >
                    {code}
                  </span>
                </div>
                <p style={{ margin: "0 0 16px" }}>
                  Ou se preferir, aqui está um botão para te redirecionarmos para
                  a página de verificação:
                </p>
                <div style={{ textAlign: "center", margin: "30px 0" }}>
                  <a
                    href={link}
                    target="_blank"
                    style={{
                      display: "inline-block",
                      padding: "14px 28px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#fff",
                      background: "#4f46e5",
                      borderRadius: "6px",
                      textDecoration: "none",
                    }}
                  >
                    Verificar Email
                  </a>
                </div>
                <p style={{ margin: 0 }}>
                  Se você não requisitou isso, você pode ignorar esse email.
                </p>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "20px",
                  textAlign: "center",
                  fontSize: "13px",
                  color: "#999",
                  background: "#f9fafb",
                }}
              >
                &copy; {currentYear} casarnos.com.br. All rights reserved.
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
};

export default VerificationCodeEmail;
