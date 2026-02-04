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
  Button,
} from "@react-email/components";

import { Markdown } from "@react-email/markdown";

interface CustomCampaignEmailProps {
  title: string;
  body: string; // Markdown content
  imageUrl?: string | null;
  ctaText?: string | null;
  ctaUrl?: string | null;
  disableHtmlWrapper?: boolean;
  previewText?: string;
}

export default function CustomCampaignEmail({
  title = "Novedades de Ultramadness",
  body = "Contenido del email...",
  imageUrl,
  ctaText,
  ctaUrl,
  previewText,
  disableHtmlWrapper = false,
}: CustomCampaignEmailProps) {
  const content = (
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
      {/* Imagen Principal */}
      {imageUrl && (
        <Section style={{ marginBottom: "24px" }}>
          <Img
            src={imageUrl}
            alt={title}
            style={{
              width: "100%",
              borderRadius: "6px",
              objectFit: "cover",
              maxHeight: "300px",
            }}
          />
        </Section>
      )}

      {/* Título */}
      <Heading
        style={{
          fontSize: "32px",
          padding: "16px 0",
          fontWeight: "400",
          fontFamily: '"Crimson Text", Georgia, serif',
          color: "#ffffff",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        {title}
      </Heading>

      {/* Cuerpo (Markdown) */}
      <Section
        style={{
          marginBottom: "32px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            fontSize: "16px",
            lineHeight: "26px",
            color: "#e5e5e5",
          }}
        >
          <Markdown
            markdownCustomStyles={{
              p: { marginBottom: "16px", color: "#e5e5e5" },
              h1: {
                fontSize: "24px",
                color: "#ffffff",
                marginBottom: "16px",
              },
              h2: {
                fontSize: "20px",
                color: "#ffffff",
                marginBottom: "12px",
              },
              ul: { paddingLeft: "20px", marginBottom: "16px" },
              li: {
                marginBottom: "8px",
                color: "#e5e5e5",
                listStyle: "disc",
                marginLeft: "8px",
              },
              link: {
                color: "#ffea13",
                textDecoration: "underline",
              },
              bold: { color: "#ffffff", fontWeight: "600" },
            }}
          >
            {body}
          </Markdown>
        </Text>
      </Section>

      {/* CTA Button */}
      {ctaText && ctaUrl && (
        <Section style={{ textAlign: "center", marginBottom: "32px" }}>
          <Button
            href={ctaUrl}
            style={{
              padding: "14px 28px",
              backgroundColor: "#ffea13",
              color: "#000000",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "4px",
            }}
          >
            {ctaText}
          </Button>
        </Section>
      )}

      {/* Footer */}
      <Section
        style={{
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
        }}
      >
        <Text
          style={{
            fontSize: "13px",
            padding: "16px 0",
            color: "#868686",
            lineHeight: "20px",
            margin: 0,
          }}
        >
          Estás recibiendo este email porque eres parte de la comunidad
          Ultramadness.
        </Text>
      </Section>
    </Container>
  );

  if (disableHtmlWrapper) {
    return (
      <div
        style={{
          backgroundColor: "#121212",
          fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          padding: "20px",
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <Html>
      <Head />
      <Preview>{previewText || title}</Preview>

      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#121212",
          fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {content}
      </Body>
    </Html>
  );
}
