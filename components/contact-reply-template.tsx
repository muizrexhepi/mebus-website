import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Link,
} from "@react-email/components";
import * as React from "react";

interface ContactReplyTemplateProps {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export default function ContactReplyTemplate({
  name,
  email,
  message,
  subject,
}: ContactReplyTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Thank you for contacting GoBusly - We'll be in touch soon!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Thank you for contacting GoBusly!</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>Hi {name},</Text>

            <Text style={paragraph}>
              We've received your message and wanted to confirm that it's safely
              in our inbox. Our support team will review your inquiry and get
              back to you within 24 hours.
            </Text>

            {subject && (
              <Text style={paragraph}>
                <strong>Subject:</strong> {subject}
              </Text>
            )}

            <Section style={messageSection}>
              <Text style={messageHeader}>Your message:</Text>
              <Text style={messageText}>{message}</Text>
            </Section>

            <Hr style={hr} />

            <Text style={paragraph}>In the meantime, feel free to:</Text>

            <Text style={bulletPoint}>
              • Check our{" "}
              <Link href="https://gobusly.com/help/faq" style={link}>
                FAQ section
              </Link>{" "}
              for quick answers
            </Text>
            <Text style={bulletPoint}>
              • Browse available routes on{" "}
              <Link href="https://gobusly.com" style={link}>
                gobusly.com
              </Link>
            </Text>
            <Text style={bulletPoint}>
              • Book your next journey with our easy booking system
            </Text>

            <Text style={paragraph}>
              If you have any urgent questions, you can also reach us directly
              at{" "}
              <Link href="mailto:support@gobusly.com" style={link}>
                support@gobusly.com
              </Link>
            </Text>

            <Text style={paragraph}>
              Safe travels,
              <br />
              The GoBusly Team
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              This email was sent to {email} because you contacted us through
              our website.
            </Text>
            <Text style={footerText}>© 2025 GoBusly. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const header = {
  padding: "32px 24px 24px",
  backgroundColor: "#FF4B6E",
  borderRadius: "8px 8px 0 0",
};

const h1 = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
  textAlign: "center" as const,
};

const content = {
  padding: "24px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  margin: "16px 0",
};

const messageSection = {
  backgroundColor: "#FFF5F6",
  border: "1px solid #FFE1E6",
  borderRadius: "6px",
  padding: "16px",
  margin: "24px 0",
};

const messageHeader = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#666666",
  margin: "0 0 8px 0",
};

const messageText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#333333",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const bulletPoint = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#333333",
  margin: "8px 0",
  paddingLeft: "8px",
};

const link = {
  color: "#FF4B6E",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#e9ecef",
  margin: "32px 0",
};

const footer = {
  padding: "0 24px",
  borderTop: "1px solid #e9ecef",
  paddingTop: "24px",
};

const footerText = {
  fontSize: "12px",
  color: "#666666",
  textAlign: "center" as const,
  margin: "8px 0",
};
