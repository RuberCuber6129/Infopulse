import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootTabParamList, User } from '../../../App';

export default function FinanceScreen() {
  const route = useRoute<RouteProp<RootTabParamList, 'Finance'>>();
  const user = route.params?.user as User | undefined;

  const financeProfiles: Record<string, any> = {
    Pranav: {
      name: 'Pranav',
      plan: 'Quarterly Plan',
      balance: 'AED 320.00',
      lastPayment: '2025-06-01',
    },
    InfoPulse: {
      name: 'InfoPulse',
      plan: 'Yearly Plan',
      balance: 'AED 1200.00',
      lastPayment: '2025-05-10',
    },
  };

  const defaultProfile = {
    name: user?.name || 'Guest User',
    plan: 'No active plan',
    balance: 'AED 0.00',
    lastPayment: 'N/A',
  };

  const userFinancialProfile =
    (user && financeProfiles[user.name]) || defaultProfile;

  const plans = [
    {
      id: 'free',
      name: '🆓 Free Plan',
      price: 'AED 0 / Forever',
      highlights: 'Start your health journey with basic tools and community access.',
      included: [
        '👤 1 user profile only',
        '📁 1 GB health document storage',
        '👨‍⚕️ Access to retired doctor forum (read-only)',
        '🧠 Infopulse Wiki access (limited)',
        '🌐 Patient community read access',
      ],
      limits: [
        '❌ No direct doctor consultations',
        '❌ No emergency assistance',
        '❌ No AI health analysis tools',
        '⚠️ Limited storage & access controls',
      ],
    },
    {
      id: 'quarterly',
      name: '🕒 Quarterly Plan',
      price: 'AED 179 / 3 Months',
      highlights: 'Ideal for users seeking short-term, high-quality healthcare support.',
      included: [
        '👥 Access for up to 5 family member profiles',
        '🩺 20 doctor consultations per month (retired + specialist)',
        '📁 20 GB secure health record storage with AI categorization',
        '🏥 Hospice care partners access with standard referral support',
        '🧠 Infopulse Wiki, AI symptom checker, verified content & offline downloads',
        '⚠️ Complete AI-powered emergency response system',
        '🧬 Personalized diet, lifestyle, and medication suggestions',
        '🧘 Emotional Careline support and mental wellness tools',
        '🌐 Community forums and patient mentorship network',
        '⌚ Wearable device integration for real-time tracking',
        '🔐 End-to-end encrypted data (GDPR & HIPAA)',
      ],
      limits: [
        '❗ Consultations capped at 20/month; extra AED 39/session',
        '❌ Specialist consultations pay-per-use',
        '❌ No loyalty perks or priority hospice coordination',
        '⚠️ No unlimited usage or priority support',
      ],
    },
    {
      id: 'yearly',
      name: '📅 Yearly Plan',
      price: 'AED 649 / Year',
      highlights: 'Designed for families and individuals looking for long-term, uninterrupted healthcare support.',
      included: [
        '👥 5 family member profiles (extra AED 25/year)',
        '🩺 Unlimited retired doctor consultations (1/day Fair Use)',
        '👨‍⚕️ 12 specialist consultations/year (AED 468 value)',
        '📁 20 GB encrypted medical vault with AI integration',
        '🏥 Priority hospice network access & discounts',
        '🧠 Infopulse Wiki, symptom checker, medical guides, offline content',
        '⚠️ AI-powered emergency mode, location sharing, triage system',
        '🧬 Tailored diet, recovery routines, medication reminders',
        '🧘 Empathy volunteers, meditations, crisis helplines',
        '🌐 Patient communities & mentorship programs',
        '⌚ Smart wearable integration, family dashboard tracking',
        '🔐 End-to-end secure, global standards compliant',
        '🎁 Loyalty Reward: Free backup + 1 extra family profile after 1 year',
        '🎟️ Referral Bonus: Refer 3 users → 1 free specialist consult + 7 days extension',
        '💸 Save AED 67 vs quarterly, enjoy unlimited consultations',
      ],
      perks: [
        '💰 Cost Saving: AED 649 vs AED 716/year quarterly',
        '🔓 No Monthly Limits',
        '🚑 Faster Hospice Help',
        '🎁 Extra Rewards & Loyalty Bonuses',
        '📆 Peace of Mind: One-time payment, full year coverage',
      ],
    },
  ];

  const handleBuyPlan = (planId: string) => {
    Alert.alert(
      'Purchase Plan',
      `You clicked Buy Now for the ${
        planId === 'quarterly'
          ? 'Quarterly Plan'
          : planId === 'yearly'
          ? 'Yearly Plan'
          : 'Free Plan'
      }. This can be integrated with payment flow.`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>💸 Finance Overview</Text>

      <View style={styles.profileCard}>
        <Text style={styles.sectionTitle}>Your Financial Profile</Text>
        <Text style={styles.label}>
          👤 Name: <Text style={styles.value}>{userFinancialProfile.name}</Text>
        </Text>
        <Text style={styles.label}>
          📝 Current Plan:{' '}
          <Text style={styles.value}>{userFinancialProfile.plan}</Text>
        </Text>
        <Text style={styles.label}>
          💳 Balance:{' '}
          <Text style={styles.value}>{userFinancialProfile.balance}</Text>
        </Text>
        <Text style={styles.label}>
          📅 Last Payment:{' '}
          <Text style={styles.value}>{userFinancialProfile.lastPayment}</Text>
        </Text>
      </View>

      {plans.map((plan) => (
        <View key={plan.id} style={styles.planCard}>
          <Text style={styles.planTitle}>{plan.name}</Text>
          <Text style={styles.planPrice}>{plan.price}</Text>
          <Text style={styles.planHighlights}>{plan.highlights}</Text>

          <Text style={styles.sectionSubtitle}>✅ What’s Included:</Text>
          {plan.included.map((item, index) => (
            <Text key={index} style={styles.planItem}>
              {item}
            </Text>
          ))}

          {plan.limits && (
            <>
              <Text style={styles.sectionSubtitle}>❌ What’s Limited or Excluded:</Text>
              {plan.limits.map((item, index) => (
                <Text key={index} style={styles.limitItem}>
                  {item}
                </Text>
              ))}
            </>
          )}

          {plan.perks && (
            <>
              <Text style={styles.sectionSubtitle}>🎁 Exclusive Yearly Perks:</Text>
              {plan.perks.map((perk, index) => (
                <Text key={index} style={styles.perkItem}>
                  {perk}
                </Text>
              ))}
            </>
          )}

          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => handleBuyPlan(plan.id)}
          >
            <Text style={styles.buyButtonText}>
              {plan.id === 'free' ? 'Activate Free Plan' : 'Buy Now'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

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
    fontSize: 20,
    fontWeight: '700',
    color: '#0077b6',
    marginBottom: 16,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  value: {
    fontWeight: '600',
    color: '#0077b6',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderColor: '#0077b6',
    borderWidth: 1,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0077b6',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  planHighlights: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  planItem: {
    fontSize: 13,
    color: '#444',
    marginBottom: 2,
  },
  limitItem: {
    fontSize: 13,
    color: '#aa0000',
    marginBottom: 2,
  },
  perkItem: {
    fontSize: 13,
    color: '#0077b6',
    marginBottom: 2,
  },
  buyButton: {
    backgroundColor: '#0077b6',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  buyButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
  },
});
