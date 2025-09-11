import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../assets/styles/login.js';
import COLORS from "../../constant/colors.js";
const PlaceholderImage = require('@/assets/images/i.png');



export default function Login() {

const [response, setResponse] = useState({
  "error": true,
  "data": {},
  "message": "system running health check OK",
  "code": 501
});


// Paste this into a component and call it once (or run from useEffect)
const checkHttpbin = async () => {
  console.log("checkHttpbin -> start");
  try {
    const r = await fetch("https://httpbin.org/get");
    console.log("httpbin status:", r.status);
  } catch (err) {
    console.log("httpbin ERROR:", err.name, err.message);
  }
};


const testAxios = async () => {
 try {
  console.log("Request Started!");
  const id = "1  ";
  const todoUrl = `https://jsonplaceholder.typicode.com/todos/${id}`;
  const url = "https://bookworm-app-y7mx.onrender.com/"
  const response = await axios.get(url.trim(), {
    timeout: 10000,
  });
  console.log("Response:", response.data);
} catch (error) {
  if (error.code === 'ECONNABORTED') {
    console.error("Request timed out. Check URL and network.");
  } else if (error.response) {
    console.error("Server responded with error:", error.response.status);
  } else if (error.request) {
    console.error("No response received. Network issue?");
  } else {
    console.error("Error:", error.message);
  }
}
};

const fetchViaProxy = async () => {
  try {
    const target = encodeURIComponent("https://bookworm-app-y7mx.onrender.com/");
    const res = await fetch(`https://api.allorigins.win/raw?url=${target}`);
    console.log('proxy status', res.status);
    const txt = await res.text();
    console.log('proxy body len', txt.length);
  } catch (err) {
    console.log('proxy ERROR', err.name, err.message);
  }
};

const fetchWithUA = async () => {
  try {
    const res = await fetch("https://bookworm-app-y7mx.onrender.com/health-check-debug", {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        // convincing browser UA
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      },
    });
    console.log("fetchWithUA status:", res.status);
    console.log("body:", await res.text());
  } catch (err) {
    console.log("fetchWithUA ERR", err.name, err.message);
  }
};




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
              // onPress={()=>router.replace("/signup")} 
              onPress={fetchWithUA}
              style={styles.button}>
                <Text style={styles.buttonText}>
                 Login
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textStyleBottom}>{response.code.toString()}</Text>
              <Text style={[styles.textStyleBottom, { color: COLORS.primary }]}>Sign Up</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}




