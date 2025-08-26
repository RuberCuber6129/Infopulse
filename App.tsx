import React, { useState } from 'react';
import {
  Text,
  View,
  TextStyle,
  ViewStyle,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  NavigationContainer,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from './src/container/Home/home.container';
import RecoveryScreen from './src/container/Home/recovery.container';
import SupportScreen from './src/container/Home/support.container';
import ProfileScreen from './src/container/Home/profile.container';
import FinanceScreen from './src/container/Home/finance.container';
import RetiredDoctorScreen from './src/container/Home/retiredDoctor.container';
import SettingsScreen from './src/container/Home/settings.container';

export type User = {
  gender: string;
  age: string;
  imageUri: string;
  phone: string;
  bloodGroup: string;
  medications: string;
  allergies: string;
  insurance: string;
  lastCheckup: string;
  id: number;
  name: string;
  email: string;
  password: string;
  onLogout: () => void;
};

export type RootTabParamList = {
  Home: undefined;
  Recovery: undefined;
  Finance: { user: User };
  Support: undefined;
  Profile: { user: User };
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  RetiredDoctor: undefined;
  Settings: {user: User};
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function LoginScreen({ onLogin }: { onLogin: (user: Omit<User, 'onLogout'>) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://10.0.2.2:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg);
      }

      const data = await response.json();
      const userFromDB = data.user;

      if (!userFromDB?.id) throw new Error('Invalid user from server');

      const user: Omit<User, 'onLogout'> = {
        id: userFromDB.id,
        name: userFromDB.name,
        email: userFromDB.email,
        password: userFromDB.password,
        gender: '',
        age: '',
        imageUri: '',
        phone: '',
        bloodGroup: '',
        medications: '',
        allergies: '',
        insurance: '',
        lastCheckup: ''
      };

      onLogin(user);
    } catch (err: any) {
      console.error('Login error:', err);
      alert(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.card}>
        <Text style={loginStyles.title}>Welcome Back 👋</Text>
        <Text style={loginStyles.subtitle}>Please sign in to continue.</Text>

        <TextInput
          style={loginStyles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={loginStyles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={loginStyles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={loginStyles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert('Reset password coming soon!')}>
          <Text style={loginStyles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={loginStyles.signupText}>New user? Sign up!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function RegisterScreen({ navigation }: { navigation: any }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(text);
      }

      alert('Registered successfully. Please login.');
      navigation.goBack();
    } catch (err: any) {
      alert(err.message || 'Registration failed');
    }
  };

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.card}>
        <Text style={loginStyles.title}>Create Account 📝</Text>

        <TextInput
          style={loginStyles.input}
          placeholder="Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={loginStyles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={loginStyles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={loginStyles.button} onPress={handleRegister}>
          <Text style={loginStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={loginStyles.forgotText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Tabs({ user }: { user: User }) {
  const insets = useSafeAreaInsets();
  const tabBarStyle: ViewStyle = {
    height: 60 + insets.bottom,
    paddingBottom: 6 + insets.bottom,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: RouteProp<RootTabParamList, keyof RootTabParamList> }) => ({
        tabBarIcon: ({ focused, color }) => {
          const emojis: Record<keyof RootTabParamList, string> = {
            Home: '🏠',
            Recovery: '🧬',
            Support: '📞',
            Finance: '💰',
            Profile: '👤',
          };

          return (
            <View style={styles.tabIconWrapper}>
              <Text style={{ fontSize: focused ? 24 : 22, color }}>{emojis[route.name]}</Text>
            </View>
          );
        },
        tabBarLabelStyle: { fontSize: 12 } as TextStyle,
        tabBarStyle,
        tabBarActiveTintColor: '#0077b6',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Recovery" component={RecoveryScreen} />
      <Tab.Screen name="Finance" component={FinanceScreen} initialParams={{ user }} />
      <Tab.Screen name="Support" component={SupportScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ user }} />
    </Tab.Navigator>
  );
}

function AppInner({ user }: { user: User }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs">{() => <Tabs user={user} />}</Stack.Screen>
        <Stack.Screen name="RetiredDoctor" component={RetiredDoctorScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const onLogout = () => setUser(null);

  const handleLogin = (partialUser: Omit<User, 'onLogout'>) => {
    setUser({ ...partialUser, onLogout });
  };

  return (
    <SafeAreaProvider>
      {user ? (
        <AppInner user={user} />
      ) : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">{() => <LoginScreen onLogin={handleLogin} />}</Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
}

const styles = {
  tabIconWrapper: {
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e0f7fa',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0077b6',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b3e5fc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f9fbfd',
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#0077b6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotText: {
    fontSize: 13,
    color: '#0077b6',
    textAlign: 'center',
    marginBottom: 10,
  },
  signupText: {
    fontSize: 14,
    color: '#0077b6',
    textAlign: 'center',
    fontWeight: '500',
  },
});
function alert(arg0: any) {
  throw new Error('Function not implemented.');
}

