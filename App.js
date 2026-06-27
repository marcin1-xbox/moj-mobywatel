import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Komponent Karty Dokumentu
const DocumentCard = ({ title, icon, color }) => (
  <TouchableOpacity style={[styles.card, { borderLeftColor: color }]} activeOpacity={0.7}>
    <View style={styles.cardContent}>
      <Text style={styles.cardIcon}>{icon}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <Text style={styles.arrow}>→</Text>
  </TouchableOpacity>
);

// Ekran Główny (Pulpit)
function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Dzień dobry!</Text>
        
        {/* Sekcja Główna */}
        <DocumentCard title="mDowód" icon="👤" color="#0052a5" />
        <DocumentCard title="mPrawo jazdy" icon="🚗" color="#e30613" />
        
        {/* Inne Dokumenty */}
        <Text style={styles.subHeader}>Inne dokumenty</Text>
        <DocumentCard title="Legitymacja szkolna / studencka" icon="🎓" color="#28a745" />
        <DocumentCard title="Karta Dużej Rodziny" icon="👨‍👩‍👧‍👦" color="#ffc107" />
      </ScrollView>
    </SafeAreaView>
  );
}

// Atrapowe ekrany dla pozostałych zakładek
function PlaceholderScreen({ route }) {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>Ekran: {route.name}</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let icon;
            if (route.name === 'Pulpit') icon = '🏠';
            else if (route.name === 'Dokumenty') icon = '🗂️';
            else if (route.name === 'Usługi') icon = '🛠️';
            else if (route.name === 'Więcej') icon = '⚙️';
            return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{icon}</Text>;
          },
          tabBarActiveTintColor: '#0052a5',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Pulpit" component={HomeScreen} />
        <Tab.Screen name="Dokumenty" component={PlaceholderScreen} />
        <Tab.Screen name="Usługi" component={PlaceholderScreen} />
        <Tab.Screen name="Więcej" component={PlaceholderScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6f8', padding: 20 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#1a1a1a', marginTop: 10 },
  subHeader: { fontSize: 18, fontWeight: '600', marginTop: 25, marginBottom: 12, color: '#555' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 6,
    elevation: 4, // Cień Android
    shadowColor: '#000', // Cień iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  cardIcon: { fontSize: 26, marginRight: 15 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  arrow: { fontSize: 20, color: '#b3b3b3', fontWeight: 'bold' },
  placeholderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f6f8' },
  placeholderText: { fontSize: 18, color: '#666', fontWeight: '500' }
});
