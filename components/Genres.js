import * as React from 'react';
import {View, Text, StyleSheet } from 'react-native';


export default function Genres ({genres}){


return(

    <View style={styles.genres}>
        {genres.map((genre, i) =>{

        return(
        <View key={genre} style={styles.genre}>
            <Text style={styles.genreText}>{genre}</Text>
        </View>
        );
        })}

    
    </View>


);

}


const styles = StyleSheet.create({
    genres:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        marginVertical:4
    }
})