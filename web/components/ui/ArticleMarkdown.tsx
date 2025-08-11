import Markdown from "react-markdown";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const ArticleMarkdown = ({ content }: { content: string }) => {
  return (
    <div className="font-light">
      <Markdown
        components={{
          h1: ({ children }) => (
            <h1 className="my-4 text-3xl font-bold">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="my-2 text-2xl font-semibold">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="my-2 text-xl font-semibold">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="my-2 text-lg font-semibold">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="my-5 text-base leading-7 ">{children}</p>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-blue-500 hover:underline">
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          ol: ({ children }) => (
            <ol className="my-4 ml-8 list-decimal">{children}</ol>
          ),
          ul: ({ children }) => (
            <ul className="my-4 ml-8 list-disc">{children}</ul>
          ),
          li: ({ children }) => (
            <li
              className="
            my-2
            text-base
            "
            >
              {children}
            </li>
          ),
          code: ({ children }) => (
            <SyntaxHighlighter
              language="javascript"
              style={atomOneDark}
              customStyle={{
                fontSize: ".75rem",
                padding: "2rem 2rem",
                borderRadius: "0.5rem",
              }}
            >
              {String(children)}
            </SyntaxHighlighter>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};
