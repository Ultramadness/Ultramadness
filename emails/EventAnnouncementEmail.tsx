import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Img,
} from "@react-email/components";

export default function EventAnnouncementEmail({
  title,
  description,
  date,
  image,
}: {
  title: string;
  description: string;
  date: string;
  image: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Nuevo evento de Ultramadness — No te lo pierdas</Preview>

      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#121212",
          fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <Container
          style={{
            padding: "32px 24px",
            backgroundColor: "#1a1a1a",
            margin: "20px auto",
            maxWidth: "600px",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "6px",
          }}
        >
          {/* Imagen del evento */}
          <Section style={{ marginBottom: "24px" }}>
            <Img
              src={image}
              alt="Imagen del evento"
              style={{
                width: "100%",
                borderRadius: "6px",
                objectFit: "cover",
              }}
            />
          </Section>

          {/* Título del evento */}
          <Heading
            style={{
              fontSize: "32px",
              fontWeight: "400",
              fontFamily: '"Crimson Text", Georgia, serif',
              color: "#ffffff",
              marginBottom: "12px",
            }}
          >
            {title}
          </Heading>

          {/* Fecha */}
          <Text
            style={{
              fontSize: "16px",
              color: "#e8f502",
              fontWeight: "600",
              marginBottom: "16px",
            }}
          >
            📅 {date}
          </Text>

          {/* Descripción */}
          <Text
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              color: "#e5e5e5",
              marginBottom: "24px",
            }}
          >
            {description}
          </Text>

          {/* CTA */}
          <Section style={{ marginTop: "24px", textAlign: "center" }}>
            <a
              href="https://ultramadness.com/eventos"
              style={{
                display: "inline-block",
                padding: "14px 28px",
                backgroundColor: "#e8f502",
                color: "#000",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "4px",
              }}
            >
              Conseguí tus entradas
            </a>
          </Section>

          {/* Footer */}
          <Section
            style={{
              marginTop: "32px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
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
              Recibís este email porque estás suscrito al newsletter de
              Ultramadness. Si no querés recibir más anuncios, podés darte de
              baja.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
