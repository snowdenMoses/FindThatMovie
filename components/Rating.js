import * as React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import {AntDesign} from '@expo/vector-icons'


export default function Rating ({rating}){

    const filledStars = Math.floor(rating/2);
    const maxStars = new Array(5-filledStars).fill('staro');
    const r = [...Array(filledStars).fill('star'), ...maxStars];
    
    return(
    <View style={styles.rating}>
    <Text style={StyleSheet.ratingNumber}>{rating}</Text>
    {r.map((type, index)=>{
        return <AntDesign key={index} name={type} size={12} color='tomato'/>
    
    })}
    
    </View>
    
    
    
    );
    
    }
    
    
    const styles = StyleSheet.create({
        ratingNumber:{marginRight:4,fontFamily:'Men....'},
        rating:{
            flexDirection:'row',
            alignItems:'center'
        } 
    });