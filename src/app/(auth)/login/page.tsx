"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import Image from "next/image";
import Logo from 'public/logo.svg';

/**
 * Login page component that handles user authentication
 * Shows a local illustration if available, otherwise fetches a random finance illustration from Unsplash.
 * Implements form validation using zod and react-hook-form.
 * @returns {JSX.Element} Login page component
 */
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // State to handle image fallback
  const [imgSrc, setImgSrc] = useState("/image-01.png");

  /**
   * Handles image loading error by setting a random finance illustration from Unsplash.
   */
  const handleImgError = () => {
    setImgSrc("https://source.unsplash.com/featured/300x300?finance,money,accounting");
  };

  /**
   * Handles form submission
   * @param {z.infer<typeof loginSchema>} values - Form values
   */
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      const success = await authService.login(values);
      
      if (success) {
        router.push("/finance");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-4xl rounded-lg shadow-lg bg-white overflow-hidden">
        {/* Illustration Section */}
        <div className="hidden md:flex flex-col justify-center items-center bg-muted p-8 w-1/2">
          <img
            src={imgSrc}
            alt="Finance Illustration"
            className="max-w-xs w-full h-auto object-contain"
            width={300}
            height={300}
            onError={handleImgError}
            data-testid="finance-illustration"
          />
          <h2 className="mt-6 text-2xl font-semibold text-primary text-center">
            Manage your finances with ease
          </h2>
        </div>
        {/* Login Form Section */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
          <Card className="w-full max-w-md shadow-none border-0">
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Enter your email and password to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                            disabled={isLoading}
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
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-between">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Forgot password?
                    </Link>
                    <Link
                      href="/register"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Don&apos;t have an account?
                    </Link>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 