import React, { useState } from 'react';
import { ChevronRight, Globe, FileText, Bookmark, ExternalLink } from 'lucide-react';
import type { Step } from '../types';
import { useStore } from '../store/useStore';

interface StepNodeProps {
  step: Step;
  level?: number;
}

function StepNode({ step, level = 0 }: StepNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, addBookmark, removeBookmark } = useStore();
  const isBookmarked = user?.bookmarks.includes(step.id);

  return (
    <div className="ml-4">
      <div className="flex items-start gap-2 p-4 hover:bg-gray-50 rounded-lg transition-colors">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`mt-1 transition-transform ${isExpanded ? 'rotate-90' : ''} ${
            step.children?.length ? 'visible' : 'invisible'
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {step.isOnline ? (
              <Globe className="h-4 w-4 text-blue-500" />
            ) : (
              <FileText className="h-4 w-4 text-gray-500" />
            )}
            <h3 className="font-medium">{step.title}</h3>
            <button
              onClick={() => isBookmarked ? removeBookmark(step.id) : addBookmark(step.id)}
              className={`ml-auto ${isBookmarked ? 'text-blue-500' : 'text-gray-400'}`}
            >
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-2">{step.description}</p>
          
          {step.officialLink && (
            <a
              href={step.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              Official Website
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          )}
          
          {step.documents && step.documents.length > 0 && (
            <div className="mt-2 space-y-1">
              {step.documents.map(doc => (
                <a
                  key={doc.id}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-600 hover:text-gray-800"
                >
                  📄 {doc.title}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {isExpanded && step.children && (
        <div className="ml-4 border-l border-gray-200">
          {step.children.map(childStep => (
            <StepNode key={childStep.id} step={childStep} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function StepTree() {
  const steps = useStore((state) => state.steps);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredSteps = showOnlineOnly 
    ? steps.filter(step => step.isOnline)
    : steps;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Step-by-Step Guide</h2>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">Show online procedures only</span>
        </label>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {filteredSteps.map(step => (
          <StepNode key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}