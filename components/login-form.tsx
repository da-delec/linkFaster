"use client"

import { GalleryVerticalEnd } from "lucide-react"
import { Suspense } from "react"
import ConcentricLoader from "@/components/login/loader"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import srcLogo from "@/public/minimalistLogo.png"
import { Label } from "@/components/ui/label"
import { FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react"

import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const [email, setEmail] = useState("");
  const [isLinkSend, setIsLinkSend] = useState(false);
  function signinWithProvider (provider:string) {
    if(provider === "github"){
      setIsLoadingGithub(true);
    }else if(provider === "google"){
      setIsLoadingGoogle(true);
    }
    authClient.signIn.social({
      provider:provider as "google" | "github" | "apple",
      callbackURL:"/dashboard",
      newUserCallbackURL:"/create-profil",
      errorCallbackURL:"/login",
    })
  }

  function magicLinkLogin(mail:string) {
   
    if (!mail) {
      toast.error("Please enter your email address");
      return;
    }
    authClient.signIn.magicLink({
      email: mail,
      callbackURL:"/dashboard",
      newUserCallbackURL:"/create-profil",
      errorCallbackURL:"/login",
    })
    setIsLinkSend(true);
  }

  useEffect(() => {
    if (isLinkSend) {
      toast.success("Magic link sent to your email");
    }
  }, [isLinkSend])


  return (
    <div className={cn("flex flex-col  gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-16 items-center justify-center rounded-md">
                <Image src={srcLogo} alt="LinkFaster logo" className=" animate-bounce" width={60} height={60} />
              </div>
              <span className="sr-only">LinkFaster</span>
            </a>
            <h1 className="text-3xl font-bold">Welcome to LinkFaster</h1>
            <h2 className=" text-base font-medium text-slate-500">Please Login to your Account or Create One</h2>
          
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Charlize@example.com"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <Button 
              onClick={(e) => {
                e.preventDefault();
                magicLinkLogin(email);
              }} 
              type="button" 
              className="w-full"
            >
              Login
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className=" text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button onClick={()=>signinWithProvider("github")} variant="outline" type="button" className="w-full">
              {isLoadingGithub ? <ConcentricLoader /> : (
                <>
            <FaGithub />
            <p>Continue with Github</p>
            </>
              )}
            
            </Button>
            
            <Button onClick={()=>signinWithProvider("google")} variant="outline" type="button" className="w-full">
              {isLoadingGoogle ? <ConcentricLoader /> : (
                <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              <p> Continue with Google</p>
              </>
              )}
             
            </Button>
         
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="/terms">Terms of Service</a>{" "}
        and <a href="/privacy">Privacy Policy</a>.
      </div>
    </div>
  )
}
