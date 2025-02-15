"use client";
import React from "react";
import { renderToString } from "react-dom/server";

interface EmailTemplateProps {
  url: string;
  host: string;
  theme: {
    brandColor?: string;
    buttonText?: string;
  };
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ url, host, theme }) => {
  const escapedHost = host.replace(/\./g, "&#8203;.");
  const brandColor = theme.brandColor || "#4F46E5"; // Default to indigo if not provided
  const buttonText = theme.buttonText || "#ffffff";

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Sign in to {host}</title>
        <style>{`
          @media only screen and (max-width: 620px) {
            table.body h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important;
            }
            table.body p,
            table.body ul,
            table.body ol,
            table.body td,
            table.body span,
            table.body a {
              font-size: 16px !important;
            }
            table.body .wrapper,
            table.body .article {
              padding: 10px !important;
            }
            table.body .content {
              padding: 0 !important;
            }
            table.body .container {
              padding: 0 !important;
              width: 100% !important;
            }
            table.body .main {
              border-left-width: 0 !important;
              border-radius: 0 !important;
              border-right-width: 0 !important;
            }
            table.body .btn table {
              width: 100% !important;
            }
            table.body .btn a {
              width: 100% !important;
            }
            table.body .img-responsive {
              height: auto !important;
              max-width: 100% !important;
              width: auto !important;
            }
          }
        `}</style>
      </head>
      <body
        style={{
          backgroundColor: "#f6f6f6",
          fontFamily: "sans-serif",
          fontSize: "14px",
          lineHeight: "1.4",
          margin: 0,
          padding: 0,
          WebkitFontSmoothing: "antialiased",
          WebkitTextSizeAdjust: "100%",
        }}
      >
        <table
          role="presentation"
          border={0}
          cellPadding="0"
          cellSpacing="0"
          className="body"
          style={{
            backgroundColor: "#f6f6f6",
            width: "100%",
          }}
        >
          <tr>
            <td>&nbsp;</td>
            <td
              className="container"
              style={{
                display: "block",
                margin: "0 auto !important",
                maxWidth: "580px",
                padding: "10px",
                width: "580px",
              }}
            >
              <div
                className="content"
                style={{
                  boxSizing: "border-box",
                  display: "block",
                  margin: "0 auto",
                  maxWidth: "580px",
                  padding: "10px",
                }}
              >
                <table
                  role="presentation"
                  className="main"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "3px",
                    width: "100%",
                  }}
                >
                  <tr>
                    <td
                      className="wrapper"
                      style={{
                        boxSizing: "border-box",
                        padding: "20px",
                      }}
                    >
                      <table
                        role="presentation"
                        border={0}
                        cellPadding="0"
                        cellSpacing="0"
                      >
                        <tr>
                          <td>
                            <div
                              style={{
                                textAlign: "center",
                                marginBottom: "20px",
                              }}
                            >
                              {/* Replace with your logo */}
                              <img
                                src="https://via.placeholder.com/150x50.png?text=Your+Logo"
                                alt="Company Logo"
                                style={{ maxWidth: "150px" }}
                              />
                            </div>
                            <h1
                              style={{
                                color: "#000000",
                                fontFamily: "sans-serif",
                                fontWeight: "300",
                                lineHeight: "1.4",
                                margin: 0,
                                marginBottom: "30px",
                                fontSize: "35px",
                                textAlign: "center",
                              }}
                            >
                              Sign in to <strong>{escapedHost}</strong>
                            </h1>
                            <p
                              style={{
                                fontFamily: "sans-serif",
                                fontSize: "14px",
                                fontWeight: "normal",
                                margin: 0,
                                marginBottom: "15px",
                              }}
                            >
                              Hello,
                            </p>
                            <p
                              style={{
                                fontFamily: "sans-serif",
                                fontSize: "14px",
                                fontWeight: "normal",
                                margin: 0,
                                marginBottom: "15px",
                              }}
                            >
                              Please click the button below to sign in to your
                              account:
                            </p>
                            <table
                              role="presentation"
                              border={0}
                              cellPadding="0"
                              cellSpacing="0"
                              className="btn btn-primary"
                              style={{
                                boxSizing: "border-box",
                                width: "100%",
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    style={{
                                      padding: "20px 0",
                                    }}
                                  >
                                    <table
                                      role="presentation"
                                      border={0}
                                      cellPadding="0"
                                      cellSpacing="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style={{
                                              backgroundColor: brandColor,
                                              borderRadius: "5px",
                                              textAlign: "center",
                                            }}
                                          >
                                            <a
                                              href={url}
                                              target="_blank"
                                              style={{
                                                backgroundColor: brandColor,
                                                border:
                                                  "solid 1px " + brandColor,
                                                borderRadius: "5px",
                                                boxSizing: "border-box",
                                                color: buttonText,
                                                cursor: "pointer",
                                                display: "inline-block",
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                margin: 0,
                                                padding: "12px 25px",
                                                textDecoration: "none",
                                                textTransform: "capitalize",
                                              }}
                                            >
                                              Sign In
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <p
                              style={{
                                fontFamily: "sans-serif",
                                fontSize: "14px",
                                fontWeight: "normal",
                                margin: 0,
                                marginBottom: "15px",
                              }}
                            >
                              If you did not request this email, you can safely
                              ignore it.
                            </p>
                            <p
                              style={{
                                fontFamily: "sans-serif",
                                fontSize: "14px",
                                fontWeight: "normal",
                                margin: 0,
                                marginBottom: "15px",
                              }}
                            >
                              Thank you,
                              <br />
                              The {escapedHost} Team
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <div
                  className="footer"
                  style={{
                    clear: "both",
                    marginTop: "10px",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <table
                    role="presentation"
                    border={0}
                    cellPadding="0"
                    cellSpacing="0"
                  >
                    <tr>
                      <td
                        className="content-block"
                        style={{
                          color: "#999999",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                      >
                        <span className="apple-link">
                          Company Inc, 3 Abbey Road, San Francisco CA 94102
                        </span>
                        <br /> Don't like these emails?{" "}
                        <a
                          href="http://i.imgur.com/CScmqnj.gif"
                          style={{
                            color: "#999999",
                            fontSize: "12px",
                            textAlign: "center",
                          }}
                        >
                          Unsubscribe
                        </a>
                        .
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>
  );
};

export function html(params: EmailTemplateProps) {
  return renderToString(<EmailTemplate {...params} />);
}

export function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
