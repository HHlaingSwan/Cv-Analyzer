"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesGrid } from "@/components/features-grid";
import { HowItWorks } from "@/components/how-it-works";
import { UserTypeToggle } from "@/components/user-type-toggle";
import { Footer } from "@/components/footer";

const Home = () => {
  const [userType, setUserType] = useState<"recruiter" | "jobseeker">(
    "jobseeker",
  );

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
