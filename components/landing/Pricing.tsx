"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

export function Pricing() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent block">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start for free and upgrade when you're ready. No hidden fees, 
            no complicated tiers. Just powerful AI summarization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-gray-200 rounded-3xl p-8 relative hover:border-gray-300 transition-colors"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-5xl font-bold text-gray-900 mb-2">$0</div>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Unlimited summarizations",
                "YouTube video support",
                "Article summarization", 
                "TikTok content processing",
                "Basic AI-powered summaries",
                "Copy to clipboard",
                "Clean, organized output"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/summarize" className="block">
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-lg font-semibold rounded-xl">
                Get Started Free
              </Button>
            </Link>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-3xl p-8 relative overflow-hidden text-white"
          >
            {/* Popular badge */}
            <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Popular
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-5xl font-bold mb-2">$9</div>
              <p className="text-blue-100">per month</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Everything in Free",
                "Advanced AI processing",
                "Batch summarization",
                "Export options (PDF, Word)",
                "Custom summary length",
                "Priority processing",
                "Advanced formatting",
                "API access",
                "Premium support"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span className="text-white">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 py-3 text-lg font-semibold rounded-xl">
              Upgrade to Pro
            </Button>

            {/* Background decoration */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/10 rounded-full" />
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            All plans include access to Gemini 2.5 Flash AI technology
          </p>
          <p className="text-sm text-gray-500">
            No setup fees • Cancel anytime • 30-day money-back guarantee
          </p>
        </motion.div>
      </div>
    </section>
  );
}