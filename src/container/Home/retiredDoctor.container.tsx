import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function RetiredDoctorScreen({ navigation }: any) {
  const [question, setQuestion] = useState('');
  const [showDoctors, setShowDoctors] = useState(false);
  const [showDoctorSelection, setShowDoctorSelection] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const doctorProfiles = [
    {
      name: 'Dr. Anita Sharma, MBBS, MD (Cardiology)',
      age: 68,
      specialty: 'Cardiology',
      experience: '30 years',
      rating: '4.8 ★',
      slots: ['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'],
    },
    {
      name: 'Dr. Rajesh Kapoor, MBBS, MS (Orthopedics)',
      age: 70,
      specialty: 'Orthopedics',
      experience: '28 years',
      rating: '4.6 ★',
      slots: ['10:15 AM', '11:00 AM', '12:45 PM', '02:00 PM', '03:15 PM', '05:00 PM'],
    },
    {
      name: 'Dr. Meera Patel, MBBS, DM (Neurology)',
      age: 66,
      specialty: 'Neurology',
      experience: '25 years',
      rating: '4.9 ★',
      slots: ['10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM'],
    },
  ];

  const previouslyVisitedDoctors = [
    {
      name: 'Dr. Pooja Verma, MBBS, MD (Dermatology)',
      visitDate: '2024-06-15',
      notes: 'Skin rash and allergies consultation',
    },
    {
      name: 'Dr. Ashok Nair, MBBS, DM (Gastroenterology)',
      visitDate: '2024-03-02',
      notes: 'Stomach pain diagnosis',
    },
  ];

  const handleSubmitQuestion = () => {
    Alert.alert('Submitted!', `Your question: "${question}" has been sent to doctors.`);
    setQuestion('');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleBookConsult = () => {
    setShowDoctorSelection(true);
  };

  const handleBookDoctor = (doctorName: string) => {
    setSelectedDoctor(doctorName);
  };

  const handleConfirmSlot = (doctorName: string, time: string) => {
    Alert.alert('Booking Confirmed!', `You have booked ${doctorName} at ${time}.`);
    setShowDoctorSelection(false);
    setSelectedDoctor(null);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>← Back to Support</Text>
      </TouchableOpacity>

      <Text style={styles.title}>👨‍⚕️ Consult Retired Doctor</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📹 Book Video Consultation</Text>
        <Text style={styles.cardDesc}>
          Schedule a virtual session with one of our retired doctors.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleBookConsult}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {showDoctorSelection && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👨‍⚕️ Select a Doctor</Text>
          {doctorProfiles.map((doc, index) => (
            <View key={index} style={styles.doctorCard}>
              <Text style={styles.doctorName}>{doc.name}</Text>
              <Text style={styles.doctorDetail}>Age: <Text style={styles.highlight}>{doc.age} years</Text></Text>
              <Text style={styles.doctorDetail}>Specialty: <Text style={styles.highlight}>{doc.specialty}</Text></Text>
              <Text style={styles.doctorDetail}>Experience: <Text style={styles.highlight}>{doc.experience}</Text></Text>
              <Text style={styles.doctorDetail}>Rating: <Text style={styles.highlight}>{doc.rating}</Text></Text>

              {selectedDoctor === doc.name ? (
                <View>
                  <Text style={styles.slotHeading}>Available Time Slots:</Text>
                  <View style={styles.slotContainer}>
                    {doc.slots.map((slot, i) => (
                      <TouchableOpacity
                        key={i}
                        style={styles.slotButton}
                        onPress={() => handleConfirmSlot(doc.name, slot)}
                      >
                        <Text style={styles.slotText}>{slot}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.smallButton}
                  onPress={() => handleBookDoctor(doc.name)}
                >
                  <Text style={styles.smallButtonText}>Book {doc.name.split(',')[0]}</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🕘 Previously Visited Doctors</Text>
        {previouslyVisitedDoctors.map((doc, index) => (
          <View key={index} style={styles.visitedDoctorCard}>
            <Text style={styles.doctorName}>{doc.name}</Text>
            <Text style={styles.doctorDetail}>Visited On: <Text style={styles.highlight}>{doc.visitDate}</Text></Text>
            <Text style={styles.doctorDetail}>Notes: <Text style={styles.highlight}>{doc.notes}</Text></Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💬 Ask a Health Question</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your question..."
          value={question}
          onChangeText={setQuestion}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmitQuestion}>
          <Text style={styles.buttonText}>Submit Question</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fbfd',
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
    fontSize: 20,
    fontWeight: '700',
    color: '#0077b6',
    marginBottom: 16,
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
    marginBottom: 8,
    color: '#0077b6',
  },
  cardDesc: {
    fontSize: 13,
    color: '#555',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#0077b6',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#f1f4f8',
  },
  doctorCard: {
    backgroundColor: '#eef6fb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  visitedDoctorCard: {
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0077b6',
    marginBottom: 4,
  },
  doctorDetail: {
    fontSize: 13,
    color: '#333',
  },
  highlight: {
    fontWeight: '600',
    color: '#0077b6',
  },
  smallButton: {
    marginTop: 8,
    backgroundColor: '#0077b6',
    paddingVertical: 6,
    borderRadius: 6,
  },
  smallButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
  slotHeading: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#0077b6',
  },
  slotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  slotButton: {
    backgroundColor: '#caf0f8',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  slotText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#0077b6',
  },
});
