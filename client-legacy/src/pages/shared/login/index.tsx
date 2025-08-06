import { MagicCard } from "@/components/magicui/magic-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import HeroSection from "@/components/hero-section";
import { Input } from "@/components/ui/input";
import supabase from "@/config/supabase-client";
import { useAuth } from "@/contexts/auth-context";
import {
  type MagicLinkField,
  requestValidator,
  type LoginField,
} from "@/lib/validator";
import { fetchUserProfileWithRoleById } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUserRound, Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { useState, type FC } from "react";
import { AlertCircle } from "react-feather";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { TUserRoleName } from "@/types";

const Login: FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const { login } = useAuth();

  const loginForm = useForm<LoginField>({
    resolver: zodResolver(requestValidator.login),
    defaultValues: { email: "", password: "" },
  });

  const magicLinkForm = useForm<MagicLinkField>({
    resolver: zodResolver(requestValidator.magicLink),
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = loginForm;

  const redirectBasedOnRole = (role: TUserRoleName) => {
    switch (role) {
      case "manager":
        navigate("/manager/clients", { replace: true });
        break;
      case "superadmin":
        navigate("/users", { replace: true });
        break;
      case "client":
        navigate("/client/referral", { replace: true });
        break;
      default:
        navigate("/client/referral", { replace: true });
    }
  };

  const onSubmit: SubmitHandler<LoginField> = async (credentials) => {
    const { data, error } = await login(credentials);

    if (error) {
      toast.error("Log in", {
        description: error.message,
      });
      return;
    }

    const { profile, error: profileWithRoleQueryError } =
      await fetchUserProfileWithRoleById(data.user.id);

    if (profileWithRoleQueryError) {
      toast.error("Log in", {
        description: "Invalid login credentials",
      });
      return;
    }

    // Redirect based on the role of the user
    redirectBasedOnRole(profile.user_role.name as TUserRoleName);
  };

  async function handleMagicLinkSubmit(values: MagicLinkField) {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: values.email,
        options: {
          // set this to false if you do not want the user to be automatically signed up
          shouldCreateUser: false,
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        toast.error(error.name, {
          description: error.message,
        });
      }

      toast.success("Log In", {
        description: "We have sent the magic link, please check you inbox.",
      });
    } catch {
      toast.error("Login", { description: "Something went wrong!" });
    }
  }

  return (
    <div className="min-h-screen flex items-center w-full h-full">
      <HeroSection
        header="Welcome Back"
        subheader="Sign in to your account to access your virtual space."
        items={{
          first: "Enter your credentials",
          second: "Access your personalized office",
          third: "Collab with your team seamlessly",
        }}
      />
      <div className="w-full h-full flex flex-col items-center">
        <MagicCard
          gradientColor={"#7643ea30"}
          className="w-full h-screen md:px-0 flex flex-col items-center justify-center"
        >
          <div className="flex items-center justify-center mb-8">
            {/* <img src="/icon.webp" alt="Logo" className="h-12" /> */}
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
              {errors.root && (
                <Alert variant="destructive" className="mb-4 flex items-center">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.root.message}</AlertDescription>
                </Alert>
              )}
              <Form {...loginForm}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <FormField
                    control={loginForm.control}
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

                  <div className="relative">
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Password</FormLabel>
                            <div className="text-right space-y-0 mt-0 pb-2">
                              <Link
                                to="/forget-password"
                                className="text-xs text-purple-600 hover:underline"
                              >
                                Forgot Password?
                              </Link>
                            </div>
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              type={showPassword ? "password" : "text"}
                              placeholder="Enter your password"
                              className="bg-transparent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-5 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
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

                  <Button
                    type="submit"
                    className="w-full bg-[#7643ea] hover:bg-[#5f35c6]"
                    disabled={
                      isSubmitting ||
                      loginForm.getValues("email").length === 0 ||
                      loginForm.getValues("password").length === 0
                    }
                  >
                    {isSubmitting ? (
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
                      magicLinkForm.getValues("email").length === 0
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
};

export default Login;
