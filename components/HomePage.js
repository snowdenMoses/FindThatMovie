
import  React, {useState,useEffect, useRef,Component} from 'react';
import { useFocusEffect } from '@react-navigation/native';


//import { Container, Header, View, Button, Icon, Fab } from 'native-base';
import { 
    StyleSheet, 
    Text, 
    View, 
    ImageBackground,
    FlatList,
    Dimensions,
    Animated,
    Image, 
    StatusBar, 
    KeyboardAvoidingView, 
    TouchableOpacity,
    TextInput,
    Alert,
    Modal,
    ActivityIndicator,
    Platform,
} from 'react-native';


//import SearchBox from './components/SearchBox'
import Axios from 'axios';
import Genres from './Genres';
import Rating from './Rating';
import MaskedView from '@react-native-community/masked-view';
import Svg, {Rect} from 'react-native-svg';
import {LinearGradient} from 'expo-linear-gradient';
import FABExample from './FAB_copy';
import SearchBox from './SearchBox';
import {MaterialIcons} from '@expo/vector-icons';



const {width, height} = Dimensions.get('window');
const heightPercentage=(height*52)/100;
const tenPercentWidth=(width*8)/100;
const translateYPercentage=(width*10)/100;

// const example = [{
//   name:"Moses",
//   age:29,
// },
// {
//   name:"Snowden",
//   age:30,
// }];
//console.log(result)
// const filteredResult = example.filter(example=>example.name==='Moses')
// console.log(filteredResult)

//console.log("Hello")
// // console.log('Hello');
// example.forEach(exam=>console.log(exam.age));

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const SPACING = 5;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE)/2;
const BACKDROP_HEIGHT = height * .6;






export default function LandingPage({navigation}) {
  const scrollx = useRef(new Animated.Value(0)).current; 
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [parsedresult, setParsedResult] = useState([]);
  const [ModalState, setModalState] = React.useState(false);
  const page1 = 1;


            const searchApi = (searchTerm)=>{
               fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=0a64a623fd5125911262eca5a87730a5&language=en-US&vote_count.gte=2000&vote_average.gte=2000&page='+page1)
                .then(response=>response.json())
                .then((data)=>{
                
                const movies = data.results
                // setParsedResult(JSON.parse(data))
                
                
                setResult([{key:'left-spacer'}, ...movies,{key:'right:spacer'} ]);
                /*setResult(movies);*/
                })
                
            };
            


            useEffect(()=>{
              searchApi(term);
              setTimeout(()=>{
                  
                  setLoading(true)

              },3000)
          
          },[]);


           


  
  

  
  function Backdrop ({movies, scrollx}){
    return (
    <View style={{position:'absolute', width,height:BACKDROP_HEIGHT}}>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item,index}) => {
          if(!item.backdrop_path){
            return null;
          }
  
          const inputRange=  [
            (index-2)* ITEM_SIZE,
            (index-1)*ITEM_SIZE,
          ];
  
          const translateX = scrollx.interpolate({
            inputRange,
            outputRange:[-width,0]
          })

          if(Platform.OS==='ios'){
  
          return <MaskedView style={{position:'absolute'}} 
                     maskElement={
                        <AnimatedSvg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{transform:[{translateX}]}}>
                        <Rect x='0' y='0'width={width} height={height} fill='red'/>
                        </AnimatedSvg>
                      }
                >
              <Image 
              source={{uri:'http://image.tmdb.org/t/p/w185'+item.backdrop_path}} 
              style={{width,height:BACKDROP_HEIGHT, resizeMode:'cover'}}/>
          </MaskedView>
          }
        }}
  
      />
  
      <LinearGradient colors={['transparent','white']} style={{width,height:BACKDROP_HEIGHT,position:'absolute',bottom:0,}}/>
    </View>
    );
  }

 

  function navigatePage(){
      navigation.navigate('AppWithoutNavigation',{
        searchedword:term,
    });
  }

  function closeModal (){
      setModalState(false);
  }


  function noPoster(){
    return require('../Images/no-image.jpeg');
  }

  function Poster(poster){
    return {uri:'http://image.tmdb.org/t/p/w185'+poster}
     
  }

  function Clear(){
    return textInput.clear();
  }


  function Clear(){
    return textInput.clear();
  }

  function RatingFilter(){
    return navigation.navigate('Page 1')
  }


  function RatingFilterFiveToEight(){
    return navigation.navigate('Pg 1')
  }


  //const newResult=JSON.parse(result);
 // const filteredResult = parsedresult.filter(result=>result.title==='run')
  //console.log(parsedresult);
  //console.log(JSON.parse(result));


                if(!loading){
                return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size='large'/>
                </View>)
                }


                // if(!result){
                //   return(
                //   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                //   <Text>Connection Problem</Text>
                //   </View>)
                //   }


  
                return (

                    
                    <View style={styles.container}>
                        
                            <Backdrop movies={result} scrollx={scrollx}/>
                            <Animated.FlatList
                            horizontal
                            contentContainerStyle={{
                              alignItems:'center'
                            }}
                            snapToInterval={ITEM_SIZE}
                            decelerationRate={0}
                            bounces={false}
                            onScroll={Animated.event(
                              [{nativeEvent: {contentOffset: {x: scrollx}}}],
                              {useNativeDriver:true}
                            )}
                            scrollEventThrottle={16}
                            showsHorizontalScrollIndicator={false}
                            data={result}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item,index})=>{


                              

                             /*if(!item.poster_path){
                                return <View style={{width: SPACER_ITEM_SIZE}}/>
                              }*/


                              if(!item.id){
                                return <View style={{width: SPACER_ITEM_SIZE}}/>
                              }

                              /*console.log(item.poster_path+" "+item.title );*/
                            /*if(!item.poster_path){
                                return null;
                              }*/


                             
                              


                              const inputRange = [
                                (index-2)* ITEM_SIZE,
                                (index-1)*ITEM_SIZE,
                                index*ITEM_SIZE,
                                
                              ];


                             
                            
                              const translateY = scrollx.interpolate({
                                inputRange,
                               outputRange:[20,-70,20]
                              })
                            




                            return  <View style={{width:ITEM_SIZE,}}>
                                <Animated.View style={{
                                                        marginHorizontal: SPACING,
                                                        padding: SPACING*2,
                                                        alignItems:'center',
                                                        backgroundColor:'white',
                                                        borderRadius:10,
                                                        overflow:'hidden',
                                                        transform: [{translateY}],
                                                      }}
                                >

                                          <TouchableOpacity 
                                          onPress={()=>navigation.navigate('ViewMorePage',{
                                           searchword:item.title,
                                           id:item.id,
                                           year:item.release_date,
                                           image:item.poster_path,
                                           overview:item.overview,
                                           rating:item.vote_average,

                                          })}
                                          style={{alignItems:'center'}}
                                          >
                                          <Image
                                          source={Poster(item.poster_path)}
                                          style={{
                                            width:ITEM_SIZE-tenPercentWidth,
                                            height:height-heightPercentage,
                                            borderRadius:5,
                                            resizeMode:'stretch',


                                          }}
                                          />

                                          <Text style={{fontSize: 18}} numberOfLines={1}>
                                            {item.title}
                                          </Text>

                                          <Rating rating={item.vote_average}/>
                                          
                                          <Text style={{fontSize:12}} numberOfLines={3} >
                                            {item.overview}
                                          </Text>
                                         
                                         </TouchableOpacity>


                                          <View style={{flexDirection:'row', marginHorizontal:40,}}>
                                          <TouchableOpacity style={{backgroundColor:'tomato',borderRadius:4,borderWidth:1,borderColor:'black',}}>
                                          <Text style={{fontSize:14,color:'white'}} numberOfLines={3} >
                                          {new Date(item.release_date).getFullYear()}
                                          </Text>
                                          </TouchableOpacity>
                                         <TouchableOpacity 
                                          onPress={()=>navigation.navigate('ViewMorePage',{
                                           searchword:item.title,
                                           id:item.id,
                                           year:item.release_date,
                                           image:item.poster_path,
                                           overview:item.overview,
                                           rating:item.vote_average,

                                          })}
                                          style={{backgroundColor:'tomato',borderRadius:4,borderWidth:1,borderColor:'black',}}>
                                          <Text style={{fontSize:14,color:'white'}} numberOfLines={3} >
                                          Details
                                          </Text>
                                          </TouchableOpacity>
                                          </View>

                                </Animated.View>
                            </View>
                            }}
                            
                            /> 


                            
                                <Modal visible={ModalState} animationType='slide'>
                                        <View style={{
                                            marginTop:20,
                                            flexDirection:'row',
                                            justifyContent:'space-between',
                                            marginHorizontal:10,
                                            paddingVertical:10,
                                            }}>
                                            <View>
                                                <TouchableOpacity onPress={()=>setModalState(false)}>
                                                <Text style={{fontSize:18,color:'red'}}>
                                                        Close
                                                </Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View >
                                                <TouchableOpacity onPress={()=>{
                                                    closeModal();
                                                    navigatePage();}}>
                                                <Text style={{fontSize:18,color:'red'}}>
                                                        Send
                                                </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        
                                        <SearchBox  style={{position:'absolute', top:40,}} 
                                            term={term} 
                                            onTermChange={newTerm=>setTerm(newTerm)}
                                            onTermSubmit={()=>{searchApi(term);closeModal();
                                            navigatePage();}}
                                        />
                                        
                                        <View style={{marginLeft:10, }}>
                                                <Text style={{fontWeight:'bold',fontSize:17}}>Discover Movies By Rating</Text>
                                                <TouchableOpacity 
                                                style={{backgroundColor:'black',width:'30%',height:30,borderWidth:1,borderColor:'red',borderRadius:5,alignItems:'center',
                                                      justifyContent:'center',marginBottom:5}}
                                                onPress={()=>{
                                                    closeModal();
                                                    RatingFilterFiveToEight();}}>
                                                <Text style={{fontSize:18,color:'red'}}>
                                                        Rating:5-8
                                                </Text>
                                                </TouchableOpacity>

                                               <TouchableOpacity 
                                               style={{backgroundColor:'black',width:'30%',height:30,borderWidth:1,borderColor:'red',borderRadius:5,alignItems:'center',justifyContent:'center'}}
                                               onPress={()=>{
                                                    closeModal();
                                                    RatingFilter();}}>
                                                <Text style={{fontSize:18,color:'red'}}>
                                                        Rating:8-10
                                                </Text>
                                                </TouchableOpacity>
                                        </View>
                                                
                                           
                                </Modal>

                               
                        
                                <FABExample onClicked={ ()=>{setModalState(true)}}
                                />

                                


                    </View>
                ); 

}

const styles = StyleSheet.create({
  container: {
    //flex:1,
    width:width,
    height:height,
    //alignItems:'center',
    //justifyContent:'center',
    position:'absolute',
  },

  flatListContainer:{
    paddingHorizontal:10,

  },
});

