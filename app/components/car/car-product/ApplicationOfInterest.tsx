"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { MailPlus, PhoneCall, X } from "lucide-react";
import { formatCurrencySEK } from "../../../utils/formatters";
import PrimaryButton from "../../utils/PrimaryButton";
import ApplicationOfInterestForm from "../../forms/ApplicationOfInterestForm";
import { Car, CarOld } from "../../../types/carservice/Car";

export default function ApplicationOfInterest({ car }: { car: Car }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <PrimaryButton
        onClick={() => setOpen(true)}
        title="Skicka intresseanmälan"
        href=""
        icon={<MailPlus className="w-5" />}
        iconAfter
        fullWidth
      />

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-300/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-neutral-900/90"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="mx-auto flex min-h-full max-w-xl items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="bg-background relative transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-3xl sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <button
                onClick={() => setOpen(false)}
                className="text-text-default absolute top-4.5 right-4.5 cursor-pointer"
                aria-label="Close"
              >
                <X size={30} />
              </button>
              <div>
                <h1 className="text-text-default text-center text-xl font-semibold">
                  Intresseanmälan
                </h1>
                <div className="mt-8 sm:mt-5">
                  <div className="mb-6 flex flex-row items-center gap-4 rounded-lg">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="h-20 w-20 rounded-lg border border-gray-200 object-cover sm:h-28 sm:w-28"
                    />
                    <div className="flex flex-col items-start justify-center">
                      <p className="text-text-default mb-2 text-sm/4 font-semibold sm:text-lg">
                        {car.name}
                      </p>
                      <span className="text-text-default bg-primary mt-1 rounded-xl px-3 py-1 text-xs font-semibold sm:text-base sm:font-semibold">
                        {formatCurrencySEK(car.price)}
                      </span>
                    </div>
                  </div>

                  <ApplicationOfInterestForm
                    car={car}
                    close={() => setOpen(false)}
                  />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
