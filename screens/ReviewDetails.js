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
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

const ReviewDetails = (props) => {
    const dispatch = useDispatch();
    const { route, navigation } = props;
    const [modalOpen, setModalOpen] = useState(false)
    const [isReviewOfUser, setisReviewOfUser] = useState(false)
    const review = route.params;
    const { updateReview, deleteReview } = bindActionCreators(actionCreators, dispatch)

    const handleUpdate = (review) => {
        const { title, body, rating, _id } = review;
        updateReview(title, body, rating, _id);
        setModalOpen(false);
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            fetchUser(review.user);
        });

        return unsubscribe;
    }, []);

    const host = "https://reviewcorn-backend.onrender.com";
    const fetchUser = async (id) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${host}/api/reviews/checkuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
                body: JSON.stringify({ id: id })
            });
            const json = await response.json();
            console.log(json)
            if (json.isSameUser == true) {
                setisReviewOfUser(true);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };
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
                        navigation.navigate("Home")
                    }
                    catch (error) {

                    }
                }
            },
        ]);
    }

    useEffect(() => {

        fetchUser();
    }, [])
    return (
        <View style={globalStyles.reviewDetailsContainer}>

            {isReviewOfUser ?
                <View style={globalStyles.reviewHead}>
                    <View></View>
                    <Text style={globalStyles.reviewTitleM}> {review.title}</Text>
                    <View >
                        <TouchableOpacity onPress={() => { setModalOpen(true) }}>
                            <Feather name="edit-2" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View> :
                <View style={globalStyles.reviewHeadA}>
                    <Text style={globalStyles.reviewTitleM}> {review.title}</Text>
                </View>
            }

            <Modal visible={modalOpen} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={globalStyles.modalContent}>
                        <ReviewForm review={review} reducer={handleUpdate} />
                        <AntDesign style={globalStyles.toggleModal} name="close" size={28} color="black" onPress={() => setModalOpen(false)} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Card style={globalStyles.reviewCard}>
                <View style={globalStyles.reviewRatingM}>
                    {/* <Text style={globalStyles.ratingTextM}> Rating: </Text> */}
                    <Image source={images.ratings[review.rating]} />
                </View>
                <Text style={globalStyles.reviewBody}> "{review.body}"</Text>
                <View style={globalStyles.reviewOwnerM}>
                    <FontAwesome5 style={globalStyles.reviewOwnerIcon} name="user-alt" size={16} color="black" />
                    <Text style={globalStyles.reviewOwnerName}> {review.uname}</Text>
                </View>
            </Card>
            {isReviewOfUser &&
                <View style={styles.deleteButtonContainer} >
                    <Button style={styles.deleteButton} buttonColor='white' textColor='red' mode="outlined" onPress={handleDelete}>
                        Delete Review
                    </Button>
                </View>
            }

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

export default ReviewDetails
