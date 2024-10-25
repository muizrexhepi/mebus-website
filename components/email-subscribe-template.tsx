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
  Link,
} from "@react-email/components";

export const WelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>Welcome to Busly - Your Trusted Travel Partner!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Welcome to Busly!</Heading>
        <Section>
          <Text style={text}>
            Thank you for joining Busly, your go-to platform for booking bus
            tickets seamlessly. We're excited to have you on board!
          </Text>
          <Text style={text}>Here's what you can expect from us:</Text>
          <ul>
            <li style={listItem}>
              Real-time updates on bus schedules and ticket availability
            </li>
            <li style={listItem}>
              Convenient booking options with secure payment methods
            </li>
            <li style={listItem}>
              Exclusive offers and discounts for frequent travelers
            </li>
          </ul>
          <Text style={text}>
            We aim to make your travel experience smoother, and we’re here to
            assist you every step of the way.
          </Text>
        </Section>
        <Hr style={hr} />
        <Section>
          <Text style={footerText}>
            Safe travels,
            <br />
            The Busly Team
          </Text>
          <Text style={footer}>
            If you did not sign up for this, please{" "}
            <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe`}>
              unsubscribe here
            </Link>
            .
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
  borderRadius: "5px",
  maxWidth: "600px",
  margin: "0 auto",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#333333",
  marginBottom: "20px",
  textAlign: "center" as const,
};

const text = {
  fontSize: "16px",
  color: "#444444",
  lineHeight: "24px",
  marginBottom: "20px",
};

const listItem = {
  fontSize: "16px",
  color: "#444444",
  lineHeight: "24px",
  marginBottom: "10px",
};

const footerText = {
  fontSize: "16px",
  color: "#444444",
  marginTop: "20px",
  textAlign: "center" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "30px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "20px",
};

export default WelcomeEmail;
