import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
      style={{backgroundColor:"red"}}
      >123</Text>
      <Link href="/(auth)/login">Login</Link>
      <Link href="/(auth)/signup">SignUp</Link>

    </View>
  );
}
