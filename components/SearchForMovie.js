
import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

export default function SearchBox({term,onTermChange,onTermSubmit}) {
  return (
    
    <KeyboardAvoidingView  behavior="padding"
     >
       <View  style={styles.searchbox}>
      <Ionicons name='ios-search' 
      size={30} 
      style={{color:'black', alignSelf:'center', marginLeft:5,marginTop:5}}
      />
     

      <TextInput 
      autoCapitalize='none'
      autoCorrect={false}
      placeholder='Search for a movie' 
      style={styles.inputStyle}
      value={term}
      placeholderTextColor='black'
      onChangeText={onTermChange}
      onEndEditing={onTermSubmit}
      />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  searchbox: {
      backgroundColor:'#fff',
      borderWidth:2,
      borderRadius:20,
      borderColor:'black',
      flexDirection:'row',
      marginHorizontal:10,
      marginBottom:10,
      padding:5,
      justifyContent:'center',
      alignContent:'center',
      
  },

 

  inputStyle:{
        marginLeft:20,
        fontSize:18,
        flex:1,

  }
});
