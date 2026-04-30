"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAnalyses, deleteAnalysis } from "../analyze/actions";
import { ArrowLeft, Trash2, Plus, Calendar, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/use-auth";

export default function AnalysesPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAnalyses = async () => {
    try {
      const data = await getAnalyses();
      setAnalyses(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load analyses",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadAnalyses();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this analysis?")) return;

    try {
      await deleteAnalysis(id);
      toast.success("Analysis deleted");
      loadAnalyses();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete analysis",
      );
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90)
      return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-950/30";
    if (score >= 75)
      return "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/30";
    if (score >= 60)
      return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-950/30";
    if (score >= 40)
      return "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/30";
    return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/30";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </button>
            <button
              onClick={() => router.push("/analyze")}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4 rounded-lg font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              New Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground dark:text-white mb-2">
            Analysis History
          </h1>
          <p className="text-muted-foreground">
            View and manage your past CV analyses
          </p>
        </div>

        {analyses.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
              No analyses yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Start by analyzing your first CV
            </p>
            <button
              onClick={() => router.push("/analyze")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-6 rounded-lg font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Analyze Your CV
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analyses.map((analysis) => (
              <div
                key={analysis.id}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => router.push(`/analyze/${analysis.id}`)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground dark:text-white mb-1">
                        {analysis.job_title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(analysis.created_at)}
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(
                        analysis.overall_score,
                      )}`}
                    >
                      {analysis.overall_score}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {analysis.job_description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      Click to view details
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(analysis.id);
                      }}
                      className="p-2 rounded-lg hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
