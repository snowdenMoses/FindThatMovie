import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Dimensions, FlatList, Image, ScrollView,SafeAreaView,Alert} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {Card} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import { color } from 'react-native-reanimated';




const {width, height} = Dimensions.get('window');
const BACKDROP_HEIGHT = height * .6;
const imageWidth = width - 120;


export default function ViewMorePage ({navigation,route}){

const [information, setInformation]= React.useState([]);
const [movies, setMovies]= React.useState([]);
const [cast, setCast]= React.useState([]);
const {id,searchword,year,image,overview,rating} = route.params;
const eightyPercentWidth=(width*85)/100;


const searchApi = ()=>{
    fetch('https://api.themoviedb.org/3/movie/'+id+'/similar?api_key=0a64a623fd5125911262eca5a87730a5&language=en-US&page=1')
    .then(response=>response.json())
    .then((data)=>{
        const result=data.results;
    setMovies(result);
    // console.log(movies);
    })
    
};




const Credits = ()=>{
    fetch('https://api.themoviedb.org/3/movie/'+id+'/credits?api_key=0a64a623fd5125911262eca5a87730a5')
    .then(response=>response.json())
    .then((data)=>{
    const result2=data.cast;
    setCast(result2);
    /*setResult(movies);*/
    })
    
};


React.useEffect(()=>{
    searchApi();

},[]);

React.useEffect(()=>{
    Credits();


},[]);



// React.useEffect(()=>{
//     mainMovie();

// },[]);

//console.log(cast);
// console.log(information);
// console.log(information.runtime);





const similarMovies=()=>{

    // if(movies===null){
    //     return(
    //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    //     <Text>Connection Problem</Text>
    //     </View>)
    //     }


    return(
        <ScrollView
         horizontal 
         showsHorizontalScrollIndicator={false}
         >
        {
             movies.map((item)=>{
                if(item.vote_average===0 ||  item.vote_average==null || item.poster_path==null || item.vote_count<300 || item.popularity<10){
                    return null;
                   }
                 return(
                <View key={item.id} style={{padding:5,marginBottom:20}}>
                      
                        <Image source={{uri:'http://image.tmdb.org/t/p/w185'+item.poster_path}} style={{width:200,height:300,borderRadius:15}} />
                       
                        <View>
                        <Text style={{fontSize:17, marginRight:3}}>
                            <Text>
                                {item.title.length<25?
                                item.title: `${item.title.substring(0,24)}...`}
                                {/* <Text style={{fontSize:13}}>{item.title}</Text>: <Text style={{fontSize:17}}>{item.title}</Text>
                                
                                } */}
                            </Text>
                        </Text>
                        <Text style={{fontSize:13}}>
                        TMDB Rating: ({ item.vote_average})
                        </Text>
                       
                        </View>
                </View>
                 );
    }
        
    )}
    </ScrollView>
    );
}



if(cast===null){
    return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Text>Connection Problem</Text>
    </View>)
    }

return(
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <Card key={id}>
               
                <View style={{alignItems:'center',padding:10}}>

                        <View style={{alignItems:'center',margin:5,}}>
                        <Text style={{fontSize:22,fontWeight:'bold',marginVertical:5}}>{searchword}</Text> 
                        <Image source={{uri:'http://image.tmdb.org/t/p/w185'+image}}
                        style={{width:eightyPercentWidth,height:400, borderRadius:15,resizeMode:'stretch'}}
                        /> 
                        <Text style={{fontSize:18,fontWeight:'bold',marginTop:5}}>TMDB Rating : {rating}</Text> 
                        <Text style={{fontSize:18,fontWeight:'bold',marginVertical:2}}>Released Year : {year}</Text> 
                        <Text style={{fontSize:18,}}>{overview}</Text> 
                        </View>
                    
            

            {

                     movies.length!==0?
                    <View style={{borderBottomColor:'red',borderBottomWidth:3,alignItems:'center',marginTop:20,marginBottom:5}}>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>SIMILAR MOVIES:</Text> 
                    </View>:null
            

            }
            
             
             
                {

                    similarMovies()
                }
                 {cast.length!==0?
                <View style={{borderBottomColor:'red',borderBottomWidth:3,alignItems:'center',marginTop:20,marginBottom:5}}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>CAST:</Text>
                </View>:null}



                <ScrollView
                 horizontal
                 showsHorizontalScrollIndicator={false}
                 >
                      
                {
                     
                    cast.map(item=>(
                      
                       <View key={item.id} style={{padding:5,marginBottom:20}}>
                           
                           {item.profile_path?
                        <Image source={{uri:'http://image.tmdb.org/t/p/w185'+item.profile_path}} style={{width:200,height:300,borderRadius:15}} />
                        : <Image source={require('../Images/User.png')} style={{width:150,height:300,borderRadius:15}} />
                        }
                        
                            <View>
                                    <Text numberOfLines={2} style={{fontSize:15}}>
                                    {item.name}
                                    </Text>
                                    <Text style={{fontSize:13, marginLeft:3}}>
                                    {item.character.length<40?
                                    <Text>({item.character})</Text>:null
                                    }
                                    </Text>
                            </View>
                       
                        </View>
                        
                        ))

                }
                 </ScrollView>
               
           
                </View>
                </Card>
        </ScrollView>
    </SafeAreaView>

);

}


const styles = StyleSheet.create({

    container:{
    flexGrow: 1,
    marginTop: Constants.statusBarHeight,
    },
    
    scrollView: {
        marginHorizontal: 10,
      },

    
});