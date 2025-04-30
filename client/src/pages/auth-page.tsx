import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Redirect } from "wouter";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type LoginInputs = z.infer<typeof loginSchema>;
type RegisterInputs = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();
  const { user, login, register: registerUser, isAuthenticated } = useAppContext();

  const loginForm = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const registerForm = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onLoginSubmit = async (data: LoginInputs) => {
    try {
      await login(data.username, data.password);
      toast({
        title: "Login successful",
        description: "Welcome back to StudySync!"
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    }
  };

  const onRegisterSubmit = async (data: RegisterInputs) => {
    try {
      await registerUser(data.username, data.email, data.password);
      toast({
        title: "Registration successful",
        description: "Welcome to StudySync!"
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Username might already be taken",
        variant: "destructive"
      });
    }
  };

  // Redirect to dashboard if already logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-teal-950">
      {/* Hero Section - Moved to first for better mobile experience */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-6 md:p-12">
        <div className="max-w-md text-white">
          <div className="text-center md:text-left mb-8 animate-pulse">
            <h1 className="text-5xl font-extrabold mb-2 text-white">StudySync</h1>
            <div className="h-1 w-20 bg-white/60 mx-auto md:mx-0 mb-6"></div>
            <h2 className="text-2xl font-semibold text-white/90">AI-Powered Learning Platform</h2>
          </div>
          
          <p className="text-lg mb-8 text-white/85 animate-fade-in">
            Enhance your learning experience with our intelligent study assistant. 
            Upload your notes, generate flashcards, and join a community of learners.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-white/20 rounded-lg p-4 backdrop-blur-sm bg-teal-800 hover:bg-teal-700 transition-all transform hover:scale-105">
              <div className="flex justify-center md:justify-start">
                <i className="fas fa-brain text-3xl mb-3 text-yellow-300"></i>
              </div>
              <h3 className="font-bold text-center md:text-left text-white">Smart Notes</h3>
              <p className="text-sm text-white text-center md:text-left">AI-powered note generation and organization</p>
            </div>
            <div className="border border-white/20 rounded-lg p-4 backdrop-blur-sm bg-teal-800 hover:bg-teal-700 transition-all transform hover:scale-105">
              <div className="flex justify-center md:justify-start">
                <i className="fas fa-graduation-cap text-3xl mb-3 text-green-300"></i>
              </div>
              <h3 className="font-bold text-center md:text-left text-white">Flashcards</h3>
              <p className="text-sm text-white text-center md:text-left">Interactive study cards with spaced repetition</p>
            </div>
            <div className="border border-white/20 rounded-lg p-4 backdrop-blur-sm bg-teal-800 hover:bg-teal-700 transition-all transform hover:scale-105">
              <div className="flex justify-center md:justify-start">
                <i className="fas fa-users text-3xl mb-3 text-blue-300"></i>
              </div>
              <h3 className="font-bold text-center md:text-left text-white">Community</h3>
              <p className="text-sm text-white text-center md:text-left">Collaborate with peers and share resources</p>
            </div>
            <div className="border border-white/20 rounded-lg p-4 backdrop-blur-sm bg-teal-800 hover:bg-teal-700 transition-all transform hover:scale-105">
              <div className="flex justify-center md:justify-start">
                <i className="fas fa-chart-line text-3xl mb-3 text-purple-300"></i>
              </div>
              <h3 className="font-bold text-center md:text-left text-white">Progress Tracking</h3>
              <p className="text-sm text-white text-center md:text-left">Monitor your learning achievements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
  <div className="max-w-md w-full space-y-8">
    <div className="text-center">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-teal-600 to-teal-900 text-transparent bg-clip-text">
        {isLogin ? "Welcome Back!" : "Join StudySync Today"}
      </h2>
      <p className="mt-2 text-base text-gray-600">
        {isLogin ? "New to StudySync? " : "Already have an account? "}
      </p>

      <div className="mt-4 flex justify-center gap-1">
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className={`px-4 py-2 rounded-l-full text-sm font-semibold transition-colors duration-200 ${
            isLogin
              ? "bg-teal-800 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className={`px-4 py-2 rounded-r-full text-sm font-semibold transition-colors duration-200 ${
            !isLogin
              ? "bg-teal-800 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Register
        </button>
      </div>
    </div>

    <div
      className={`rounded-lg shadow-xl p-6 border ${
        isLogin ? "bg-teal-800 text-white" : "bg-white text-gray-700"
      }`}
    >
      <form
        className="space-y-5"
        onSubmit={
          isLogin
            ? loginForm.handleSubmit(onLoginSubmit)
            : registerForm.handleSubmit(onRegisterSubmit)
        }
      >
        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Username
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-400">
              <i className="fas fa-user" />
            </span>
            <input
              type="text"
              {...(isLogin
                ? loginForm.register("username")
                : registerForm.register("username"))}
              className="w-full py-2 pl-10 pr-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter username"
            />
          </div>
          {(
            isLogin
              ? loginForm.formState.errors.username
              : registerForm.formState.errors.username
          ) && (
            <p className="text-red-400 text-xs mt-1">
              {(
                isLogin
                  ? loginForm.formState.errors.username
                  : registerForm.formState.errors.username
              ).message}
            </p>
          )}
        </div>

        {/* Email (only in register) */}
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-400">
                <i className="fas fa-envelope" />
              </span>
              <input
                type="email"
                {...registerForm.register("email")}
                className="w-full py-2 pl-10 pr-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter email"
              />
            </div>
            {registerForm.formState.errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {registerForm.formState.errors.email.message}
              </p>
            )}
          </div>
        )}

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-400">
              <i className="fas fa-lock" />
            </span>
            <input
              type="password"
              {...(isLogin
                ? loginForm.register("password")
                : registerForm.register("password"))}
              className="w-full py-2 pl-10 pr-3 rounded-full text-black border focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter password"
            />
          </div>
          {(
            isLogin
              ? loginForm.formState.errors.password
              : registerForm.formState.errors.password
          ) && (
            <p className="text-red-400 text-xs mt-1">
              {(
                isLogin
                  ? loginForm.formState.errors.password
                  : registerForm.formState.errors.password
              ).message}
            </p>
          )}
        </div>

        {/* Confirm Password (only in register) */}
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-400">
                <i className="fas fa-check-circle" />
              </span>
              <input
                type="password"
                {...registerForm.register("confirmPassword")}
                className="w-full py-2 pl-10 pr-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Confirm password"
              />
            </div>
            {registerForm.formState.errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {registerForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}

        {/* Remember me and forgot password (only in login) */}
        {isLogin && (
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 rounded text-teal-600"
              />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={
            isLogin
              ? loginForm.formState.isSubmitting
              : registerForm.formState.isSubmitting
          }
          className={`w-full py-2 rounded-full font-semibold text-sm transition-colors ${
            isLogin ? "bg-white text-teal-800" : "bg-teal-800 text-white"
          } hover:opacity-90 shadow-md`}
        >
          {isLogin ? "Sign in" : "Create account"}
        </button>
      </form>

      {/* Or continue with */}
      <div className="mt-6 text-center text-sm">
        <div className="flex items-center gap-4 justify-center text-gray-300 mb-4">
          <div className="w-20 h-px bg-gray-300" />
          <span className="text-sm font-medium">
            Or continue with
          </span>
          <div className="w-20 h-px bg-gray-300" />
        </div>

        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 text-sm font-medium shadow-sm">
            <i className="fab fa-google text-red-500"></i> Google
          </button>
          <button className="flex items-center gap-2 border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 text-sm font-medium shadow-sm">
            <i className="fab fa-github text-gray-800"></i> GitHub
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}