import React, { useEffect, useState } from 'react'
import { View, Text, Button, TextInput, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/global'
import * as yup from 'yup';
import { Formik } from 'formik';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';


const Signup = (props) => {
    const [loading, setLoading] = useState(false);
    const { onLogin, navigation } = props;
    const SignupSchema = yup.object({
        name: yup.string().required().min(3),
        email: yup.string().required().email(),
        password: yup.string().required().min(5),
        age: yup.string().required()
            .test("is-age-greater-than-0", "Age must be a number greater than 0", (val) => {
                return parseInt(val) > 0;
            })
    })

    const handleSignup = async (credentials) => {
        const { name, email, password, age } = credentials;
        try {
            const response = await fetch("http://192.168.1.7:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({ name: name, email: email, password: password, age: age })
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
                console.log("cannot sign up")
                Alert.alert(
                    'Invalid Credentials',
                    'Invalid Credentials or User already exists',
                    [{ text: 'OK' }]
                );

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
                <Text style={globalStyles.authHead}>Create an account for free! </Text>
            </View>
            <Formik
                initialValues={{ name: '', email: '', password: '', age: null }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    setLoading(true);
                    setTimeout(() => {
                        handleSignup(values)
                    }, 2000);
                }}
            >
                {(props) => (
                    <View>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='Full Name'
                            onChangeText={props.handleChange('name')}
                            value={props.values.name}
                            onBlur={props.handleBlur('name')}
                        />
                        <Text style={globalStyles.errorText}> {props.touched.name && props.errors.name} </Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='Email'
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                            onBlur={props.handleBlur('email')}
                        />
                        <Text style={globalStyles.errorText}> {props.touched.password && props.errors.password} </Text>
                        <TextInput
                            style={globalStyles.input}
                            secureTextEntry={true}
                            placeholder='Password'
                            onChangeText={props.handleChange('password')}
                            value={props.values.password}
                            onBlur={props.handleBlur('password')}
                        />
                        <Text style={globalStyles.errorText}> {props.touched.password && props.errors.password} </Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='Age'
                            onChangeText={props.handleChange('age')}
                            value={props.values.age}
                            keyboardType='numeric'
                            onBlur={props.handleBlur('age')}
                        />
                        <Text style={globalStyles.errorText}> {props.touched.age && props.errors.age} </Text>
                        <Button color='maroon' title="Create an account" onPress={props.handleSubmit} />
                        {loading && <ActivityIndicator style={{ marginTop: 20 }} size="small" color="maroon" />}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 16 }}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                                <Text style={{ fontSize: 16, color: 'maroon' }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                }

            </Formik>
        </View>
    )
}

export default Signup
