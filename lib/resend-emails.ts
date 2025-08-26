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
  language?: string;
}

// Enhanced translation system with more professional copy
const translations = {
  en: {
    subject: {
      first:
        "Complete your {fromCity} → {toCity} booking | 10% discount inside",
      final: "⏰ Final reminder: Your {fromCity} → {toCity} seats are waiting",
    },
    header: {
      title: "Don't miss your journey",
      subtitle: "Your booking is just one click away",
    },
    greeting: "Hello {firstName},",
    message:
      "We've saved your booking for you. As a valued customer, enjoy <strong>10% off</strong> when you complete your purchase today.",
    discount: {
      title: "Exclusive 10% Discount",
      subtitle: "Apply at checkout",
      code: "GOBUSLY10",
      label: "Promo Code",
      copy: "Click to copy",
      expires: "Expires in 24 hours",
    },
    booking: {
      route: "Your Route",
      departureDate: "Departure",
      travelDay: "Day",
      totalPrice: "Total",
      originalPrice: "Original Price",
      discountPrice: "With Discount",
    },
    urgency: "⚡ Only a few seats left at this price",
    cta: "Complete Booking",
    benefits: {
      comfort: {
        title: "Premium Comfort",
        desc: "Modern fleet with AC, WiFi & reclining seats",
      },
      booking: {
        title: "Instant Confirmation",
        desc: "Secure booking with immediate e-ticket delivery",
      },
      secure: {
        title: "Secure Payment",
        desc: "SSL encrypted with multiple payment options",
      },
      support: {
        title: "24/7 Support",
        desc: "Expert assistance whenever you need it",
      },
    },
    footer: {
      help: "Need assistance? Our support team is here to help.",
      security: "This secure link expires in 24 hours for your protection.",
      brand: "GoBusly",
      tagline: "Your trusted travel companion across the Balkans",
      support: "Get Help",
      contact: "Contact",
      unsubscribe: "Unsubscribe",
      copyright: "© {year} GoBusly. All rights reserved.",
      address: "Skopje, North Macedonia",
    },
  },
  es: {
    subject: {
      first:
        "Completa tu reserva {fromCity} → {toCity} | 10% descuento incluido",
      final:
        "⏰ Último recordatorio: Tus asientos {fromCity} → {toCity} te esperan",
    },
    header: {
      title: "No pierdas tu viaje",
      subtitle: "Tu reserva está a solo un clic",
    },
    greeting: "Hola {firstName},",
    message:
      "Hemos guardado tu reserva. Como cliente valorado, disfruta <strong>10% de descuento</strong> al completar tu compra hoy.",
    discount: {
      title: "Descuento Exclusivo 10%",
      subtitle: "Aplicar al pagar",
      code: "GOBUSLY10",
      label: "Código Promo",
      copy: "Clic para copiar",
      expires: "Expira en 24 horas",
    },
    booking: {
      route: "Tu Ruta",
      departureDate: "Salida",
      travelDay: "Día",
      totalPrice: "Total",
      originalPrice: "Precio Original",
      discountPrice: "Con Descuento",
    },
    urgency: "⚡ Solo quedan algunos asientos a este precio",
    cta: "Completar Reserva",
    benefits: {
      comfort: {
        title: "Comodidad Premium",
        desc: "Flota moderna con AC, WiFi y asientos reclinables",
      },
      booking: {
        title: "Confirmación Instantánea",
        desc: "Reserva segura con entrega inmediata de boleto",
      },
      secure: {
        title: "Pago Seguro",
        desc: "Encriptado SSL con múltiples opciones de pago",
      },
      support: {
        title: "Soporte 24/7",
        desc: "Asistencia experta cuando la necesites",
      },
    },
    footer: {
      help: "¿Necesitas ayuda? Nuestro equipo está aquí para asistirte.",
      security: "Este enlace seguro expira en 24 horas para tu protección.",
      brand: "GoBusly",
      tagline: "Tu compañero de viaje de confianza en los Balcanes",
      support: "Obtener Ayuda",
      contact: "Contacto",
      unsubscribe: "Darse de baja",
      copyright: "© {year} GoBusly. Todos los derechos reservados.",
      address: "Skopje, Macedonia del Norte",
    },
  },
  mk: {
    subject: {
      first:
        "Завршете ја вашата резервација {fromCity} → {toCity} | 10% попуст",
      final:
        "⏰ Финален потсетник: Вашите места {fromCity} → {toCity} ве чекаат",
    },
    header: {
      title: "Не го пропуштете патувањето",
      subtitle: "Вашата резервација е само еден клик далеку",
    },
    greeting: "Здраво {firstName},",
    message:
      "Ја зачувавме вашата резервација. Како ценет клиент, уживајте во <strong>10% попуст</strong> кога ќе ја завршите купувањето денес.",
    discount: {
      title: "Ексклузивен 10% Попуст",
      subtitle: "Применете при плаќање",
      code: "GOBUSLY10",
      label: "Промо Код",
      copy: "Кликни за копирање",
      expires: "Истекува за 24 часа",
    },
    booking: {
      route: "Ваша Рута",
      departureDate: "Поаѓање",
      travelDay: "Ден",
      totalPrice: "Вкупно",
      originalPrice: "Оригинална Цена",
      discountPrice: "Со Попуст",
    },
    urgency: "⚡ Останаа само неколку места на оваа цена",
    cta: "Завршете Резервација",
    benefits: {
      comfort: {
        title: "Премиум Удобност",
        desc: "Модерна флота со клима, WiFi и наслонливи седишта",
      },
      booking: {
        title: "Моментална Потврда",
        desc: "Безбедна резервација со моментална достава на билет",
      },
      secure: {
        title: "Безбедно Плаќање",
        desc: "SSL енкриптирано со повеќе опции за плаќање",
      },
      support: {
        title: "24/7 Поддршка",
        desc: "Експертска помош кога ви треба",
      },
    },
    footer: {
      help: "Треба помош? Нашиот тим е тука за да помогне.",
      security: "Овој безбеден линк истекува за 24 часа за ваша заштита.",
      brand: "GoBusly",
      tagline: "Вашиот доверлив патнички придружник низ Балканот",
      support: "Добијте Помош",
      contact: "Контакт",
      unsubscribe: "Отпишете се",
      copyright: "© {year} GoBusly. Сите права задржани.",
      address: "Скопје, Северна Македонија",
    },
  },
  fr: {
    subject: {
      first:
        "Complétez votre réservation {fromCity} → {toCity} | Réduction 10%",
      final:
        "⏰ Dernier rappel: Vos places {fromCity} → {toCity} vous attendent",
    },
    header: {
      title: "Ne manquez pas votre voyage",
      subtitle: "Votre réservation n'est qu'à un clic",
    },
    greeting: "Bonjour {firstName},",
    message:
      "Nous avons sauvegardé votre réservation. En tant que client apprécié, profitez de <strong>10% de réduction</strong> en finalisant votre achat aujourd'hui.",
    discount: {
      title: "Réduction Exclusive 10%",
      subtitle: "Appliquer lors du paiement",
      code: "GOBUSLY10",
      label: "Code Promo",
      copy: "Cliquer pour copier",
      expires: "Expire dans 24 heures",
    },
    booking: {
      route: "Votre Itinéraire",
      departureDate: "Départ",
      travelDay: "Jour",
      totalPrice: "Total",
      originalPrice: "Prix Original",
      discountPrice: "Avec Réduction",
    },
    urgency: "⚡ Il ne reste que quelques places à ce prix",
    cta: "Finaliser la Réservation",
    benefits: {
      comfort: {
        title: "Confort Premium",
        desc: "Flotte moderne avec climatisation, WiFi et sièges inclinables",
      },
      booking: {
        title: "Confirmation Instantanée",
        desc: "Réservation sécurisée avec livraison immédiate du billet",
      },
      secure: {
        title: "Paiement Sécurisé",
        desc: "Crypté SSL avec plusieurs options de paiement",
      },
      support: {
        title: "Support 24/7",
        desc: "Assistance experte quand vous en avez besoin",
      },
    },
    footer: {
      help: "Besoin d'aide? Notre équipe est là pour vous aider.",
      security: "Ce lien sécurisé expire dans 24 heures pour votre protection.",
      brand: "GoBusly",
      tagline: "Votre compagnon de voyage de confiance dans les Balkans",
      support: "Obtenir de l'aide",
      contact: "Contact",
      unsubscribe: "Se désabonner",
      copyright: "© {year} GoBusly. Tous droits réservés.",
      address: "Skopje, Macédoine du Nord",
    },
  },
};

// Helper functions remain the same
function interpolate(text: string, variables: Record<string, any>): string {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key] !== undefined ? variables[key] : match;
  });
}

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

    const result = await resend.emails.send({
      from: "GoBusly <bookings@gobusly.com>",
      to: [data.email],
      subject,
      html: emailHtml,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
    });

    return { success: true, data: result };
  } catch (error) {
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
  const logoUrl = "http://localhost:3000/assets/icons/logo.png";
  const discountedPrice = totalPrice * 0.9;
  const savings = totalPrice - discountedPrice;

  return `
    <!DOCTYPE html>
    <html lang="${data.language || "en"}" dir="ltr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="color-scheme" content="light">
      <meta name="supported-color-schemes" content="light">
      <title>${t.header.title} - GoBusly</title>
      <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        /* Reset & Base Styles */
        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
        }
        
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
          line-height: 1.6;
          color: #1a202c;
          background-color: #f8fafc;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          margin: 0;
          padding: 0;
        }
        
        table {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
        
        /* Container */
        .email-wrapper {
          width: 100%;
          background-color: #f8fafc;
          padding: 20px 0;
        }
        
        .email-container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }
        
        /* Header */
        .header {
          background: linear-gradient(135deg, #ff284d 0%, #e53e3e 100%);
          padding: 40px 32px;
          text-align: center;
        }
        
        .logo-container {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 12px 20px;
          display: inline-block;
          margin-bottom: 24px;
        }
        
        .logo {
          height: 32px;
          width: auto;
          vertical-align: middle;
        }
        
        .header-title {
          color: #ffffff;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        
        .header-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          font-weight: 400;
          line-height: 1.4;
        }
        
        /* Content */
        .content {
          padding: 40px 32px;
          background-color: #ffffff;
        }
        
        .greeting {
          font-size: 20px;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 16px;
        }
        
        .message {
          font-size: 16px;
          color: #4a5568;
          margin-bottom: 32px;
          line-height: 1.6;
        }
        
        /* Discount Banner */
        .discount-banner {
          background: linear-gradient(135deg, #fef7f0 0%, #fed7aa 100%);
          border: 2px solid #fb923c;
          border-radius: 16px;
          padding: 24px;
          margin: 32px 0;
          text-align: center;
          position: relative;
        }
        
        .discount-banner::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ff284d 0%, #fb923c 50%, #ff284d 100%);
          border-radius: 16px 16px 0 0;
        }
        
        .discount-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        
        .discount-emoji {
          font-size: 32px;
        }
        
        .discount-text {
          text-align: center;
        }
        
        .discount-title {
          font-size: 22px;
          font-weight: 800;
          color: #9a3412;
          margin-bottom: 4px;
        }
        
        .discount-subtitle {
          font-size: 14px;
          color: #c2410c;
          font-weight: 500;
        }
        
        .coupon-container {
          background: #ffffff;
          border: 2px dashed #fb923c;
          border-radius: 12px;
          padding: 16px;
          margin-top: 16px;
          display: inline-block;
        }
        
        .coupon-label {
          font-size: 11px;
          color: #9a3412;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 6px;
        }
        
        .coupon-code {
          font-size: 24px;
          font-weight: 900;
          color: #ff284d;
          letter-spacing: 2px;
          font-family: 'Courier New', monospace;
          margin-bottom: 6px;
        }
        
        .coupon-expires {
          font-size: 11px;
          color: #c2410c;
          font-style: italic;
        }
        
        /* Booking Card */
        .booking-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          margin: 32px 0;
          position: relative;
        }
        
        .booking-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ff284d 0%, #e53e3e 100%);
          border-radius: 16px 16px 0 0;
        }
        
        .route-section {
          text-align: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .route-label {
          font-size: 12px;
          color: #718096;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }
        
        .route-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        
        .city {
          font-size: 20px;
          font-weight: 700;
          color: #1a202c;
          text-transform: capitalize;
        }
        
        .route-arrow {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #ff284d 0%, #e53e3e 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          font-weight: bold;
        }
        
        .booking-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .detail-item {
          text-align: center;
        }
        
        .detail-label {
          font-size: 12px;
          color: #718096;
          font-weight: 600;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .detail-value {
          font-size: 16px;
          color: #1a202c;
          font-weight: 600;
        }
        
        .price-section {
          background: linear-gradient(135deg, #ff284d 0%, #e53e3e 100%);
          color: white;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
        }
        
        .price-breakdown {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .original-price {
          text-decoration: line-through;
          opacity: 0.8;
          font-size: 14px;
        }
        
        .discount-price {
          font-size: 24px;
          font-weight: 800;
        }
        
        .savings-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }
        
        /* Urgency Banner */
        .urgency-banner {
          background: linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%);
          border: 1px solid #fc8181;
          border-radius: 12px;
          padding: 16px;
          margin: 24px 0;
          text-align: center;
        }
        
        .urgency-text {
          color: #742a2a;
          font-size: 14px;
          font-weight: 600;
        }
        
        /* CTA Button */
        .cta-section {
          text-align: center;
          margin: 32px 0;
        }
        
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #ff284d 0%, #e53e3e 100%);
          color: white !important;
          padding: 16px 40px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.5px;
          box-shadow: 0 8px 25px rgba(255, 40, 77, 0.3);
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(255, 40, 77, 0.4);
        }
        
        /* Benefits Grid */
        .benefits {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin: 40px 0;
          padding: 32px 0;
          border-top: 1px solid #e2e8f0;
        }
        
        .benefit {
          text-align: center;
          padding: 16px;
        }
        
        .benefit-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #ff284d 0%, #e53e3e 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          font-size: 20px;
          color: white;
        }
        
        .benefit-title {
          font-size: 14px;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 6px;
        }
        
        .benefit-desc {
          font-size: 12px;
          color: #4a5568;
          line-height: 1.4;
        }
        
        /* Footer Info */
        .footer-info {
          background: #f8fafc;
          padding: 24px;
          border-radius: 12px;
          margin-top: 32px;
          text-align: center;
        }
        
        .footer-info p {
          font-size: 13px;
          color: #4a5568;
          margin-bottom: 6px;
          line-height: 1.5;
        }
        
        /* Footer */
        .footer {
          background: #1a202c;
          padding: 32px;
          text-align: center;
          color: #a0aec0;
        }
        
        .footer-brand {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
        }
        
        .footer-tagline {
          font-size: 13px;
          color: #718096;
          margin-bottom: 20px;
          font-style: italic;
        }
        
        .footer-links {
          margin: 16px 0;
        }
        
        .footer-links a {
          color: #ff284d;
          text-decoration: none;
          margin: 0 12px;
          font-weight: 500;
          font-size: 13px;
        }
        
        .footer-links a:hover {
          text-decoration: underline;
        }
        
        .footer-meta {
          font-size: 11px;
          color: #4a5568;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #2d3748;
          line-height: 1.4;
        }
        
        /* Mobile Responsiveness */
        @media only screen and (max-width: 600px) {
          .email-wrapper { padding: 10px 0; }
          .content, .header { padding: 24px 20px; }
          .header-title { font-size: 24px; }
          .greeting { font-size: 18px; }
          .city { font-size: 16px; }
          .route-display { 
            flex-direction: column; 
            gap: 8px;
          }
          .booking-details {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .benefits {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .cta-button {
            padding: 14px 32px;
            font-size: 15px;
          }
          .discount-header {
            flex-direction: column;
            gap: 8px;
          }
          .price-breakdown {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          [data-ogsc] .email-container {
            background-color: #ffffff !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td align="center" style="padding: 0;">
              <div class="email-container">
                <!-- Header -->
                <div class="header">
                  <div class="logo-container">
                    <img src="${logoUrl}" alt="GoBusly" class="logo" width="120" height="32">
                  </div>
                  <div class="header-title">${t.header.title}</div>
                  <div class="header-subtitle">${t.header.subtitle}</div>
                </div>
                
                <!-- Content -->
                <div class="content">
                  <div class="greeting">${interpolate(t.greeting, {
                    firstName,
                  })}</div>
                  
                  <div class="message">${t.message}</div>
                  
                  <!-- Discount Banner -->
                  <div class="discount-banner">
                    <div class="discount-header">
                      <div class="discount-emoji">🎉</div>
                      <div class="discount-text">
                        <div class="discount-title">${t.discount.title}</div>
                        <div class="discount-subtitle">${
                          t.discount.subtitle
                        }</div>
                      </div>
                    </div>
                    <div class="coupon-container">
                      <div class="coupon-label">${t.discount.label}</div>
                      <div class="coupon-code">${t.discount.code}</div>
                      <div class="coupon-expires">${t.discount.expires}</div>
                    </div>
                  </div>
                  
                  <!-- Booking Card -->
                  <div class="booking-card">
                    <div class="route-section">
                      <div class="route-label">${t.booking.route}</div>
                      <div class="route-display">
                        <div class="city">${fromCity}</div>
                        <div class="route-arrow">→</div>
                        <div class="city">${toCity}</div>
                      </div>
                    </div>
                    
                    <div class="booking-details">
                      <div class="detail-item">
                        <div class="detail-label">${
                          t.booking.departureDate
                        }</div>
                        <div class="detail-value">
                          ${new Date(departureDate).toLocaleDateString(
                            data.language || "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                      </div>
                      <div class="detail-item">
                        <div class="detail-label">${t.booking.travelDay}</div>
                        <div class="detail-value">
                          ${new Date(departureDate).toLocaleDateString(
                            data.language || "en-US",
                            {
                              weekday: "long",
                            }
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div class="price-section">
                      <div class="price-breakdown">
                        <div>
                          <div class="original-price">${currency}${totalPrice.toFixed(
    2
  )}</div>
                          <div class="discount-price">${currency}${discountedPrice.toFixed(
    2
  )}</div>
                        </div>
                        <div class="savings-badge">Save ${currency}${savings.toFixed(
    2
  )}</div>
                      </div>
                    </div>
                  </div>
                  
                  ${
                    !isFirstEmail
                      ? `
                  <div class="urgency-banner">
                    <div class="urgency-text">${t.urgency}</div>
                  </div>
                  `
                      : ""
                  }
                  
                  <!-- CTA -->
                  <div class="cta-section">
                    <a href="${resumeUrl}" class="cta-button">${t.cta}</a>
                  </div>
                  
                  <!-- Benefits -->
                  <div class="benefits">
                    <div class="benefit">
                      <div class="benefit-icon">🚌</div>
                      <div class="benefit-title">${
                        t.benefits.comfort.title
                      }</div>
                      <div class="benefit-desc">${t.benefits.comfort.desc}</div>
                    </div>
                    <div class="benefit">
                      <div class="benefit-icon">✅</div>
                      <div class="benefit-title">${
                        t.benefits.booking.title
                      }</div>
                      <div class="benefit-desc">${t.benefits.booking.desc}</div>
                    </div>
                    <div class="benefit">
                      <div class="benefit-icon">🔒</div>
                      <div class="benefit-title">${
                        t.benefits.secure.title
                      }</div>
                      <div class="benefit-desc">${t.benefits.secure.desc}</div>
                    </div>
                    <div class="benefit">
                      <div class="benefit-icon">💬</div>
                      <div class="benefit-title">${
                        t.benefits.support.title
                      }</div>
                      <div class="benefit-desc">${t.benefits.support.desc}</div>
                    </div>
                  </div>
                  
                  <!-- Footer Info -->
                  <div class="footer-info">
                    <p>${t.footer.help}</p>
                    <p>${t.footer.security}</p>
                  </div>
                </div>
                
                <!-- Footer -->
                <div class="footer">
                  <div class="footer-brand">${t.footer.brand}</div>
                  <div class="footer-tagline">${t.footer.tagline}</div>
                  <div class="footer-links">
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/support">${
    t.footer.support
  }</a>
                    <a href="${process.env.NEXT_PUBLIC_BASE_URL}/contact">${
    t.footer.contact
  }</a>
                    <a href="${
                      process.env.NEXT_PUBLIC_BASE_URL
                    }/unsubscribe?email=${data.email}">${
    t.footer.unsubscribe
  }</a>
                  </div>
                  <div class="footer-meta">
                    ${interpolate(t.footer.copyright, {
                      year: new Date().getFullYear(),
                    })}<br>
                    ${t.footer.address}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;
}
