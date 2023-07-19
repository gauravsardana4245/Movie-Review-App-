import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { globalStyles } from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const UserDetails = ({ navigation, onLogin }) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            fetchUser()
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('http://192.168.1.7:5000/api/auth/getuser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
            });
            const json = await response.json();
            console.log(json.user);
            setUser(json.user);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = async () => {
        Alert.alert('Log out', 'Are you sure you want to logout?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: async () => {
                    try {
                        await AsyncStorage.removeItem('token');
                        onLogin()
                    }
                    catch (error) {

                    }
                }
            },
        ]);
    };
    const showReviews = () => {
        navigation.navigate("UserReviews")
    }
    const handleNavigate = () => {
        navigation.navigate('UserUpdateForm', {
            user,
            onUpdate: fetchUser, // Pass the fetchUser function as a prop to UserUpdateForm
        });
    };

    if (!user) {
        return (
            <View style={globalStyles.loadingContainer}>
                <ActivityIndicator size="large" color="maroon" />
            </View>
        );
    }

    return (
        <View style={globalStyles.userDetailsPage}>
            <TouchableOpacity onPress={handleNavigate} >
                <FontAwesome5 name="edit" size={24} color="black" />
            </TouchableOpacity>
            <View style={globalStyles.userDetails}>
                <Text style={globalStyles.userInfo}>
                    <Text> Name: </Text>
                    <Text> {user?.name}</Text>
                </Text>
                <Text style={globalStyles.userInfo}>
                    <Text> Email: </Text>
                    <Text>{user?.email}</Text>
                </Text>
                <Text style={globalStyles.userInfo}>
                    <Text>Age: </Text>
                    <Text>{user?.age}</Text>
                </Text>
            </View>
            <View style={{ width: '40%', marginTop: 20 }}>
                <Button color="maroon" title="My Reviews" onPress={showReviews} />
            </View>
            <View style={{ width: '20%', marginTop: 20 }}>
                <Button color="maroon" title="Logout" onPress={handleLogout} />
            </View>
        </View>
    );
};

export default UserDetails;
