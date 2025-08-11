"use client";

import { useState, FormEvent } from "react";

import { MdCheckCircle, MdError } from "react-icons/md";
import { Button } from "./Button";

export const ContactForm = () => {
  const [name, setName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError(false);
    setSuccess(false);

    const response = await fetch("/api/mail/send-contact-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        userEmail,
        message,
      }),
    });

    if (!response.ok) {
      setError(true);
      setName("");
      setUserEmail("");
      setMessage("");
      const errorData = await response.json();
      const errorMsg = errorData?.error || "Failed to send contact email";
      console.log(errorMsg);
      throw new Error(errorMsg);
    }
    setSuccess(true);
    setName("");
    setUserEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-500 text-sm font-light mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-3 py-2 border font-light rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {/* Email field */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-500 text-sm font-light mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-3 font-light py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>
      {/* Message field */}
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-gray-500 text-sm font-light mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-3 py-2 border font-light rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      {/* Submit button */}
      <Button type="submit" className="w-full">
        Send Message
      </Button>
      {error && (
        <p className="text-red-600 flex gap-2 items-start mt-4">
          <MdError size={34} />
          An error occurred while sending the message. Please try again later.
        </p>
      )}
      {success && (
        <p className="text-green-600 flex flex-row gap-2 items-center mt-4">
          <MdCheckCircle size={18} />
          Sent! We&apos;ll reach out to you soon!
        </p>
      )}
    </form>
  );
};
