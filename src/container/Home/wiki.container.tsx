// src/container/Home/wiki.container.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

export default function WikiScreen() {
  const [query, setQuery] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWiki = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
      );
      const json = await response.json();
      if (json.extract) {
        setContent(json.extract);
      } else {
        setContent('No results found.');
      }
    } catch (err) {
      setContent('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Infopulse Wiki Search</Text>
        <TextInput
          style={styles.input}
          placeholder="Search Wikipedia..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={fetchWiki}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0077b6" />
        ) : (
          <ScrollView style={styles.contentBox}>
            <Text style={styles.content}>{content}</Text>
          </ScrollView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0077b6',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#90e0ef',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  contentBox: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 12,
    flex: 1,
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
});
