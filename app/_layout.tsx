import { useFonts } from "expo-font"; // bringing in hook from the expo-font package
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react"; // bringin in another hook

import "./global.css";
// This line tells your app: “Apply the Tailwind/NativeWind styles globally.”
// Without it → your className="..." styles won’t work.

SplashScreen.preventAutoHideAsync().catch(() => {});              // Keeps splash screen visible while your app prepares.


// export default = this is the main thing from this file
// ie; “When another file imports from here, THIS is what they’ll get.”

// function RootLayout() → defines a React component(must start with capital letter).

// 1. Rule for useFonts
// The hook expects an object (inside { }) where each entry has:
// "FontName": require("path-to-file")
// Left side (key) → string name you choose for the font family (e.g., "Rubik-Bold").
// Right side (value) → actual .ttf file you load with require(...).
// It always returns an array that is [boolean value, error]
// Here, we have destructured only one item of the array. 
// After all the fonts that are linked with require are loaded it will return true which we are going to store in fontsLoaded.
// Eg;
// const meal = ["Burger", "Fries", "Coke"];
// Normal way:
// const burger = meal[0];
// const fries = meal[1];
// const drink = meal[2];
// Destructing way:
// const [burger, fries, drink] = meal;

export default function RootLayout() {
  const [ fontsLoaded ] = useFonts({
    "Rubik-Bold" : require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-ExtraBold" : require('../assets/fonts/Rubik-ExtraBold.ttf'),
    "Rubik-Light" : require('../assets/fonts/Rubik-Light.ttf'),
    "Rubik-Medium" : require('../assets/fonts/Rubik-Medium.ttf'),
    "Rubik-Regular" : require('../assets/fonts/Rubik-Regular.ttf'),
    "Rubik-SemiBold" : require('../assets/fonts/Rubik-SemiBold.ttf')
  });
  

  // () => { some code }  : (effect) the function to run; first parameter
  // dependencies; second parameter
  // effect runs only when there is any change to the dependencies.

  // Here, at first the fonts are not loaded so. Its false. 
  // When it is loaded, it changes to true and effect runs. if statement and hides splash screen.

  // This is the advantage of this hook. Used only there is change to the dependency. 
  // If just had if statement: if (fontsLoaded){ SplashScreen.hideAsync();}, it will run everytime it true as well; not unnecessary.

  useEffect(() => {
    if (fontsLoaded){
      SplashScreen.hideAsync();
    }
  },[fontsLoaded]);

  if(!fontsLoaded){         // While it’s false, we don’t want to render our UI, because the text might flash in the wrong font.
    return null;            // So we return null; → “don’t show anything yet, just keep splash visible.”
  }

  // if mathiko return null else return stack.
  return <Stack />;         // once fonts are ready, show the app’s navigation and screens.
}
