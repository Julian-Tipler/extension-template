import Link from "next/link";
import React from "react";
import { Button } from "./Button";

const MySettingsButton: React.FC = () => {
  return (
    <Button size="sm" variant="primary" asChild>
      <Link href="/protected/settings">Settings</Link>
    </Button>
  );
};

export default MySettingsButton;
