import React, { useEffect, useState } from 'react'
import { View, Text, Button, TextInput, ActivityIndicator, Alert } from 'react-native'
import { globalStyles } from '../styles/global'
import { Formik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Login = (props) => {
    const { navigation, onLogin } = props;
    const [loading, setLoading] = useState(false);
    const [errorDisplay, setErrorDisplay] = useState(false)

    const handleLogin = async (credentials) => {

        const { email, password } = credentials;
        try {
            const response = await fetch("http://192.168.1.7:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({ email: email.toLowerCase(), password })
            });
            const json = await response.json();
            console.log(json);
            if (json.success) {
                setLoading(false);
                await AsyncStorage.setItem("token", json.authtoken);
                AsyncStorage.getItem('token').then((res) => console.log(res))
                onLogin();
            }
            else {
                setLoading(false);
                setErrorDisplay(true);
            }
        }
        catch (error) {
            console.log(error);
            Alert.alert(
                'Error',
                'Some Error occured! Try again after some time',
                [{ text: 'OK' }]
            );
            setLoading(false);
        }
    }


    return (
        <View style={globalStyles.authBox}>
            <View>
                <Text style={globalStyles.authHead}>Login to your account </Text>
            </View>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, actions) => {
                    setLoading(true)
                    setErrorDisplay(false);
                    setTimeout(() => {
                        handleLogin(values)
                    }, 2000)
                }}
            >
                {(props) => (
                    <View>

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Email'
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                            onBlur={props.handleBlur('email')}
                        />
                        <TextInput
                            style={globalStyles.input}
                            secureTextEntry={true}
                            placeholder='Password'
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                            onBlur={props.handleBlur('password')}
                        />

                        {errorDisplay && <Text style={globalStyles.error}> Please enter a valid email and password!</Text>}

                        <Button color='maroon' title="Login" onPress={props.handleSubmit} />


                        {loading && <ActivityIndicator style={{ marginTop: 20 }} size="small" color="maroon" />}

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 16 }}>Doesn't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                                <Text style={{ fontSize: 16, color: 'maroon' }}>Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                }

            </Formik>
        </View>
    )
}

export default Login
