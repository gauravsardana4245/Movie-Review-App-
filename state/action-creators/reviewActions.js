import AsyncStorage from '@react-native-async-storage/async-storage';

const host = "http://192.168.1.7:5000";
export const getReviewsUserSpecific = () => {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${host}/api/reviews/fetchallreviewsofuser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });
            const json = await response.json();
            console.log(json)
            dispatch({ type: "SET_REVIEWS_OF_USER", payload: json });
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };
};


export const addReview = (title, body, rating) => {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${host}/api/reviews/addreview`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({ title: title, body: body, rating: rating }),
            });
            const json = await response.json();
            const review = json.review;
            console.log(review)
            dispatch({ type: "ADD_REVIEW", payload: review });
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };
};

export const deleteReview = (id) => {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('token');
            await fetch(`${host}/api/reviews/deletereview/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            });
            dispatch({ type: "DELETE_REVIEW", payload: id });
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };
};

export const updateReview = (title, body, rating, id) => {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('token');
            await fetch(`${host}/api/reviews/updatereview/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({ title: title, body: body, rating: rating }),
            });
            dispatch({
                type: "EDIT_REVIEW",
                payload: { id, title, body, rating },
            });
        } catch (error) {
            console.error("Error editing review:", error);
        }
    };
};
