"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import Formfield from "./Formfield"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth"
//import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/action/auth.action"
import { auth } from "@/firebase/client"

 const authFormSchema=(type: FormType)=>{
  return z.object({
    name:type==='sign-up'? z.string().min(3): z.string().optional(),
    email:z.string().email(),
    password:z.string().min(3),
  })
 }
const AuthForm = ({type}:{type:FormType}) => {
  const router=useRouter();
  const formSchema=authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      password:"",
    },
  })
 
  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof formSchema>) {
   try {
   
     if (type === "sign-up") {
        const { name, email, password } = values;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result?.success) {
          toast.error(result?.message);
          return;
        }
         toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
    }else{
      const {email,password}=values;
      const userCredential=await signInWithEmailAndPassword(auth,email,password);
      const  idToken=await userCredential.user.getIdToken();
      if (!idToken){
        toast.error('Sign in field')
        return;
      }
      await signIn({email,idToken})
  toast.success('Sign in successfully.');
     router.push('/')
    }
   } catch (error) {
    console.log(error);
    toast.error(`there wasan error:${error}`);
   }
  }
  const  isSignIn=type==='sign-in';
  return (
   
   <div className="card-border lg:min-w[566px] justify-center ml-10">
      <div className="flex flex-col gap-6 card py-14 px-10 ">  
         <div className="flex flex-row gap-2 justify-center">

           <Image src='/logo.svg' alt="logo" height={32}  width={38} />
           <h2 className="text-primary-100">Interview</h2>
         </div>
         <h3>Practice job interiew with AI</h3>
           
           <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4">
        {!isSignIn &&(
          <Formfield control={form.control} name="name" label="Name" placeholder="Your Name"/>
          
        ) }   
        <Formfield control={form.control} name="password" label="Password" placeholder="Your Password" type="password"/>
        <Formfield control={form.control} name="email" label="Email" placeholder="Your Email" type="email"/>
        
        <Button className="!w-full !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !min-h-10 !font-bold !px-5 cursor-pointer" type="submit">{isSignIn? 'Sign in': 'Create an Account'}</Button>
      </form>
    </Form>
    <p className="text-center">{isSignIn? "Don't have an account yet?": 'Have an account already?'}
       <Link href={!isSignIn? '/sign-in':"/sign-up"} className="font-bold text-user-primary ml-1">
         {!isSignIn? "Sign in":"Sign up"}
       </Link>
    </p>
      </div>
   </div>

  
  )
}

export default AuthForm
