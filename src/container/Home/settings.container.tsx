import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, User } from '../../../App';

type SettingsRouteProp = RouteProp<RootStackParamList, 'Settings'>;

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<SettingsRouteProp>();

  // Safe access to user from route params
  const user = route.params?.user as User;

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    if (user?.onLogout) {
      user.onLogout();
    } else {
      Alert.alert('No logout function found.');
    }
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'This feature is coming soon!');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: darkMode ? '#222' : '#f9fbfd' },
      ]}
    >
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          { color: darkMode ? '#fff' : '#0077b6' },
        ]}
      >
        ⚙️ Settings
      </Text>

      {/* Account Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>👤 Account Information</Text>
        <Text style={styles.infoLabel}>
          Name: <Text style={styles.infoValue}>{user?.name}</Text>
        </Text>
        <Text style={styles.infoLabel}>
          Email: <Text style={styles.infoValue}>{user?.email}</Text>
        </Text>
        <Text style={styles.infoLabel}>
          Phone: <Text style={styles.infoValue}>{user?.phone || 'N/A'}</Text>
        </Text>
      </View>

      {/* Notifications */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔔 Notifications</Text>
        <View style={styles.toggleRow}>
          <Text
            style={[
              styles.toggleLabel,
              { color: darkMode ? '#fff' : '#333' },
            ]}
          >
            Enable Notifications
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>
      </View>

      {/* Appearance */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌗 Appearance</Text>
        <View style={styles.toggleRow}>
          <Text
            style={[
              styles.toggleLabel,
              { color: darkMode ? '#fff' : '#333' },
            ]}
          >
            Dark Mode
          </Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>

      {/* Security */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔒 Security</Text>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    color: '#0077b6',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0077b6',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  infoValue: {
    fontWeight: '600',
    color: '#0077b6',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  toggleLabel: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#0077b6',
    borderRadius: 8,
    marginTop: 12,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    borderRadius: 8,
    marginTop: 24,
    paddingVertical: 12,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});
