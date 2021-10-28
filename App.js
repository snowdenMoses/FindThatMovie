import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


//Pages
import LandingPage from './components/HomePage';
import LandingPage2 from './components/byRevenue';
import LandingPage3 from './components/byThisYear';
import LandingPage4 from './components/ByAllTime';
import AppWithoutNavigation from './AppWithoutNavigation';
import ViewMorePage from './components/ViewMorePage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Rating8Above from './components/rating8-10';
import Rating8Above2 from './components/rating8-102';
import Rating8Above3 from './components/rating8-103';
import RatingFiveToEight from './components/rating5-8';
import RatingFiveToEight2 from './components/rating5-82';
import RatingFiveToEight3 from './components/rating5-83';
import { Entypo } from '@expo/vector-icons';




function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const options = {
  headerTintColor:'red',
  title:'Results of Your Search',
  headerStyle:{
    backgroundColor:'black'
  }
}



function  root(){
  return(

  
  <Tab.Navigator
  initialRouteName="Feed"
  tabBarOptions={{
  activeTintColor: '#e91e63',
  }}>
        <Tab.Screen name="Home" component={LandingPage} 
                style={{marginBottom:10}}
                options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size, }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
                  ),
                }}
        />
        <Tab.Screen name="Settings" component={LandingPage2} 
                options={{
                  tabBarLabel: 'Revenue',
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="pound-sign" color={color} size={size} />
                  )
                }}
          />

          <Tab.Screen name="This Year" component={LandingPage3} 
                options={{
                  tabBarLabel: 'This Year',
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="clock" color={color} size={size} />
                  )
                }}
          />
           <Tab.Screen name="This Week" component={LandingPage4} 
                options={{
                  tabBarLabel: 'All Time',
                  tabBarIcon: ({ color, size }) => (
                    <Entypo name="back-in-time" color={color} size={size} />
                  )
                }}
          />
          
  </Tab.Navigator>

)}

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Home" component={root} options ={{...options, title:'Home'}}/>
        <Stack.Screen name="AppWithoutNavigation" component={AppWithoutNavigation} 
        options={options}
        />
        <Stack.Screen name="Landing_Page2" component={LandingPage2} />
        <Stack.Screen name="Page 1" component={Rating8Above} />
        <Stack.Screen name="Page 2" component={Rating8Above2} />
        <Stack.Screen name="Page 3" component={Rating8Above3} />
        <Stack.Screen name="Pg 1" component={RatingFiveToEight} />
        <Stack.Screen name="Pg 2" component={RatingFiveToEight2} />
        <Stack.Screen name="Pg 3" component={RatingFiveToEight3} />
        <Stack.Screen name="ViewMorePage" component={ViewMorePage} options={{...options, title:'More Info'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}