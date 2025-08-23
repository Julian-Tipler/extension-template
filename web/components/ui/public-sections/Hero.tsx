// import { RotatingMessages } from "../RotatingMessages";
import Section, { Variant } from "../layout/Section";
import { BRAND_NAME, MAIN_TAGLINE, SUB_TAGLINE } from "@/lib/siteConfig";
// import { Button } from "../Button";
import { SubText } from "../text/SubText";
import Spacer from "../Spacer";
import { SupportingText } from "../text/SupportingText";
import { TitleText } from "../text/TitleText";
import { Indie_Flower } from "next/font/google";

// Initialize the handwritten font
const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// import { IconColor } from "../icons/IconColor";
// import { IconColor } from "../icons/IconColor";

export const Hero = ({ variant = "primary" }: { variant?: Variant }) => {
  return (
    <Section id="home" variant={variant} className="relative overflow-hidden">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-20 px-4 py-24 md:px-24 lg:grid-cols-2 lg:px-6 lg:py-28">
        <div className="flex flex-col items-center justify-center text-center font-light sm:text-lg lg:items-start lg:text-start">
          <TitleText>
            <span className="font-extrabold text-primary">{BRAND_NAME}</span>
            <span>{MAIN_TAGLINE}</span>
          </TitleText>
          <SupportingText>{SUB_TAGLINE}</SupportingText>
          {/* <div className="mt-10 flex h-fit flex-wrap items-center justify-center gap-2"> */}
          {/* {import.meta.env.VITE_SUPABASE_URL && <TemporaryDowntimeOverlay />} */}
          {/* <input
              id="name"
              //   value={url}
              //   onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-website.com"
              className="min-w-72 rounded-md border border-gray-300 p-2 text-base shadow-sm focus:border-blue-500 focus:ring-blue-500"
              //   onKeyDown={handleKeyPress}
            /> */}
          {/* </div> */}
          <Spacer size={"small"} />
          <a
            href="#mom-purchaser"
            className="hover:opacity-80 transition-opacity"
          >
            <SubText className="text-tertiary cursor-pointer underline">
              Get {BRAND_NAME} for free!
            </SubText>
          </a>
          {/* <p className="mt-1 text-center text-sm font-light text-gray-500">
            No login required!
          </p> */}
        </div>
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="absolute -top-16 -left-56 z-10 text-primary font-semibold">
              <span className={`text-xl ${indieFlower.className} text-tertiary`}>Don't make Mom sad!</span>
              <svg
                className="w-32 h-24 text-tertiary"
                viewBox="0 0 160 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: "absolute", top: "10px", left: "100px" }}
              >
                <path
                  d="M10 5 C40 10, 80 15, 155 70"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ fill: "none" }}
                />
                <path
                  d="M145 55 L155 70 L140 65"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ fill: "none" }}
                />
              </svg>
            </div>
            <img
              src="https://fdorughcnbbgdletmlut.supabase.co/storage/v1/object/public/assets/hero-image.png"
              alt="Hero Image"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};
