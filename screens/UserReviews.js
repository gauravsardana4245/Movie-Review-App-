import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, Text, TouchableWithoutFeedback, Button, FlatList, Touchable, Modal, Keyboard, Image } from 'react-native'
import { globalStyles, images } from '../styles/global'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Card from '../shared/Card'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import ReviewForm from './ReviewForm'
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';

const UserReviews = (props) => {
    const dispatch = useDispatch();
    const initialreview = { title: '', body: '', rating: '' };
    const { getReviewsUserSpecific, addReview } = bindActionCreators(actionCreators, dispatch)

    const reviews_from_redux = useSelector(state => state.review.reviews)

    const [modalOpen, setModalOpen] = useState(false)
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (reviews_from_redux.length > 0) {
            const reviews_current = reviews_from_redux;
            setReviews(reviews_current.reverse());
        }
    }, [reviews_from_redux])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            getReviewsUserSpecific()
        });

        return unsubscribe;
    }, []);
    useEffect(() => {
        getReviewsUserSpecific();
    }, [])
    const { navigation } = props;

    const pressHandler = (review) => {
        navigation.navigate("ReviewDetailsUserSpecific", review)
    }

    const submitHandler = (review) => {
        const { title, body, rating } = review;
        addReview(title, body, rating);
        setModalOpen(false);
    }

    return (
        // <TouchableWithoutFeedback onPress={() => { console.log("Clicked!!") }}>
        <SafeAreaView style={globalStyles.container}>

            <Modal visible={modalOpen} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={globalStyles.modalContent}>
                        <ReviewForm review={initialreview} reducer={submitHandler} />
                        <AntDesign style={globalStyles.toggleModal} name="close" size={28} color="black" onPress={() => setModalOpen(false)} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <View>
                <Ionicons style={globalStyles.toggleModal} name="add" size={28} color="black" onPress={() => setModalOpen(true)} />
            </View>

            <FlatList
                style={globalStyles.flatList}
                data={reviews}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => pressHandler(item)}>
                        <Card >
                            <Text style={globalStyles.reviewTitle}> {item.title}</Text>
                            <View style={globalStyles.reviewRating}>
                                <Text> Rating: </Text>
                                <Image source={images.ratings[item.rating]} />
                            </View>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
        // </TouchableWithoutFeedback>
    )
}

export default UserReviews
