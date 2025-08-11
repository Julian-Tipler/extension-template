// import React, { ChangeEvent, useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import supabase from "../../clients/supabase";
// import { CopilotDisplay } from "../../components/CopilotDisplay";
// import { Tables } from "../../types/database.types";
// import { useLoginContext } from "../../contexts/LoginContext";
// import { MdError } from "react-icons/md";
// import CopilotForm from "../../components/CopilotForm";
// import Button from "../../components/Button";
// import { ROUTES, COLORS } from "../../helpers/constants";
// import { useAuthContext } from "../../contexts/AuthContext";
// import WiseLink from "../../components/WiseLink";
// import classNames from "classnames";
// import { TemporaryDowntimeOverlay } from "../../components/TemporaryDowntimeOverlay";

// export const BuildCopilotSection = ({
//   webUrl = "",
//   className,
// }: {
//   webUrl?: string;
//   className?: string;
// }) => {
//   const { session } = useAuthContext();
//   const [url, setUrl] = useState(webUrl);
//   const [copilot, setCopilot] = useState<Tables<"copilots"> | null>(null);
//   const [title, setTitle] = useState("");
//   const [customPrompt, setCustomPrompt] = useState("");
//   const [errors, setErrors] = useState<string[]>([]);
//   const [searchParams] = useSearchParams();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const copilotId = searchParams.get("copilot-id");
//   const [selectedColor, setSelectedColor] = useState(COLORS[0].hex);
//   const primaryColor = selectedColor;

//   useEffect(() => setUrl(webUrl), [webUrl]);

//   const handleColorChange = (color: string) => {
//     setSelectedColor(color);
//   };

//   const { modalLogin } = useLoginContext();

//   const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     const errors = validateForm({ url, primaryColor });

//     if (errors.length > 0) {
//       setLoading(false);
//       setErrors(errors);

//       return;
//     } else {
//       setErrors([]);
//       const {
//         data,
//         error,
//       }: {
//         data: {
//           copilot: Tables<"copilots"> | null;
//           errorMessage: string | null;
//         } | null;
//         error: Error | null;
//       } = await supabase.functions.invoke("copilots/init-copilot", {
//         method: "POST",
//         body: {
//           url,
//           primaryColor,
//           title,
//           customPrompt,
//         },
//       });

//       if (error) {
//         setLoading(false);
//         console.error(error);
//         setErrors(["An error occurred. Please try again later"]);
//       }

//       if (data?.errorMessage) {
//         setLoading(false);
//         setErrors([data.errorMessage]);
//       }

//       if (data?.copilot?.id) {
//         setCopilot(data.copilot);
//         setTitle(data.copilot.title ?? "");
//         setCustomPrompt(data.copilot.customPrompt ?? "");
//         setLoading(false);
//         const queryParams = new URLSearchParams();

//         queryParams.set("copilot-id", data.copilot.id);
//         const queryString = queryParams.toString();

//         navigate(`/?${queryString}`);
//       }
//     }
//   };

//   const claimCopilot = (e: React.FormEvent<HTMLButtonElement>) => {
//     e.preventDefault();

//     // If the user is logged in, navigate to the copilot dashboard
//     if (session) {
//       navigate(`${ROUTES.dashboard.copilots.path}/${copilotId}`);
//     } else {
//       // Otherwise, open the login modal
//       modalLogin(`${ROUTES.dashboard.copilots.path}/${copilotId}`);
//     }
//   };

//   return (
//     <div
//       className={classNames(
//         "mx-auto grid max-w-screen-xl grid-cols-1 gap-24 px-4 py-16 lg:grid-cols-2 lg:px-6 lg:py-36",
//         className,
//       )}
//     >
//       <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-start">
//         <h2 className="mb-4 text-5xl font-normal text-gray-900 dark:text-white">
//           Meet Your AI Assistant
//         </h2>
//         <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
//           Our demo will scan 100 pages from your website to train your new
//           chatbot. Once it&apos;s finished loading, ask it anything about your
//           site!
//         </p>
//         <form className="flex w-4/5 flex-col gap-2">
//           <CopilotForm
//             url={url}
//             setUrl={setUrl}
//             title={title}
//             customPrompt={customPrompt}
//             setTitle={setTitle}
//             setCustomPrompt={setCustomPrompt}
//             handleColorChange={handleColorChange}
//             selectedColor={selectedColor}
//             predefinedColors={COLORS}
//             copilotId={copilotId}
//           />
//           <div className="min-h-8">
//             {errors.map((error) => (
//               <p
//                 key={error}
//                 className="flex flex-row items-center gap-2 text-red-600"
//               >
//                 <span>
//                   <MdError />
//                 </span>
//                 <span>{error}</span>
//               </p>
//             ))}
//           </div>
//           {copilot ? (
//             copilot.userId ? (
//               <WiseLink
//                 to={`${ROUTES.dashboard.copilots.path}/${copilot.id}`}
//                 className="mr-3 inline-flex items-center justify-center px-5 py-3"
//               >
//                 View in dashboard
//                 <svg
//                   className="-mr-1 ml-2 h-5 w-5"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   ></path>
//                 </svg>
//               </WiseLink>
//             ) : (
//               <button
//                 onClick={(e) => claimCopilot(e)}
//                 className="mr-3 inline-flex items-center justify-center rounded-lg bg-green-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
//               >
//                 Claim my copilot
//                 <svg
//                   className="-mr-1 ml-2 h-5 w-5"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   ></path>
//                 </svg>
//               </button>
//             )
//           ) : (
//             <>
//               <Button
//                 onClick={(e) => onSubmit(e)}
//                 loading={loading}
//                 className="mr-3 inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
//               >
//                 {import.meta.env.VITE_FF_TEMPORARY_DOWNTIME && (
//                   <TemporaryDowntimeOverlay />
//                 )}
//                 Demo my chatbot
//                 <svg
//                   className="-mr-1 ml-2 h-5 w-5"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
//                     clipRule="evenodd"
//                   ></path>
//                 </svg>
//               </Button>
//               <p className="text-center text-sm font-light text-gray-600">
//                 No Login Required!
//               </p>
//             </>
//           )}
//         </form>
//       </div>
//       <div className="flex items-center justify-center">
//         <div className="relative flex min-w-[250px] items-center md:min-w-[360px]">
//           {copilotId && <CopilotDisplay />}
//           {!copilotId && (
//             <>
//               <div className="absolute inset-[-5px] rounded-lg bg-white bg-opacity-20 backdrop-blur-sm"></div>
//               <img
//                 src="/copilot.png"
//                 alt="Picture of a copilot"
//                 width={470}
//                 loading="lazy"
//               />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const validateForm = ({
//   url,
//   primaryColor,
// }: {
//   url: string;
//   primaryColor: string;
// }) => {
//   if (!url) {
//     return ["url is required"];
//   }

//   if (primaryColor.length !== 7 || !/^#[0-9A-F]{6}$/i.test(primaryColor)) {
//     return ["color must be a valid hex code"];
//   }

//   return [];
// };
