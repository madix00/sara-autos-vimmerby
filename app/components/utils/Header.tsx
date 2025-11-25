"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { carService } from "../../service/carService";
import OpeningStatusIndicator from "../../kontakt/OpeningStatusIndicator";
import OpeningHours from "../../kontakt/OpeningHours";
import ThemeSwitcher from "./ThemeSwitcher";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import { companyStatic } from "../../service/companyStatic";
import PromotionBar from "../presentation/PromotionBar";
import { useTheme } from "next-themes";

const navigation = [
  { name: "Startsida", href: "/" },
  { name: "Bilar", href: "/bilar" },
  { name: "Om oss", href: "/om-oss" },
  { name: "Kontakt", href: "/kontakt" },
];
const company_name = carService.getCompanyName();
const logo = companyStatic.getLogo();
export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before reading theme (avoid hydration errors)
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Determine if the current theme is dark
  const isDark = resolvedTheme === "dark";

  const businessHours = companyStatic.getWeeklyHours();
  return (
    <header className="bg-background fixed top-0 z-40 w-full">
      <nav
        aria-label="Global"
        className="z-0 mx-auto flex max-w-7xl items-center justify-between gap-x-6 px-6 py-3 lg:px-8"
      >
        <div className="flex items-center gap-4 lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{company_name}</span>
            <img
              alt=""
              src={isDark ? "/sara-logo.jpg" : "/sara-logo.jpg"}
              // red car classes
              // className="w-18 h-18 object-cover hover:opacity-80"
              // className=" w-35 md:w-50 h-auto object-contain hover:opacity-80 "

              // karlstad bilhandel
              // className=" w-35 md:w-50 h-auto object-contain hover:opacity-80  "

              // vip classes
              className="h-auto w-25 object-contain hover:opacity-80 md:w-50"
            />
          </Link>
          <div className="hidden sm:flex sm:items-center">
            <ThemeSwitcher />
          </div>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="text-text-default text-sm/6 font-semibold"
            >
              {item.name}
            </Link>
          ))}
        </div>
        {/* <div className="flex flex-1 items-center justify-end gap-x-6 relative"> */}
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <div className="relative hidden sm:block">
            {/* <button className="peer flex w-64 items-center justify-center rounded-md bg-neutral-800 px-6 py-2 text-sm text-white shadow-sm transition-colors duration-200 hover:bg-neutral-700 focus:outline-none"> */}
            <div
              style={{ zIndex: 90 }}
              className="peer flex items-center justify-center rounded-md px-6 py-2 text-sm shadow-sm transition-colors duration-200 focus:outline-none"
            >
              <OpeningStatusIndicator hours={businessHours} />
            </div>

            <OpeningHours hours={companyStatic.getWeeklyHours()} />
          </div>
          <PrimaryButton
            title={"Sälj din bil"}
            href={"/salj-bil"}
            className="hidden sm:block"
          />
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Öppna huvud meny</span>
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="z-50 lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="bg-background fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between gap-x-6">
            <Link
              href="/"
              className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">{company_name}</span>
              <img
                alt=""
                // src="https://www.rattbil.se/wordpress/wp-content/uploads/2019/07/logotyp-rattbil-400.png"
                src="/redcar.png"
                // className="w-24 h-8 object-cover hover:opacity-80"
                className="h-auto w-10 object-contain hover:opacity-80"
              />
            </Link>
            <div className="flex flex-1 items-center justify-end gap-x-6">
              <PrimaryButton
                title={"Sälj din bil"}
                href="/salj-bil"
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Stäng meny</span>
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-text-default -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href={`tel:${carService.getCompanyPhone()}`}
                  className="rounded-md bg-neutral-800 px-6 py-2 text-sm text-white shadow-xs hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
                >
                  Ring oss direkt
                </Link>
                <div className="mt-8">
                  <OpeningStatusIndicator hours={businessHours} />
                </div>
                <div className="mt-4">
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
      <PromotionBar />
    </header>
  );
}
