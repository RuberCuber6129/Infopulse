import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';

export default function RecoveryScreen() {
  const [searchText, setSearchText] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [wikiQuery, setWikiQuery] = useState('');
  const [wikiResult, setWikiResult] = useState('');
  const [wikiLoading, setWikiLoading] = useState(false);

  const [showTipsSection, setShowTipsSection] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [currentTip, setCurrentTip] = useState('');

  const tips = [
    "Stay hydrated and drink enough water every day.",
    "A short walk can improve your mood and health.",
    "Meditation for 5 minutes reduces stress levels.",
    "Eat colorful veggies for vital nutrients.",
    "Take deep breaths when you feel anxious.",
    "Quality sleep speeds up recovery.",
  ];

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleDropdown = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    currentValue: boolean
  ) => {
    LayoutAnimation.easeInEaseOut();
    setter(!currentValue);
  };

  const shuffleTip = () => {
    const tip = tips[Math.floor(Math.random() * tips.length)];
    setCurrentTip(tip);
  };

  const callTinyLlama = async () => {
    if (!aiPrompt.trim()) {
      Alert.alert("Please enter a question for IPulse AI.");
      return;
    }

    setLoading(true);
    setAiResponse('');

    try {
      const url = 'http://10.0.2.2:1234/v1/completions';

      const strictPrompt = `
IMPORTANT:
You are a helpful and concise medical assistant. Your job is to answer health-related questions clearly and respectfully.

Only answer questions related to health, medicine, or recovery. If a question is clearly unrelated, reply:
"I'm sorry, I can only help with medical-related questions."

Always begin your answer with:
"I'm not a doctor. This is not medical advice. Please consult a medical professional for serious concerns."

User's question:
${aiPrompt}

Answer:
`;

      const payload = {
        model: "tinyllama-1.1b-chat-v1.0",
        prompt: strictPrompt,
        max_tokens: 256,
        temperature: 0.5,
        stop: ["User's question:", "Question:"]
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('TinyLlama response:', data);

      if (data?.choices?.[0]?.text) {
        setAiResponse(data.choices[0].text.trim());
      } else {
        setAiResponse('No usable response from TinyLlama.');
      }
    } catch (err) {
      console.error(err);
      setAiResponse('Network error. Please try again.');
    }

    setLoading(false);
  };

  // FIXED: Wikipedia fetch with User-Agent
  const fetchWikipedia = async () => {
    if (!wikiQuery.trim()) return;

    setWikiLoading(true);
    setWikiResult('');

    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiQuery)}`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'MyHealthApp/1.0 (contact@example.com)', // REQUIRED
          },
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.error('Wikipedia error response:', text);
        setWikiResult(`Failed to fetch article (HTTP ${response.status}).`);
        setWikiLoading(false);
        return;
      }

      const data = await response.json();
      console.log('Wiki data:', data);

      if (data?.extract) {
        setWikiResult(data.extract);
      } else if (data?.type === 'disambiguation') {
        setWikiResult(
          'This topic has multiple meanings. Please be more specific (e.g. "Diabetes mellitus" vs "Diabetes insipidus").'
        );
      } else if (data?.title && data?.description) {
        setWikiResult(`${data.title}: ${data.description}`);
      } else {
        setWikiResult('No summary found for this term.');
      }
    } catch (error) {
      console.error('Wikipedia fetch error:', error);
      setWikiResult('Network or parsing error while fetching article.');
    }

    setWikiLoading(false);
  };

  return (
    <ScrollView style={{ padding: 16, paddingTop: 40 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>🧬 Recovery</Text>

      {/* IPulse AI Section */}
      <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>🤖 IPulse AI</Text>
        <Text style={{ marginBottom: 10 }}>Talk to your own personalized AI to help you recover.</Text>
        <TextInput
          style={{ borderColor: '#0077b6', borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 10 }}
          placeholder="Ask IPulse AI about your symptoms..."
          placeholderTextColor="#777"
          value={aiPrompt}
          onChangeText={setAiPrompt}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#0077b6', padding: 12, borderRadius: 8 }}
          onPress={callTinyLlama}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Ask IPulse AI</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator color="#0077b6" style={{ marginTop: 10 }} />}
        {aiResponse !== '' && !loading && (
          <View style={{ backgroundColor: '#eef6fb', marginTop: 10, padding: 12, borderRadius: 8 }}>
            <Text style={{ color: '#003049' }}>{aiResponse}</Text>
          </View>
        )}
      </View>

      {/* Wikipedia Section */}
      <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>📚 Wikipedia Search</Text>
        <Text style={{ marginBottom: 10 }}>Look up general medical topics.</Text>
        <TextInput
          style={{ borderColor: '#0077b6', borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 10 }}
          placeholder="e.g. Diabetes, Asthma..."
          placeholderTextColor="#777"
          value={wikiQuery}
          onChangeText={setWikiQuery}
        />
        <TouchableOpacity style={{ backgroundColor: '#0077b6', padding: 12, borderRadius: 8 }} onPress={fetchWikipedia}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Search Wikipedia</Text>
        </TouchableOpacity>
        {wikiLoading && <ActivityIndicator color="#0077b6" style={{ marginTop: 10 }} />}
        {!!wikiResult && !wikiLoading && (
          <View style={{ backgroundColor: '#eef6fb', marginTop: 10, padding: 12, borderRadius: 8 }}>
            <Text style={{ color: '#003049' }}>{wikiResult}</Text>
          </View>
        )}
      </View>

      {/* Recovery Tips Dropdown */}
      <TouchableOpacity
        onPress={() => toggleDropdown(setShowTipsSection, showTipsSection)}
        style={{ padding: 12, backgroundColor: '#f0f9ff', borderRadius: 8, marginBottom: 12 }}
      >
        <Text style={{ fontWeight: 'bold' }}>🩺 Recovery Tips {showTipsSection ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showTipsSection && (
        <View>
          {/* Tip Section */}
          <TouchableOpacity
            onPress={() => toggleDropdown(setShowTips, showTips)}
            style={{ padding: 10, backgroundColor: '#e6f2ff', marginBottom: 6, borderRadius: 6 }}
          >
            <Text>💡 Quick Tip {showTips ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {showTips && (
            <View>
              <Text style={{ marginVertical: 8 }}>{currentTip || 'Tap below to shuffle!'}</Text>
              <TouchableOpacity onPress={shuffleTip} style={{ backgroundColor: '#0077b6', padding: 10, borderRadius: 6 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Shuffle Tip</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Tracker Section */}
          <TouchableOpacity
            onPress={() => toggleDropdown(setShowTracker, showTracker)}
            style={{ padding: 10, backgroundColor: '#e6f2ff', marginVertical: 6, borderRadius: 6 }}
          >
            <Text>📊 Tracker {showTracker ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {showTracker && (
            <View>
              <Text style={{ marginTop: 10 }}>Mood Today</Text>
              <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                {['😊', '😐', '😢'].map((mood) => (
                  <Text key={mood} style={{ marginRight: 10 }}>{mood}</Text>
                ))}
              </View>
              <Text>Pain Level</Text>
              <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                {[1, 2, 3, 4, 5].map((level) => (
                  <Text key={level} style={{ marginRight: 10 }}>{level}</Text>
                ))}
              </View>
            </View>
          )}

          {/* Notes Section */}
          <TouchableOpacity
            onPress={() => toggleDropdown(setShowNotes, showNotes)}
            style={{ padding: 10, backgroundColor: '#e6f2ff', marginVertical: 6, borderRadius: 6 }}
          >
            <Text>📝 My Notes {showNotes ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {showNotes && (
            <TextInput
              style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 6, minHeight: 80 }}
              multiline
              placeholder="Write your recovery notes..."
              value={notes}
              onChangeText={setNotes}
            />
          )}

          {/* Activities Section */}
          <TouchableOpacity
            onPress={() => toggleDropdown(setShowActivities, showActivities)}
            style={{ padding: 10, backgroundColor: '#e6f2ff', marginVertical: 6, borderRadius: 6 }}
          >
            <Text>🏃‍♂️ Healthy Activities {showActivities ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {showActivities && (
            <View>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://www.youtube.com/watch?v=inpok4MKVLM')}
                style={{ padding: 10 }}
              >
                <Text>🧘‍♀️ Breathing Exercise</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://www.youtube.com/watch?v=mhQd9V8vPec')}
                style={{ padding: 10 }}
              >
                <Text>🚶 Gentle Walk</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
