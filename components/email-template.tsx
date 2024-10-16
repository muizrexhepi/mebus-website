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

interface EmailTemplateProps {
  companyName: string;
  contactName: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  companyName,
  contactName,
}) => (
  <Html>
    <Head />
    <Preview>Partner Application Acknowledgment</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>
          Thank You for Applying, {contactName}!
        </Heading>
        <Section>
          <Text style={text}>
            We have successfully received your partner application on behalf of{" "}
            <strong>{companyName}</strong>. Our team will review your
            submission, and we will contact you shortly to discuss the next
            steps.
          </Text>
          <Text style={text}>
            In the meantime, feel free to reach out to us if you have any
            questions.
          </Text>
        </Section>
        <Hr style={hr} />
        <Section>
          <Text style={footerText}>
            Best regards,
            <br />
            The Partnership Team
          </Text>
          <Text style={footer}>
            This email is generated automatically—please do not reply.
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

const footerText = {
  fontSize: "16px",
  color: "#555555",
  marginTop: "20px",
};

const hr = {
  borderColor: "#dddddd",
  margin: "30px 0",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  padding: "17px 0 0",
  margin: "0",
  textAlign: "center" as const,
};

const footer = {
  color: "#898989",
  fontSize: "14px",
  textAlign: "center" as const,
  marginTop: "20px",
};

export default EmailTemplate;
