const { createStore, applyMiddleware } = require("redux");
const { default: reducers } = require("./reducers");
const { default: thunk } = require("redux-thunk");


const store = createStore(reducers, {}, applyMiddleware(thunk))

export default store