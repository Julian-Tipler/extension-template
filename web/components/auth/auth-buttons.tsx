"use client";
import { Button } from "../ui/Button";
import { LogoutButton } from "./logout-button";
import { useModal } from "@/app/context/ModalContext";
import { useAuth } from "@/app/context/AuthProvider";
import MySettingsButton from "../ui/MySettingsButton";

export function AuthButtons() {
  const { showModal } = useModal();

  const { session } = useAuth();

  return (
    <div className="flex items-center gap-4">
      {session ? (
        <>
          Hey, {session.user.email}!
          <LogoutButton />
          <MySettingsButton />
        </>
      ) : (
        <div className="flex gap-2">
          <Button
            onClick={() => showModal("sign in")}
            size="sm"
            variant={"outline"}
          >
            Sign in
          </Button>
          <Button
            onClick={() => showModal("sign up")}
            size="sm"
            variant={"primary"}
          >
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
}
