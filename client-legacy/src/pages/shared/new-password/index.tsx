import HeroSection from "@/components/hero-section";
import { MagicCard } from "@/components/magicui/magic-card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import supabase from "@/config/supabase-client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangePasswordField, requestValidator } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { resetPassword } from "../services/auth-service";

const NewPassword: FC = () => {
  const navigate = useNavigate();

  // Check if user has valid recovery token
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error("Change Password", {
          description:
            "Invalid or expired link. Please request a new password reset link",
        });

        navigate("/forget-password");
      }
    };

    checkSession();
  }, [navigate]);

  const form = useForm<ChangePasswordField>({
    resolver: zodResolver(requestValidator.changePassword),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit: SubmitHandler<ChangePasswordField> = async ({ password }) => {
    const { error } = await resetPassword(password);

    if (error) {
      toast.error("Error", {
        description: error.message,
      });
      return;
    }

    toast.success("Reset Password", {
      description: "Your password has been reset successfully",
    });

    navigate("/login");
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  return (
    <div className="min-h-screen w-full h-full flex items-center bg-white">
      <HeroSection
        header="Set New Password"
        subheader="Set your new password to regain access to your account in just a few steps."
        items={{
          first: "Enter your new password",
          second: "Confirm your new password",
          third: "Create a new secure password",
        }}
      />
      <div className="w-full h-full flex flex-col items-center">
        <MagicCard
          gradientColor={"#7643ea30"}
          className="w-full h-screen md:px-0 flex flex-col items-center justify-center"
        >
          <div className="flex justify-center mb-8">
            <Lock className="h-12 w-12" />
          </div>
          {/* <Card className="border-none"> */}
          <h1 className="text-2xl font-bold mb-6 text-center min-w-80">
            Change Password
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          placeholder="Enter new password"
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
                        className="absolute right-0 top-4 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          !showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {!showPassword ? (
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
              <div className="relative">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                          placeholder="Confirm new password"
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
                        className="absolute right-0 top-4 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        aria-label={
                          !showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                      >
                        {!showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{showConfirmPassword ? "show" : "hide"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#7643ea] hover:bg-[#5f35c6]"
                disabled={
                  form.formState.isSubmitting ||
                  form.getValues("password").length == 0 ||
                  form.getValues("confirmPassword").length == 0
                }
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />{" "}
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Form>
        </MagicCard>
      </div>
    </div>
  );
};

export default NewPassword;
