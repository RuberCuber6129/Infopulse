import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const [expandedExplore, setExpandedExplore] = useState<string | null>(null);
  const [expandedLearn, setExpandedLearn] = useState<string | null>(null);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const exploreData = [
    {
      id: '1',
      label: 'Heart Health',
      emoji: '❤️',
      info:
        'Heart health involves maintaining proper blood flow and reducing risks like hypertension, high cholesterol, and stress.',
    },
    {
      id: '2',
      label: 'Brain Health',
      emoji: '🧠',
      info:
        'Brain health includes mental clarity, memory support, and reducing dementia risks through diet and mental exercise.',
    },
    {
      id: '3',
      label: 'Bone Health',
      emoji: '🦴',
      info:
        'Bone health depends on calcium, vitamin D, and weight-bearing exercises to prevent osteoporosis.',
    },
    {
      id: '4',
      label: 'General Health',
      emoji: '🩺',
      info:
        'Regular checkups, healthy eating, and exercise help maintain general health and detect issues early.',
    },
    {
      id: '5',
      label: 'Vaccinations',
      emoji: '💉',
      info:
        'Vaccinations protect you and your community from serious diseases. Always stay updated with recommended shots.',
    },
    {
      id: '6',
      label: 'First Aid',
      emoji: '⛑️',
      info:
        'Basic first aid skills can save lives. Learn CPR, wound care, and emergency responses.',
    },
  ];

  const learnData = [
    {
      id: '1',
      emoji: '👨‍⚕️',
      title: 'Understanding Heart Disease',
      desc:
        'Learn about the causes, symptoms, and treatments for heart disease.',
      details:
        'Heart disease involves narrowing of arteries, high blood pressure, and can lead to heart attacks. Lifestyle changes and medication often help manage it.',
    },
    {
      id: '2',
      emoji: '👩‍⚕️',
      title: 'Managing Diabetes',
      desc:
        'Get practical advice to manage diabetes and maintain a healthy lifestyle.',
      details:
        'Managing diabetes requires monitoring blood sugar, healthy eating, regular exercise, and sometimes medication. Regular doctor checkups are vital.',
    },
  ];

  const toggleExplore = (id: string) => {
    LayoutAnimation.easeInEaseOut();
    setExpandedExplore(expandedExplore === id ? null : id);
  };

  const toggleLearn = (id: string) => {
    LayoutAnimation.easeInEaseOut();
    setExpandedLearn(expandedLearn === id ? null : id);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Infopulse</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.headerIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchEmoji}>🔍</Text>
        <TextInput
          placeholder="Search symptoms, conditions, or topics"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Explore Section */}
      <Text style={styles.sectionTitle}>Explore</Text>
      <View style={styles.exploreGrid}>
        {exploreData.map((item) => (
          <View key={item.id} style={{ width: '47%' }}>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => toggleExplore(item.id)}
            >
              <Text style={styles.exploreEmoji}>{item.emoji}</Text>
              <Text style={styles.exploreLabel}>{item.label}</Text>
            </TouchableOpacity>
            {expandedExplore === item.id && (
              <View style={styles.dropdownBox}>
                <Text style={styles.dropdownText}>{item.info}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Learn Section */}
      <Text style={styles.sectionTitle}>Learn</Text>
      <FlatList
        data={learnData}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.learnList}
        renderItem={({ item }) => (
          <View style={{ width: 220 }}>
            <TouchableOpacity
              style={styles.learnCard}
              onPress={() => toggleLearn(item.id)}
            >
              <Text style={styles.learnEmoji}>{item.emoji}</Text>
              <Text style={styles.learnTitle}>{item.title}</Text>
              <Text style={styles.learnDesc}>{item.desc}</Text>
            </TouchableOpacity>
            {expandedLearn === item.id && (
              <View style={styles.learnDropdown}>
                <Text style={styles.learnDropdownText}>{item.details}</Text>
              </View>
            )}
          </View>
        )}
      />

      {/* Bottom padding */}
      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fbfd',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerIcon: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f4f8',
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
  },
  searchEmoji: {
    marginRight: 8,
    fontSize: 18,
    color: '#999',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  exploreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  exploreButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  exploreEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  exploreLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  dropdownBox: {
    backgroundColor: '#eef6fb',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  dropdownText: {
    fontSize: 13,
    color: '#333',
  },
  learnList: {
    paddingBottom: 16,
  },
  learnCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 220,
    marginRight: 16,
    padding: 16,
    alignItems: 'center',
  },
  learnEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  learnTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  learnDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  learnDropdown: {
    backgroundColor: '#eef6fb',
    marginTop: 4,
    borderRadius: 8,
    padding: 10,
  },
  learnDropdownText: {
    fontSize: 13,
    color: '#333',
  },
});
