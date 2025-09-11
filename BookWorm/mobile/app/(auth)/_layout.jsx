import { Stack } from "expo-router";

export default function AuthLayout() {
  return(
    <Stack screenOptions={{headerShown:false}}
    initialRouteName="login"
    >
      <Stack.Screen name="login" options={{title:"login", animation: "slide_from_bottom" }}/>
       <Stack.Screen name="signup" options={{title:"login", animation: "slide_from_bottom"}}/>
    </Stack>
  )
    
}
