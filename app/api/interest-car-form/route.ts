import { NextRequest, NextResponse } from "next/server";
import {
  sendConfirmationToClient,
  sendConfirmationToOwner,
} from "@/app/lib/nodemailer";
import { loadHtmlTemplate } from "@/app/utils/html-template-helper";
import { carService } from "@/app/service/carService";
import { companyStatic } from "@/app/service/companyStatic";

export async function POST(request: NextRequest) {
  // const formData = await request.formData();
  const data = await request.json();
  const { name, phone, email, message, car } = data;

  const carPic = car.images[0];
  const carName = car.name;
  const carPrice = car.price.current;
  const carLink = `${process.env.BASE_URL}/bilar/${car.blocket_link
    .split("/")
    .at(5)}`;

  const messageSection = message
    ? `<span style="font-weight: 600; font-size: 14px">
					Meddelande:
				</span>
			<br />
			<span style="font-size: 12px">
					${message}
			</span>
			`
    : "";

  const emailTemplateClient = loadHtmlTemplate(
    "application-interest-form-confirmation-client.html"
  );
  const emailTemplateOwner = loadHtmlTemplate(
    "application-interest-form-confirmation-owner.html"
  );

  const textClient = `Hej ${name}. Tack för att du kontaktade oss på ${carService.getCompanyName()}. Vi har mottagit ditt intresseanmälan och återkommer till dig så snart som möjligt.`;
  const textOwner = `${name} har skickat intresseanmälan till en av dina bilar.`;

  const htmlClient = emailTemplateClient
    .replace(/{{\s*text\s*}}/g, textClient)
    .replace(/{{\s*name\s*}}/g, name)
    .replace(/{{\s*email\s*}}/g, email)
    .replace(/{{\s*phone\s*}}/g, phone)
    .replace(/{{\s*message\s*}}/g, message)
    .replace(/{{\s*messageSection\s*}}/g, messageSection)
    .replace(/{{\s*carPic\s*}}/g, carPic)
    .replace(/{{\s*carName\s*}}/g, carName)
    .replace(/{{\s*carPrice\s*}}/g, carPrice)
    .replace(/{{\s*carLink\s*}}/g, carLink)
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
    .replace(/{{\s*email\s*}}/g, email)
    .replace(/{{\s*phone\s*}}/g, phone)
    .replace(/{{\s*message\s*}}/g, message)
    .replace(/{{\s*messageSection\s*}}/g, messageSection)
    .replace(/{{\s*carPic\s*}}/g, carPic)
    .replace(/{{\s*carName\s*}}/g, carName)
    .replace(/{{\s*carPrice\s*}}/g, carPrice)
    .replace(/{{\s*carLink\s*}}/g, carLink)
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
        subject: `Bekräftelse på ditt meddelande - ${carService.getCompanyName()}`,
        text: textClient,
        html: htmlClient,
      }),
      sendConfirmationToOwner({
        subject: `Ny intresseanmälan för din bil`,
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
      message: "Error while sending email",
    });
  }
}
