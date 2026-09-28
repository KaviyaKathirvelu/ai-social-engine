"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Sparkles, Send, Check, RefreshCw, Zap, SlidersHorizontal, Share2, MessageSquare, AtSign } from "lucide-react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [vibe, setVibe] = useState("Pattern Interrupt / Hot Take");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ linkedin?: string; twitter?: string; instagram?: string }>({});
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);
  const [refinement, setRefinement] = useState("");

  const handleGenerate = async (modPrompt?: string) => {
    if (!inputText && !modPrompt) return;
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputText,
          vibe,
          modificationPrompt: modPrompt,
          previousOutput: results,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Rate limit reached. Please wait a few seconds and try again.");
        return;
      }

      setResults(data);
    } catch {
      alert("Failed to connect to backend server. Ensure your dev server is running.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string | undefined, platform: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedPlatform(platform);
    setTimeout(() => setCopiedPlatform(null), 2000);
  };

  const platformMeta = {
    linkedin: { name: "LinkedIn", icon: Share2, color: "from-blue-600 to-cyan-500", badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    twitter: { name: "X (Twitter)", icon: AtSign, color: "from-slate-100 to-slate-400", badgeBg: "bg-slate-500/10 text-slate-300 border-slate-500/20" },
    instagram: { name: "Instagram", icon: MessageSquare, color: "from-pink-500 via-purple-500 to-orange-400", badgeBg: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-blue-600/10 blur-[130px] rounded-full" />
        <div className="absolute top-[40%] -right-[10%] w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Top Navigation */}
      <nav className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              EngineAI
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8 space-y-8 relative z-10">
        {/* Header */}
        <header className="text-center space-y-3 pt-2 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
            AI Social Content Studio
          </h1>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Turn notes, thoughts, or technical updates into viral content formatted for LinkedIn, Twitter/X, and Instagram simultaneously.
          </p>
        </header>

        {/* Input Card */}
        <Card className="bg-slate-900/80 border-slate-800/80 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span>Source Raw Content</span>
            </label>
            <Textarea
              placeholder="Paste raw notes, launch updates, articles, or rough ideas here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="bg-slate-950/80 border-slate-800 text-slate-100 placeholder-slate-500 min-h-[150px] text-sm md:text-base rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-500/50 resize-none transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1 border-t border-slate-800/60">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 hidden sm:block" />
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Hook Tone:</span>
                <select
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors w-full sm:w-auto cursor-pointer"
                >
                  <option value="Pattern Interrupt / Hot Take">Pattern Interrupt / Hot Take</option>
                  <option value="Storytelling / Personal">Storytelling / Personal</option>
                  <option value="Actionable / Metric-Driven">Actionable / Metric-Driven</option>
                </select>
              </div>
            </div>

            <Button
              onClick={() => handleGenerate()}
              disabled={loading || !inputText}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Crafting Posts...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate 3 Posts
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(["linkedin", "twitter", "instagram"] as const).map((platform) => {
            const meta = platformMeta[platform];
            const Icon = meta.icon;
            const content = results[platform];

            return (
              <Card
                key={platform}
                className="bg-slate-900/60 border-slate-800/80 backdrop-blur-md flex flex-col justify-between rounded-2xl shadow-xl hover:border-slate-700/80 transition-all group"
              >
                <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg border ${meta.badgeBg}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <CardTitle className="text-sm font-semibold text-slate-200">
                      {meta.name}
                    </CardTitle>
                  </div>

                  {content && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(content, platform)}
                      className="text-slate-400 hover:text-white hover:bg-slate-800/80 h-8 px-2.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                    >
                      {copiedPlatform === platform ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                </CardHeader>

                <CardContent className="pt-4 text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap min-h-[220px] flex-1">
                  {content ? (
                    content
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-600 space-y-2">
                      <Sparkles className="w-5 h-5 opacity-40" />
                      <span className="italic text-xs">Post output will render here...</span>
                    </div>
                  )}
                </CardContent>

                {content && (
                  <div className="px-5 py-3 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between font-mono bg-slate-950/30 rounded-b-2xl">
                    <span>{content.length} chars</span>
                    <span>{content.split(/\s+/).filter(Boolean).length} words</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Refinement Chat Bar */}
        {results.linkedin && (
          <div className="bg-slate-900/90 border border-indigo-500/30 backdrop-blur-2xl rounded-2xl p-2 flex items-center gap-3 shadow-2xl shadow-indigo-500/10">
            <input
              type="text"
              placeholder="Ask AI to refine (e.g. 'Make the LinkedIn post shorter', 'Add 3 relevant hashtags')..."
              value={refinement}
              onChange={(e) => setRefinement(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && refinement.trim()) {
                  handleGenerate(refinement);
                  setRefinement("");
                }
              }}
              className="flex-1 bg-transparent px-4 py-2.5 text-xs md:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            <Button
              onClick={() => {
                if (refinement.trim()) {
                  handleGenerate(refinement);
                  setRefinement("");
                }
              }}
              disabled={loading || !refinement.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 h-auto rounded-xl transition-all shadow-md shadow-indigo-600/30"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}