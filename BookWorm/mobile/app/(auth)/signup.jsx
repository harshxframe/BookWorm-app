import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../assets/styles/singup.js';
import COLORS from "../../constant/colors.js";
import { useAuthStore } from '../../store/authStore.js';
const PlaceholderImage = require('@/assets/images/i.png');
const icon = require('@/assets/images/image.png');



export default function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, token, isLoading } = useAuthStore();

  const signUpMet = async () => {
    const res = await register(name, email, password);
    if(res.error){
          console.log("My error"+res.error);
       Alert.alert(res.message);
    }else{
          console.log("My error"+res.error);
       Alert.alert(res.message);
    }


  }

useEffect(()=>{
console.log(isLoading);
},[isLoading]);
  

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.subContianer}>
          <View style={styles.card}>
            <View>
              <View style={styles.signUpHeading}>
                <Text style={styles.headingText}>BookWorm</Text>
                <Image source={icon} style={{ width: 55, height: 60 }} />
              </View>
              <View>
                <Text style={{ textAlign: "center", fontSize: 16, color: COLORS.placeholderText, marginBottom: 20 }}>Share your favorite reads</Text>
              </View>
            </View>

            <View>
              <Text style={styles.inputheading}>Full Name</Text>
              <View style={styles.inputView}>
                <Feather name='user' size={24} color={COLORS.primary} />
                <TextInput
                  style={styles.inputText1}
                  placeholder='Enter your full name'
                  onChangeText={setName}
                  value={name} />
              </View>
            </View>
            <View>
              <Text style={styles.inputheading}>Email</Text>
              <View style={styles.inputView}>
                <Ionicons name='mail-outline' size={24} color={COLORS.primary} />
                <TextInput style={styles.inputText1} placeholder='Enter your email'
                  onChangeText={setEmail}
                />
              </View>
            </View>
            <View>
              <Text style={styles.inputheading}>Password</Text>
              <View style={styles.inputView}>
                <Ionicons name='lock-closed-outline' size={24} color={COLORS.primary} />
                <TextInput
                  textAlignVertical="center"
                  includeFontPadding={false}
                  onChangeText={setPassword}
                  style={[styles.inputText1, { width: "90%" }]} placeholder='Enter your Password' />
                <Ionicons name='eye-outline' size={24} color={COLORS.primary} />
                {/* eye-off-outline  */}
              </View>

            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => signUpMet()}
                style={styles.button}>
                <Text style={styles.buttonText}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyleBottom}>Don't have an account?</Text>
              <TouchableOpacity onPress={()=>{
                router.replace("/login")
              }}>
              <Text style={[styles.textStyleBottom, { color: COLORS.primary }]}>LogIn</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}