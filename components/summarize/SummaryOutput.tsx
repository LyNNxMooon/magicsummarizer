"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";

interface SummaryOutputProps {
  summary: string;
  contentType: string;
  url: string;
  isLoading: boolean;
}

export function SummaryOutput({ summary, contentType, url, isLoading }: SummaryOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl border border-gray-200 p-8"
      >
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-lg font-medium text-gray-700">
              Generating summary...
            </span>
          </div>
          <p className="text-gray-500">
            Our AI is analyzing your content and creating a structured summary.
          </p>
        </div>
      </motion.div>
    );
  }

  if (!summary) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">✨</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                AI Summary - {contentType}
              </h3>
              <p className="text-sm text-gray-600 truncate max-w-md">
                {url}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(url, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Source
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Content */}
      <div className="p-8">
        <div 
          className="prose prose-lg max-w-none"
          style={{
            whiteSpace: 'pre-wrap',
            lineHeight: '1.7',
            color: '#374151'
          }}
        >
          {summary.split('\n').map((line, index) => {
            // Handle headers with emojis
            if (line.match(/^#{1,3}\s*\S/)) {
              const level = line.match(/^#{1,3}/)?.[0].length || 1;
              const text = line.replace(/^#{1,3}\s*/, '');
              const HeaderTag = `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements;
              
              return (
                <HeaderTag 
                  key={index} 
                  className={`font-bold mb-3 mt-6 ${
                    level === 1 ? 'text-2xl text-gray-900' :
                    level === 2 ? 'text-xl text-gray-800' :
                    'text-lg text-gray-700'
                  }`}
                >
                  {text}
                </HeaderTag>
              );
            }
            
            // Handle bullet points
            if (line.match(/^[\s]*[-•*]\s/)) {
              return (
                <div key={index} className="flex items-start gap-2 mb-2 ml-4">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>{line.replace(/^[\s]*[-•*]\s/, '')}</span>
                </div>
              );
            }
            
            // Handle numbered lists
            if (line.match(/^[\s]*\d+\.\s/)) {
              return (
                <div key={index} className="flex items-start gap-2 mb-2 ml-4">
                  <span className="text-blue-600 font-bold mt-1">
                    {line.match(/^[\s]*(\d+)\./)?.[1]}.
                  </span>
                  <span>{line.replace(/^[\s]*\d+\.\s/, '')}</span>
                </div>
              );
            }
            
            // Handle empty lines
            if (line.trim() === '') {
              return <div key={index} className="h-3" />;
            }
            
            // Regular paragraphs
            return (
              <p key={index} className="mb-4 leading-relaxed">
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}