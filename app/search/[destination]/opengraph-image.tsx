import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GoBusly - Bus Booking Platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const formatCityName = (cityEncoded: string) => {
  return decodeURIComponent(cityEncoded)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default async function Image({
  params,
}: {
  params?: { destination?: string };
}) {
  // Handle undefined params with defaults
  const destination = params?.destination || "pristina-tirana";
  const [departureCityEncoded, arrivalCityEncoded] = destination.split("-");
  const departureCity = formatCityName(departureCityEncoded || "pristina");
  const arrivalCity = formatCityName(arrivalCityEncoded || "tirana");

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
          background: "linear-gradient(135deg, #ff6700 0%, #ff007f 100%)",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "white",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            GoBusly
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                fontSize: "96px",
                fontWeight: "bold",
                color: "white",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              {departureCity}
            </div>

            <div
              style={{
                fontSize: "40px",
                color: "white",
              }}
            >
              →
            </div>

            <div
              style={{
                fontSize: "96px",
                fontWeight: "bold",
                color: "white",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              {arrivalCity}
            </div>
          </div>

          <div
            style={{
              fontSize: "20px",
              color: "rgba(255, 255, 255, 0.9)",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Compare & Book Online • Best Prices Guaranteed
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
