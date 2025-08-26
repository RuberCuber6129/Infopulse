import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootTabParamList } from '../../../App';

type ProfileProps = {
  route: RouteProp<RootTabParamList, 'Profile'>;
  navigation: any;
};

type Document = {
  id: string;
  title: string;
  description: string;
};

export default function ProfileScreen({ route }: ProfileProps) {
  const { user } = route.params;
  const [activeTab, setActiveTab] = useState<'info' | 'docs'>('info');

  const documents: Record<string, Document[]> = {
    'pranav@example.com': [
      { id: 'doc1', title: 'Blood Test - Jan 2024', description: 'Routine blood work results.' },
      { id: 'doc2', title: 'MRI Scan Report', description: 'Brain MRI scan performed in Dec 2023.' },
      { id: 'doc5', title: 'Vaccination Certificate - COVID-19', description: 'Received 2 doses of Covishield.' },
      { id: 'doc6', title: 'Annual Physical - 2023', description: 'Full body check-up summary.' },
      { id: 'doc7', title: 'Eye Examination - Aug 2023', description: 'Routine vision and retina scan.' },
    ],
    'infopulse@example.com': [
      { id: 'doc3', title: 'Diabetes Management Plan', description: 'Personalized plan from endocrinologist.' },
      { id: 'doc4', title: 'X-Ray - Chest', description: 'Chest x-ray report from Nov 2023.' },
      { id: 'doc8', title: 'CT Scan - Abdomen', description: 'CT scan results for abdominal pain.' },
      { id: 'doc9', title: 'Blood Pressure Log - Q1 2024', description: 'Daily BP logs from Jan–Mar 2024.' },
      { id: 'doc10', title: 'Dental Report - Feb 2024', description: 'Cleaning, cavities, and gum health.' },
    ],
  };

  const userDocs = documents[user.email] || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: user.imageUri || 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.name}>{user.name || 'Unknown User'}</Text>
        <Text style={styles.basicInfo}>
          {`${user.age || 'N/A'} • ${user.gender || 'Not Specified'}`}
        </Text>
      </View>

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'info' && styles.activeTab]}
          onPress={() => setActiveTab('info')}
        >
          <Text style={styles.tabText}>Patient Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'docs' && styles.activeTab]}
          onPress={() => setActiveTab('docs')}
        >
          <Text style={styles.tabText}>Medical Documents</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'info' ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🩺 Medical Information</Text>
          {[
            ['📧 Email:', user.email || 'N/A'],
            ['📱 Phone:', user.phone || 'N/A'],
            ['🩸 Blood Group:', user.bloodGroup || 'Unknown'],
            ['💊 Medications:', user.medications || 'None'],
            ['🤧 Allergies:', user.allergies || 'None'],
            ['📅 Last Checkup:', user.lastCheckup || 'Unknown'],
            ['🏥 Insurance:', user.insurance || 'Not Provided'],
          ].map(([label, value], index) => (
            <View key={index} style={styles.cardRow}>
              <Text style={styles.cardLabel}>{label}</Text>
              <Text style={styles.cardValue}>{value}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📄 My Medical Documents</Text>
          {userDocs.length === 0 ? (
            <Text style={styles.noDocsText}>No documents found for this profile.</Text>
          ) : (
            userDocs.map((doc) => (
              <TouchableOpacity
                key={doc.id}
                style={styles.documentCard}
                onPress={() => Alert.alert(doc.title, doc.description, [{ text: 'Close', style: 'cancel' }])}
              >
                <Text style={styles.documentTitle}>{doc.title}</Text>
                <Text style={styles.documentDesc}>{doc.description}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>⚙️ Settings</Text>
        {['🔒 Change Password', '🌐 Language Preferences', '📜 Terms & Privacy'].map((item, i) => (
          <TouchableOpacity key={i} style={styles.option}>
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() => {
          if (route.params?.user?.onLogout) {
            route.params.user.onLogout();
          } else {
            Alert.alert('Logout function not set!');
          }
        }}
      >
        <Text style={styles.signOutText}>🚪 Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fbfd',
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#0077b6',
    overflow: 'hidden',
    marginBottom: 12,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0077b6',
    marginBottom: 4,
  },
  basicInfo: {
    fontSize: 14,
    color: '#555',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#e0f0f7',
  },
  activeTab: {
    backgroundColor: '#0077b6',
  },
  tabText: {
    color: '#fff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0077b6',
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 14,
    color: '#555',
    maxWidth: '60%',
    textAlign: 'right',
  },
  documentCard: {
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#00b4d8',
  },
  documentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0077b6',
    marginBottom: 4,
  },
  documentDesc: {
    fontSize: 13,
    color: '#444',
  },
  noDocsText: {
    color: '#555',
    fontSize: 14,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 15,
    color: '#333',
  },
  signOutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
