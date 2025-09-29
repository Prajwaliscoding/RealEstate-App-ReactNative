import { supabase } from '@/lib/supabase';
import { useFonts } from "expo-font";
import * as Linking from 'expo-linking'; // Lets you receive deep links like yourapp://auth-callback?... when Google/Supabase send the user back to your app.
import { SplashScreen, Stack } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
// Our single, shared Supabase client (the bridge to your Supabase project).
// It was created with our project URL and anon key.
import { useEffect } from "react";

import "./global.css";

WebBrowser.maybeCompleteAuthSession();
// Quality-of-life call: if an OAuth browser tab/sheet is still open, this will finish/close it cleanly.
// Safe to call on every app start; it’s a no-op if there’s nothing to finish.

//Handler function. Written here for readability
async function handleDeepLink({url}:{url:string}){
  const {error} = await supabase.auth.exchangeCodeForSession(url);
  // const { error } = … is object destructuring: the method returns { data, error }; we only need error.
  if(error){
    console.warn("Auth exchange error",error.message);
  }
  // In this program: when a deep link opens your app after Google → Supabase redirect, this function receives the url and calls exchangeCodeForSession(url) to trade the temporary OAuth code in the URL for a real Supabase session (access/refresh tokens). If something’s wrong (bad redirect URI, expired code), we log a clear warning.
}
// alright i think i got it. Since Linking.addEventListener(eventName,callbackFunction) is like this, it listens for event and pass that event to the next argument that is callback function or handler function. Then the second argument aka callback function takes the object but we are directly destructuring it to get URL?- yes
// yo sab garekai url payera exchange garna ho.

SplashScreen.preventAutoHideAsync().catch(() => {});    

export default function RootLayout() {
  const [ fontsLoaded ] = useFonts({
    "Rubik-Bold" : require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-ExtraBold" : require('../assets/fonts/Rubik-ExtraBold.ttf'),
    "Rubik-Light" : require('../assets/fonts/Rubik-Light.ttf'),
    "Rubik-Medium" : require('../assets/fonts/Rubik-Medium.ttf'),
    "Rubik-Regular" : require('../assets/fonts/Rubik-Regular.ttf'),
    "Rubik-SemiBold" : require('../assets/fonts/Rubik-SemiBold.ttf')
  });

  useEffect(() => {
    if (fontsLoaded){
      SplashScreen.hideAsync();
    }
  },[fontsLoaded]);


  useEffect(() => {
    const sub = Linking.addEventListener('url',handleDeepLink);
    return ()=>sub.remove();
  }, []);
  
// When you call Linking.addEventListener, it registers a listener (a subscription).
// It gives you back an object (we store it in sub).
// That object has a method .remove() — which will unsubscribe (stop listening).
// Think of sub like a ticket:
// sub = "You are now subscribed to the 'url' event."
// sub.remove() = "Tear up this ticket, I don’t want to listen anymore."

  useEffect(() => {
    supabase.auth.startAutoRefresh();
    return ()=> {
      supabase.auth.stopAutoRefresh();
    }
  },[]);
// When your RootLayout mounts (appears the first time):
// → start auto-refresh so Supabase silently keeps tokens valid.
// While the app is open:
// → Supabase will occasionally refresh tokens in the background.
// When RootLayout unmounts (goes away):
// → cleanup stops the auto-refresh timer.
// किनभने App बन्द भए पछि, त्यो timer चलिराख्नु energy/ram को लागि waste हुन्छ।


  if(!fontsLoaded){         
    return null;            
  }
  return <Stack screenOptions={{headerShown: false}}/>;         
}
