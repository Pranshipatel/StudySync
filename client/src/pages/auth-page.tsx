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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Hero Section - Moved to first for better mobile experience */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-6 md:p-12">
        <div className="max-w-md text-white">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-5xl font-extrabold mb-2">StudySync</h1>
            <div className="h-1 w-20 bg-white/60 mx-auto md:mx-0 mb-6"></div>
            <h2 className="text-2xl font-semibold text-white/90">AI-Powered Learning Platform</h2>
          </div>
          
          <p className="text-lg mb-8 text-white/85">
            Enhance your learning experience with our intelligent study assistant. 
            Upload your notes, generate flashcards, and join a community of learners.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-white/20 rounded-lg p-4 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all transform hover:scale-105">
              <div className="flex justify-center md:justify-start">
                <i className="fas fa-brain text-3xl mb-3 text-yellow-300"></i>
              </div>
              <h3 className="font-bold text-center md:text-left">Smart Notes</h3>
              <p className="text-sm text-white/80 text-center md:text-left">AI-powered note generation and organization</p>
            </div>
            <div className="border border-white/20 rounded-lg p-4 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all transform hover:scale-105">
              <div className="flex justify-center md:justify-start">
                <i className="fas fa-graduation-cap text-3xl mb-3 text-green-300"></i>
              </div>
              <h3 className="font-bold text-center md:text-left">Flashcards</h3>
              <p className="text-sm text-white/80 text-center md:text-left">Interactive study cards with spaced repetition</p>
            </div>
            <div className="border border-white/20 rounded-lg p-4 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all transform hover:scale-105">
              <div className="flex justify-center md:justify-start">
                <i className="fas fa-users text-3xl mb-3 text-blue-300"></i>
              </div>
              <h3 className="font-bold text-center md:text-left">Community</h3>
              <p className="text-sm text-white/80 text-center md:text-left">Collaborate with peers and share resources</p>
            </div>
            <div className="border border-white/20 rounded-lg p-4 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all transform hover:scale-105">
              <div className="flex justify-center md:justify-start">
                <i className="fas fa-chart-line text-3xl mb-3 text-purple-300"></i>
              </div>
              <h3 className="font-bold text-center md:text-left">Progress Tracking</h3>
              <p className="text-sm text-white/80 text-center md:text-left">Monitor your learning achievements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-900">
              {isLogin ? "Welcome Back!" : "Join StudySync Today"}
            </h2>
            <p className="mt-2 text-center text-base text-gray-600">
              {isLogin ? "New to StudySync? " : "Already have an account? "}
            </p>
            <div className="mt-3 mb-6">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                    isLogin 
                      ? "bg-primary-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                    !isLogin 
                      ? "bg-primary-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Register
                </button>
              </div>
            </div>
          </div>

          {isLogin ? (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <form className="space-y-5" onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                <div>
                  <label htmlFor="login-username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-user text-gray-400"></i>
                    </div>
                    <input
                      id="login-username"
                      type="text"
                      {...loginForm.register("username")}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Enter your username"
                    />
                  </div>
                  {loginForm.formState.errors.username && (
                    <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.username.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      id="login-password"
                      type="password"
                      {...loginForm.register("password")}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Enter your password"
                    />
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loginForm.formState.isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  >
                    {loginForm.formState.isSubmitting ? (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt mr-2"></i> Sign in
                      </>
                    )}
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div>
                    <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <i className="fab fa-google text-red-600 mr-2"></i> Google
                    </a>
                  </div>
                  <div>
                    <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <i className="fab fa-github text-gray-800 mr-2"></i> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <form className="space-y-4" onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                <div>
                  <label htmlFor="register-username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-user text-gray-400"></i>
                    </div>
                    <input
                      id="register-username"
                      type="text"
                      {...registerForm.register("username")}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Choose a username"
                    />
                  </div>
                  {registerForm.formState.errors.username && (
                    <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.username.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-envelope text-gray-400"></i>
                    </div>
                    <input
                      id="register-email"
                      type="email"
                      {...registerForm.register("email")}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                  {registerForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-lock text-gray-400"></i>
                    </div>
                    <input
                      id="register-password"
                      type="password"
                      {...registerForm.register("password")}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Create a password"
                    />
                  </div>
                  {registerForm.formState.errors.password && (
                    <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-check-circle text-gray-400"></i>
                    </div>
                    <input
                      id="register-confirm-password"
                      type="password"
                      {...registerForm.register("confirmPassword")}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Confirm your password"
                    />
                  </div>
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms</a> and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={registerForm.formState.isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  >
                    {registerForm.formState.isSubmitting ? (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        <i className="fas fa-user-plus mr-2"></i> Create Account
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}