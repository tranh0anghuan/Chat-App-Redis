"use client"

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const AuthButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex gap-3 flex-1 md:flex-row flex-col relative z-50">
      <RegisterLink className="flex-1" onClick={() => setIsLoading(true)}>
        <Button className="w-full" variant={"outline"} disabled={isLoading}>
          Sign up
        </Button>
      </RegisterLink>
      <LoginLink className="flex-1" onClick={() => setIsLoading(true)}>
        <Button className="w-full" disabled={isLoading}>
          Log in
        </Button>
      </LoginLink>
    </div>
  );
};

export default AuthButton;
