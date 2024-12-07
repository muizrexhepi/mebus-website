import * as React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactReplyTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const ContactReplyTemplate: React.FC<ContactReplyTemplateProps> = ({
  name,
  email,
  message,
}) => (
  <Html>
    <Head />
    <Preview>Thank You for Contacting Us</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>
          Hello {name}, We Received Your Message
        </Heading>
        <Section>
          <Text style={text}>
            Thank you for reaching out to us. We have received your message and
            our support team will review it shortly.
          </Text>
          <Text style={text}>
            <strong>Message Details:</strong>
            <br />
            Name: {name}
            <br />
            Email: {email}
          </Text>
          <Text style={text}>
            Your submitted message:
            <br />
            <div style={messageBox}>{message}</div>
          </Text>
          <Text style={text}>
            We aim to respond to all inquiries within 24-48 hours. If your
            matter is urgent, please feel free to contact our support team
            directly.
          </Text>
        </Section>
        <Hr style={hr} />
        <Section>
          <Text style={footerText}>
            Best regards,
            <br />
            The Support Team
          </Text>
          <Text style={footer}>
            This is an automated confirmation. Please do not reply to this
            email.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: "#f4f4f4",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: "20px",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "8px",
  maxWidth: "600px",
  margin: "0 auto",
};

const heading = {
  fontSize: "26px",
  fontWeight: "bold",
  color: "#333333",
  marginBottom: "20px",
};

const text = {
  fontSize: "16px",
  color: "#555555",
  lineHeight: "1.6",
};

const messageBox = {
  backgroundColor: "#f9f9f9",
  border: "1px solid #e0e0e0",
  borderRadius: "4px",
  padding: "15px",
  marginTop: "10px",
  fontStyle: "italic",
};

const footerText = {
  fontSize: "16px",
  color: "#555555",
  marginTop: "20px",
};

const hr = {
  borderColor: "#dddddd",
  margin: "30px 0",
};

const footer = {
  color: "#898989",
  fontSize: "14px",
  textAlign: "center" as const,
  marginTop: "20px",
};

export default ContactReplyTemplate;
