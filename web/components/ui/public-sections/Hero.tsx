// import { RotatingMessages } from "../RotatingMessages";
import Section, { Variant } from "../layout/Section";
import { BRAND_NAME, MAIN_TAGLINE, SUB_TAGLINE } from "@/lib/siteConfig";
// import { Button } from "../Button";
import { SubText } from "../text/SubText";
import Spacer from "../Spacer";
import { SupportingText } from "../text/SupportingText";
import { TitleText } from "../text/TitleText";
// import { IconColor } from "../icons/IconColor";
import MomPurchaser from "../MomPurchaser";

export const Hero = ({ variant = "primary" }: { variant?: Variant }) => {
  return (
    <Section id="home" variant={variant} className="relative overflow-hidden">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-40 px-4 py-24 md:px-24 lg:grid-cols-2 lg:px-6 lg:py-28">
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
          <SubText className="text-tertiary">
            Get {BRAND_NAME} for free!
          </SubText>
          {/* <p className="mt-1 text-center text-sm font-light text-gray-500">
            No login required!
          </p> */}
        </div>
        <MomPurchaser />
      </div>
    </Section>
  );
};
