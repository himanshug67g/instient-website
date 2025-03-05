"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import CaseStudySection from "@/components/ui/CasestudySection";
import { usePathname } from 'next/navigation';
import Image from "next/image";

interface CaseStudyData {
  Title: string;
  Description: string;
  Content_Header: string;
  Image: {
    url: string;
  };
}

export default function CaseStudies() {
  const [caseStudyData, setCaseStudyData] = useState<CaseStudyData | null>(null);
  const pathname = usePathname();
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  useEffect(() => {
    const fetchCaseStudyData = async () => {
      if (!apiToken) return;
      try {
        const response = await fetch("https://dev-api.instient.ai/api/casestudypage?populate=*", {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          }
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCaseStudyData(data.data);
      } catch (error) {
        console.error("Failed to fetch case study data:", error);
      }
    };

    fetchCaseStudyData();
  }, [pathname, apiToken]);

  if (!caseStudyData) {
    return (
      // Loading spinner
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  return (
    <main>


      <div className="w-full h-[425px] sm:h-[450px] p-6 font-ubuntu relative">
        {/* Background Image */}
        <Image 
          src={`https://dev-api.instient.ai${caseStudyData.Image.url}`} // Dynamically set the full image URL from the API
          alt="Career Image"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />

        {/* Content */}
        <div className="my-64 sm:my-64">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu">
            <CardContent>
              <p className="text-4xl py-24 sm:py-20 font-ubuntu font-medium">
                {caseStudyData.Title}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-32 sm:mt-24 sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu">
          {caseStudyData.Description}
        </p>
      </div>

      <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-16 mb-10">
        <h2 className="text-3xl font-ubuntu sm:text-left px-6">
          {caseStudyData.Content_Header}
        </h2>
        <CaseStudySection />
      </div>

      <Footer />
    </main>
  );
}
