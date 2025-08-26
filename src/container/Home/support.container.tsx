import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SupportScreen() {
  const navigation = useNavigation<any>();

  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [showStepOptions, setShowStepOptions] = useState(false);
  const [showAidOptions, setShowAidOptions] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [expandedLearn, setExpandedLearn] = useState<string | null>(null);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const learnData = [
    {
      id: '1',
      emoji: '🫀',
      title: 'Understanding CPR',
      desc: 'Learn the basics of CPR and safety steps.',
      details:
        'CPR (Cardiopulmonary Resuscitation) can save lives by maintaining circulation during cardiac arrest. Learn proper hand placement, depth, and rhythm.',
    },
    {
      id: '2',
      emoji: '🧰',
      title: 'Using First Aid Kit',
      desc: 'Practical tips for using supplies safely.',
      details:
        'A first aid kit should include bandages, antiseptics, pain relievers, and emergency contacts. Know how to clean wounds and use medical tape.',
    },
    {
      id: '3',
      emoji: '🤧',
      title: 'Allergic Reactions',
      desc: 'How to handle severe allergic responses.',
      details:
        'Recognize symptoms like swelling, difficulty breathing, or hives. Administer epinephrine promptly and seek medical help.',
    },
    {
      id: '4',
      emoji: '🧠',
      title: 'Stroke Signs',
      desc: 'Identify stroke symptoms quickly.',
      details:
        'Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services. Quick response is crucial.',
    },
  ];

  const toggleLearn = (id: string) => {
    LayoutAnimation.easeInEaseOut();
    setExpandedLearn(expandedLearn === id ? null : id);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📞 Support</Text>

      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.smallBox}
          onPress={() => navigation.navigate('RetiredDoctor')}
        >
          <Text style={styles.boxEmoji}>👨‍⚕️</Text>
          <Text style={styles.boxLabel}>Consult Retired Doctor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smallBox}
          onPress={() => setShowLocationOptions(!showLocationOptions)}
        >
          <Text style={styles.boxEmoji}>🗺️</Text>
          <Text style={styles.boxLabel}>Location Tracking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smallBox}
          onPress={() => setShowStepOptions(!showStepOptions)}
        >
          <Text style={styles.boxEmoji}>🪜</Text>
          <Text style={styles.boxLabel}>Step Instructions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smallBox}
          onPress={() => setShowAidOptions(!showAidOptions)}
        >
          <Text style={styles.boxEmoji}>🏥</Text>
          <Text style={styles.boxLabel}>First Aid Kit</Text>
        </TouchableOpacity>
      </View>

      {showLocationOptions && (
        <View style={styles.expandedCard}>
          <Text style={styles.expandedTitle}>🗺️ Location Tracking</Text>
          <Text style={styles.expandedDesc}>
            Real-time location sharing with emergency services.
          </Text>
          <View style={styles.subCard}>
            <Text style={styles.subCardTitle}>🚑 Share with Paramedics</Text>
            <Text style={styles.subCardDesc}>
              Live coordinates shared during emergencies.
            </Text>
          </View>
          <View style={styles.subCard}>
            <Text style={styles.subCardTitle}>📍 Trusted Contacts</Text>
            <Text style={styles.subCardDesc}>
              Select family or friends to notify.
            </Text>
          </View>
        </View>
      )}

      {showStepOptions && (
        <View style={styles.expandedCard}>
          <Text style={styles.expandedTitle}>🪜 Step Instructions</Text>
          <Text style={styles.expandedDesc}>
            Clear guides while waiting for help.
          </Text>
          <View style={styles.subCard}>
            <Text style={styles.subCardTitle}>🫀 CPR Guide</Text>
            <Text style={styles.subCardDesc}>
              Follow exact instructions for CPR.
            </Text>
          </View>
          <View style={styles.subCard}>
            <Text style={styles.subCardTitle}>💊 Seizure Response</Text>
            <Text style={styles.subCardDesc}>
              Do's and Don'ts during seizures.
            </Text>
          </View>
        </View>
      )}

      {showAidOptions && (
        <View style={styles.expandedCard}>
          <Text style={styles.expandedTitle}>🏥 First Aid Kit</Text>
          <Text style={styles.expandedDesc}>
            Essentials to manage emergencies safely.
          </Text>
          <View style={styles.subCard}>
            <Text style={styles.subCardTitle}>🩹 Bandages & Dressings</Text>
            <Text style={styles.subCardDesc}>
              For wounds, cuts, and burns.
            </Text>
          </View>
          <View style={styles.subCard}>
            <Text style={styles.subCardTitle}>💉 Antiseptics</Text>
            <Text style={styles.subCardDesc}>
              To disinfect injuries.
            </Text>
          </View>
          <View style={styles.subCard}>
            <Text style={styles.subCardTitle}>🧴 Emergency Meds</Text>
            <Text style={styles.subCardDesc}>
              Basic pills: painkillers, antihistamines, etc.
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.emergencyCard}
        onPress={() => setShowEmergency(!showEmergency)}
      >
        <View style={styles.emergencyHeader}>
          <Text style={styles.emergencyEmoji}>🔴</Text>
          <Text style={styles.emergencyTitle}>Emergency Button</Text>
          <Text style={styles.arrow}>{showEmergency ? '▲' : '▼'}</Text>
        </View>
        <Text style={styles.emergencyDesc}>
          One-click activation providing instant emergency instructions for seizures, cardiac arrests, strokes, etc.
        </Text>
        {showEmergency && (
          <View style={styles.emergencyBox}>
            <Text style={styles.emergencyText}>
              📞 Calling Emergency Services (911)...
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Learn</Text>
      <View style={styles.learnGrid}>
        {learnData.map((item) => (
          <View key={item.id} style={{ width: '47%' }}>
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
        ))}
      </View>

      <View style={{ height: 40 }} />
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0077b6',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  smallBox: {
    width: '47%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  boxEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  boxLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  expandedCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  expandedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0077b6',
    marginBottom: 4,
  },
  expandedDesc: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  subCard: {
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0077b6',
  },
  subCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0077b6',
    marginBottom: 4,
  },
  subCardDesc: {
    fontSize: 13,
    color: '#444',
  },
  emergencyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emergencyEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  emergencyDesc: {
    fontSize: 13,
    color: '#666',
  },
  arrow: {
    fontSize: 16,
    color: '#999',
  },
  emergencyBox: {
    marginTop: 12,
    backgroundColor: '#ffebeb',
    borderLeftWidth: 4,
    borderLeftColor: '#ff4d4d',
    padding: 12,
    borderRadius: 12,
  },
  emergencyText: {
    color: '#cc0000',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  learnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  learnCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  learnEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  learnTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  learnDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  learnDropdown: {
    backgroundColor: '#eef6fb',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  learnDropdownText: {
    fontSize: 13,
    color: '#333',
  },
});
