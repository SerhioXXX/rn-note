import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './app/screens/Onboarding';
import NoteScreen from './app/screens/NoteScreen';
import NoteDetail from './app/components/NoteDetail';
import Provider from './app/context/Provider';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const[password, setPassword]=useState('')
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false)

  const checkPassword = async () => {
    const res = await AsyncStorage.getItem('password')

     if(res === null) return setIsAppFirstTimeOpen(true)   

     setPassword(res)
     setIsAppFirstTimeOpen(false) 
  }

  useEffect(()=> {
    checkPassword()
    // AsyncStorage.clear()
  }, [])

  const RenderNoteScreen = props => <NoteScreen {...props} />

  if(isAppFirstTimeOpen) return <Onboarding onFinish={checkPassword}/>

  return (

    <NavigationContainer>
    <Provider>
    <Stack.Navigator screenOptions={{headerTitle: '', headerTransparent: true}}>
     <Stack.Screen name="NoteScreen" component={RenderNoteScreen} />
     <Stack.Screen name="NoteDetail" component={NoteDetail} />
    </Stack.Navigator>
    </Provider>
    </NavigationContainer>

  )

}

const Stack = createNativeStackNavigator();
