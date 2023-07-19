import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import About from "../screens/About"

const Stack = createStackNavigator();

const AboutStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "black", // Customize the background color
                },
                headerTitleStyle: {
                },
                headerTintColor: "white", // Customize the text color
            }}
        >
            <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
    );
};

export default AboutStack;
