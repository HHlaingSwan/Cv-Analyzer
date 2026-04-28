"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesGrid } from "@/components/features-grid";
import { HowItWorks } from "@/components/how-it-works";
import { UserTypeToggle } from "@/components/user-type-toggle";
import { Footer } from "@/components/footer";

const Home = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [userType, setUserType] = useState<"recruiter" | "jobseeker">(
    "recruiter",
  );

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="relative flex flex-col min-h-screen">
      <Header />
      <HeroSection userType={userType} />
      <FeaturesGrid />
      <HowItWorks />
      <Footer />
      <div className="fixed bottom-8 z-30 left-0 right-0">
        <UserTypeToggle userType={userType} onUserTypeChange={setUserType} />
      </div>
    </div>
  );
};

export default Home;
