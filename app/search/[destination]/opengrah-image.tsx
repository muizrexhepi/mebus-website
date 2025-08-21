// app/search/[destination]/opengraph-image.tsx
import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Helper function to format city names
const formatCityName = (cityEncoded: string) => {
  return decodeURIComponent(cityEncoded)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Image generation
export default async function Image({
  params,
}: {
  params: { destination: string };
}) {
  const { destination } = params;
  const [departureCityEncoded, arrivalCityEncoded] = destination.split("-");
  const departureCity = formatCityName(departureCityEncoded);
  const arrivalCity = formatCityName(arrivalCityEncoded);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          position: "relative",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(120, 113, 245, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(120, 113, 245, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 113, 245, 0.05) 0%, transparent 50%)
            `,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
            color: "#7871f5",
            fontSize: "32px",
            fontWeight: "bold",
          }}
        >
          🚌 GoBusly
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "900px",
            padding: "0 80px",
            position: "relative",
          }}
        >
          {/* From city */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#7871f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                boxShadow: "0 10px 30px rgba(120, 113, 245, 0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                }}
              >
                📍
              </div>
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: "36px",
                fontWeight: "bold",
                textAlign: "center",
                maxWidth: "300px",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              {departureCity}
            </div>
          </div>

          {/* Connection line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "40px",
              transform: "translateX(-50%)",
              width: "300px",
              height: "4px",
              background:
                "linear-gradient(90deg, #7871f5 0%, #a855f7 50%, #7871f5 100%)",
              borderRadius: "2px",
              boxShadow: "0 0 20px rgba(120, 113, 245, 0.4)",
            }}
          >
            {/* Arrow */}
            <div
              style={{
                position: "absolute",
                right: "-8px",
                top: "-6px",
                width: "0",
                height: "0",
                borderLeft: "12px solid #7871f5",
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                filter: "drop-shadow(0 0 8px rgba(120, 113, 245, 0.4))",
              }}
            />

            {/* Bus icon in the middle */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "-20px",
                transform: "translateX(-50%)",
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
              }}
            >
              🚌
            </div>
          </div>

          {/* To city */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#7871f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                boxShadow: "0 10px 30px rgba(120, 113, 245, 0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                }}
              >
                🏁
              </div>
            </div>
            <div
              style={{
                color: "#ffffff",
                fontSize: "36px",
                fontWeight: "bold",
                textAlign: "center",
                maxWidth: "300px",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              {arrivalCity}
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "60px",
            color: "#94a3b8",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "8px",
              color: "#ffffff",
            }}
          >
            Compare & Book Bus Tickets
          </div>
          <div
            style={{
              fontSize: "18px",
            }}
          >
            Best prices • Daily departures • Comfortable journey
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
