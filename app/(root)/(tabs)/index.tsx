 import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>

      <Text className = "font-bold text-lg my-10">Welcome to ReState</Text> 
      {/*To make Tailwind CSS works, we can give it a class name 
      // and equal it to some property. */}
      <Link href="/sign-in">Sign In</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/1">Property</Link>
    </View>
  );
}
