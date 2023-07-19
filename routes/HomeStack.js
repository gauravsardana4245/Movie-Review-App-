import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../screens/Home";
import ReviewDetails from "../screens/ReviewDetails";
import { FontAwesome5 } from '@expo/vector-icons';
import UserDetails from "../screens/UserDetails";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { globalStyles } from "../styles/global";
import UserUpdateForm from "../screens/UserUpdateForm";
import { Text, View } from "react-native";
import UserReviews from "../screens/UserReviews";
import ReviewDetailsUserSpecific from "../screens/ReviewDetailsUserSpecific";

const Stack = createStackNavigator();

const HomeStack = (props) => {
    const { onLogin } = props;
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "maroon", // Customize the background color
                },
                headerTitleAlign: "center",

                headerTitleStyle: {
                },
                headerTintColor: "white", // Customize the text color
            }}
        >
            <Stack.Screen name="Home"
                component={Home}
                options={({ navigation }) => ({
                    headerTitle: 'ReviewCorn',
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <TouchableWithoutFeedback onPress={() => { navigation.navigate("UserDetails") }}>
                            <FontAwesome5 style={globalStyles.userIcon} name="user-alt" size={24} color="black" />
                        </TouchableWithoutFeedback>
                    ),
                })} />
            <Stack.Screen name="ReviewDetails"
                component={ReviewDetails}
                options={({ navigation }) => ({
                    headerTitle: 'ReviewDetails'
                })}
            >
            </Stack.Screen>
            <Stack.Screen name="ReviewDetailsUserSpecific"
                component={ReviewDetailsUserSpecific}
                options={({ navigation }) => ({
                    headerTitle: 'ReviewDetails'
                })}
            >
            </Stack.Screen>
            <Stack.Screen name="UserDetails"
                options={({ navigation }) => ({
                    headerTitle: (() => (
                        <View style={globalStyles.userIconContainer}>
                            <FontAwesome5 style={globalStyles.userIcon} name="user-alt" size={24} color="black" />
                            <Text style={globalStyles.headerTitle}>Profile</Text>
                        </View>
                    )),
                })}
            >
                {props => <UserDetails {...props} onLogin={onLogin} />}
            </Stack.Screen>
            <Stack.Screen name="UserReviews"
                component={UserReviews}
                options={({ navigation }) => ({
                    headerTitle: 'My Reviews',
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <TouchableWithoutFeedback onPress={() => { navigation.navigate("UserDetails") }}>
                            <FontAwesome5 style={globalStyles.userIcon} name="user-alt" size={24} color="black" />
                        </TouchableWithoutFeedback>
                    ),
                })} />
            <Stack.Screen name="UserUpdateForm" >
                {props => <UserUpdateForm {...props} onLogin={onLogin} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default HomeStack;
