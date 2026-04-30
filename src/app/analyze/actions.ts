"use server";

import { createClient } from "@/lib/supabase/server";
import {
  CV_ANALYSIS_SYSTEM_PROMPT,
  CV_ANALYSIS_USER_PROMPT,
} from "@/lib/ai/prompts";
import { analyzeCVWithOpenRouter, AnalysisResult } from "@/lib/ai/openrouter";
import { extractTextFromPdf } from "@/lib/pdf-text-extraction";
import { revalidatePath } from "next/cache";

export async function uploadCV(file: File, userId: string) {
  const supabase = await createClient();

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("cv-previews")
      .upload(fileName, file);

    if (error) {
      throw new Error(`Failed to upload CV: ${error.message}`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("cv-previews").getPublicUrl(fileName);

    return { fileUrl: publicUrl, path: data.path };
  } catch (error) {
    console.error("Error uploading CV:", error);
    throw error;
  }
}

export async function analyzeCV(formData: FormData) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const jobTitle = formData.get("jobTitle") as string;
    const jobDescription = formData.get("jobDescription") as string;
    const cvFile = formData.get("cvFile") as File;

    if (!jobTitle || !jobDescription || !cvFile) {
      throw new Error("Missing required fields");
    }

    console.log("📤 Uploading CV to Supabase Storage...");
    // Upload CV to Supabase Storage
    const { fileUrl, path } = await uploadCV(cvFile, user.id);
    console.log("✅ CV uploaded successfully");

    console.log("📄 Converting PDF to array buffer...");
    // Convert PDF to array buffer
    const arrayBuffer = await cvFile.arrayBuffer();
    console.log("✅ PDF converted to array buffer");

    console.log("🔍 Extracting text from PDF...");
    // Extract text from PDF
    const cvText = await extractTextFromPdf(arrayBuffer);
    console.log("✅ Text extracted from PDF");

    console.log("🤖 Analyzing CV with OpenRouter AI...");
    // Analyze CV with OpenRouter
    const userPrompt = CV_ANALYSIS_USER_PROMPT(
      jobTitle,
      jobDescription,
      jobDescription,
      cvText,
    );

    const analysisResult = await analyzeCVWithOpenRouter(
      CV_ANALYSIS_SYSTEM_PROMPT,
      userPrompt,
    );
    console.log("✅ AI analysis complete");

    console.log("💾 Saving analysis to database...");
    // Save analysis to database
    const { data: analysis, error: dbError } = await supabase
      .from("analyses")
      .insert({
        user_id: user.id,
        job_title: jobTitle,
        job_description: jobDescription,
        responsibilities: jobDescription,
        cv_file_url: fileUrl,
        cv_image_url: "",
        analysis_result: analysisResult,
        overall_score: analysisResult.overall_score,
      })
      .select()
      .single();

    if (dbError) {
      throw new Error(`Failed to save analysis: ${dbError.message}`);
    }

    console.log("✅ Analysis saved to database");
    console.log("🎉 CV analysis complete!");

    revalidatePath("/analyses");
    revalidatePath(`/analyze/${analysis.id}`);

    return { success: true, analysisId: analysis.id };
  } catch (error) {
    console.error("Error analyzing CV:", error);
    throw error;
  }
}

export async function getAnalyses() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("analyses")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch analyses: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching analyses:", error);
    throw error;
  }
}

export async function getAnalysisById(id: string) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("analyses")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch analysis: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching analysis:", error);
    throw error;
  }
}

export async function deleteAnalysis(id: string) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from("analyses")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      throw new Error(`Failed to delete analysis: ${error.message}`);
    }

    revalidatePath("/analyses");

    return { success: true };
  } catch (error) {
    console.error("Error deleting analysis:", error);
    throw error;
  }
}
