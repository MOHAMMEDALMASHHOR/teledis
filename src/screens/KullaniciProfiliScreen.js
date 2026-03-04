import React from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function KullaniciProfiliScreen() {
    const { currentUser } = useApp();
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
            <StatusBar barStyle="light-content" backgroundColor="#E63946" />
            <View style={styles.profileCard}>
                <View style={styles.avatarCircle}>
                    <MaterialIcons name="medical-services" size={52} color="#E63946" />
                </View>
                <Text style={styles.name}>{currentUser?.name || 'Telekonsültan Hekim 1'}</Text>
                <Text style={styles.role}>{currentUser?.role || 'Hekim'}</Text>
                <Text style={styles.username}>@{currentUser?.username || 'hekim'}</Text>
            </View>

            <View style={styles.infoCard}>
                {[
                    { icon: 'badge', label: 'Kullanıcı Adı', value: currentUser?.username || '-' },
                    { icon: 'work', label: 'Rol', value: currentUser?.role || 'Hekim' },
                    { icon: 'business', label: 'Kurum', value: 'TeleDiş Sağlık Sistemi' },
                    { icon: 'phone', label: 'İletişim', value: '+90 (555) 000 00 00' },
                ].map((item) => (
                    <View key={item.label} style={styles.infoRow}>
                        <MaterialIcons name={item.icon} size={20} color="#E63946" />
                        <View style={styles.infoText}>
                            <Text style={styles.infoLabel}>{item.label}</Text>
                            <Text style={styles.infoValue}>{item.value}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f8' },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 28,
        alignItems: 'center',
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.09,
        shadowRadius: 8,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 3,
        borderColor: '#ffd0d3',
    },
    name: { fontSize: 20, fontWeight: '700', color: '#1a1a2e', marginBottom: 4 },
    role: { fontSize: 14, color: '#E63946', fontWeight: '600', marginBottom: 2 },
    username: { fontSize: 13, color: '#aaa' },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        gap: 14,
    },
    infoText: { flex: 1 },
    infoLabel: { fontSize: 12, color: '#aaa', marginBottom: 2 },
    infoValue: { fontSize: 14, color: '#1a1a2e', fontWeight: '600' },
});
