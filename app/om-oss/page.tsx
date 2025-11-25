import PageHeader from "../components/presentation/PageHeader";
import PageContainer from "../components/utils/PageContainer";
import Image from "next/image";
import CountUpWrapper from "../components/utils/CountUpWrapper";
import { stats2 } from "../service/companyStatic";
import CarWithEngineSound from "../components/cool-to-have/CarWithEngineSound";
import { carService } from "../service/carService";
import AnimateStagger from "../components/utils/AnimateStagger";
import Animate from "../components/utils/Animate";
import TheTeam from "../kontakt/TheTeam";

export default function OmOssPage() {
  const company_name = carService.getCompanyName();
  return (
    <PageContainer>
      {/* Header section */}
      <div>
        <PageHeader
          header={`Om ${company_name}`}
          desc={
            "Vi har flerårig erfarenhet av förmedling och försäljning av bil, husvagn, husbil, MC och båt. Vårt fokus är att vara ditt självklara val när det gäller försäljningskanal till er fordonspark."
          }
        />

        {/* Stat section */}
        <div className="mx-auto mt-20 max-w-7xl">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <AnimateStagger className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4">
              {stats2.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col-reverse gap-y-3 border-l border-gray-200 pl-6"
                >
                  <dt className="text-text-muted text-base/7">{stat.label}</dt>
                  <dd className="text-text-default text-3xl font-semibold tracking-tight">
                    {/* {stat.value} */}
                    <CountUpWrapper
                      end={stat.value}
                      duration={3 + i * 0.3}
                      separator=""
                      suffix={stat.suffix}
                    />
                  </dd>
                </div>
              ))}
            </AnimateStagger>
          </div>
        </div>

        {/* Image section */}
        <Animate className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl">
          <Image
            width={700}
            height={400}
            alt=""
            src="https://images.unsplash.com/photo-1656685299734-52a0bb4425aa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2232"
            className="aspect-9/6 w-full rounded-3xl object-cover sm:aspect-9/4"
          />
        </Animate>
      </div>

      <TheTeam />
      <CarWithEngineSound />
    </PageContainer>
  );
}
