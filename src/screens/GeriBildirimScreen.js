import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity,
    ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function GeriBildirimScreen() {
    const [konu, setKonu] = useState('');
    const [mesaj, setMesaj] = useState('');
    const [puan, setPuan] = useState(0);
    const [sending, setSending] = useState(false);

    const handleSend = () => {
        if (!mesaj.trim()) {
            Alert.alert('Hata', 'Lütfen geri bildirim mesajınızı girin.');
            return;
        }
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setKonu('');
            setMesaj('');
            setPuan(0);
            Alert.alert('Teşekkürler!', 'Geri bildiriminiz başarıyla iletildi.');
        }, 1000);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Geri Bildirim Gönder</Text>
                    <Text style={styles.cardSub}>Deneyiminizi bizimle paylaşın</Text>

                    {/* Stars */}
                    <Text style={styles.label}>Puanınız</Text>
                    <View style={styles.starsRow}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity key={star} onPress={() => setPuan(star)} activeOpacity={0.75}>
                                <MaterialIcons
                                    name={star <= puan ? 'star' : 'star-border'}
                                    size={36}
                                    color={star <= puan ? '#E63946' : '#ccc'}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.label}>Konu</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Geri bildirim konusu"
                        placeholderTextColor="#bbb"
                        value={konu}
                        onChangeText={setKonu}
                    />

                    <Text style={styles.label}>Mesaj</Text>
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        placeholder="Mesajınızı buraya yazın..."
                        placeholderTextColor="#bbb"
                        value={mesaj}
                        onChangeText={setMesaj}
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                    />

                    <TouchableOpacity
                        style={[styles.btn, sending && { opacity: 0.7 }]}
                        onPress={handleSend}
                        disabled={sending}
                        activeOpacity={0.85}
                    >
                        {sending ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <MaterialIcons name="send" size={18} color="#fff" />
                                <Text style={styles.btnText}>Gönder</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f8' },
    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 22,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.09,
        shadowRadius: 8,
    },
    cardTitle: { fontSize: 20, fontWeight: '700', color: '#1a1a2e', marginBottom: 4 },
    cardSub: { fontSize: 13, color: '#888', marginBottom: 20 },
    label: { fontSize: 13, color: '#555', fontWeight: '600', marginBottom: 6 },
    starsRow: { flexDirection: 'row', marginBottom: 18, gap: 6 },
    input: {
        borderWidth: 1.5,
        borderColor: '#e8e8e8',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 11,
        fontSize: 14,
        color: '#1a1a2e',
        backgroundColor: '#fafafa',
        marginBottom: 14,
    },
    textarea: { height: 110, paddingTop: 11 },
    btn: {
        backgroundColor: '#E63946',
        borderRadius: 12,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 4,
        elevation: 3,
        shadowColor: '#E63946',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
