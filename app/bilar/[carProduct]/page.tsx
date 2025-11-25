import ApplicationOfInterest from "@/app/components/car/car-product/ApplicationOfInterest";
import DimensionerVikt from "@/app/components/car/car-product/DimensionerVikt";
import MotorPrestanda from "@/app/components/car/car-product/MotorPrestanda";
import Oversikt from "@/app/components/car/car-product/Oversikt";
import Utrustning from "@/app/components/car/car-product/Utrustning";
import CarImageSwiper from "@/app/components/car/CarImageSwiper";
import CarPromotions from "@/app/components/car/CarPromotions";
import PageContainer from "@/app/components/utils/PageContainer";
import SecondaryButton from "@/app/components/utils/SecondaryButton";
import { carService, iconMap } from "@/app/service/carService";
import { calcExklMoms, formatCurrencySEK } from "@/app/utils/formatters";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Car, Check, Leaf, MailPlus, PhoneCall } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

export default async function CarProductPage({
  params,
}: {
  params: { carProduct: string };
}) {
  const { carProduct } = await params;
  const cars = carService.getCarsSorted();

  const chosenCar = cars.find((car) => {
    return car.blocket_link.split("/").at(5) === carProduct;
  });

  if (!chosenCar) {
    return notFound();
  }

  const tabs = [
    {
      name: "Översikt",
      component: <Oversikt data={chosenCar.facts} />,
    },
    {
      name: "Utrustning",
      component: <Utrustning data={chosenCar.equipment} />,
    },
    // {
    //   name: "Motor & prestanda",
    //   component: (
    //     // <MotorPrestanda
    //     //   data={chosenCar.transportstyrelsen?.engine_enviroment ?? null}
    //     // />
    //     <></>
    //   ),
    // },
    // {
    //   name: "Dimensioner & vikt",
    //   component: (
    //     <></>
    //     // <DimensionerVikt
    //     //   data={chosenCar.transportstyrelsen?.technical_data ?? null}
    //     // />
    //   ),
    // },
  ];

  const factsToPromote = ["Modellår", "Drivmedel", "Växellåda", "Miltal"];

  const promotedFacts = chosenCar.facts
    .filter((fact) => factsToPromote.includes(fact.header))
    .sort(
      (a, b) =>
        factsToPromote.indexOf(a.header) - factsToPromote.indexOf(b.header)
    );

  return (
    <PageContainer>
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-card-background border-card-border top-24 hidden h-fit flex-col gap-4 self-start rounded-2xl border p-16 lg:visible lg:sticky lg:order-1 lg:flex">
          <div>
            <Link href="/bilar" className="text-text-muted text-sm font-light">
              Bilar <span className="ml-2"></span>/
            </Link>
            <h1 className="text-text-default mt-2 text-xl font-semibold tracking-tight">
              {chosenCar.name}
            </h1>
          </div>

          <div className="my-4 flex flex-col">
            <div className="flex flex-row items-end">
              <p
                className={`text-text-default w-fit text-3xl font-bold ${
                  chosenCar.price && "text-red-700!"
                }`}
              >
                {formatCurrencySEK(chosenCar.price)}
              </p>
              {/* {chosenCar.price && (
                <p className="text-m text-text-default ml-2 w-fit font-bold line-through">
                  {formatCurrencySEK(chosenCar.price)}
                </p>
              )} */}
            </div>

            <p className="text-xs">{calcExklMoms(chosenCar.price)}</p>
          </div>

          <ul className="text-text-default flex flex-wrap gap-4">
            <li className="flex items-center pr-2 text-xs">
              Garanti
              <Check className="ml-2 w-3" />
            </li>
            <li className="flex items-center pr-2 text-xs">
              Finansiering
              <Check className="ml-2 w-3" />
            </li>
            <li className="flex items-center pr-2 text-xs">
              Ingen kontantinsats
              <Check className="ml-2 w-3" />
            </li>
          </ul>

          <section>
            <ul className="mt-4 grid list-none grid-cols-2 flex-wrap items-center gap-6 space-y-2">
              {promotedFacts.map((fact, index) => {
                const Icon = iconMap[fact.header] || Car;
                return (
                  <li key={index} className="m-0 flex items-center">
                    <Icon className="text-primary mr-5 h-6 w-6" />
                    <span className="text-text-default text-sm font-semibold">
                      {fact.description}
                      {/* {fact.header === "Miltal" && " mil"} */}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <div className="mt-8 flex flex-wrap gap-4">
            <ApplicationOfInterest car={chosenCar} />
            <SecondaryButton
              title="Ring säljare"
              href="tel:+46705868122"
              icon={<PhoneCall className="w-5" />}
              iconAfter
              fullWidth
            />
          </div>
        </div>

        {/* Info section MOBILE*/}
        <div className="flex flex-col gap-24">
          <div>
            <CarImageSwiper images={chosenCar.images} />
            <div className="bg-card-background border-card-border visible top-12 mt-4 flex h-fit flex-col gap-4 self-start rounded-2xl border p-6 sm:p-16 lg:sticky lg:order-1 lg:hidden">
              <div>
                <Link href="/bilar" className="text-text-muted mb-24 text-sm">
                  Bilar /
                </Link>
                <h1 className="text-text-default text-lg/6 font-semibold">
                  {chosenCar.name}
                </h1>
              </div>

              <div className="mt-4 flex flex-col">
                <div className="text-text-default flex flex-col flex-wrap lg:flex-row">
                  <p
                    className={`order-2 w-fit text-3xl font-bold lg:order-1 ${
                      chosenCar.price && "text-red-700"
                    }`}
                  >
                    {formatCurrencySEK(chosenCar.price)}
                  </p>
                  {/* {chosenCar.price && (
                    <p className="text-m -mb-1 ml-1 w-fit font-bold line-through lg:ml-2">
                      {formatCurrencySEK(chosenCar.price)}
                    </p>
                  )} */}
                </div>

                <p className="ml-1 text-xs">{calcExklMoms(chosenCar.price)}</p>
              </div>

              <ul className="text-text-default mt-2 flex flex-wrap gap-2 gap-y-0">
                <li className="flex items-center pr-2 text-xs">
                  Garanti
                  <Check className="ml-2 w-3" />
                </li>
                <li className="flex items-center pr-2 text-xs">
                  Finansiering
                  <Check className="ml-2 w-3" />
                </li>
                <li className="flex items-center pr-2 text-xs">
                  Ingen kontantinsats
                  <Check className="ml-2 w-3" />
                </li>
              </ul>

              <section>
                <ul className="mt-4 grid max-w-2xl list-none grid-cols-2 items-center gap-4 space-y-2 sm:gap-8">
                  {promotedFacts.map((fact, index) => {
                    const Icon = iconMap[fact.header] || Car;
                    return (
                      <li
                        key={index}
                        className="xs:col-span-1 col-span-2 m-0 flex flex-wrap items-center"
                      >
                        <Icon className="text-primary mr-2 h-5 w-5" />
                        <span className="text-text-default text-sm font-semibold">
                          {fact.description}
                          {/* {fact.header === "Miltal" && " mil"} */}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <div className="mt-8 flex flex-wrap gap-4">
                <ApplicationOfInterest car={chosenCar} />
                <SecondaryButton
                  title="Ring säljare"
                  href="tel:+46705868122"
                  icon={<PhoneCall className="w-5" />}
                  iconAfter
                  fullWidth
                />
              </div>
            </div>
          </div>

          <TabGroup>
            <div className="scrollbar-container flex overflow-x-scroll overflow-y-hidden">
              <div className="border-b border-gray-200 px-4 sm:px-0">
                <TabList className="flex">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.name}
                      className="hover:text-text-default text-text-muted data-selected:text-text-default data-selected:border-text-default mb-1 cursor-pointer border-b-2 border-transparent px-4 py-4 text-sm font-semibold whitespace-nowrap focus-visible:outline-none"
                    >
                      {tab.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
            </div>

            <TabPanels as={Fragment}>
              {tabs.map((tab) => (
                <TabPanel key={tab.name} className="space-y-16 pt-10 lg:pt-12">
                  {tab.component}
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

          <section>
            <header>
              <h2 className="text-text-default mb-8 border-b border-neutral-200 pb-4 text-lg font-semibold tracking-tight dark:border-neutral-800">
                Beskrivning
              </h2>
            </header>

            <p className="text-text-muted mt-4 text-sm whitespace-pre-line">
              {/* {chosenCar.description} */}
              {chosenCar.description.replace(/\n/g, "\n\n")}
            </p>
          </section>

          <section>
            <header>
              <h2 className="text-text-default mb-8 border-b border-neutral-200 pb-4 text-lg font-semibold tracking-tight dark:border-neutral-800">
                Betalningsalternativ
              </h2>
            </header>

            <ul className="text-text-muted flex flex-col gap-2 text-sm">
              <li className="flex justify-between gap-4">
                <span>Kontantpris inkl. moms:</span>
                <span className="text-text-default text-right font-semibold whitespace-nowrap">
                  {formatCurrencySEK(chosenCar.price)}
                </span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Kontantpris ex. moms:</span>
                <span className="text-text-default text-right font-semibold whitespace-nowrap">
                  {calcExklMoms(chosenCar.price, true)}
                </span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Finansiering av bil</span>
                <span className="text-text-default text-right font-semibold">
                  Ja
                </span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Inbyte av bil</span>
                <span className="text-text-default text-right font-semibold">
                  Ja
                </span>
              </li>
            </ul>
          </section>

          {/* Mobile version CTA */}
          <div className="flex flex-wrap gap-4 lg:hidden">
            <ApplicationOfInterest car={chosenCar} />
            <SecondaryButton
              title="Ring säljare"
              href="tel:+46705868122"
              icon={<PhoneCall className="w-5" />}
              iconAfter
              fullWidth
            />
          </div>
        </div>
      </div>

      <CarPromotions
        currentCarName={chosenCar.name}
        noOfCars={3}
        header="Flera bilar på lager"
      />
    </PageContainer>
  );
}

// import { ChevronDownIcon } from '@heroicons/react/16/solid'
