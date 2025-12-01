import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { apiClient } from '../services/api';
import type { User, InstagramAccount } from '../types';
import VideoBackground from '../components/VideoBackground';

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<InstagramAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, accountsData] = await Promise.all([
        apiClient.getCurrentUser(),
        apiClient.getInstagramAccounts(),
      ]);
      setUser(userData);
      setAccounts(accountsData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  }

  return (
    <VideoBackground>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#667eea" />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.full_name || user?.email?.split('@')[0]}</Text>
          </View>
          <View style={styles.headerRight}>
            <LinearGradient
              colors={['#667eea', '#f093fb']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.premiumBadge}
            >
              <Text style={styles.premiumText}>PRO</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Stats Overview */}
        {accounts.length > 0 ? (
          <>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <LinearGradient
                  colors={['rgba(102, 126, 234, 0.1)', 'rgba(102, 126, 234, 0.05)']}
                  style={styles.statCardGradient}
                >
                  <Text style={styles.statLabel}>Total Reach</Text>
                  <Text style={styles.statValue}>124.5K</Text>
                  <View style={styles.statChange}>
                    <Text style={styles.statChangePositive}>+23.5%</Text>
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.statCard}>
                <LinearGradient
                  colors={['rgba(240, 147, 251, 0.1)', 'rgba(240, 147, 251, 0.05)']}
                  style={styles.statCardGradient}
                >
                  <Text style={styles.statLabel}>Engagement</Text>
                  <Text style={styles.statValue}>8.7%</Text>
                  <View style={styles.statChange}>
                    <Text style={styles.statChangePositive}>+12.3%</Text>
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.statCard}>
                <LinearGradient
                  colors={['rgba(79, 172, 254, 0.1)', 'rgba(79, 172, 254, 0.05)']}
                  style={styles.statCardGradient}
                >
                  <Text style={styles.statLabel}>Followers</Text>
                  <Text style={styles.statValue}>{(accounts[0]?.followers_count || 0).toLocaleString()}</Text>
                  <View style={styles.statChange}>
                    <Text style={styles.statChangePositive}>+892</Text>
                  </View>
                </LinearGradient>
              </View>

              <View style={styles.statCard}>
                <LinearGradient
                  colors={['rgba(245, 87, 108, 0.1)', 'rgba(245, 87, 108, 0.05)']}
                  style={styles.statCardGradient}
                >
                  <Text style={styles.statLabel}>Revenue</Text>
                  <Text style={styles.statValue}>$4.2K</Text>
                  <View style={styles.statChange}>
                    <Text style={styles.statChangePositive}>+$1.2K</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>

            {/* AI Insights Card */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>AI Insights</Text>
                <TouchableOpacity>
                  <Text style={styles.sectionLink}>View All →</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.insightCard}>
                <LinearGradient
                  colors={['rgba(102, 126, 234, 0.05)', 'rgba(102, 126, 234, 0.02)']}
                  style={styles.insightCardGradient}
                >
                  <View style={styles.insightHeader}>
                    <View style={styles.insightIcon}>
                      <Text style={styles.insightIconText}>🎯</Text>
                    </View>
                    <Text style={styles.insightTitle}>Best Time to Post</Text>
                  </View>
                  <Text style={styles.insightDescription}>
                    Your audience is most active on <Text style={styles.highlight}>Tue, Thu at 9 AM & 6 PM</Text>.
                    Posting at these times can increase engagement by up to 3.2x.
                  </Text>
                </LinearGradient>
              </View>

              <View style={styles.insightCard}>
                <LinearGradient
                  colors={['rgba(240, 147, 251, 0.05)', 'rgba(240, 147, 251, 0.02)']}
                  style={styles.insightCardGradient}
                >
                  <View style={styles.insightHeader}>
                    <View style={styles.insightIcon}>
                      <Text style={styles.insightIconText}>🚀</Text>
                    </View>
                    <Text style={styles.insightTitle}>Content Strategy</Text>
                  </View>
                  <Text style={styles.insightDescription}>
                    <Text style={styles.highlight}>Reels are performing 4.5x better</Text> than static posts.
                    Focus on short-form video content for maximum ROI.
                  </Text>
                </LinearGradient>
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>

              <View style={styles.actionsGrid}>
                <TouchableOpacity style={styles.actionCard}>
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.actionCardGradient}
                  >
                    <Text style={styles.actionIcon}>✨</Text>
                    <Text style={styles.actionTitle}>Generate Content</Text>
                    <Text style={styles.actionDescription}>AI-powered videos</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard}>
                  <LinearGradient
                    colors={['#f093fb', '#f5576c']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.actionCardGradient}
                  >
                    <Text style={styles.actionIcon}>📊</Text>
                    <Text style={styles.actionTitle}>View Analytics</Text>
                    <Text style={styles.actionDescription}>Deep insights</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard}>
                  <LinearGradient
                    colors={['#4facfe', '#00f2fe']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.actionCardGradient}
                  >
                    <Text style={styles.actionIcon}>📅</Text>
                    <Text style={styles.actionTitle}>Schedule Posts</Text>
                    <Text style={styles.actionDescription}>Auto-publish</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard}>
                  <LinearGradient
                    colors={['#fa709a', '#fee140']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.actionCardGradient}
                  >
                    <Text style={styles.actionIcon}>🎬</Text>
                    <Text style={styles.actionTitle}>Create Ad</Text>
                    <Text style={styles.actionDescription}>Campaign wizard</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            {/* Connected Account */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Connected Account</Text>
              {accounts.map((account) => (
                <View key={account.id} style={styles.accountCard}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.03)', 'rgba(255, 255, 255, 0.01)']}
                    style={styles.accountCardGradient}
                  >
                    <View style={styles.accountInfo}>
                      <View style={styles.accountAvatar}>
                        <Text style={styles.accountAvatarText}>
                          {account.username.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.accountDetails}>
                        <Text style={styles.accountUsername}>@{account.username}</Text>
                        <Text style={styles.accountType}>{account.account_type}</Text>
                      </View>
                    </View>
                    <Text style={styles.accountFollowers}>
                      {account.followers_count.toLocaleString()}
                      <Text style={styles.accountFollowersLabel}> followers</Text>
                    </Text>
                  </LinearGradient>
                </View>
              ))}
            </View>
          </>
        ) : (
          /* Empty State */
          <View style={styles.emptyState}>
            <LinearGradient
              colors={['rgba(102, 126, 234, 0.1)', 'rgba(102, 126, 234, 0.05)']}
              style={styles.emptyCard}
            >
              <Text style={styles.emptyIcon}>📱</Text>
              <Text style={styles.emptyTitle}>Connect Your Instagram</Text>
              <Text style={styles.emptyDescription}>
                Link your Instagram Business account to unlock AI-powered insights,
                automated content creation, and data-driven growth strategies.
              </Text>
              <TouchableOpacity style={styles.connectButton}>
                <LinearGradient
                  colors={['#667eea', '#f093fb']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.connectButtonGradient}
                >
                  <Text style={styles.connectButtonText}>Connect Account →</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </ScrollView>
    </VideoBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: -1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  premiumText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  statCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  statCardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
  },
  statLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statChangePositive: {
    fontSize: 13,
    color: '#4ade80',
    fontWeight: '600',
  },
  section: {
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionLink: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  insightCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  insightCardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightIconText: {
    fontSize: 18,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  insightDescription: {
    fontSize: 14,
    color: '#999',
    lineHeight: 22,
  },
  highlight: {
    color: '#fff',
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionCardGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  actionIcon: {
    fontSize: 32,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  accountCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  accountCardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  accountAvatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  accountDetails: {
    gap: 4,
  },
  accountUsername: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  accountType: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  accountFollowers: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  accountFollowersLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'normal',
  },
  emptyState: {
    padding: 24,
    paddingTop: 60,
  },
  emptyCard: {
    padding: 40,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 400,
  },
  connectButton: {
    borderRadius: 12,
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 10px 20px rgba(102, 126, 234, 0.4)' }
      : { elevation: 10 }
    ),
  },
  connectButtonGradient: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
