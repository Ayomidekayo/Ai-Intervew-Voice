'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

//https://console.firebase.google.com/u/0/?fb_utm_source=chatgpt.com
const ONE_WEEK=60*60*24*7;
export async function signUp(params:SignUpParams){
    const {uid,name,email}=params;
    try {
         const userRecord=await db.collection('users').doc(uid).get();
         if(userRecord.exists){
            return{
                success:false,
                message:'User already exists.Please sign in insted.'
            }
         }
         await db.collection('users').doc(uid).set({
            name,email,
         })
         return {
            success:true,
            messsage:'Account created successfully'
         }

    } catch (error:any) {
        console.error('Error creating a user',error);
        if(error.code === 'auth/email-already-exists'){
            return {
                success:false,
                message:'This email is already in use'
            }
        }
        return{
            success:false,
            message: 'Failed to create an account'
        }
    }
}
export async function signIn(params:SignInParams) {
    const {email,idToken}=params;
    try {
        const userRord=await auth.getUserByEmail(email);
        if(!userRord){
            return{
                success:false,
                message:'User does not exists.Create an account instead'
            }
        }
        await  setSessionCookies(idToken);
    } catch (e) {
        console.log(e);
        return{
            success:false,
            messsage: 'Failed to log into an account'
        }
    }
}
export async function setSessionCookies(idToken:string) {
    const cookieStore=await cookies();
    const sessionCookie=await auth.createSessionCookie(idToken,{
        expiresIn:ONE_WEEK *1000,
    })
    cookieStore.set('session',sessionCookie,{
        maxAge: ONE_WEEK,
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        path:'/',
        sameSite:'lax'
    })
    
}

export async function getCurrentUser():Promise<User| null> {
    const cookieStore=await cookies();

    const sessionCookie=cookieStore.get('session')?.value;
    if(!sessionCookie) return null;
    try {
        const decodedClaims=await auth.verifySessionCookie(sessionCookie,true);
        const userRecord=await db.collection('users').doc(decodedClaims.uid).get();
        if(!userRecord)return null;
        return{
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    } catch (error) {
        console.log(error);
        return null;
    }
    
}

export async function isAuthenticated() {
    const user= await getCurrentUser();
    return !!user;
    
}