
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



import Axios from 'axios';
import Genres from './Genres';
import Rating from './Rating';
import MaskedView from '@react-native-community/masked-view';
import Svg, {Rect} from 'react-native-svg';
import {LinearGradient} from 'expo-linear-gradient';
import { Easing } from 'react-native-reanimated';
import {MaterialIcons} from '@expo/vector-icons';
import HomeLogo from './HomeLogo';


const {width, height} = Dimensions.get('window');
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE)/2;
const BACKDROP_HEIGHT = height * .6;







export default function Rating8Above({route,navigation}) {
  const scrollx = useRef(new Animated.Value(0)).current; 
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [result, setResult] = useState([]);
  const [movie, setMovie] = useState('');
  const [modalState, setModalState] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [page1, setPage1] = useState(2);

            const searchApi = async ()=>{
                /*const response = await movie.get('/movie?api_key=${api}&query=${term}');*/
                /*const response = await Axios.get('https://api.themoviedb.org/3/search/movie?api_key=0a64a623fd5125911262eca5a87730a5&query='+searchTerm);*/
                /*fetch('https://api.themoviedb.org/3/search/movie?api_key=0a64a623fd5125911262eca5a87730a5&query='+searchTerm)*/
                /*fetch('https://api.themoviedb.org/3/search/movie?api_key=0a64a623fd5125911262eca5a87730a5&query='+searchedword)*/
                fetch('https://api.themoviedb.org/3/discover/movie?api_key=0a64a623fd5125911262eca5a87730a5&language=en-US&vote_average.lte=10&vote_average.gte=8&page='+page1+'&vote_count.gte=2000&sort_by=vote_count.desc')
                .then(response=>response.json())
                .then((data)=>{
                
                const movies = data.results
                // setResult(result.concat(movies));
                // setRefresh(false);
                
                setResult([{key:'left-spacer'}, ...movies,{key:'right:spacer'} ]);
                /*setResult(movies);*/
                //{term==`$(moviesTitle)`?Alert.alert('not found'):Alert.alert('Matched')}
                  
               
               


                })
            };

          
           


            useEffect(()=>{
                searchApi();
                setTimeout(()=>{
                    
                    setLoading(false)

                },1000);

              
                // setRefresh(true);
            
            },[]);


        
      


  
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

  

 /*if (result.length === null) {
    return <Loading/>
  }   */
  //const {searchedword}=route.params

  function noPoster(){
    return require('../Images/no-image.jpeg');
  }

  function Poster(poster){
    return {uri:'http://image.tmdb.org/t/p/w185'+poster}
     
  }

  function increasePage(){
    return setPage1((page1+1)); searchApi()
    setRefresh(true)
     
  }

  function LoadingFunction(){
    if(result.length>=20){
    return(
      <View style={{flex:1,justifyContent:'center',position:'absolute',right:0,}}>
      <TouchableOpacity 
      style={{justifyContent:'center'}}
      onPress={()=>navigation.navigate('Page 2',{
        nextPage:page1,
      })}>
        <MaterialIcons name='navigate-next' style={{fontSize:70,color:'red', marginBottom:-20}}/>
      </TouchableOpacity>
      </View>)
      }
     
  }

    // function LoadingFunction(){
    //       return(
    //     refresh?
    //     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    //     <ActivityIndicator size='large'/>
    //     </View>:null
    //       )
    //  }




 


        


  // if(result.length === 0){
  //   return(
  //     <Modal style={{flex:1,justifyContent:"center",alignItems:'center'}} visible={modalState}>
  //     <View style={{height:'30%', width:'70%',backgroundColor:'red',borderRadius:10,justifyContent:"center",alignItems:'center'}}>
  //     <Text>Search Word does not match any movie</Text>
  //     <TouchableOpacity onPress={()=>setModalState(false)}>
  //     <Text>OK</Text>
  //     </TouchableOpacity>
  //     </View>
  //     </Modal>
     
  //     );
    
     
  //  }
          //{ result.length === 0 ? Alert.alert('Not found'): Alert.alert('Found')}
          


              // if(result.length===0){
              //  Alert.alert('Not found')
              //   }

              // {result.length === 0 ? <Text>Hello</Text>: loading}

                if(loading){
                    return(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size='large'/>
                    </View>)
                    }


                // { result.length === 0 ? Alert.alert('Not found'): Alert.alert('Found')}     
                 
  
                return (
                    <View style={styles.container}>
                        
                    
                              
                            <Backdrop movies={result} scrollx={scrollx}/>
                            <Animated.FlatList
                            horizontal
                            contentContainerStyle={{
                              alignItems:'center'
                            }}
                            // onEndReached={increasePage}
                            onEndReachedThreshold={0}
                            ListFooterComponent={LoadingFunction}
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


                             


                              console.log(result);

                              

                             

                              /*console.log(item.poster_path+" "+item.title );*/
                            /*if(!item.poster_path){
                                return null;
                              }*/
                              


                             /* if(!item.poster_path){
                                item.poster_path = "/5l0hS4A119jCA1A02XsFZHq1uRD.jpg"
                              }*/

                              /* if(item.poster_path=''){
                                return null;
                              }*/
                      
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
                                          </TouchableOpacity>

                                          <View style={{flexDirection:'row', paddingHorizontal:40,}}>
                                          <TouchableOpacity style={{backgroundColor:'tomato',borderRadius:4,borderWidth:1,borderColor:'black',}}>
                                          <Text style={{fontSize:14,color:'white'}}>
                                          {item.release_date}
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
                            <HomeLogo onClicked={()=>navigation.navigate('Home')}/>

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
