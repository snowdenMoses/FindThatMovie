
import  React, {useState,useEffect, useRef,Component} from 'react';
import { useFocusEffect } from '@react-navigation/native';

function Profile({ userId }) {
  const [user, setUser] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = API.subscribe(userId, user => setUser(data));

      return () => unsubscribe();
    }, [userId])
  );

  return <ProfileContent user={user} />;
}
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
import Genres from './Genres';
import Rating from './Rating';
import MaskedView from '@react-native-community/masked-view';
import Svg, {Rect} from 'react-native-svg';
import {LinearGradient} from 'expo-linear-gradient';
import FABExample from './FAB_copy';
import SearchBox from './SearchBox';
import {MaterialIcons} from '@expo/vector-icons';



const {width, height} = Dimensions.get('window');
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE)/2;
const BACKDROP_HEIGHT = height * .6;






export default function LandingPage({navigation}) {
  const scrollx = useRef(new Animated.Value(0)).current; 
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [ModalState, setModalState] = React.useState(false);


  const api = '0a64a623fd5125911262eca5a87730a5';


            const searchApi = (searchTerm)=>{
                /*const response = await movie.get('/movie?api_key=${api}&query=${term}');*/
                /*const response = await Axios.get('https://api.themoviedb.org/3/search/movie?api_key=0a64a623fd5125911262eca5a87730a5&query='+searchTerm);*/
                fetch('https://api.themoviedb.org/3/discover/movie?api_key=0a64a623fd5125911262eca5a87730a5&language=en-US&page=1&sort_by=revenue.desc&vote_count.gte=2000')
                .then(response=>response.json())
                .then((data)=>{
                
                const movies = data.results
                
                
                setResult([{key:'left-spacer'}, ...movies,{key:'right:spacer'} ]);
                /*setResult(movies);*/
                })
                
            };
            


            useEffect(()=>{
                searchApi(term);
                setTimeout(()=>{
                    
                    setLoading(true)

                },700)
            
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

  function RatingFilter(){
    return navigation.navigate('Page 1')
  }


  function RatingFilterFiveToEight(){
    return navigation.navigate('Pg 1')
  }

 


  function LoadingFunction(){
    if(result.length>=20){
    return(
      <View style={{flex:1,justifyContent:'center',position:'absolute',right:0,}}>
      <TouchableOpacity 
      style={{justifyContent:'center'}}
      onPress={()=>navigation.navigate('ByRevenue Pg2')}>
        <MaterialIcons name='navigate-next' style={{fontSize:70,color:'red', marginBottom:-20}}/>
      </TouchableOpacity>
      </View>)
      }
     
  }




                if(!loading){
                return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size='large'/>
                </View>)
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

                              /*console.log(item.poster_path+" "+item.title );*/
                            /*if(!item.poster_path){
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

                                          })} style={{alignItems:'center'}}>
                                              <Image
                                              source={!item.poster_path?noPoster():Poster(item.poster_path)}
                                              style={{
                                                width:ITEM_SIZE-60,
                                                height:Platform.OS==='ios'?320:400,
                                                borderRadius:10,
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

                                          <View style={{flexDirection:'row', paddingHorizontal:40,}}>
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
                                            navigatePage();Clear();}}
                                        />

                                      <View style={{marginLeft:10, }}>
                                                <Text style={{fontWeight:'bold',fontSize:17}}>Discover Movies From Ratings</Text>
                                                <TouchableOpacity 
                                                style={{backgroundColor:'black',width:'30%',height:30,borderWidth:2,borderColor:'red',borderRadius:5,alignItems:'center',
                                                      justifyContent:'center',marginBottom:5}}
                                                onPress={()=>{
                                                    closeModal();
                                                    RatingFilterFiveToEight();}}>
                                                <Text style={{fontSize:18,color:'red'}}>
                                                        Rating:5-8
                                                </Text>
                                                </TouchableOpacity>

                                               <TouchableOpacity 
                                               style={{backgroundColor:'black',width:'30%',height:30,borderWidth:2,borderColor:'red',borderRadius:5,alignItems:'center',justifyContent:'center'}}
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

