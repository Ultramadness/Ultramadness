import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Section,
} from "@react-email/components";

export default function WelcomeEmail({ email }: { email: string }) {
  return (
    <Html>
      <Head />
      <Preview>¡Bienvenido a Ultramadness!</Preview>

      <Body
        style={{
          fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          backgroundColor: "#0f0f0f",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            padding: "32px 24px",
            backgroundColor: "#1a1a1a",
            margin: "20px auto",
            maxWidth: "600px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Section style={{ marginBottom: "24px" }}>
            <Heading
              style={{
                fontSize: "32px",
                fontWeight: "400",
                marginBottom: "8px",
                fontFamily: '"Crimson Text", Georgia, serif',
              }}
              className="text-primary font-crimson"
            >
              ¡Bienvenido a Ultramadness!
            </Heading>
          </Section>

          <Text
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              color: "#e5e5e5",
              marginBottom: "16px",
            }}
          >
            Hola <b style={{ color: "#e8f5a0" }}>{email}</b>,
          </Text>

          <Text
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              color: "#e5e5e5",
              marginBottom: "16px",
            }}
          >
            Nos emociona tenerte con nosotros. A partir de ahora recibirás las
            últimas novedades sobre nuestros eventos, lanzamientos exclusivos y
            contenido que te conectará con la esencia de la música.
          </Text>

          <Text
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              color: "#e5e5e5",
              marginBottom: "24px",
            }}
          >
            Prepárate para vivir una experiencia inmersiva única.
          </Text>

          <Section
            style={{
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Text
              style={{
                fontSize: "13px",
                color: "#868686",
                lineHeight: "20px",
                margin: 0,
              }}
            >
              Si no fuiste vos quien se registró, podés ignorar este mensaje.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
