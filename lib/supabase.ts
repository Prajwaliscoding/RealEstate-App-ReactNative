import 'react-native-url-polyfill/auto';
//Supabase’s JS client expects browser-like URL features and React Native doesn’t have them by default. So, supabase works in RN

import { createClient } from '@supabase/supabase-js';

import Constants from 'expo-constants';
// Lets us read extra values you put in app.json.
// That’s how we grab your project’s URL and anon key without hard-coding.

const supabaseUrl= Constants.expoConfig?.extra?.supabaseUrl!;
// Reads the values you stored in app.json under "extra".
// ! just tells TypeScript: “I promise these exist.”

const supabaseAnonKey= Constants.expoConfig?.extra?.supabaseAnonKey!;

// so .expoconfig gives you access to values from your app.json (under "extra") and it comes under Constants?
// Yes.

// Constants.expoConfig.extra gare extra access vayo ajhai .supabaseUrl gare tyo pani access vayo

// what ?. means (optional chaining)
// It’s a TypeScript/JavaScript operator.
// It says: “if the thing before me exists, then continue; if it’s undefined or null, stop and return undefined.”

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {auth: {autoRefreshToken: true, persistSession: false, detectSessionInUrl:false}});

// createClient(...) builds the actual Supabase connection object.
// You’ll import this supabase everywhere in your app.

// inside auth config:
// autoRefreshToken: true
// → keeps you logged in by refreshing tokens automatically.
// persistSession: false
// → means login is only remembered while app is running.
// → if you add SecureStore, you can flip this to true so login survives restarts.
// detectSessionInUrl: false
// → in browsers, Supabase can auto-detect login tokens in the URL.
// → not needed here because we’re manually handling deep links with Expo.