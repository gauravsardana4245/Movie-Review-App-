import "react-native-gesture-handler";
import React, { useState } from "react";
import { registerRootComponent } from 'expo';
// import { PaperProvider } from 'react-native-paper';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { createStackNavigator } from '@react-navigation/stack';
import { useCallback } from "react";
import store from './state/store';
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "./routes/HomeStack";
import { Provider } from "react-redux";
import AuthStack from "./routes/AuthStack";
import { PaperProvider } from "react-native-paper";


export default function App() {
  const Stack = createStackNavigator();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fontsLoaded] = useFonts({
    'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          {/* <PaperProvider> */}
          {/* <View style={globalStyles.container}> */}
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            {!isLoggedIn ? (
              <Stack.Screen name="AuthStack">
                {props => <AuthStack {...props} onLogin={toggleLogin} />}
              </Stack.Screen>
            ) : (
              <Stack.Screen name="HomeStack" >
                {props => <HomeStack {...props} onLogin={toggleLogin} />}

              </Stack.Screen>
            )}
          </Stack.Navigator>
          {/* </View> */}
          {/* </PaperProvider> */}
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

registerRootComponent(App);
