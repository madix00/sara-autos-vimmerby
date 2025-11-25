// import { Car } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Car, CarOld } from "@/app/types/carservice/Car";
import { ArrowUpRight } from "lucide-react";

import PrimaryButton from "../utils/PrimaryButton";

export default function ApplicationOfInterestForm({
  close,
  car,
}: {
  close: () => void;
  car: Car;
}) {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      message: formData.get("message"),
      car: car,
    };

    try {
      const res = await fetch("/api/interest-car-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Meddelande mottaget! Vi återkommer inom kort!");
        formRef.current?.reset();
        close();
      } else {
        toast.error("Kunde inte skicka meddelande. Försök igen senare.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Kunde inte skicka meddelande. Försök igen senare.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-x-8 gap-y-3">
        <div>
          <label
            htmlFor="name"
            className="text-text-default block text-xs/6 font-semibold"
          >
            Namn
            <span className="ml-1 text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="given-name"
              className="bg-form-background text-text-default outline-form-border block w-full rounded-md px-3.5 py-3 text-sm outline-1 -outline-offset-1 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-neutral-400 sm:text-xs dark:placeholder:text-neutral-600"
              placeholder="Ditt för- & efternamn"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <label
              htmlFor="phone"
              className="text-text-default block text-xs/6 font-semibold"
            >
              Telefonnummer
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                required
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className="bg-form-background text-text-default outline-form-border block w-full rounded-md px-3.5 py-3 text-sm outline-1 -outline-offset-1 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-neutral-400 sm:text-xs dark:placeholder:text-neutral-600"
                placeholder="070 100 10 10"
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="text-text-default block text-xs/6 font-semibold"
            >
              E-Post
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="namn@adress.se"
                className="bg-form-background text-text-default outline-form-border block w-full rounded-md px-3.5 py-3 text-sm outline-1 -outline-offset-1 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-neutral-400 sm:text-xs dark:placeholder:text-neutral-600"
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="text-text-default block text-xs/6 font-semibold"
          >
            Meddelande
          </label>
          <div className="mt-1">
            <textarea
              id="message"
              name="message"
              rows={3}
              className="bg-form-background text-text-default outline-form-border block w-full rounded-md px-3.5 py-3 text-sm outline-1 -outline-offset-1 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-neutral-400 sm:text-xs dark:placeholder:text-neutral-600"
              placeholder="Skriv valfritt meddelande..."
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:mt-10 md:flex-row">
        <PrimaryButton
          title={"Skicka intresseanmälan"}
          href={""}
          icon={<ArrowUpRight className="w-5" />}
          iconAfter
          submit
          fullWidth
        />
      </div>

      {/* <p className="mt-4 text-sm/6 text-gray-500">
        By submitting this form, I agree to the{" "}
        <a href="#" className="font-semibold whitespace-nowrap text-neutral-800">
          privacy policy
        </a>
        .
      </p> */}
    </form>
  );
}
