import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { sampleSteps } from '../data/sampleData';
import type { Step } from '../types';

export function ProcessGuide() {
  const { id } = useParams();
  const [process, setProcess] = useState<Step | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiResponse, setAiResponse] = useState<string>('');

  useEffect(() => {
    // Find the process in sample data
    const foundProcess = sampleSteps.find(step => step.id === id);
    if (foundProcess) {
      setProcess(foundProcess);
      // Simulate AI response generation
      setTimeout(() => {
        setAiResponse(`Here's a detailed guide for ${foundProcess.title}:\n\n1. First, gather all required documents\n2. Visit the official portal\n3. Fill out the application form\n4. Pay the required fees\n5. Schedule appointment if needed\n6. Track your application status`);
      }, 1000);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!process) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
        <h1 className="text-2xl font-bold text-gray-900">Process not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{process.title}</h1>
      <p className="text-gray-600 mb-6">{process.description}</p>

      {process.officialLink && (
        <a
          href={process.officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-6 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          Official Website →
        </a>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">AI-Generated Guide</h2>
        <div className="prose prose-blue">
          {aiResponse ? (
            <pre className="whitespace-pre-wrap font-sans text-gray-600">{aiResponse}</pre>
          ) : (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          )}
        </div>
      </div>

      {process.children && process.children.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Step-by-Step Process</h2>
          <div className="space-y-4">
            {process.children.map((step) => (
              <div
                key={step.id}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
              >
                <h3 className="font-medium mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                {step.documents && step.documents.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {step.documents.map((doc) => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:text-blue-700"
                      >
                        📄 {doc.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}