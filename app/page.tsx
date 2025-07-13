"use client";

import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Testimonials />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Magic Tutor</h3>
          <p className="text-gray-400 mb-6">
            AI-powered content summarization for the modern world
          </p>
          <p className="text-sm text-gray-500">
            © 2025 Magic Tutor. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}