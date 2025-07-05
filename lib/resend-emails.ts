"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface AbandonedCheckoutEmailData {
  email: string;
  firstName: string;
  fromCity: string;
  toCity: string;
  departureDate: string;
  totalPrice: number;
  currency: string;
  sessionId: string;
  isFirstEmail: boolean;
  language?: string; // Add language support
}

// Translation system
const translations = {
  en: {
    subject: {
      first: "Your booking is waiting - {fromCity} to {toCity}",
      final: "Final reminder: Complete your {fromCity} to {toCity} booking",
    },
    header: {
      title: "Don't miss your journey!",
      subtitle: "Your booking is waiting for you",
    },
    greeting: "Hello {firstName}!",
    message:
      "Don't worry, we saved it for you. Plus, as a new customer, you get <strong>10% off your first order!</strong>",
    discount: {
      title: "You get 10% OFF!",
      subtitle: "Use this code at checkout",
      label: "COUPON CODE",
      copy: "Click to copy",
    },
    booking: {
      departureDate: "Departure Date",
      travelDay: "Travel Day",
      totalPrice: "Total Price",
    },
    urgency:
      "<strong>Limited seats available!</strong> Prices may increase soon.",
    cta: "Checkout Now →",
    benefits: {
      comfort: {
        title: "Premium Comfort",
        desc: "Modern buses with AC, WiFi, and comfortable seating",
      },
      booking: {
        title: "Easy Booking",
        desc: "Simple online booking process with instant confirmation",
      },
      secure: {
        title: "100% Secure",
        desc: "Your payment and personal data are fully protected",
      },
      flexible: {
        title: "Flexible Options",
        desc: "Easy rescheduling and cancellation policies",
      },
    },
    footer: {
      help: "<strong>Need help?</strong> Our customer support team is available 24/7 to assist you.",
      security:
        "This secure booking link expires in 24 hours for your protection.",
      brand: "GoBusly",
      tagline: "Connecting destinations, creating memories",
      support: "Get Support",
      contact: "Contact Us",
      unsubscribe: "Unsubscribe",
      copyright: "© {year} GoBusly. All rights reserved.",
    },
  },
  es: {
    subject: {
      first: "Tu reserva te está esperando - {fromCity} a {toCity}",
      final: "Recordatorio final: Completa tu reserva de {fromCity} a {toCity}",
    },
    header: {
      title: "¡No te pierdas tu viaje!",
      subtitle: "Tu reserva te está esperando",
    },
    greeting: "¡Hola {firstName}!",
    message:
      "No te preocupes, lo guardamos para ti. Además, como nuevo cliente, ¡obtén <strong>10% de descuento en tu primera compra!</strong>",
    discount: {
      title: "¡Obtén 10% de DESCUENTO!",
      subtitle: "Usa este código al pagar",
      label: "CÓDIGO DE CUPÓN",
      copy: "Haz clic para copiar",
    },
    booking: {
      departureDate: "Fecha de Salida",
      travelDay: "Día de Viaje",
      totalPrice: "Precio Total",
    },
    urgency:
      "<strong>¡Asientos limitados disponibles!</strong> Los precios pueden aumentar pronto.",
    cta: "Pagar Ahora →",
    benefits: {
      comfort: {
        title: "Comodidad Premium",
        desc: "Autobuses modernos con aire acondicionado, WiFi y asientos cómodos",
      },
      booking: {
        title: "Reserva Fácil",
        desc: "Proceso de reserva online simple con confirmación instantánea",
      },
      secure: {
        title: "100% Seguro",
        desc: "Tu pago y datos personales están completamente protegidos",
      },
      flexible: {
        title: "Opciones Flexibles",
        desc: "Políticas fáciles de reprogramación y cancelación",
      },
    },
    footer: {
      help: "<strong>¿Necesitas ayuda?</strong> Nuestro equipo de soporte está disponible 24/7 para asistirte.",
      security:
        "Este enlace seguro de reserva expira en 24 horas para tu protección.",
      brand: "GoBusly",
      tagline: "Conectando destinos, creando memorias",
      support: "Obtener Soporte",
      contact: "Contáctanos",
      unsubscribe: "Darse de baja",
      copyright: "© {year} GoBusly. Todos los derechos reservados.",
    },
  },
  fr: {
    subject: {
      first: "Votre réservation vous attend - {fromCity} vers {toCity}",
      final:
        "Dernier rappel : Complétez votre réservation {fromCity} vers {toCity}",
    },
    header: {
      title: "Ne ratez pas votre voyage !",
      subtitle: "Votre réservation vous attend",
    },
    greeting: "Bonjour {firstName} !",
    message:
      "Ne vous inquiétez pas, nous l'avons sauvegardé pour vous. De plus, en tant que nouveau client, vous obtenez <strong>10% de réduction sur votre première commande !</strong>",
    discount: {
      title: "Vous obtenez 10% de RÉDUCTION !",
      subtitle: "Utilisez ce code lors du paiement",
      label: "CODE PROMO",
      copy: "Cliquez pour copier",
    },
    booking: {
      departureDate: "Date de Départ",
      travelDay: "Jour de Voyage",
      totalPrice: "Prix Total",
    },
    urgency:
      "<strong>Places limitées disponibles !</strong> Les prix peuvent augmenter bientôt.",
    cta: "Payer Maintenant →",
    benefits: {
      comfort: {
        title: "Confort Premium",
        desc: "Bus modernes avec climatisation, WiFi et sièges confortables",
      },
      booking: {
        title: "Réservation Facile",
        desc: "Processus de réservation en ligne simple avec confirmation instantanée",
      },
      secure: {
        title: "100% Sécurisé",
        desc: "Votre paiement et vos données personnelles sont entièrement protégés",
      },
      flexible: {
        title: "Options Flexibles",
        desc: "Politiques de report et d'annulation faciles",
      },
    },
    footer: {
      help: "<strong>Besoin d'aide ?</strong> Notre équipe de support client est disponible 24h/24 et 7j/7 pour vous aider.",
      security:
        "Ce lien de réservation sécurisé expire dans 24 heures pour votre protection.",
      brand: "GoBusly",
      tagline: "Connecter les destinations, créer des souvenirs",
      support: "Obtenir de l'aide",
      contact: "Nous contacter",
      unsubscribe: "Se désabonner",
      copyright: "© {year} GoBusly. Tous droits réservés.",
    },
  },
  de: {
    subject: {
      first: "Ihre Buchung wartet - {fromCity} nach {toCity}",
      final:
        "Letzte Erinnerung: Vervollständigen Sie Ihre Buchung {fromCity} nach {toCity}",
    },
    header: {
      title: "Verpassen Sie Ihre Reise nicht!",
      subtitle: "Ihre Buchung wartet auf Sie",
    },
    greeting: "Hallo {firstName}!",
    message:
      "Keine Sorge, wir haben es für Sie gespeichert. Außerdem erhalten Sie als Neukunde <strong>10% Rabatt auf Ihre erste Bestellung!</strong>",
    discount: {
      title: "Sie erhalten 10% RABATT!",
      subtitle: "Verwenden Sie diesen Code beim Checkout",
      label: "GUTSCHEINCODE",
      copy: "Klicken zum Kopieren",
    },
    booking: {
      departureDate: "Abfahrtsdatum",
      travelDay: "Reisetag",
      totalPrice: "Gesamtpreis",
    },
    urgency:
      "<strong>Begrenzte Plätze verfügbar!</strong> Die Preise können bald steigen.",
    cta: "Jetzt Bezahlen →",
    benefits: {
      comfort: {
        title: "Premium-Komfort",
        desc: "Moderne Busse mit Klimaanlage, WLAN und bequemen Sitzen",
      },
      booking: {
        title: "Einfache Buchung",
        desc: "Einfacher Online-Buchungsprozess mit sofortiger Bestätigung",
      },
      secure: {
        title: "100% Sicher",
        desc: "Ihre Zahlung und persönlichen Daten sind vollständig geschützt",
      },
      flexible: {
        title: "Flexible Optionen",
        desc: "Einfache Umbuchungs- und Stornierungsrichtlinien",
      },
    },
    footer: {
      help: "<strong>Brauchen Sie Hilfe?</strong> Unser Kundensupport-Team ist rund um die Uhr für Sie da.",
      security:
        "Dieser sichere Buchungslink läuft in 24 Stunden zu Ihrem Schutz ab.",
      brand: "GoBusly",
      tagline: "Verbindung von Destinationen, Erschaffung von Erinnerungen",
      support: "Support erhalten",
      contact: "Kontakt",
      unsubscribe: "Abmelden",
      copyright: "© {year} GoBusly. Alle Rechte vorbehalten.",
    },
  },
};

// Helper function to interpolate variables in translation strings
function interpolate(text: string, variables: Record<string, any>): string {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key] !== undefined ? variables[key] : match;
  });
}

// Helper function to get translation
function getTranslation(language: string = "en") {
  return translations[language as keyof typeof translations] || translations.en;
}

export async function sendAbandonedCheckoutEmail(
  data: AbandonedCheckoutEmailData
) {
  try {
    const lang = data.language || "en";
    const t = getTranslation(lang);

    const subject = data.isFirstEmail
      ? interpolate(t.subject.first, {
          fromCity: data.fromCity,
          toCity: data.toCity,
        })
      : interpolate(t.subject.final, {
          fromCity: data.fromCity,
          toCity: data.toCity,
        });

    const emailHtml = generateEmailTemplate(data, t);
    console.log({ zjarri: data });

    const result = await resend.emails.send({
      from: "GoBusly <bookings@gobusly.com>",
      to: [data.email],
      subject,
      html: emailHtml,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Error sending abandoned checkout email:", error);
    return { success: false, error };
  }
}

function generateEmailTemplate(
  data: AbandonedCheckoutEmailData,
  t: any
): string {
  const {
    firstName,
    fromCity,
    toCity,
    departureDate,
    totalPrice,
    currency,
    sessionId,
    isFirstEmail,
  } = data;

  const resumeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?resume=${sessionId}`;
  const logoUrl = `https://gobusly.com/assets/icons/icon.svg`;

  return `
    <!DOCTYPE html>
    <html lang="${data.language || "en"}">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Complete Your Booking - GoBusly</title>
      <style>
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
          line-height: 1.6;
          color: #2d3748;
          background-color: #f7fafc;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .email-wrapper {
          width: 100%;
          background-color: #f7fafc;
          padding: 40px 20px;
        }
        
        .email-container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        
        .header {
          background: linear-gradient(135deg, #ff3044 0%, #e53e3e 100%);
          padding: 40px 40px 60px;
          text-align: center;
          position: relative;
        }
        
        .header::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .logo-container {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 16px 24px;
          display: inline-block;
          margin-bottom: 24px;
        }
        
        .logo {
          height: 36px;
          width: auto;
        }
        
        .header-title {
          color: #ffffff;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        
        .header-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          font-weight: 400;
        }
        
        .content {
          padding: 60px 40px 40px;
          background-color: #ffffff;
        }
        
        .greeting {
          font-size: 24px;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 16px;
          text-align: center;
        }
        
        .message {
          font-size: 16px;
          color: #4a5568;
          margin-bottom: 32px;
          line-height: 1.7;
          text-align: center;
        }
        
        .cart-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          background: linear-gradient(135deg, #ff3044 0%, #e53e3e 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .cart-icon::before {
          content: '🛒';
          font-size: 32px;
          filter: grayscale(1) brightness(0) invert(1);
        }
        
        .booking-card {
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 32px;
          margin: 32px 0;
          position: relative;
          overflow: hidden;
        }
        
        .booking-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ff3044 0%, #e53e3e 100%);
        }
        
        .route-header {
          text-align: center;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .route-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-bottom: 16px;
        }
        
        .city {
          font-size: 22px;
          font-weight: 700;
          color: #1a202c;
          text-transform: capitalize;
          position: relative;
        }
        
        .route-arrow {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #ff3044 0%, #e53e3e 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 18px;
          font-weight: bold;
        }
        
        .journey-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }
        
        .detail-item {
          text-align: center;
        }
        
        .detail-label {
          font-size: 14px;
          color: #718096;
          font-weight: 500;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .detail-value {
          font-size: 18px;
          color: #1a202c;
          font-weight: 600;
        }
        
        .price-highlight {
          background: linear-gradient(135deg, #ff3044 0%, #e53e3e 100%);
          color: white;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          margin-top: 24px;
        }
        
        .price-label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .price {
          font-size: 32px;
          font-weight: 800;
          color: white;
        }
        
        .urgency-banner {
          background: linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%);
          border: 2px solid #fc8181;
          border-radius: 12px;
          padding: 20px;
          margin: 32px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .urgency-banner::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -100%;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, transparent, #ff3044, transparent);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .urgency-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        
        .urgency-icon {
          font-size: 24px;
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .urgency-text {
          color: #742a2a;
          font-size: 16px;
          font-weight: 600;
        }
        
        .discount-banner {
          background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
          border: 2px solid #fb923c;
          border-radius: 16px;
          padding: 32px;
          margin: 32px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .discount-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ff3044 0%, #fb923c 50%, #ff3044 100%);
        }
        
        .discount-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .discount-icon {
          font-size: 36px;
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-15px); }
          70% { transform: translateY(-8px); }
          90% { transform: translateY(-3px); }
        }
        
        .discount-text {
          text-align: left;
        }
        
        .discount-title {
          font-size: 24px;
          font-weight: 800;
          color: #9a3412;
          margin-bottom: 4px;
        }
        
        .discount-subtitle {
          font-size: 16px;
          color: #c2410c;
          font-weight: 500;
        }
        
        .coupon-code {
          background: #ffffff;
          border: 2px dashed #fb923c;
          border-radius: 12px;
          padding: 20px;
          display: inline-block;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .coupon-code:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(251, 146, 60, 0.2);
        }
        
        .coupon-label {
          font-size: 12px;
          color: #9a3412;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        
        .coupon-value {
          font-size: 28px;
          font-weight: 900;
          color: #ff3044;
          letter-spacing: 2px;
          margin-bottom: 8px;
          font-family: 'Courier New', monospace;
        }
        
        .coupon-copy {
          font-size: 12px;
          color: #c2410c;
          font-weight: 500;
        }
        
        .cta-section {
          text-align: center;
          margin: 40px 0;
        }
        
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #ff3044 0%, #e53e3e 100%);
          color: white;
          padding: 18px 48px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(255, 48, 68, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .cta-button:hover::before {
          left: 100%;
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 48, 68, 0.4);
        }
        
        .benefits {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 24px;
          margin: 48px 0;
          padding: 32px 0;
          border-top: 1px solid #e2e8f0;
        }
        
        .benefit {
          text-align: center;
          padding: 20px;
          border-radius: 12px;
          transition: transform 0.3s ease;
        }
        
        .benefit:hover {
          transform: translateY(-5px);
        }
        
        .benefit-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #ff3044 0%, #e53e3e 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-size: 24px;
          color: white;
        }
        
        .benefit-title {
          font-size: 16px;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 8px;
        }
        
        .benefit-desc {
          font-size: 14px;
          color: #4a5568;
          line-height: 1.5;
        }
        
        .footer-info {
          background: #f8fafc;
          padding: 32px;
          border-radius: 12px;
          margin-top: 32px;
          text-align: center;
        }
        
        .footer-info p {
          font-size: 14px;
          color: #4a5568;
          margin-bottom: 8px;
          line-height: 1.6;
        }
        
        .footer {
          background: #1a202c;
          padding: 32px 40px;
          text-align: center;
          color: #a0aec0;
        }
        
        .footer-brand {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 12px;
        }
        
        .footer-tagline {
          font-size: 14px;
          color: #718096;
          margin-bottom: 24px;
          font-style: italic;
        }
        
        .footer-links {
          margin: 20px 0;
        }
        
        .footer-links a {
          color: #ff3044;
          text-decoration: none;
          margin: 0 16px;
          font-weight: 500;
          font-size: 14px;
          transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
          color: #e53e3e;
          text-decoration: underline;
        }
        
        .footer-copyright {
          font-size: 12px;
          color: #4a5568;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #2d3748;
        }
        
        /* Mobile Responsiveness */
        @media (max-width: 640px) {
          .email-wrapper { padding: 20px 10px; }
          .content, .header { padding: 32px 24px; }
          .header-title { font-size: 24px; }
          .greeting { font-size: 20px; }
          .city { font-size: 18px; }
          .price { font-size: 28px; }
          .route-container { 
            flex-direction: column; 
            gap: 12px;
          }
          .journey-details {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .benefits {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .cta-button {
            padding: 16px 32px;
            font-size: 16px;
          }
          .discount-content {
            flex-direction: column;
            gap: 12px;
          }
          .discount-text {
            text-align: center;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="email-container">
          <div class="header">
            <div class="logo-container">
              <img src="${logoUrl}" alt="GoBusly" class="logo">
            </div>
            <div class="header-title">${t.header.title}</div>
            <div class="header-subtitle">${t.header.subtitle}</div>
          </div>
          
          <div class="content">
            <div class="cart-icon"></div>
            
            <div class="greeting">${interpolate(t.greeting, {
              firstName,
            })}</div>
            
            <div class="message">
              ${t.message}
            </div>
            
            <div class="discount-banner">
              <div class="discount-content">
                <div class="discount-icon">🎉</div>
                <div class="discount-text">
                  <div class="discount-title">${t.discount.title}</div>
                  <div class="discount-subtitle">${t.discount.subtitle}</div>
                </div>
              </div>
              <div class="coupon-code">
                <div class="coupon-label">${t.discount.label}</div>
                <div class="coupon-value">SUMMER2025</div>
                <div class="coupon-copy">${t.discount.copy}</div>
              </div>
            </div>
            
            <div class="booking-card">
              <div class="route-header">
                <div class="route-container">
                  <div class="city">${fromCity}</div>
                  <div class="route-arrow">→</div>
                  <div class="city">${toCity}</div>
                </div>
              </div>
              
              <div class="journey-details">
                <div class="detail-item">
                  <div class="detail-label">Departure Date</div>
                  <div class="detail-value">
                    ${new Date(departureDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div class="detail-item">
                  <div class="detail-label">Travel Day</div>
                  <div class="detail-value">
                    ${new Date(departureDate).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </div>
                </div>
              </div>
              
              <div class="price-highlight">
                <div class="price-label">Total Price</div>
                <div class="price">${currency}${totalPrice.toFixed(2)}</div>
              </div>
            </div>
            
            ${
              !isFirstEmail
                ? `<div class="urgency-banner">
                    <div class="urgency-content">
                      <div class="urgency-icon">⚡</div>
                      <div class="urgency-text">
                        <strong>Limited seats available!</strong> Prices may increase soon.
                      </div>
                    </div>
                   </div>`
                : ""
            }
            
            <div class="cta-section">
              <a href="${resumeUrl}" class="cta-button">
                Checkout Now →
              </a>
            </div>
            
            <div class="benefits">
              <div class="benefit">
                <div class="benefit-icon">🚌</div>
                <div class="benefit-title">Premium Comfort</div>
                <div class="benefit-desc">Modern buses with AC, WiFi, and comfortable seating</div>
              </div>
              <div class="benefit">
                <div class="benefit-icon">📱</div>
                <div class="benefit-title">Easy Booking</div>
                <div class="benefit-desc">Simple online booking process with instant confirmation</div>
              </div>
              <div class="benefit">
                <div class="benefit-icon">🔒</div>
                <div class="benefit-title">100% Secure</div>
                <div class="benefit-desc">Your payment and personal data are fully protected</div>
              </div>
              <div class="benefit">
                <div class="benefit-icon">🎫</div>
                <div class="benefit-title">Flexible Options</div>
                <div class="benefit-desc">Easy rescheduling and cancellation policies</div>
              </div>
            </div>
            
            <div class="footer-info">
              <p><strong>Need help?</strong> Our customer support team is available 24/7 to assist you.</p>
              <p>This secure booking link expires in 24 hours for your protection.</p>
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-brand">GoBusly</div>
            <div class="footer-tagline">Connecting destinations, creating memories</div>
            <div class="footer-links">
              <a href="${
                process.env.NEXT_PUBLIC_BASE_URL
              }/support">Get Support</a>
              <a href="${
                process.env.NEXT_PUBLIC_BASE_URL
              }/contact">Contact Us</a>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?email=${
    data.email
  }">Unsubscribe</a>
            </div>
            <div class="footer-copyright">
              © ${new Date().getFullYear()} GoBusly. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
