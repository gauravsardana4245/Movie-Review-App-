import { Formik } from 'formik'
import React from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { globalStyles } from '../styles/global'
import * as yup from 'yup';

const ReviewForm = (props) => {
    const reviewSchema = yup.object({
        title: yup.string().required().min(4),
        body: yup.string().required().min(8),
        rating: yup.string().required()
            .test("is-num-1-5", "Review must be a number 1-5", (val) => {
                return parseInt(val) < 6 && parseInt(val) > 0;
            })
    })

    const { reducer, review } = props;

    return (
        <View style={globalStyles.reviewForm}>
            <Formik
                initialValues={review}
                validationSchema={reviewSchema}
                onSubmit={(values, actions) => {
                    reducer(values)
                    actions.resetForm()
                }}
            >
                {(props) => (
                    <View>
                        <Text style={globalStyles.label}>Title: </Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='Review title'
                            onChangeText={props.handleChange('title')}
                            value={props.values.title}
                            onBlur={props.handleBlur('title')}
                        />
                        <Text style={globalStyles.errorText}> {props.touched.title && props.errors.title} </Text>
                        <Text style={globalStyles.label}>Body: </Text>
                        <TextInput
                            style={globalStyles.input}
                            multiline
                            placeholder='Review details'
                            onChangeText={props.handleChange('body')}
                            value={props.values.body}
                            onBlur={props.handleBlur('body')}
                        />
                        <Text style={globalStyles.errorText}> {props.touched.body && props.errors.body} </Text>
                        <Text style={globalStyles.label}>Rating: </Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder='Rating (1 - 5)'
                            onChangeText={props.handleChange('rating')}
                            value={props.values.rating.toString()}
                            keyboardType='numeric'
                            onBlur={props.handleBlur('rating')}
                        />
                        <Text style={globalStyles.errorText}> {props.touched.rating && props.errors.rating} </Text>
                        <Button color='maroon' title="Submit" onPress={props.handleSubmit} />
                    </View>
                )
                }

            </Formik>
        </View>
    )
}

export default ReviewForm
