
import React, {useState,useEffect, useRef} from 'react';
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
    ActivityIndicator,
    Alert,
    Modal,
    Platform,
} from 'react-native';


import SearchBox from './components/SearchBox';
import movie from './Api/movie';
import Axios from 'axios';
import Genres from './components/Genres';
import Rating from './components/Rating';
import MaskedView from '@react-native-community/masked-view';
import Svg, {Rect} from 'react-native-svg';
import {LinearGradient} from 'expo-linear-gradient';
import { Easing } from 'react-native-reanimated';


const {width, height} = Dimensions.get('window');
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE)/2;
const BACKDROP_HEIGHT = height * .6;







export default function AppWithoutNavigation({route,navigation}) {
  const {searchedword}= route.params;
  const scrollx = useRef(new Animated.Value(0)).current; 
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [movie, setMovie] = useState('');
  const [modalState, setModalState] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const api = '0a64a623fd5125911262eca5a87730a5';


            const searchApi = async (searchTerm)=>{
                await fetch('https://api.themoviedb.org/3/search/movie?api_key=0a64a623fd5125911262eca5a87730a5&query='+searchedword+'&page=1')
                .then(response=>response.json())
                .then((data)=>{
                
                const movies = data.results
               
              
                const moviesTitle = movies[0].title
                setMovie(moviesTitle);
                
                
                setResult([{key:'left-spacer'}, ...movies,{key:'right:spacer'} ]);
                /*setResult(movies);*/
                //{term==`$(moviesTitle)`?Alert.alert('not found'):Alert.alert('Matched')}
                  
               
               


                })
            };

          
           


            useEffect(()=>{
                searchApi(term);
                setTimeout(()=>{
                    
                    setLoading(false)

                },1000)

              
                
            
            },[]);


        
      
   //console.log(result)

  
  const Backdrop  = ({movies, scrollx})=>{
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


  function noPoster(){
    return require('./Images/no-image.jpeg');
  }

  function Poster(poster){
    return {uri:'http://image.tmdb.org/t/p/w185'+poster}
     
  }




 

                if(loading){
                    return(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size='large'/>
                    </View>)
                    }


                // { result.length === 0 ? Alert.alert('Not found'): Alert.alert('Found')}     


                  if(result.length===0){
                    //Todo: customized alertbox
               return(
              <Modal visible={modalState}>
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <View style={{height:100,width:'80%',backgroundColor:'',borderRadius:10,borderColor:'#f5ebeb',borderWidth:2, }}>
              <Text style={{marginBottom:20,alignSelf:'center',marginTop:20}}>Sorry Movie not Found</Text>

              <View style={{borderTopWidth:2,borderTopColor:'#f5ebeb'}}>
              <TouchableOpacity onPress={()=>{setModalState(false),navigation.navigate('Home')}}> 
                <Text style={{marginTop:10,alignSelf:'center',fontSize:20,fontWeight:'bold'}}>OK</Text>
              </TouchableOpacity>

              </View>
              </View>
              </View>
              </Modal>);
                }
 
                 
  
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


                              if(item.vote_average===0 ||  item.vote_average==null || item.poster_path==null || item.vote_count<2000 || item.popularity<10){
                               return null;
                              }


                              //console.log(result);

                              

            
                      
                              const inputRange = [
                                (index-2)* ITEM_SIZE,
                                (index-1)*ITEM_SIZE,
                                index*ITEM_SIZE,
                                
                              ];
                      
                              const translateY = Platform.OS==='ios'? scrollx.interpolate({
                                inputRange,
                               outputRange:[30,-20,30]
                              })

                              :
                              scrollx.interpolate({
                                inputRange,
                               outputRange:[0,-50,0]
                              })


                            return  (
                            <View style={{width:ITEM_SIZE,}}>
                                <Animated.View style={{
                                                        marginHorizontal: SPACING,
                                                        padding: SPACING*2,
                                                        alignItems:'center',
                                                        backgroundColor:'white',
                                                        borderRadius:34,
                                                        overflow:'hidden',
                                                        transform: [{translateY}],
                                                      }}
                                >

                                    
                                          <Image
                                          source={!item.poster_path?noPoster():Poster(item.poster_path)}
                                          style={{
                                            width:ITEM_SIZE-60,
                                            height:Platform.OS==='ios'?320:400,
                                            borderRadius:20,
                                            resizeMode:'stretch',


                                          }}
                                          />

                                          <Text style={{fontSize: 18}} numberOfLines={1}>
                                            {item.title}
                                          </Text>

                                          
                                          <Text style={{fontSize:14,color:'tomato',fontWeight:"bold"}} numberOfLines={3} >
                                          Rating:{item.vote_average}
                                          </Text>
                                          
                                          
                                          <Text style={{fontSize:12}} numberOfLines={3} >
                                            {item.overview}
                                          </Text>

                                          <View style={{flexDirection:'row', paddingHorizontal:40,}}>
                                          <TouchableOpacity style={{backgroundColor:'tomato',borderRadius:4,borderWidth:1,borderColor:'black',}}>
                                          <Text style={{fontSize:14,color:'white'}}>
                                          {item.release_date.toLocaleString('en-US','long')}
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
                                          <Text style={{fontSize:14,color:'white'}}>
                                          Details
                                          </Text>
                                          </TouchableOpacity>
                                          </View>
                                </Animated.View>
                            </View>
                            
                            );
                            
                            }}
                            
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
