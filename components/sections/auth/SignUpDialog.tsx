"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { register } from "@/lib/services/auth";
import { Logo } from "@/components/logo";

const SignUpDialog = () => {
  const { toast } = useToast();
  const [details, setDetails] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState({
    message: "",
    data: [],
  });

  const onChange = (e: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    e.preventDefault();

    setDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    register(details)
      .then((res) => console.log(res))
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "",
        });
      });
  };

  return (
    <DialogContent className="text-white">
      <DialogHeader>
        {/* <Logo /> */}
        <DialogTitle className="text-3xl font-bold">Sign Up</DialogTitle>
      </DialogHeader>

      {error.message && (
        <p className="text-sm text-center text-red-500">{error.message}</p>
      )}

      <form onSubmit={onSubmit} className="w-full flex flex-col gap-2">
        <Input name="email" onChange={onChange} placeholder="Email" />
        <Input name="username" onChange={onChange} placeholder="Username" />
        <Input
          name="password"
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
        <Input
          name="confirmPassword"
          onChange={onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </DialogContent>
  );
};

export default SignUpDialog;
