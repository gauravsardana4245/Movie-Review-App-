import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({

    reviewDetailsContainer: {
        fontFamily: 'Poppins-Black',
        flex: 1,
        backgroundColor: '#fff',
    },

    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 20,
        marginVertical: 6,
    },
    cardContent: {
        marginHorizontal: 25,
        marginVertical: 20,
        width: 300
    },
    toggleModal: {
        padding: 10,
        margin: 10,
        alignSelf: "center"
    },
    input: {
        borderWidth: 2,
        borderColor: '#000',
        padding: 10,
        fontSize: 17,
        borderRadius: 10,
        marginBottom: 5
    },
    modalContent: {
        flex: 1,
    },
    authBox: {
        marginTop: 100,
        padding: 50
    },
    authHead: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: "center"
    },
    userDetails: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        width: "100%",
        borderColor: "black",
        borderWidth: 2
    },
    userInfo: {
        fontSize: 20,
        display: "flex",
        textAlign: "left",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    error: {
        color: "maroon",
        textAlign: "center",
        marginBottom: 5,
        fontSize: 14
    },
    userIcon: {
        marginRight: 10,
        color: "white"
    },
    userDetailsPage: {
        flex: 1,
        alignItems: "center",
        marginTop: 50
    },
    userIconContainer: {
        flexDirection: "row"
    },
    headerTitle: {
        color: "white",
        fontSize: 18,
    },

    reviewTitle: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 10
    },
    reviewBody: {
        fontSize: 16,
        marginBottom: 5
    },
    reviewRating: {
        flexDirection: "row"
    },
    reviewCard: {
        backgroundColor: "grey"
    },
    ratingText: {
        fontSize: 16
    },
    reviewForm: {
        marginTop: 50,
        paddingHorizontal: 10
    },
    label: {
        fontSize: 16,
        fontWeight: 400,
        marginBottom: 8
    },
    reviewRatingM: {
        flexDirection: "row",
        marginBottom: 10
    },
    ratingTextM: {
        fontSize: 16,
    },
    reviewTitleM: {
        fontSize: 26,
        fontWeight: "bold",
        // borderWidth: 1,
        // borderColor: "black",
        alignSelf: "center",
        width: "60%",
        marginTop: 30,
        textAlign: "center",
    },

    reviewHead: {
        flexDirection: "row",
        // borderWidth: 1,
        // borderColor: "black",
        justifyContent: "space-between",
        padding: 15,
        height: 100
    },
    reviewHeadA: {
        flexDirection: "row",
        // borderWidth: 1,
        // borderColor: "black",
        justifyContent: "center",
        padding: 15,
        height: 100
    },
    flatList: {
        marginBottom: 100,
        paddingBottom: 100
    },
    reviewOwner: {
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        marginTop: 5,
        marginBottom: 15,
        marginLeft: 5
    },
    reviewOwnerM: {
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 5
    },
    reviewOwnerName: {
        fontSize: 16,

    }
})

export const images = {
    ratings: {
        '1': require('../assets/rating-1.png'),
        '2': require('../assets/rating-2.png'),
        '3': require('../assets/rating-3.png'),
        '4': require('../assets/rating-4.png'),
        '5': require('../assets/rating-5.png'),
    }
};