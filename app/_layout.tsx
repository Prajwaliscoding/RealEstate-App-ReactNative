import { supabase } from '@/lib/supabase';
import { useFonts } from "expo-font";
import * as Linking from 'expo-linking';
import { SplashScreen, Stack } from "expo-router";
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from "react";

import "./global.css";

WebBrowser.maybeCompleteAuthSession();

async function handleDeepLink({url}:{url:string}){
  const {error} = await supabase.auth.exchangeCodeForSession(url);
  if(error){
    console.warn("Auth exchange error",error.message);
  }
}

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
  

  useEffect(() => {
    supabase.auth.startAutoRefresh();
    return ()=> {
      supabase.auth.stopAutoRefresh();
    }
  },[]);

  if(!fontsLoaded){         
    return null;            
  }
  return <Stack screenOptions={{headerShown: false}}/>;         
}
