"use client";

import { motion } from "framer-motion";
import { Youtube, Video, FileText, Sparkles, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: Youtube,
    title: "YouTube Videos",
    description: "Extract and summarize content from any YouTube video with transcript support.",
    gradient: "from-red-500 to-red-600"
  },
  {
    icon: Video,
    title: "TikTok Content",
    description: "Process TikTok videos and get structured summaries of the key points.",
    gradient: "from-pink-500 to-purple-600"
  },
  {
    icon: FileText,
    title: "Articles & Blogs",
    description: "Summarize any web article or blog post into digestible insights.",
    gradient: "from-blue-500 to-teal-600"
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Leverages Google's Gemini 2.5 Flash for the most accurate summaries.",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Get comprehensive summaries in seconds instead of spending hours.",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security measures.",
    gradient: "from-purple-500 to-indigo-600"
  }
];

export function Features() {
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
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent block">
              Summarize Smarter
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Magic Tutor combines cutting-edge AI technology with intuitive design 
            to deliver the most comprehensive content summarization experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}