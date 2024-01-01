"use client";

import { useState } from "react";

import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { cosmic } from "@/lib/cosmic";

export function ArrowIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");

  function handleNewsLetter(e: any) {
    e.preventDefault();

    if (email) {
      cosmic.objects
        .insertOne({
          title: email,
          type: "news-letters",
          slug: email,
          metadata: {
            email: email,
          },
        })
        .then((res) => {
          setEmail("");
        });
    }
  }

  return (
    <form className="max-w-sm" onSubmit={handleNewsLetter}>
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Sign up for our newsletter
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        Subscribe to get the latest design news, articles, resources and inspiration.
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          value={email}
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  );
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 border-t border-neutral-950/10 pt-20">
          <div className="flex lg:justify-end">
            <NewsletterForm />
          </div>
        </div>
        <div className="mb-20 mt-24 flex flex-wrap items-end justify-end gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <p className="text-sm text-neutral-700">© Salman Farshe. {new Date().getFullYear()}</p>
        </div>
      </FadeIn>
    </Container>
  );
}
