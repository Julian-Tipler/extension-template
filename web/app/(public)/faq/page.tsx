"use client";

import Link from "next/link";

import { Accordion } from "@/components/ui/Accordion";
import { ROUTES } from "@/components/util/routes";
import Section from "@/components/ui/layout/Section";

const FAQ_QUESTIONS = [
  {
    question: "What is WisePilot?",
    answer: (
      <>
        <p className="text-gray-500 mb-2 text-md font-light">
          WisePilot is a conversational AI chatbot that helps your website
          visitors find the information they need quickly and easily.
        </p>
        <p className="text-gray-500 mb-2 text-md font-light">
          WisePilot can suggest products, find certain pages, and even handle
          some customer complaints. It uses large language models to understand
          the content on your website and answer questions from your users.
        </p>
      </>
    ),
  },
  {
    question: "What makes WisePilot different than other chatbot solutions?",
    answer: (
      <p className="text-gray-500 mb-2 text-md font-light">
        WisePilot is ridiculously easy to set up and use. You don&apos;t need to
        be a developer or have any technical skills to get started. Just follow
        the simple setup instructions, and you&apos;ll have a powerful AI
        chatbot on your website in no time!
      </p>
    ),
  },
  {
    question: "How do I set up WisePilot?",
    answer: (
      <>
        <p className="text-gray-500 mb-2 text-md font-light">
          1.{" "}
          <Link className="text-blue-600" href="/dashboard/copilots">
            Create an account or login
          </Link>{" "}
          to access the dashboard.
        </p>
        <p className="text-gray-500 mb-2 text-md font-light">
          2. Click the &quot;+ Create&quot; button. Enter your website’s home
          URL and click “Create”.
        </p>
        <p className="text-gray-500 mb-2 text-md font-light">
          3. Choose a plan and enter payment information. WisePilot will begin
          training itself on your website immediately. This will take between 20
          seconds and a few minutes depending on the size of your website.
        </p>
        <p className="text-gray-500 mb-2 text-md font-light">
          4. Copy paste the code snippet into the{" "}
          <code>{`<head> </head>`}</code> tag of your website and WisePilot will
          begin displaying on your website immediately.
        </p>
      </>
    ),
  },
  {
    question: "How does WisePilot work?",
    answer: (
      <p className="text-gray-500 mb-2 text-md font-light">
        WisePilot uses the latest large language model (LLM) technology to read
        and understand the content on your website. It draws from this knowledge
        to answer your users questions.
      </p>
    ),
  },
  {
    question: "Is my website right for WisePilot?",
    answer: (
      <>
        <p className="text-gray-500 mb-2 text-md font-light">
          WisePilot is designed to work with any public facing website. It is
          especially useful for websites with a lot of text content or complex
          navigation.
        </p>

        <p className="text-gray-500 mb-2 text-md font-light">
          For security purposes, WisePilot only reads and stores publicly
          available information. It is not meant to read and understand
          authenticated information, such as users&apos; account data or private
          pages.
        </p>

        <p className="text-gray-500 mb-2 text-md font-light">
          If you would like to discuss a custom solution that <b>does</b> work
          with protected information, please contact us{" "}
          <Link className="text-blue-600" href="/contact">
            here
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    question: "Is WisePilot secure?",
    answer: (
      <p className="text-gray-500 mb-2 text-md font-light">
        Yes. WisePilot only uses publicly available information (information
        already publicly displayed on your site).
      </p>
    ),
  },
  {
    question: "How do I customize WisePilot?",
    answer: (
      <p className="text-gray-500 mb-2 text-md font-light">
        You can change the color scheme and title of the bot to match your
        website&apos;s design. If you would like to suggest additional
        modifications, please send us your suggestion{" "}
        <Link className="text-blue-600" href="/contact">
          here
        </Link>
        !
      </p>
    ),
  },
  {
    question: "What if I update my website after setting up WisePilot?",
    answer: (
      <p className="text-gray-500 mb-2 text-md font-light">
        You can re-train WisePilot at any time by logging into your dashboard
        and clicking the &quot;Re-train&quot; button. This will allow WisePilot
        to learn about any new content or changes on your website.
      </p>
    ),
  },
];

const FAQ = () => {
  return (
    <Section id="faq" className="px-6 md:px-12 py-24 items-center">
      <h1 className="mb-4 text-5xl font-medium text-gray-900 dark:text-white leading-tight">
        FAQ
      </h1>
      <p className="text-gray-500 font-light mb-8 text-md">
        Here are some answers to common questions. For more information, try
        asking our chatbot at the bottom right of the page or get in touch{" "}
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          href={ROUTES.public.contact.path}
        >
          here
        </Link>
        .
      </p>
      <div id="accordion-collapse" data-accordion="collapse">
        {FAQ_QUESTIONS.map((question, index) => (
          <Accordion
            key={`accordion-entry-${index}`}
            title={question.question}
            body={question.answer}
            position={
              index === 0
                ? "top"
                : index === FAQ_QUESTIONS.length - 1
                ? "bottom"
                : "middle"
            }
          />
        ))}
      </div>
    </Section>
  );
};

export default FAQ;
