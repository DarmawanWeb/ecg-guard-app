"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";

const formLoginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type UserFormValue = z.infer<typeof formLoginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formLoginSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (response?.error) {
        alert("Invalid email or password");
      } else if (response?.ok) {
        const session = await getSession();
        const userRole = session?.user?.role;

        if (userRole === "USER") {
          router.push("/user");
        } else if (userRole === "ADMIN") {
          router.push("/admin");
        } else {
          alert("Role not assigned correctly.");
        }
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Login error: ", error);
      alert("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-3 z-10 relative"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="ml-auto w-full" type="submit">
          {loading ? "Loading..." : "Login"}
        </Button>

        <div className="flex gap-2 pt-2 text-sm">
          <h3>Doesn't have an account?</h3>
          <Link
            href="/signup?id=1"
            className="underline underline-offset-4 hover:text-primary"
          >
            Register as User
          </Link>
        </div>

        <Link
          href="/forgotpassword"
          className="text-sm underline underline-offset-4 hover:text-primary"
        >
          Forgot password
        </Link>
      </form>
    </Form>
  );
}
