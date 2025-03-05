import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Footer } from "@/components/ui/footer";
import Image from 'next/image'; // Importing Image

async function fetchTermsOfUsePageData() {
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

  const response = await fetch(
    `https://api.instient.ai/api/termsofusepage?populate=*`, 
    {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  // Return the page data or null if no data found
  return data?.data ?? null;
}

export default async function TermsOfUsePage() {
  const termsOfUseData = await fetchTermsOfUsePageData();

  // If no data or malformed data, show an error message
  if (!termsOfUseData || !termsOfUseData.Title || !termsOfUseData.header || !termsOfUseData.Description) {
    return <p className="text-center mt-20">Some required fields are missing or the page does not exist.</p>;
  }

  // Destructure attributes safely
  const { Title, header, Description, content1, content1_answer, content2, content2_answer,content3, content3_answer, content4, content4_answer,content5, content5_answer, content6, content6_answer, content7, content7_answer, content8, content8_answer, content9, content9_answer, content10, content10_answer,conclusion, Image: { url } = {},  } = termsOfUseData;

  return (
    <main>
      <div className="w-full h-[425px] sm:h-[450px]  p-6 font-ubuntu relative">
        <Image
            src={url ? `https://api.instient.ai${url}` : '/default-image.png'} // Use default image if url is undefined
            alt="Background Image"
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover" // Ensuring the image covers the background and stays behind content
         />
        
        <div className="my-64 sm:my-64">
          <Card className="lg:w-[600px] sm:w-[650px] bg-gradient-to-b from-[#3c83c1] to-[#459ae5] text-white font-ubuntu">
            <CardHeader>
              <CardTitle className="text-base font-light">{header}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl py-6 sm:py-0 mb-12 sm:mb-24 font-ubuntu font-medium">{Title}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-44 sm:mt-24 w-[90%] sm:w-[60%]">
        <p className="text-2xl px-6 font-ubuntu">{Description}</p>
      </div>

      <Section contentTitle={content1} contentAnswer={content1_answer} />
      <Section contentTitle={content2} contentAnswer={content2_answer} />
      <Section contentTitle={content3} contentAnswer={content3_answer} />
      <Section contentTitle={content4} contentAnswer={content4_answer} />
      <Section contentTitle={content5} contentAnswer={content5_answer} />
      <Section contentTitle={content6} contentAnswer={content6_answer} />
      <Section contentTitle={content7} contentAnswer={content7_answer} />
      <Section contentTitle={content8} contentAnswer={content8_answer} />
      <Section contentTitle={content9} contentAnswer={content9_answer} />
      <Section contentTitle={content10} contentAnswer={content10_answer} />
    

      <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-10 mb-10">
        <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-6">Conclusion</h2>
        <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-10 sm:mt-2 w-[90%] sm:w-[60%]">
          <p className="text-xl px-3 sm:p-0 font-ubuntu">{conclusion}</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function Section({ contentTitle, contentAnswer }: { contentTitle: string; contentAnswer: string }) {
  return (
    <div className="sm:px-6 px-3 py-4 mt-10 sm:mt-10 sm:mb-10 mb-10">
      <h2 className="text-3xl font-medium font-ubuntu sm:text-left px-6">{contentTitle}</h2>
      <div className="container sm:p-6 py-6 px-3 font-ubuntu mt-10 sm:mt-2 w-[90%] sm:w-[60%]">
        <p className="text-xl px-3 sm:p-0 font-ubuntu">{contentAnswer}</p>
      </div>
    </div>
  );
}
