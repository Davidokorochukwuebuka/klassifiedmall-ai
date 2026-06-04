'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Sparkles, Loader2, X } from 'lucide-react';
import Link from 'next/link';
import { generateDescription } from '@/lib/api';

export default function AddProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [suggestedCategory, setSuggestedCategory] = useState<string | null>(null);

  async function handleGenerateDescription() {
    if (!name.trim()) return;

    setIsGenerating(true);
    setGenerateError(null);
    setSuggestedTags([]);
    setSuggestedCategory(null);

    try {
      const result = await generateDescription(name, category || 'General');
      if (result?.description) {
        setDescription(result.description);
      }
      if (result?.tags?.length) {
        setSuggestedTags(result.tags);
      }
      if (result?.suggestedCategory) {
        setSuggestedCategory(result.suggestedCategory);
      }
    } catch (err: any) {
      setGenerateError(err?.message || 'Failed to generate description. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }

  function handleApplySuggestedCategory() {
    if (suggestedCategory) {
      setCategory(suggestedCategory);
      setSuggestedCategory(null);
    }
  }

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
      <Link href="/vendor/products" className="inline-flex items-center gap-1 text-sm text-primary hover:underline"><ArrowLeft size={14} /> Back to Products</Link>
      <h1 className="text-2xl font-heading font-bold">Add New Product</h1>

      <motion.form className="space-y-6" onSubmit={(e) => e.preventDefault()} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {/* Images */}
        <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6">
          <h2 className="font-heading font-semibold mb-4">Images</h2>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <Upload size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
          </div>
        </div>

        {/* Details */}
        <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4">
          <h2 className="font-heading font-semibold">Details</h2>
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary"
          />

          {/* Description field with Generate button */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={!name.trim() || isGenerating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                title={!name.trim() ? 'Enter a product name first' : 'Generate AI description'}
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={12} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={12} />
                    Generate Description
                  </>
                )}
              </button>
            </div>
            <textarea
              rows={4}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary resize-none"
            />

            {/* Error message */}
            {generateError && (
              <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                <span>{generateError}</span>
                <button type="button" onClick={() => setGenerateError(null)} className="ml-auto">
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Suggested tags */}
            {suggestedTags.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">Suggested tags:</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedTags.map((tag) => (
                    <span key={tag} className="inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested category */}
            {suggestedCategory && (
              <div className="flex items-center gap-2 text-sm bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">
                <Sparkles size={12} className="text-amber-600 dark:text-amber-400" />
                <span className="text-amber-800 dark:text-amber-300">
                  Suggested category: <strong>{suggestedCategory}</strong>
                </span>
                <button
                  type="button"
                  onClick={handleApplySuggestedCategory}
                  className="ml-auto text-xs px-2 py-1 rounded bg-amber-200 dark:bg-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-300 dark:hover:bg-amber-600 transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary"
          >
            <option value="">Select category</option>
            <option>Food</option><option>Electronics</option><option>Fashion</option><option>Health</option><option>Services</option>
          </select>
        </div>

        {/* Pricing */}
        <div className="rounded-card bg-white dark:bg-card-dark shadow-soft p-6 space-y-4">
          <h2 className="font-heading font-semibold">Pricing & Inventory</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Price (₦)" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
            <input type="number" placeholder="Compare at price" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Stock quantity" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
            <input type="text" placeholder="SKU" className="w-full px-4 py-3 rounded-btn border border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:outline-none focus:border-primary" />
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="accent-primary" /> Allow negotiation</label>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="btn-primary">Publish Product</button>
          <button type="button" className="px-6 py-3 rounded-btn border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">Save Draft</button>
        </div>
      </motion.form>
    </div>
  );
}
