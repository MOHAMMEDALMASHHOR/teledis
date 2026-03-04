import React from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, Image,
    SafeAreaView, StatusBar, Alert,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function CustomDrawer({ navigation }) {
    const { currentUser, logout } = useApp();

    const handleLogout = () => {
        Alert.alert('Oturum Kapat', 'Çıkış yapmak istediğinizden emin misiniz?', [
            { text: 'İptal', style: 'cancel' },
            {
                text: 'Çıkış Yap',
                style: 'destructive',
                onPress: () => logout(),
            },
        ]);
    };

    const menuItems = [
        {
            label: 'Hasta Listesi',
            icon: <MaterialIcons name="people" size={22} color="#fff" />,
            onPress: () => navigation.navigate('HastaListesi'),
        },
        {
            label: 'Kullanıcı Profili',
            icon: <MaterialIcons name="person" size={22} color="#fff" />,
            onPress: () => navigation.navigate('KullaniciProfili'),
        },
        {
            label: 'Geri Bildirim',
            icon: <MaterialIcons name="feedback" size={22} color="#fff" />,
            onPress: () => navigation.navigate('GeriBildirim'),
        },
        {
            label: 'Oturum Kapat',
            icon: <MaterialIcons name="logout" size={22} color="#fff" />,
            onPress: handleLogout,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#E63946" />
            {/* Profile Header */}
            <View style={styles.profileSection}>
                <View style={styles.avatarCircle}>
                    <MaterialIcons name="medical-services" size={42} color="#E63946" />
                </View>
                <Text style={styles.doctorName}>{currentUser?.name || 'Telekonsültan Hekim 1'}</Text>
                <Text style={styles.doctorRole}>{currentUser?.role || 'Hekim'}</Text>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
                {menuItems.map((item, idx) => (
                    <TouchableOpacity
                        key={idx}
                        style={[styles.menuItem, idx === menuItems.length - 1 && styles.menuItemLast]}
                        onPress={item.onPress}
                        activeOpacity={0.75}
                    >
                        <View style={styles.menuIcon}>{item.icon}</View>
                        <Text style={styles.menuLabel}>{item.label}</Text>
                        {idx < menuItems.length - 1 && (
                            <MaterialIcons name="chevron-right" size={20} color="rgba(255,255,255,0.6)" />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#E63946' },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 36,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)',
        marginBottom: 8,
    },
    avatarCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    doctorName: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 4,
        textAlign: 'center',
    },
    doctorRole: { color: 'rgba(255,255,255,0.75)', fontSize: 13 },
    menuContainer: { paddingHorizontal: 0, marginTop: 8 },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 17,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.15)',
    },
    menuItemLast: { marginTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)' },
    menuIcon: { width: 36 },
    menuLabel: { flex: 1, color: '#fff', fontSize: 16, fontWeight: '500' },
});
