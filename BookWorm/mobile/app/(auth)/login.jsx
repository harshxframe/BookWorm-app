import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from "../../constant/colors.js";
const PlaceholderImage = require('@/assets/images/i.png');
import { styles } from '../../assets/styles/login.js';



export default function Login() {
  return (
    <SafeAreaView backgroundColor={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.subContianer}>
          <View>
            <Image source={PlaceholderImage} style={styles.image} />
          </View>
          <View style={styles.card}>
            <View>
              <Text style={styles.inputheading}>Email</Text>
              <View style={styles.inputView}>
                <Ionicons name='mail-outline' size={24} color={COLORS.primary} />
                <TextInput style={styles.inputText1} placeholder='Enter your email' />
              </View>
            </View>
            <View>
              <Text style={styles.inputheading}>Password</Text>
              <View style={styles.inputView}>
                <Ionicons name='lock-closed-outline' size={24} color={COLORS.primary} />
                <TextInput
                  textAlignVertical="center"
                  includeFontPadding={false}
                  style={[styles.inputText1, { width: "90%" }]} placeholder='Enter your Password' />
                <Ionicons name='eye-outline' size={24} color={COLORS.primary} />
                {/* eye-off-outline  */}
              </View>

            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
              onPress={()=>router.replace("/signup")} 
              style={styles.button}>
                <Text style={styles.buttonText}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyleBottom}>Don't have an account?</Text>
              <Text style={[styles.textStyleBottom, { color: COLORS.primary }]}>Sign Up</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}




