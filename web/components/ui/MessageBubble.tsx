import classNames from "classnames";
import { IconColor } from "./icons/IconColor";

export const MessageBubble = ({
  message,
  className,
  style,
}: {
  message: { role: "user" | "assistant"; content: React.ReactNode };
  className?: string;
  style?: Record<string, string>;
}) => {
  const isUser = message.role === "user";

  return (
    <div
      className={classNames(className, "flex flex-row text-xs ", {
        "self-end": isUser,
        "self-start": !isUser,
      })}
      style={style}
    >
      {!isUser && <IconColor size="42" />}
      <div
        className={classNames("flex flex-col", {
          "items-end": isUser,
          "items-start ml-3": !isUser,
        })}
      >
        <div className="mb-1 text-xs text-slate-600">
          {isUser ? "You" : "AI Assistant"}
        </div>
        <div
          className={classNames(
            "max-w-[23rem] min-w-8 rounded-lg rounded-tl-lg rounded-tr-lg p-4 text-left text-lg font-normal break-words",
            {
              "self-end rounded-bl-lg rounded-br-none bg-primary text-white":
                isUser,
              "rounded-br rounded-bl-none self-start bg-slate-100 text-black":
                !isUser,
            }
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};
