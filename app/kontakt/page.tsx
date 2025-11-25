import PageContainer from "../components/utils/PageContainer";
import { carService } from "../service/carService";
import EmailPhone from "./EmailPhone";
import ContactForm from "../components/forms/ContactForm";
import PageHeader from "../components/presentation/PageHeader";
import CEO from "./CEO";

export default function KontaktPage() {
  return (
    <PageContainer>
      <PageHeader
        header="Kom i kontakt med oss"
        desc="Vi hjälper såklart med allt gällande din bilaffär. Kontakta oss direkt eller fyll i dina uppgifter och din fråga i formuläret så återkommer vi så snart som möjligt."
      />
      <div className="flex flex-col items-center justify-center gap-16 sm:gap-y-20 lg:flex-row">
        <ContactForm />
        <CEO />
      </div>

      <EmailPhone />
    </PageContainer>
  );
}
