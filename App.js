import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { AppProvider, useApp } from './src/context/AppContext';
import CustomDrawer from './src/components/CustomDrawer';

import LoginScreen from './src/screens/LoginScreen';
import HastaListesiScreen from './src/screens/HastaListesiScreen';
import HastaFormScreen from './src/screens/HastaFormScreen';
import HastaDetayScreen from './src/screens/HastaDetayScreen';
import DentalDegerlendirmeScreen from './src/screens/DentalDegerlendirmeScreen';
import GenelDegerlendirmeScreen from './src/screens/GenelDegerlendirmeScreen';
import KullaniciProfiliScreen from './src/screens/KullaniciProfiliScreen';
import GeriBildirimScreen from './src/screens/GeriBildirimScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HEADER_STYLE = {
  backgroundColor: '#E63946',
  elevation: 0,
  shadowOpacity: 0,
};

const HEADER_TITLE_STYLE = {
  color: '#fff',
  fontSize: 18,
  fontWeight: '700',
};

function HastaListesiStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: HEADER_STYLE,
        headerTitleStyle: HEADER_TITLE_STYLE,
        headerTintColor: '#fff',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 14 }}>
            <MaterialIcons name="menu" size={26} color="#fff" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="HastaListesi" component={HastaListesiScreen} options={{ title: 'Hasta Listesi' }} />
      <Stack.Screen name="HastaDetay" component={HastaDetayScreen} options={{ title: 'Hasta Detayı' }} />
      <Stack.Screen name="HastaForm" component={HastaFormScreen}
        options={({ route }) => ({ title: route.params?.patientId ? 'Hasta Düzenle' : 'Yeni Hasta' })} />
      <Stack.Screen name="DentalDegerlendirme" component={DentalDegerlendirmeScreen}
        options={{ title: 'Dental Değerlendirme' }} />
      <Stack.Screen name="GenelDegerlendirme" component={GenelDegerlendirmeScreen}
        options={{ title: 'Genel Değerlendirme' }} />
    </Stack.Navigator>
  );
}

function KullaniciStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: HEADER_STYLE,
        headerTitleStyle: HEADER_TITLE_STYLE,
        headerTintColor: '#fff',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 14 }}>
            <MaterialIcons name="menu" size={26} color="#fff" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="KullaniciProfili" component={KullaniciProfiliScreen} options={{ title: 'Kullanıcı Profili' }} />
    </Stack.Navigator>
  );
}

function GeriBildirimStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: HEADER_STYLE,
        headerTitleStyle: HEADER_TITLE_STYLE,
        headerTintColor: '#fff',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 14 }}>
            <MaterialIcons name="menu" size={26} color="#fff" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="GeriBildirim" component={GeriBildirimScreen} options={{ title: 'Geri Bildirim' }} />
    </Stack.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false, drawerStyle: { width: '72%' } }}
    >
      <Drawer.Screen name="HastaListesiStack" component={HastaListesiStack} />
      <Drawer.Screen name="KullaniciProfili" component={KullaniciStack} />
      <Drawer.Screen name="GeriBildirim" component={GeriBildirimStack} />
    </Drawer.Navigator>
  );
}

function RootNavigator() {
  const { currentUser } = useApp();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!currentUser ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainDrawer} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}
