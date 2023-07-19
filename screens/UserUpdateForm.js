import React, { useEffect, useState } from 'react'
import { View, Text, Button, TextInput, Alert, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/global'
import * as yup from 'yup';
import { Formik } from 'formik';


const UserUpdateForm = (props) => {
    const [loading, setLoading] = useState(false);
    const { onLogin, navigation, route } = props;
    const { user, onUpdate } = route.params;
    const UserSchema = yup.object({
        name: yup.string().required().min(3),
        email: yup.string().required().email(),
        age: yup.string().required()
            .test("is-age-greater-than-0", "Age must be a number greater than 0", (val) => {
                return parseInt(val) > 0;
            })
    })

    const handleUpdate = async (credentials) => {
        const { name, email, age } = credentials;
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch("https://reviewcorn-backend.onrender.com/api/auth/updateuser", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify({ name: name, email: email, age: age })
            });
            const json = await response.json();
            console.log(json);
            setLoading(false);
            onUpdate()
            navigation.navigate("UserDetails")
        }
        catch (error) {
            console.log(error);
            Alert.alert(
                'Error',
                'Some Error occured! Try again after some time',
                [{ text: 'OK' }]
            );
        }
    }

    return (
        <View style={globalStyles.authBox}>
            <View>
                <Text style={globalStyles.authHead}>Update Details </Text>
            </View>
            <Formik
                initialValues={user}
                validationSchema={UserSchema}
                onSubmit={(values, actions) => {
                    console.log('clicked')
                    setLoading(true);
                    setTimeout(() => {
                        handleUpdate(values)
                    }, 2000)
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
                            value={props.values.email.toLowerCase()}
                            onBlur={props.handleBlur('email')}
                        />
                        <Text style={globalStyles.errorText}> {props.touched.password && props.errors.password} </Text>

                        <TextInput
                            style={globalStyles.input}
                            placeholder='Age'
                            onChangeText={props.handleChange('age')}
                            value={props.values.age.toString()}
                            keyboardType='numeric'
                            onBlur={props.handleBlur('age')}
                        />
                        <Text style={globalStyles.errorText}> {props.touched.age && props.errors.age} </Text>

                        {loading && <ActivityIndicator style={{ marginBottom: 20 }} size="small" color="maroon" />}

                        <Button color='maroon' title="Update" onPress={props.handleSubmit} />

                    </View>
                )
                }

            </Formik>
        </View>
    )
}

export default UserUpdateForm
