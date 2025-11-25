import { NextRequest, NextResponse } from "next/server";
import {
  sendConfirmationToClient,
  sendConfirmationToOwner,
} from "@/app/lib/nodemailer";
import { loadHtmlTemplate } from "@/app/utils/html-template-helper";
import { carService } from "@/app/service/carService";
import { formatCurrencySEK, formatMiltal } from "@/app/utils/formatters";
import { companyStatic } from "@/app/service/companyStatic";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    typeOfCar,
    yearModel,
    carName,
    idealPrice,
    mileage,
    name,
    phone,
    email,
    message,
  } = body;

  const messageSection = message
    ? `<span style="font-weight: 600; font-size: 14px; margin-top: 24px;">Meddelande:</span><br />${message}<br /><br />`
    : "";

  const emailTemplateClient = loadHtmlTemplate(
    "sell-car-form-confirmation-client.html"
  );

  const emailTemplateOwner = loadHtmlTemplate(
    "sell-car-form-confirmation-owner.html"
  );

  const textClient = `Hej ${name}. Tack för att du kontaktade oss på ${carService.getCompanyName()}. Vi har mottagit ditt meddelande och återkommer till dig så snart som möjligt.`;
  const textOwner = `${name} vill sälja sin ${carName} till dig.`;

  const htmlClient = emailTemplateClient
    .replace(/{{\s*text\s*}}/g, textClient)
    .replace(/{{\s*name\s*}}/g, name)
    .replace(/{{\s*carName\s*}}/g, carName)
    .replace(/{{\s*typeOfCar\s*}}/g, typeOfCar)
    .replace(/{{\s*yearModel\s*}}/g, yearModel)
    .replace(/{{\s*mileage\s*}}/g, formatMiltal(Number(mileage)))
    .replace(/{{\s*idealPrice\s*}}/g, formatCurrencySEK(Number(idealPrice)))
    .replace(/{{\s*company-name\s*}}/g, carService.getCompanyName())
    .replace(/{{\s*company-address\s*}}/g, carService.getFullAddress())
    .replace(/{{\s*company-phone\s*}}/g, carService.getCompanyPhone())
    .replace(/{{\s*company-logo-src\s*}}/g, carService.getCompanyLogoSrc())
    .replace(
      /{{\s*company-adress-link\s*}}/g,
      companyStatic.getGoogleMapsLink()
    );

  const htmlOwner = emailTemplateOwner
    .replace(/{{\s*text\s*}}/g, textOwner)
    .replace(/{{\s*name\s*}}/g, name)
    .replace(/{{\s*phone\s*}}/g, phone)
    .replace(/{{\s*email\s*}}/g, email)
    .replace(/{{\s*messageSection\s*}}/g, messageSection)
    .replace(/{{\s*carName\s*}}/g, carName)
    .replace(/{{\s*typeOfCar\s*}}/g, typeOfCar)
    .replace(/{{\s*yearModel\s*}}/g, yearModel)
    .replace(/{{\s*mileage\s*}}/g, formatMiltal(Number(mileage)))
    .replace(/{{\s*idealPrice\s*}}/g, formatCurrencySEK(Number(idealPrice)))
    .replace(/{{\s*company-name\s*}}/g, carService.getCompanyName())
    .replace(/{{\s*company-address\s*}}/g, carService.getFullAddress())
    .replace(/{{\s*company-phone\s*}}/g, carService.getCompanyPhone())
    .replace(/{{\s*company-logo-src\s*}}/g, carService.getCompanyLogoSrc())
    .replace(
      /{{\s*company-adress-link\s*}}/g,
      companyStatic.getGoogleMapsLink()
    );

  try {
    await Promise.all([
      sendConfirmationToClient({
        to: email,
        subject: `Vi har mottagit ditt meddelande om att sälja din bil - ${carService.getCompanyName()}`,
        text: textClient,
        html: htmlClient,
      }),

      sendConfirmationToOwner({
        subject: `Ny säljförfrågan via hemsidan`,
        text: textOwner,
        html: htmlOwner,
      }),
    ]);

    return NextResponse.json({
      message: "Email sent successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      success: false,
      message: "Error while sending one or more emails",
    });
  }
}
