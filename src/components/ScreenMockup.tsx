import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ScreenMockupProps {
  type: 'dashboard' | 'connect' | 'sync' | 'content' | 'schedule' | 'analytics';
}

export function ScreenMockup({ type }: ScreenMockupProps) {
  const renderMockup = () => {
    switch (type) {
      case 'dashboard':
        return (
          <View style={styles.phoneFrame}>
            <View style={styles.statusBar} />
            <View style={styles.header}>
              <Text style={styles.headerText}>INSTA AI STUDIO</Text>
            </View>
            <View style={styles.content}>
              <View style={styles.statsRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>12.5K</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>8.2%</Text>
                  <Text style={styles.statLabel}>Engagement</Text>
                </View>
              </View>
              <View style={styles.chartPlaceholder}>
                <View style={styles.chartBar} style={{ height: '40%' }} />
                <View style={styles.chartBar} style={{ height: '65%' }} />
                <View style={styles.chartBar} style={{ height: '85%' }} />
                <View style={styles.chartBar} style={{ height: '55%' }} />
              </View>
              <View style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Sync Media Library</Text>
              </View>
            </View>
          </View>
        );

      case 'connect':
        return (
          <View style={styles.phoneFrame}>
            <View style={styles.statusBar} />
            <View style={styles.header}>
              <Text style={styles.headerText}>Connect Instagram</Text>
            </View>
            <View style={styles.content}>
              <View style={styles.iconCircle}>
                <View style={styles.instagramIcon} />
              </View>
              <Text style={styles.mockupTitle}>Link Your Account</Text>
              <Text style={styles.mockupSubtext}>Connect to access analytics & publish content</Text>
              <View style={styles.connectButton}>
                <LinearGradient
                  colors={['#667eea', '#f093fb']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>Connect Instagram</Text>
                </LinearGradient>
              </View>
              <View style={styles.permissionsList}>
                <View style={styles.permissionItem}>
                  <View style={styles.checkIcon} />
                  <Text style={styles.permissionText}>Read analytics</Text>
                </View>
                <View style={styles.permissionItem}>
                  <View style={styles.checkIcon} />
                  <Text style={styles.permissionText}>Publish content</Text>
                </View>
              </View>
            </View>
          </View>
        );

      case 'sync':
        return (
          <View style={styles.phoneFrame}>
            <View style={styles.statusBar} />
            <View style={styles.header}>
              <Text style={styles.headerText}>Media Library</Text>
            </View>
            <View style={styles.content}>
              <View style={styles.gridContainer}>
                <View style={styles.gridItem}>
                  <View style={styles.imagePlaceholder} />
                  <Text style={styles.gridText}>450 ❤️</Text>
                </View>
                <View style={styles.gridItem}>
                  <View style={styles.imagePlaceholder} />
                  <Text style={styles.gridText}>892 ❤️</Text>
                </View>
                <View style={styles.gridItem}>
                  <View style={styles.imagePlaceholder} />
                  <Text style={styles.gridText}>1.2K ❤️</Text>
                </View>
                <View style={styles.gridItem}>
                  <View style={styles.imagePlaceholder} />
                  <Text style={styles.gridText}>678 ❤️</Text>
                </View>
              </View>
              <View style={styles.syncStatus}>
                <Text style={styles.syncText}>Synced 24 posts • 2 mins ago</Text>
              </View>
            </View>
          </View>
        );

      case 'content':
        return (
          <View style={styles.phoneFrame}>
            <View style={styles.statusBar} />
            <View style={styles.header}>
              <Text style={styles.headerText}>AI Content</Text>
            </View>
            <View style={styles.content}>
              <View style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Generate 10 Reel Ideas</Text>
              </View>
              <View style={styles.contentList}>
                <View style={styles.contentItem}>
                  <View style={styles.contentIcon}>
                    <Text style={styles.contentIconText}>🎬</Text>
                  </View>
                  <View style={styles.contentInfo}>
                    <Text style={styles.contentTitle}>5 Tips for...</Text>
                    <Text style={styles.contentMeta}>Hook + Script + Caption</Text>
                  </View>
                </View>
                <View style={styles.contentItem}>
                  <View style={styles.contentIcon}>
                    <Text style={styles.contentIconText}>✨</Text>
                  </View>
                  <View style={styles.contentInfo}>
                    <Text style={styles.contentTitle}>Behind the Scenes</Text>
                    <Text style={styles.contentMeta}>30 sec • High engagement</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );

      case 'schedule':
        return (
          <View style={styles.phoneFrame}>
            <View style={styles.statusBar} />
            <View style={styles.header}>
              <Text style={styles.headerText}>Schedule</Text>
            </View>
            <View style={styles.content}>
              <View style={styles.calendarHeader}>
                <Text style={styles.monthText}>December 2025</Text>
              </View>
              <View style={styles.calendarGrid}>
                <View style={styles.calendarDay}>
                  <Text style={styles.dayNumber}>1</Text>
                </View>
                <View style={[styles.calendarDay, styles.scheduled]}>
                  <Text style={styles.dayNumber}>2</Text>
                  <View style={styles.postDot} />
                </View>
                <View style={styles.calendarDay}>
                  <Text style={styles.dayNumber}>3</Text>
                </View>
                <View style={[styles.calendarDay, styles.scheduled]}>
                  <Text style={styles.dayNumber}>4</Text>
                  <View style={styles.postDot} />
                </View>
              </View>
              <View style={styles.scheduledPosts}>
                <Text style={styles.scheduledTitle}>Upcoming Posts</Text>
                <View style={styles.scheduledItem}>
                  <View style={styles.scheduledThumb} />
                  <Text style={styles.scheduledTime}>Dec 2 • 9:00 AM</Text>
                </View>
              </View>
            </View>
          </View>
        );

      case 'analytics':
        return (
          <View style={styles.phoneFrame}>
            <View style={styles.statusBar} />
            <View style={styles.header}>
              <Text style={styles.headerText}>Analytics</Text>
            </View>
            <View style={styles.content}>
              <View style={styles.metricsRow}>
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>45K</Text>
                  <Text style={styles.metricLabel}>Reach</Text>
                  <Text style={styles.metricChange}>+12%</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricValue}>8.5%</Text>
                  <Text style={styles.metricLabel}>Engagement</Text>
                  <Text style={styles.metricChange}>+3.2%</Text>
                </View>
              </View>
              <View style={styles.trendChart}>
                <View style={styles.trendLine} />
              </View>
              <View style={styles.topPost}>
                <Text style={styles.topPostLabel}>Top Post</Text>
                <View style={styles.topPostThumb} />
                <Text style={styles.topPostStats}>1.5K likes • 12% ER</Text>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return <View style={styles.mockupContainer}>{renderMockup()}</View>;
}

const styles = StyleSheet.create({
  mockupContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  phoneFrame: {
    width: 200,
    height: 380,
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    borderWidth: 8,
    borderColor: '#2a2a2a',
    overflow: 'hidden',
  },
  statusBar: {
    height: 24,
    backgroundColor: '#0a0a0a',
  },
  header: {
    height: 50,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  headerText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  statValue: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#888',
    fontSize: 8,
    marginTop: 2,
  },
  chartPlaceholder: {
    height: 80,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  chartBar: {
    width: 20,
    backgroundColor: '#667eea',
    borderRadius: 4,
  },
  actionButton: {
    backgroundColor: '#667eea',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  instagramIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#f093fb',
  },
  mockupTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  mockupSubtext: {
    color: '#888',
    fontSize: 9,
    textAlign: 'center',
    marginBottom: 16,
  },
  connectButton: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  gradientButton: {
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  permissionsList: {
    gap: 8,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4ade80',
  },
  permissionText: {
    color: '#aaa',
    fontSize: 9,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  gridItem: {
    width: '48%',
  },
  imagePlaceholder: {
    aspectRatio: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 6,
    marginBottom: 4,
  },
  gridText: {
    color: '#888',
    fontSize: 8,
  },
  syncStatus: {
    backgroundColor: '#2a2a2a',
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
  },
  syncText: {
    color: '#4ade80',
    fontSize: 9,
  },
  contentList: {
    gap: 8,
    marginTop: 12,
  },
  contentItem: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 8,
    gap: 8,
  },
  contentIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#1a1a1a',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentIconText: {
    fontSize: 16,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  contentMeta: {
    color: '#888',
    fontSize: 8,
  },
  calendarHeader: {
    marginBottom: 12,
    alignItems: 'center',
  },
  monthText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  calendarGrid: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
  },
  calendarDay: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduled: {
    backgroundColor: '#667eea',
  },
  dayNumber: {
    color: '#fff',
    fontSize: 10,
  },
  postDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4ade80',
    marginTop: 2,
  },
  scheduledPosts: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 8,
  },
  scheduledTitle: {
    color: '#888',
    fontSize: 9,
    marginBottom: 8,
  },
  scheduledItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scheduledThumb: {
    width: 32,
    height: 32,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
  },
  scheduledTime: {
    color: '#fff',
    fontSize: 9,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  metric: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  metricValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  metricLabel: {
    color: '#888',
    fontSize: 8,
    marginTop: 2,
  },
  metricChange: {
    color: '#4ade80',
    fontSize: 8,
    marginTop: 2,
  },
  trendChart: {
    height: 60,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginBottom: 12,
    padding: 8,
    justifyContent: 'center',
  },
  trendLine: {
    height: 2,
    backgroundColor: '#667eea',
    borderRadius: 1,
    transform: [{ rotate: '5deg' }],
  },
  topPost: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  topPostLabel: {
    color: '#888',
    fontSize: 9,
    marginBottom: 8,
  },
  topPostThumb: {
    width: '100%',
    height: 60,
    backgroundColor: '#1a1a1a',
    borderRadius: 6,
    marginBottom: 6,
  },
  topPostStats: {
    color: '#667eea',
    fontSize: 8,
  },
});
