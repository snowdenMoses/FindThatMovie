
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { Formik } from 'formik';





export default function SearchBox({term,onTermChange,onTermSubmit}) {
  const [textInputValue,setTextInputValue] = useState("");

  function clearText(){
    textInputValue
  
  }
 
  return (
    
    <KeyboardAvoidingView  behavior="padding"
     >
       <View  style={styles.searchbox}>
      <Ionicons name='ios-search' 
      size={30} 
      style={{color:'black', alignSelf:'center', marginLeft:5,marginTop:5}}
      />
     
  
      
      <TextInput 
      ref={input=>{textInput=input}}
      clearButtonMode='always'
      autoFocus
      ref={input=>{textInput=input}}
      autoCapitalize='none'
      autoCorrect={false}
      placeholder='Search for a movie' 
      style={styles.inputStyle}
      value={term, clearText()}
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
      borderWidth:2,
      borderRadius:20,
      borderColor:'black',
      flexDirection:'row',
      marginHorizontal:10,
      marginBottom:10,
      padding:5,
      justifyContent:'center',
      alignContent:'center',
      marginBottom:65,
      
  },

 

  inputStyle:{
        marginLeft:20,
        fontSize:18,
        flex:1,

  }
});