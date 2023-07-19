const initialState = {
    reviews: [],
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_REVIEWS_OF_USER":
            return { ...state, reviews: action.payload };
        case "ADD_REVIEW":
            return { ...state, reviews: [...state.reviews, action.payload] };
        case "DELETE_REVIEW":
            return {
                ...state,
                reviews: state.reviews.filter((review) => review._id !== action.payload),
            };
        case "EDIT_REVIEW":
            return {
                ...state,
                reviews: state.reviews.map((review) => {
                    if (review._id === action.payload.id) {
                        return {
                            ...review,
                            title: action.payload.title,
                            body: action.payload.body,
                            rating: action.payload.rating,
                        };
                    }
                    return review;
                }),
            };
        default:
            return state;
    }
};

export default reviewReducer;
