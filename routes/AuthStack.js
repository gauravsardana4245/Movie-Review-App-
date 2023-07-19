import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
const Stack = createStackNavigator();

const AuthStack = (props) => {
    const { onLogin } = props;
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "maroon", // Customize the background color
                },
                headerTitleAlign: "center",
                headerTintColor: "white", // Customize the text color
            }}
        >
            <Stack.Screen name="LoginScreen"
                options={({ navigation }) => ({
                    headerTitle: 'Login',
                    headerTitleAlign: 'center',

                })}
            >
                {props => <Login {...props} onLogin={onLogin} />}
            </Stack.Screen>
            <Stack.Screen name="SignupScreen"
                options={({ navigation }) => ({
                    headerTitle: 'Signup',
                    headerTitleAlign: 'center',

                })}
            >
                {props => <Signup {...props} onLogin={onLogin} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default AuthStack;
