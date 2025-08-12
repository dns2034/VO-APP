import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import {
  AlertCircle,
  CircleUserRound,
  Eye,
  EyeOff,
  Loader2,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { MagicCard } from "@/components/magicui/magic-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import supabase from "@/config/supabase-client";
import {
  type LoginSchema,
  type MagicLinkSchema,
  requestValidator,
} from "@/lib/zod-schemas";
import { login } from "@/services/auth.service";

export const Route = createFileRoute("/_guest/auth/login/")({
  component: RouteComponent,
  validateSearch: (search) => {
    return {
      redirect: (search.redirect as string) || undefined,
    };
  },
});

function RouteComponent() {
  const [showPassword, setShowPassword] = useState(true);
  const router = useRouter();
  const search = Route.useSearch();
  const loginForm = useForm<LoginSchema>({
    resolver: zodResolver(requestValidator.login),
    defaultValues: { email: "", password: "" },
  });

  const magicLinkForm = useForm<MagicLinkSchema>({
    resolver: zodResolver(requestValidator.magicLink),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<LoginSchema> = async (credentials) => {
    const { error } = await login(credentials);

    if (error) {
      toast.error("Can't sign you in", {
        description: error.message,
      });
    }

    router.navigate({ to: search.redirect || "/" });
  };

  async function handleMagicLinkSubmit(values: MagicLinkSchema) {
    const { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: false,
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error("Can't send magic link", {
        description: error.message,
      });
    }

    toast.success("Magic link sent!", {
      description: "We have sent the magic link, please check your inbox.",
    });
  }

  return (
    <div className="min-h-screen flex items-center w-full h-full">
      {/* left panel */}
      <BackgroundGradientAnimation containerClassName="hidden lg:block text-primary-foreground">
        <div className="h-full min-h-screen flex flex-col items-center justify-center">
          <div className="w-full h-24 rounded-full flex flex-shrink-0 items-center justify-center mb-8 backdrop-blur-sm">
            <img src="/icon.webp" alt="Logo" className="h-20" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center">Welcome Back</h1>
          <p className="text-xl text-center mb-8 max-w-md text-primary-foreground/80">
            Sign in to your account to access your virtual space.
          </p>

          <div className="space-y-6 w-full max-w-md flex flex-col pl-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-primary-foreground font-bold">1</span>
              </div>
              <p className="text-primary-foreground/90 text-left text-lg">
                Enter your credentials
              </p>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center mr-4">
                <span className="text-primary-foreground font-bold">2</span>
              </div>
              <p className="text-primary-foreground/90 text-left text-lg">
                Access your personalized office
              </p>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center mr-4">
                <span className="text-primary-foreground font-bold">3</span>
              </div>
              <p className="text-primary-foreground/90 text-left text-lg">
                Collab with your team seamlessly
              </p>
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>

      <div className="w-full h-full flex flex-col items-center">
        <MagicCard
          gradientColor={"#7643ea30"}
          className="w-full h-screen md:px-0 flex flex-col items-center justify-center"
        >
          <div className="flex items-center justify-center mb-8">
            <CircleUserRound className="w-12 h-12" />
          </div>
          <h1 className="text-2xl font-bold mb-6 text-center">Log in</h1>
          <p className="text-center text-muted-foreground pb-6 max-w-96">
            Enter your credentials to access your account
          </p>

          <Tabs defaultValue="credentials" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="credentials">Credentials</TabsTrigger>
              <TabsTrigger value="magic-link">Magic Link</TabsTrigger>
            </TabsList>
            <TabsContent value="credentials">
              {loginForm.formState.errors.root && (
                <Alert variant="destructive" className="mb-4 flex items-center">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {loginForm.formState.errors.root.message}
                  </AlertDescription>
                </Alert>
              )}
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter your email" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel>Password</FormLabel>
                          <div className="text-right space-y-0 mt-0 pb-2">
                            <Link
                              to="/auth/forgot-password"
                              className="text-xs text-primary hover:underline"
                            >
                              Forgot Password?
                            </Link>
                          </div>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "password" : "text"}
                              placeholder="Enter your password"
                            />
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    aria-label={
                                      showPassword
                                        ? "Hide password"
                                        : "Show password"
                                    }
                                  >
                                    {showPassword ? (
                                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                      <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{showPassword ? "show" : "hide"}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </FormControl>

                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      loginForm.formState.isSubmitting ||
                      !loginForm.formState.isValid
                    }
                  >
                    {loginForm.formState.isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading
                      </>
                    ) : (
                      "Log in"
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="magic-link">
              <Form {...magicLinkForm}>
                <form
                  onSubmit={magicLinkForm.handleSubmit(handleMagicLinkSubmit)}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <FormField
                      control={magicLinkForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your email"
                              className="bg-transparent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Mail
                          className="h-5 w-5 text-blue-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700 max-w-60">
                          We'll send a magic link to your email that will allow
                          you to sign in without a password.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-500"
                    disabled={
                      magicLinkForm.formState.isSubmitting ||
                      !magicLinkForm.formState.isValid
                    }
                  >
                    {magicLinkForm.formState.isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin" /> Loading
                      </span>
                    ) : (
                      "Send Magic Link"
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </MagicCard>
      </div>
    </div>
  );
}
