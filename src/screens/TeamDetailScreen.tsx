import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Modal,
  Share,
} from 'react-native';
import { apiClient } from '../services/api';
import type { Team, TeamMember, TeamInvite, SendInviteRequest, TeamRole } from '../types';

interface Props {
  route: {
    params: {
      teamId: number;
    };
  };
  navigation: any;
}

export default function TeamDetailScreen({ route, navigation }: Props) {
  const { teamId } = route.params;
  const [team, setTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invites, setInvites] = useState<TeamInvite[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<TeamRole>('member');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [teamData, membersData, invitesData] = await Promise.all([
        apiClient.getTeam(teamId),
        apiClient.getTeamMembers(teamId),
        apiClient.getTeamInvites(teamId).catch(() => []), // May not have permission
      ]);
      setTeam(teamData);
      setMembers(membersData);
      setInvites(invitesData);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.detail || 'Failed to load team data');
      navigation.goBack();
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, []);

  const handleSendInvite = async () => {
    if (!inviteEmail.trim()) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }

    setSending(true);
    try {
      const inviteData: SendInviteRequest = {
        email: inviteEmail.trim(),
        role: inviteRole,
        can_manage_content: true,
        can_manage_instagram: true,
        can_view_analytics: true,
      };

      const newInvite = await apiClient.sendTeamInvite(teamId, inviteData);

      // Share the invite token
      if (newInvite.token) {
        const inviteUrl = `instaai://invite/${newInvite.token}`;
        const message = `You're invited to join ${team?.name}!\n\nAccept your invitation: ${inviteUrl}`;

        try {
          await Share.share({
            message,
            title: `Team Invitation`,
          });
        } catch (shareError) {
          // User cancelled share
        }
      }

      setInvites([...invites, newInvite]);
      setShowInviteModal(false);
      setInviteEmail('');
      Alert.alert('Success', 'Invitation sent successfully');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.detail || 'Failed to send invitation');
    } finally {
      setSending(false);
    }
  };

  const handleRemoveMember = (member: TeamMember) => {
    Alert.alert(
      'Remove Member',
      `Are you sure you want to remove ${member.full_name || member.email} from the team?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiClient.removeTeamMember(teamId, member.user_id);
              setMembers(members.filter((m) => m.id !== member.id));
              Alert.alert('Success', 'Member removed');
            } catch (error: any) {
              Alert.alert('Error', error.response?.data?.detail || 'Failed to remove member');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (!team) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{team.name}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Team Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Information</Text>
          {team.description && (
            <Text style={styles.description}>{team.description}</Text>
          )}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Members:</Text>
            <Text style={styles.infoValue}>{team.member_count} / {team.max_members}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Subscription:</Text>
            <Text style={styles.infoValue}>{team.subscription_tier.toUpperCase()}</Text>
          </View>
        </View>

        {/* Members */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Members ({members.length})</Text>
          </View>
          {members.map((member) => (
            <View key={member.id} style={styles.memberCard}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.full_name || member.email}</Text>
                <Text style={styles.memberEmail}>{member.email}</Text>
                <View style={styles.memberDetails}>
                  <View style={styles.roleBadge}>
                    <Text style={styles.roleBadgeText}>{member.role.toUpperCase()}</Text>
                  </View>
                  <View style={styles.permissions}>
                    {member.can_manage_content && (
                      <Text style={styles.permissionText}>📝 Content</Text>
                    )}
                    {member.can_manage_instagram && (
                      <Text style={styles.permissionText}>📷 Instagram</Text>
                    )}
                    {member.can_view_analytics && (
                      <Text style={styles.permissionText}>📊 Analytics</Text>
                    )}
                  </View>
                </View>
              </View>
              {member.role !== 'owner' && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveMember(member)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Pending Invites */}
        {invites.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pending Invitations ({invites.length})</Text>
            {invites.map((invite) => (
              <View key={invite.id} style={styles.inviteCard}>
                <View>
                  <Text style={styles.inviteEmail}>{invite.email}</Text>
                  <Text style={styles.inviteRole}>{invite.role.toUpperCase()}</Text>
                  <Text style={styles.inviteDate}>
                    Expires {new Date(invite.expires_at).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.inviteStatus}>
                  <Text style={styles.inviteStatusText}>{invite.status.toUpperCase()}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Invite Button */}
        <TouchableOpacity
          style={styles.inviteButton}
          onPress={() => setShowInviteModal(true)}
        >
          <Text style={styles.inviteButtonText}>+ Invite Team Member</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Invite Modal */}
      <Modal
        visible={showInviteModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowInviteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Invite Team Member</Text>

            <TextInput
              style={styles.input}
              placeholder="Email address"
              value={inviteEmail}
              onChangeText={setInviteEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus
            />

            <Text style={styles.roleLabel}>Role:</Text>
            <View style={styles.roleButtons}>
              {(['member', 'admin'] as TeamRole[]).map((role) => (
                <TouchableOpacity
                  key={role}
                  style={[
                    styles.roleButton,
                    inviteRole === role && styles.roleButtonActive,
                  ]}
                  onPress={() => setInviteRole(role)}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      inviteRole === role && styles.roleButtonTextActive,
                    ]}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowInviteModal(false);
                  setInviteEmail('');
                  setInviteRole('member');
                }}
                disabled={sending}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleSendInvite}
                disabled={sending}
              >
                {sending ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Send Invite</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#6C63FF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  memberCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  memberEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  memberDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roleBadge: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  roleBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  permissions: {
    flexDirection: 'row',
    gap: 8,
  },
  permissionText: {
    fontSize: 12,
    color: '#999',
  },
  removeButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  inviteCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  inviteEmail: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  inviteRole: {
    fontSize: 12,
    color: '#6C63FF',
    marginBottom: 2,
  },
  inviteDate: {
    fontSize: 12,
    color: '#999',
  },
  inviteStatus: {
    backgroundColor: '#ffa500',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  inviteStatusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  inviteButton: {
    backgroundColor: '#6C63FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  inviteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  roleLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  roleButtonText: {
    fontSize: 14,
    color: '#666',
  },
  roleButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#6C63FF',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
