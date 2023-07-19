import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, Text, TouchableWithoutFeedback, Button, FlatList, Touchable, Modal, Keyboard, Image, ScrollView, RefreshControl } from 'react-native'
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
import { useNavigation } from '@react-navigation/native';


const Home = (props) => {
    const dispatch = useDispatch();
    const initialreview = { title: '', body: '', rating: '' };
    const { addReview } = bindActionCreators(actionCreators, dispatch)
    const [refreshing, setRefreshing] = useState(false);
    const reviews_from_redux = useSelector(state => state.review.reviews)

    const [modalOpen, setModalOpen] = useState(false)
    const [reviews, setReviews] = useState([]);

    const host = "https://reviewcorn-backend.onrender.com";
    const getReviews = async () => {
        try {
            const response = await fetch(`${host}/api/reviews/fetchallreviews`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await response.json();
            console.log(json)
            const reviews_current = json;
            setReviews(reviews_current.reverse());
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        getReviews()
            .then(() => setRefreshing(false))
            .catch(error => {
                console.error('Error refreshing reviews:', error);
                setRefreshing(false);
            });
    };

    useEffect(() => {
        setReviews(reviews)
    }, [reviews])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            getReviews()
        });

        return unsubscribe;
    }, []);
    useEffect(() => {
        getReviews();
    }, [])
    const { navigation } = props;

    const pressHandler = (review) => {
        navigation.navigate("ReviewDetails", review)
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
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => pressHandler(item)}>
                        <Card >
                            <Text style={globalStyles.reviewTitle}> {item.title}</Text>
                            <View style={globalStyles.reviewOwner}>
                                <FontAwesome5 style={globalStyles.reviewOwnerIcon} name="user-alt" size={16} color="black" />
                                <Text style={globalStyles.reviewOwnerName}> {item.uname}</Text>
                            </View>
                            <View style={globalStyles.reviewRating}>
                                <Text> Rating: </Text>
                                <Image source={images.ratings[item.rating]} />
                                <Text style={{ marginLeft: 2 }}>({item.rating}/5)</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                )}
            />

        </SafeAreaView >
        // </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Home
