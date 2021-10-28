import React, { Component, useState } from 'react';
import {StyleSheet,Alert,View,TouchableOpacity,Dimensions} from 'react-native';
import {FontAwesome} from '@expo/vector-icons'


const {width, height} = Dimensions.get('window');
const heightPercentage=(height*80)/100; 
const tenPercentHeight=(height*10)/100; 
const tenPercentWidth=(width*20)/100; 
const fivePercentWidth=(height*5)/100; 

  
  
 export default function FABExample ({onClicked}) {
                        
      return ( 
        <View style={{alignItems:'center',justifyContent:'center',bottom:height-heightPercentage,right:10}}>
              <TouchableOpacity onPress={onClicked}>
                <View style={{ backgroundColor: 'red', height:tenPercentHeight,width:tenPercentHeight, borderRadius:tenPercentHeight/2,borderWidth:1, alignItems:"center",justifyContent:'center'}}>
                <FontAwesome name="search" style={{fontSize:fivePercentWidth}}/>
                </View>
              </TouchableOpacity>
        </View>
          
      );
    }

