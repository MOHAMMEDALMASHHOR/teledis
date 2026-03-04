import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    StatusBar, KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useApp } from '../context/AppContext';

const ROLES = ['Hekim Giriş', 'Hasta Giriş', 'Yönetici Giriş'];

export default function LoginScreen({ navigation }) {
    const [role, setRole] = useState('Hekim Giriş');
    const [username, setUsername] = useState('');
    const [site, setSite] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useApp();

    const handleLogin = () => {
        if (!username.trim()) {
            Alert.alert('Hata', 'Lütfen kullanıcı adınızı girin.');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            login(role, username);
            setLoading(false);
        }, 800);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
                <View style={styles.card}>
                    <Text style={styles.title}>TeleDiş Giriş</Text>

                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={role}
                            onValueChange={setRole}
                            style={styles.picker}
                            dropdownIconColor="#E63946"
                        >
                            {ROLES.map((r) => (
                                <Picker.Item key={r} label={r} value={r} />
                            ))}
                        </Picker>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Kullanıcı Adı"
                        placeholderTextColor="#aaa"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Site"
                        placeholderTextColor="#aaa"
                        value={site}
                        onChangeText={setSite}
                    />

                    <TouchableOpacity
                        style={[styles.btn, loading && styles.btnDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.btnText}>{loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.version}>TeleDiş v1.0</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f8' },
    scroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 32,
        width: '100%',
        maxWidth: 380,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1a1a2e',
        textAlign: 'center',
        marginBottom: 28,
        letterSpacing: 0.5,
    },
    pickerWrapper: {
        borderWidth: 1.5,
        borderColor: '#E63946',
        borderRadius: 10,
        marginBottom: 14,
        overflow: 'hidden',
        backgroundColor: '#fff9f9',
    },
    picker: { height: 50, color: '#1a1a2e' },
    input: {
        borderWidth: 1.5,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 14,
        fontSize: 15,
        color: '#1a1a2e',
        backgroundColor: '#fafafa',
    },
    btn: {
        backgroundColor: '#E63946',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 8,
        elevation: 3,
        shadowColor: '#E63946',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.35,
        shadowRadius: 8,
    },
    btnDisabled: { backgroundColor: '#f4a0a6', elevation: 0 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
    version: { marginTop: 32, color: '#aaa', fontSize: 13 },
});
