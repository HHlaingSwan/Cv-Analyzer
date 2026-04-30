"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAnalysisById, deleteAnalysis } from "../actions";
import { AnalysisResult } from "@/lib/ai/openrouter";
import {
  ArrowLeft,
  Trash2,
  Download,
  Share2,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Menu,
  Save,
  X,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/use-auth";
import { Document, Page, pdfjs } from "react-pdf";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function AnalysisDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [pdfError, setPdfError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadAnalysis();
    }
  }, [params.id, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const loadAnalysis = async () => {
    try {
      const data = await getAnalysisById(params.id as string);
      setAnalysis(data);
      setResult(data.analysis_result as AnalysisResult);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load analysis",
      );
      router.push("/analyses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this analysis?")) return;

    try {
      await deleteAnalysis(params.id as string);
      toast.success("Analysis deleted");
      router.push("/analyses");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete analysis",
      );
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("PDF load error:", error);
    setPdfError("Failed to load PDF preview");
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 75) return "text-blue-600 dark:text-blue-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    if (score >= 40) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-100 dark:bg-green-950/30";
    if (score >= 75) return "bg-blue-100 dark:bg-blue-950/30";
    if (score >= 60) return "bg-yellow-100 dark:bg-yellow-950/30";
    if (score >= 40) return "bg-orange-100 dark:bg-orange-950/30";
    return "bg-red-100 dark:bg-red-950/30";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!analysis || !result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Analysis not found</p>
      </div>
    );
  }

  const menuItems = [
    {
      icon: ArrowLeft,
      label: "Back",
      action: () => {
        router.back();
        setMenuOpen(false);
      },
    },
    {
      icon: Save,
      label: "Save",
      action: () => {
        setMenuOpen(false);
        toast.success("Saved successfully!");
      },
    },
    {
      icon: Share2,
      label: "Share",
      action: () => {
        setMenuOpen(false);
        toast.success("Share feature coming soon!");
      },
    },
    {
      icon: Trash2,
      label: "Delete",
      action: () => {
        handleDelete();
        setMenuOpen(false);
      },
      color: "text-destructive",
      borderColor: "border-destructive/50",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className=" max-w-7xl  mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: CV Download */}
          <div className="lg:sticky  lg:top-0 lg:self-start">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground dark:text-white">
                  Your CV
                </h3>
              </div>
              <div className="p-4">
                {analysis.cv_file_url ? (
                  <div className="w-full rounded-lg overflow-hidden border border-border">
                    {pdfError ? (
                      <div className="aspect-8.5/11 bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">{pdfError}</p>
                      </div>
                    ) : (
                      <Document
                        file={analysis.cv_file_url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                        loading={
                          <div className="aspect-8.5/11 bg-muted rounded-lg flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                          </div>
                        }
                      >
                        <Page
                          pageNumber={1}
                          width={600}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </Document>
                    )}
                  </div>
                ) : (
                  <div className="aspect-8.5/11 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">
                      CV preview not available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Analysis Results */}
          <div className="space-y-6 ">
            {/* Overall Score */}
            <div
              className={`${getScoreBg(result.overall_score)} rounded-xl p-6`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground dark:text-white">
                  Overall Score
                </h3>
                <div
                  className={`text-4xl font-bold ${getScoreColor(result.overall_score)}`}
                >
                  {result.overall_score}/100
                </div>
              </div>
              <p className="text-foreground dark:text-white">
                {result.summary}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Skills Analysis
              </h3>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Match Score
                  </span>
                  <span className="text-sm font-medium text-foreground dark:text-white">
                    {result.skills.score}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${result.skills.score}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                    Matched Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.skills.matched.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                    Missing Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.skills.missing.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Experience Analysis
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Relevant Experience
                  </span>
                  <span className="text-sm font-medium text-foreground dark:text-white">
                    {result.experience.years} years
                  </span>
                </div>
                <p className="text-sm text-foreground dark:text-white">
                  {result.experience.relevance}
                </p>
                <p className="text-sm text-muted-foreground">
                  {result.experience.alignment}
                </p>
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Strengths
              </h3>
              <ul className="space-y-2">
                {result.strengths.map((strength, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground dark:text-white"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground dark:text-white mb-4 flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-500" />
                Areas for Improvement
              </h3>
              <ul className="space-y-2">
                {result.weaknesses.map((weakness, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground dark:text-white"
                  >
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground dark:text-white mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Recommendations
              </h3>
              <ul className="space-y-2">
                {result.recommendations.map((recommendation, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground dark:text-white"
                  >
                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>

            {/* Keywords */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground dark:text-white mb-4">
                Keyword Matching
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                    Matched Keywords
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.matched.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-full text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                    Missing Keywords
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.missing.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-full text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Upgraded Radial Menu - Right Side Slide-in */}
      <div className="fixed bottom-20 left-10 z-10 radial-menu-container">
        <div className="relative flex items-center">
          {/* Main trigger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-20 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Buttons container - right side with staggered animation */}
          <div
            className={`flex items-center gap-3 ml-4 ${
              menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            } transition-all duration-300`}
          >
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`w-10 h-10 rounded-full bg-background border-2 ${
                  item.borderColor || "border-border"
                } hover:bg-muted flex items-center justify-center shadow-md transition-all duration-200 ${
                  menuOpen ? "translate-x-0" : "-translate-x-4"
                }`}
                style={{
                  transitionDelay: menuOpen ? `${index * 75}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                }}
                title={item.label}
              >
                <item.icon className={`h-4 w-4 ${item.color || ""}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
