"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/services/auth";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useSession } from "@/lib/hooks/use-session";
import { User } from "@/lib/types";
import { Logo } from "@/components/logo";
import { useGame } from "@/lib/hooks";
import { UPDATE_PLAYER } from "@/reducers/types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useReactQuery } from "@/lib/hooks/useReactQueryFn";
import { useReactMutation } from "@/lib/hooks/useReactQueryFn";

const schema = yup.object({
  user: yup.string().required(),
  password: yup.string().required(),
});

const SignInDialog = () => {
  const { toast } = useToast();
  const { dispatch } = useGame();
  const { setUser } = useSession();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useLocalStorage<User | null>("user", null);

  const { mutate, isError, isPending, isSuccess } = useReactMutation(
    "/auth/login",
    "post"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (details: { user: string; password: string }) => {
    mutate(details, {
      onSuccess: ({ data }) => {
        console.log(data);
        dispatch({
          type: UPDATE_PLAYER,
          payload: data.data,
        });
        toast({
          variant: "success",
          title: "Success",
          description: data.message,
        });
        setUser(data.data);
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: "Error",
          variant: "destructive",
          description: error.message,
        });
      },
    });
  };

  return (
    <DialogContent className="text-white">
      <DialogHeader>
        {/* <Logo /> */}
        <DialogTitle className="text-xl font-bold">Sign In</DialogTitle>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <Input
          placeholder="Email/Username"
          {...register("user", { required: true })}
          error={errors.user?.message}
        />
        <Input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
          error={errors.password?.message}
        />
        <Button loading={isPending} type="submit">
          Sign In
        </Button>
      </form>

      <div className="w-full flex justify-between">
        <div className="italics">Forgot password?</div>
      </div>
    </DialogContent>
  );
};

export default SignInDialog;
