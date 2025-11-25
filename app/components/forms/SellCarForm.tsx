"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";

export default function SellCarForm() {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      typeOfCar: formData.get("car-type"),
      yearModel: formData.get("year"),
      carName: formData.get("car-name"),
      idealPrice: formData.get("ideal-price"),
      mileage: formData.get("mileage"),
    };

    try {
      const res = await fetch("/api/sell-car-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Meddelande mottaget! Vi återkommer inom kort!");
        formRef.current?.reset();
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
      <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {/* Bilmärke */}
        <div>
          <label
            htmlFor="car-name"
            className="text-text-default block text-xs/6 font-semibold"
          >
            Bil
            <span className="ml-1 text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              required
              id="car-name"
              name="car-name"
              type="text"
              className="bg-form-background text-text-default outline-form-border block w-full rounded-md px-3.5 py-3 text-sm outline-1 -outline-offset-1 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-neutral-400 sm:text-xs dark:placeholder:text-neutral-600"
              placeholder="Volvo XC90"
            />
          </div>
        </div>

        {/* Modellår */}
        <div>
          <label
            htmlFor="year"
            className="text-text-default block text-xs/6 font-semibold"
          >
            Modellår
            <span className="ml-1 text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              required
              id="year"
              name="year"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              step={1}
              autoComplete="bday-year"
              className="bg-form-background text-text-default outline-form-border block w-full rounded-md px-3.5 py-3 text-sm outline-1 -outline-offset-1 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-neutral-400 sm:text-xs dark:placeholder:text-neutral-600"
              placeholder="2025"
            />
          </div>
        </div>

        {/* Miltal */}
        <div>
          <label
            htmlFor="mileage"
            className="text-text-default block text-xs/6 font-semibold"
          >
            Miltal
            <span className="ml-1 text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              required
              id="mileage"
              name="mileage"
              type="number"
              className="bg-form-background text-text-default outline-form-border block w-full rounded-md px-3.5 py-3 text-sm outline-1 -outline-offset-1 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-neutral-400 sm:text-xs dark:placeholder:text-neutral-600"
              placeholder="20000"
            />
          </div>
        </div>

        {/* Biltyp */}
        <div>
          <label
            htmlFor="car-type"
            className="text-text-default block text-xs/6 font-semibold"
          >
            Typ av bil
            <span className="ml-1 text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              required
              list="car-type-list"
              id="car-type"
              name="car-type"
              type="text"
              autoComplete="off"
              placeholder="Småbil"
              className="bg-form-background text-text-default outline-form-border block w-full rounded-md px-3.5 py-3 text-sm outline-1 -outline-offset-1 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-neutral-400 sm:text-xs dark:placeholder:text-neutral-600"
            />
            <datalist id="car-type-list">
              <option value="Småbil" />
              <option value="Sedan" />
              <option value="SUV" />
              <option value="Coupé" />
              <option value="Kombi" />
              <option value="Hatchback" />
              <option value="Convertible" />
            </datalist>
          </div>
        </div>

        {/* Önskat försäljningspris */}
        <div className="sm:col-span-2">
          <label
            htmlFor="ideal-price"
            className="text-text-default block text-xs/6 font-semibold"
          >
            Önskat försäljningspris
          </label>
          <div className="relative mt-1">
            <input
              required
              id="ideal-price"
              name="ideal-price"
              type="number"
              className="bg-form-background text-text-default outline-form-border block w-full rounded-md px-3.5 py-3 text-sm outline-1 -outline-offset-1 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-neutral-400 sm:text-xs dark:placeholder:text-neutral-600"
              placeholder="100 000 kr"
            />
          </div>
        </div>
        {/* Namn */}
        <div className="mt-6 sm:col-span-2 sm:mt-8">
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
              placeholder="Ditt namn"
            />
          </div>
        </div>

        {/* Telefonnummer */}
        <div>
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

        {/* Email */}
        <div>
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

        {/* Meddelande */}
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
              rows={4}
              className="bg-form-background text-text-default outline-form-border block w-full rounded-md px-3.5 py-3 text-sm outline-1 -outline-offset-1 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-neutral-400 sm:text-xs dark:placeholder:text-neutral-600"
              placeholder="Skriv ditt meddelande..."
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <button
          disabled={loading}
          type="submit"
          className="bg-primary text-text-default block w-full cursor-pointer rounded-md px-3.5 py-2.5 text-center text-sm font-semibold shadow-xs hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
        >
          {loading ? "Skickar meddelande..." : "Ge mig ett bud på bilen"}
        </button>
      </div>
      {/* <p className="mt-4 text-xs/6 text-gray-500">
                            By submitting this form, I agree to the{' '}
                            <a href="#" className="font-semibold whitespace-nowrap text-indigo-600">
                                privacy policy
                            </a>
                            .
                        </p> */}
    </form>
  );
}
