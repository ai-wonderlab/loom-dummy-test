import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hello from Loom",
  description:
    "A minimal test project for the Loom MVP pipeline — a static landing page verifying the agentic build flow.",
};

export default function HomePage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="home-heading"
    >
      <section className="max-w-2xl text-center">
        <h1
          id="home-heading"
          className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
        >
          Hello from Loom
        </h1>
        <p
          className="mt-6 text-base text-slate-600 sm:text-lg"
          role="status"
          aria-live="polite"
        >
          Nothing to show here yet — this is the empty state.
        </p>
      </section>
    </main>
  );
}
