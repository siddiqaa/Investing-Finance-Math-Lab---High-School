import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

export const LabSkeletonLoader: React.FC<{ label?: string }> = ({ label = 'Loading Interactive Model...' }) => {
  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-pulse">
      {/* Skeleton Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="space-y-2">
          <div className="h-4 w-48 bg-slate-200 rounded-md" />
          <div className="h-3 w-72 bg-slate-100 rounded-md" />
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl">
          <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
          <span>{label}</span>
        </div>
      </div>

      {/* Skeleton Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column Skeleton */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-slate-300" />
            <div className="h-3 w-32 bg-slate-200 rounded-md" />
          </div>
          <div className="space-y-3 pt-2">
            <div className="h-10 bg-slate-200 rounded-xl w-full" />
            <div className="h-10 bg-slate-200 rounded-xl w-full" />
            <div className="h-10 bg-slate-200 rounded-xl w-full" />
          </div>
        </div>

        {/* Chart/Canvas Stage Skeleton */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[300px] flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div className="h-3 w-36 bg-slate-800 rounded-md" />
            <div className="h-3 w-20 bg-slate-800 rounded-md" />
          </div>
          <div className="flex items-end space-x-2 h-44 pt-6">
            <div className="bg-indigo-900/40 rounded-t h-[40%] flex-1" />
            <div className="bg-indigo-900/60 rounded-t h-[65%] flex-1" />
            <div className="bg-indigo-900/80 rounded-t h-[85%] flex-1" />
            <div className="bg-indigo-600 rounded-t h-[100%] flex-1" />
            <div className="bg-indigo-900/70 rounded-t h-[75%] flex-1" />
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <div className="h-3 w-28 bg-slate-800 rounded-md" />
            <div className="h-3 w-28 bg-slate-800 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};
