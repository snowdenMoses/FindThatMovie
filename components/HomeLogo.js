import React, { Component, useState } from 'react';
import {StyleSheet,Alert,View,TouchableOpacity,Dimensions} from 'react-native';
import {FontAwesome} from '@expo/vector-icons'




const {width, height} = Dimensions.get('window');
  
  
export default function HomeLogo ({onClicked}) {
                        
      return ( 
          <View style={{ position:'absolute',alignItems:'center',justifyContent:'flex-end',bottom:80,left:(width/2)-35}}>
              <TouchableOpacity onPress={onClicked}>
              <View style={{ backgroundColor: 'black', height:70,width:70, borderRadius:35,borderWidth:1, alignItems:"center",justifyContent:'center'}}>
              <FontAwesome name="home" style={{fontSize:30,color:'white'}}/>
              </View>
              </TouchableOpacity>
          </View>
      );
    }


  