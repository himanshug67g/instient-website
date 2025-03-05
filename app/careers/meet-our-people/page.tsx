"use client";

import { Card, CardContent} from "@/components/ui/card";
import { MeetOurPeopleSection } from "@/components/ui/MeetOurPeopleSection";
import { Footer } from "@/components/ui/footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface MeetOurPeopleData {
  Title: string;
  Description: string;
  Content_Title: string;
  Image: {
    url: string;
  };
}

export default function MeetOurPeople() {
  const [meetOurPeopleData, setMeetOurPeopleData] = useState<MeetOurPeopleData | null>(null);
  const pathname = usePathname();
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  useEffect(() => {
    const fetchMeetOurPeopleData = async () => {
      if (!apiToken) return;
      try {
        const response = await fetch("https://dev-api.instient.ai/api/meetourpeoplepage?populate=*", {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMeetOurPeopleData(data.data);
      } catch (error) {
        console.error("Failed to fetch meet our people data:", error);
      }
    };

    fetchMeetOurPeopleData();
  }, [pathname, apiToken]);

  if (!meetOurPeopleData) {
    return (
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
        <Image
          src={`https://dev-api.instient.ai${meetOurPeopleData.Image.url}`}
          alt="Meet Our People Image"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-10"
        />

        <div className="my-64 sm:my-64 relative z-10">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu opacity-95">
            <CardContent>
              <p className="text-4xl py-24 sm:py-20 font-ubuntu font-medium">{meetOurPeopleData.Title}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-32 sm:mt-24 sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu">{meetOurPeopleData.Description}</p>
      </div>

      <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-16 mb-10 ">
        <h2 className="text-3xl font-ubuntu sm:text-left px-6 sm:mb-16">{meetOurPeopleData.Content_Title}</h2>

        <MeetOurPeopleSection />
      </div>

      <Footer />
    </main>
  );
}