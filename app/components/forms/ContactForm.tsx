"use client";

import { toast } from "sonner";
import { useRef, useState } from "react";
import React from "react";
import RequiredAsterix from "../utils/RequiredAsterix";

export default function ContactForm() {
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
    };

    try {
      const res = await fetch("/api/contact-form", {
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
      <div className="flex flex-col gap-x-8 gap-y-3">
        <div>
          <label
            htmlFor="name"
            className="text-text-default block text-xs/6 font-semibold"
          >
            Namn
            <RequiredAsterix />
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
        <div className="flex gap-4">
          <div className="w-full">
            <label
              htmlFor="phone"
              className="text-text-default block text-xs/6 font-semibold"
            >
              Telefon
            </label>
            <div className="mt-1">
              <input
                id="phone"
                name="phone"
                type="phone"
                autoComplete="tel"
                className="bg-form-background text-text-default outline-form-border block w-full rounded-md px-3.5 py-3 text-sm outline-1 -outline-offset-1 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-neutral-400 sm:text-xs dark:placeholder:text-neutral-600"
                placeholder="Ditt telefonnummer"
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="text-text-default block text-xs/6 font-semibold"
            >
              E-post
              <RequiredAsterix />
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="bg-form-background text-text-default outline-form-border block w-full rounded-md px-3.5 py-3 text-sm outline-1 -outline-offset-1 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-neutral-400 sm:text-xs dark:placeholder:text-neutral-600"
                placeholder="Din e-postadress"
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
            <RequiredAsterix />
          </label>
          <div className="mt-1">
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="bg-form-background text-text-default outline-form-border block w-full rounded-md px-3.5 py-3 text-sm outline-1 -outline-offset-1 backdrop-blur-sm placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-neutral-400 sm:text-xs dark:placeholder:text-neutral-600"
              placeholder="Skriv ditt meddelande..."
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <button
          type="submit"
          className="bg-primary text-text-default block w-full cursor-pointer rounded-md px-3.5 py-2.5 text-center text-sm font-semibold shadow-xs hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
        >
          {loading ? "Skickar meddelande..." : "Skicka meddelande"}
        </button>
      </div>
    </form>
  );
}
