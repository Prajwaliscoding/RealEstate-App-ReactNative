import images from "@/constants/images";
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  return (
    <SafeAreaView className = "bg-white h-full"> 
      <ScrollView contentContainerClassName='h-full'>
        <Image source = {images.onboarding} className = "w-full h-4/6" resizeMode="contain" />
        <View className = "px-10"> 
          <Text className = "text-base text-center uppercase font-rubik text-black-200">Welcome to the ReState</Text>
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">Let's get you closer to {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>
          <Text className="text-lg text-center font-rubik text-black-200 mt-12">Login to ReState with Google</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn



