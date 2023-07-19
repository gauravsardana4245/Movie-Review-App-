import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { globalStyles } from '../styles/global'

const Card = (props) => {
    return (
        <View style={globalStyles.card}>
            <View style={globalStyles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

export default Card
