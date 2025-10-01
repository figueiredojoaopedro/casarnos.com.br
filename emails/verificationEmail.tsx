import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";

export const SlackConfirmEmail = (Link: string) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Confirme o seu endereço de email</Preview>
      <Container style={container}>
        <Heading style={h1}>Confirme o seu endereço de email</Heading>
        <Text style={heroText}>
          Clique no link abaixo para confirmar o cadastro em casarnos.com.br
        </Text>
        <Link></Link>
        <Text style={text}>
          Se você não requisitou esse email, não se preocupe, você pode ignorar
          a mensagem.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default SlackConfirmEmail;
const main = {
  backgroundColor: "#000",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const h1 = {
  color: "#fff",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
  color: "#fff",
};

const codeBox = {
  background: "rgb(0,0,0)",
  borderRadius: "4px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const text = {
  color: "#fff",
  fontSize: "16px",
  lineHeight: "24px",
};
