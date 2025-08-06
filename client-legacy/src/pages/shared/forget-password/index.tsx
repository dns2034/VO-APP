import HeroSection from "@/components/hero-section";
import { MagicCard } from "@/components/magicui/magic-card";
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
import { Progress } from "@/components/ui/progress";
import { ForgotPasswordField, requestValidator } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { sendPasswordResetEmail } from "../services/auth-service";

const ForgetPassword: FC = () => {
  const form = useForm<ForgotPasswordField>({
    resolver: zodResolver(requestValidator.forgotPassword),
    defaultValues: { email: "" },
  });

  const [tryButton, setTryButton] = useState<boolean>(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const cooldownDuration = 60; // 60 seconds cooldown

  const onSubmit: SubmitHandler<ForgotPasswordField> = async ({ email }) => {
    const { error } = await sendPasswordResetEmail(email);

    if (error) {
      toast.error("Forgot Password", {
        description: error.message,
      });
      return;
    }

    setCooldownActive(true);
    setCooldownTime(cooldownDuration);

    toast.success("Forgot Password", {
      description: `We have sent your reset password link, please check your inbox.`,
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (cooldownActive && cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            setCooldownActive(false);
            clearInterval(interval);
            return 0;
          }
          return newTime;
        });
      }, 1000);
      setTryButton(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cooldownActive, cooldownTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const cooldownProgress =
    ((cooldownDuration - cooldownTime) / cooldownDuration) * 100;

  return (
    <div className="min-h-screen w-full flex items-center bg-white">
      <HeroSection
        header="Password Recovery"
        subheader="Securely reset your password and regain access to your account in
            just a few steps."
        items={{
          first: "Enter your email address",
          second: "Check your inbox for the reset link",
          third: "Create a new secure password",
        }}
      />
      <div className="w-full h-full flex flex-col items-center">
        <MagicCard
          gradientColor={"#7643ea30"}
          className="w-full h-full flex flex-col justify-center items-center"
        >
          <div className="flex justify-center mb-8">
            <Lock className="h-12 w-12" />
          </div>
          {/* <Card className="border-none"> */}
          <h1 className="text-2xl font-bold mb-6 text-center">
            Reset Password
          </h1>
          <p className="text-sm text-gray-500 mb-6 text-center max-w-80">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
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
              {cooldownActive && (
                <div className="space-y-2 animate-in fade-in duration-300">
                  <Progress
                    value={cooldownProgress}
                    className="h-2 bg-slate-200"
                    indicatorClassName="bg-gradient-to-r from-green-500 to-green-600"
                  />
                  <p className="text-xs text-muted-foreground">
                    You can request another reset link in{" "}
                    {formatTime(cooldownTime)}
                  </p>
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-[#7643ea] hover:bg-[#5f35c6] disabled:bg-[#714fc9] disabled:curser-not-allowed"
                disabled={
                  form.formState.isSubmitting ||
                  form.getValues("email").length == 0 ||
                  cooldownActive
                }
              >
                {form.formState.isSubmitting || cooldownActive ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />{" "}
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
              {tryButton && !cooldownActive && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent transition-all duration-300 hover:scale-[1.01]"
                  onClick={() => {
                    form.reset();
                    setTryButton(false);
                  }}
                >
                  Try another email
                </Button>
              )}

              <div className="text-center mt-4">
                <Link
                  to="/login"
                  className="text-sm text-[#7643ea] hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </Form>
        </MagicCard>
        {/* </Card> */}
      </div>
    </div>
  );
};

export default ForgetPassword;
