"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { analyzeCV } from "./actions";
import { AnalysisProgress } from "@/components/analysis-progress";
import { Upload, FileText, Briefcase, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/use-auth";

export default function AnalyzePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    cvFile: null as File | null,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      setFormData({ ...formData, cvFile: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.jobTitle || !formData.jobDescription || !formData.cvFile) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsAnalyzing(true);

    const data = new FormData();
    data.append("jobTitle", formData.jobTitle);
    data.append("jobDescription", formData.jobDescription);
    data.append("cvFile", formData.cvFile);

    startTransition(async () => {
      try {
        const result = await analyzeCV(data);
        if (result.success) {
          toast.success("Analysis complete!");
          router.push(`/analyze/${result.analysisId}`);
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Analysis failed");
        setIsAnalyzing(false);
      }
    });
  };

  const handleProgressComplete = (analysisId: string) => {
    // The actual navigation happens in the handleSubmit callback
    // This is just for the progress component lifecycle
  };

  if (isAnalyzing) {
    return (
      <AnalysisProgress
        onComplete={handleProgressComplete}
        isAnalyzing={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground dark:text-white mb-4">
            Analyze Your CV
          </h1>
          <p className="text-lg text-muted-foreground">
            Upload your CV and job details to get AI-powered insights
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div className="space-y-2">
            <label
              htmlFor="jobTitle"
              className="flex items-center gap-2 text-sm font-medium text-foreground dark:text-white"
            >
              <Briefcase className="h-4 w-4" />
              Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
              placeholder="e.g. Senior Software Engineer"
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground dark:text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              required
            />
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <label
              htmlFor="jobDescription"
              className="flex items-center gap-2 text-sm font-medium text-foreground dark:text-white"
            >
              <FileText className="h-4 w-4" />
              Job Description & Responsibilities
            </label>
            <textarea
              id="jobDescription"
              value={formData.jobDescription}
              onChange={(e) =>
                setFormData({ ...formData, jobDescription: e.target.value })
              }
              placeholder="Paste the full job description including responsibilities and requirements here..."
              rows={10}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground dark:text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
              required
            />
          </div>

          {/* CV Upload */}
          <div className="space-y-2">
            <label
              htmlFor="cvFile"
              className="flex items-center gap-2 text-sm font-medium text-foreground dark:text-white"
            >
              <Upload className="h-4 w-4" />
              Upload CV (PDF)
            </label>
            <div className="relative">
              <input
                id="cvFile"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
              <div className="border-2 border-dashed border-input rounded-lg p-8 text-center hover:border-primary transition-colors">
                {formData.cvFile ? (
                  <div className="space-y-2">
                    <FileText className="h-8 w-8 mx-auto text-primary" />
                    <p className="text-sm font-medium text-foreground dark:text-white">
                      {formData.cvFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(formData.cvFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF files only
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6 rounded-lg font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Analyzing...
              </>
            ) : (
              <>
                Start Analysis
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
