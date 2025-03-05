"use client";


import { Card, CardContent } from "@/components/ui/card";
import { CareerPathSection } from "@/components/ui/CareerPathSection";
import { Footer } from "@/components/ui/footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface CareerPathData {
  Title: string;
  Description: string;
  Content_Title: string;
  Image: {
    url: string;
  };
}

export default function CareerPath() {

    const [careerPathData, setCareerPathData] = useState<CareerPathData | null>(null);
    const pathname = usePathname();
    const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  
    useEffect(() => {
      const fetchCareerPathData = async () => {
        if (!apiToken) return;
        try {
          const response = await fetch("https://dev-api.instient.ai/api/careerpathpage?populate=*", {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setCareerPathData(data.data);
        } catch (error) {
          console.error("Failed to fetch career path data:", error);
        }
      };
  
      fetchCareerPathData();
    }, [pathname, apiToken]);
  
    if (!careerPathData) {
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
          src={`https://dev-api.instient.ai${careerPathData.Image.url}`} // Dynamically set the full image URL from the API
          alt="Career Path Image"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-10"
        />

        {/* Content */}
        <div className="my-64 sm:my-64 relative z-10">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu opacity-95">
            <CardContent>
              <p className="text-4xl py-24 sm:py-20 font-ubuntu font-medium">{careerPathData.Title}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-32 sm:mt-24 sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu">{careerPathData.Description}</p>
      </div>

      <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-16 mb-10 ">
        <h2 className="text-3xl font-ubuntu sm:text-left px-6 sm:mb-16">{careerPathData.Content_Title}</h2>

        <CareerPathSection/>

      </div>

      <Footer/>
    </main>
  )
}
