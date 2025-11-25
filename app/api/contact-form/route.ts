import {
  sendConfirmationToClient,
  sendConfirmationToOwner,
} from "@/app/lib/nodemailer";
import { carService } from "@/app/service/carService";
import { companyStatic } from "@/app/service/companyStatic";
import { loadHtmlTemplate } from "@/app/utils/html-template-helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message, phone = "Inte angett" } = body;

  const emailTemplateClient = loadHtmlTemplate(
    "contact-form-confirmation-client.html"
  );
  const emailTemplateOwner = loadHtmlTemplate(
    "contact-form-confirmation-owner.html"
  );

  const textClient = `Hej ${name}. Tack för att du kontaktade oss på ${carService.getCompanyName()}. Vi har mottagit ditt meddelande och återkommer till dig så snart som möjligt.`;
  const textOwner = `${name} har skickat ett meddelande via kontaktformuläret på din webbplats.`;

  const messageSection = message
    ? `<br />
				<span style="font-weight: 600; font-size: 14px">
					Ditt meddelande:
				</span>
			<br />
			<span style="font-size: 12px">
				${message}
			</span>`
    : "";

  const htmlClient = emailTemplateClient
    .replace(/{{\s*text\s*}}/g, textClient)
    .replace(/{{\s*name\s*}}/g, name)
    .replace(/{{\s*email\s*}}/g, email)
    .replace(/{{\s*message\s*}}/g, message)
    .replace(/{{\s*messageSection\s*}}/g, messageSection)
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
        subject: `Nytt meddelande från ${name} via kontaktformuläret`,
        text: textOwner,
        html: htmlOwner,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
