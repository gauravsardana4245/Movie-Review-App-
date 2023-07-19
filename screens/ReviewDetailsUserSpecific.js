import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Modal, Keyboard, Alert } from 'react-native'
import { globalStyles, images } from '../styles/global'
import Card from '../shared/Card';
import { AntDesign, Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReviewForm from './ReviewForm';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
import { Button } from 'react-native-paper';

const ReviewDetailsUserSpecific = (props) => {
    const dispatch = useDispatch();
    const { route, navigation } = props;
    const [modalOpen, setModalOpen] = useState(false)
    const review = route.params;
    const { updateReview, deleteReview } = bindActionCreators(actionCreators, dispatch)

    const handleUpdate = (review) => {
        const { title, body, rating, _id } = review;
        updateReview(title, body, rating, _id);
        setModalOpen(false);
    }
    const handleDelete = () => {
        Alert.alert('Delete', 'Are you sure you want to delete the review?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: async () => {
                    try {
                        deleteReview(review._id)
                        navigation.navigate("UserReviews")
                    }
                    catch (error) {

                    }
                }
            },
        ]);
    }

    return (
        <View style={globalStyles.reviewDetailsContainer}>
            <View style={globalStyles.reviewHead}>
                <View></View>
                <Text style={globalStyles.reviewTitleM}> {review.title}</Text>
                <View >
                    <TouchableOpacity onPress={() => { setModalOpen(true) }}>
                        <Feather name="edit-2" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={modalOpen} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={globalStyles.modalContent}>
                        <ReviewForm review={review} reducer={handleUpdate} />
                        <AntDesign style={globalStyles.toggleModal} name="close" size={28} color="black" onPress={() => setModalOpen(false)} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Card style={globalStyles.reviewCard}>
                <Text style={globalStyles.reviewBody}> "{review.body}"</Text>
                <View style={globalStyles.reviewRatingM}>
                    <Text style={globalStyles.ratingTextM}> Rating: </Text>
                    <Image source={images.ratings[review.rating]} />
                </View>
            </Card>
            <View style={styles.deleteButtonContainer} >
                <Button style={styles.deleteButton} buttonColor='white' textColor='red' mode="outlined" onPress={handleDelete}>
                    Delete Review
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    deleteButtonContainer: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "center",
    },
    deleteButton: {
        width: 180,
        height: 45,
    }
})

export default ReviewDetailsUserSpecific
