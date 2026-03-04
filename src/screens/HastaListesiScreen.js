import React, { useState } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet,
    StatusBar, TextInput, ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function HastaListesiScreen({ navigation }) {
    const { patients } = useApp();
    const [search, setSearch] = useState('');

    const filtered = patients.filter(
        (p) =>
            p.ad.toLowerCase().includes(search.toLowerCase()) ||
            p.soyad.toLowerCase().includes(search.toLowerCase()) ||
            p.hastaNo.includes(search)
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('HastaDetay', { patientId: item.id })}
            activeOpacity={0.82}
        >
            <View style={styles.avatarSmall}>
                <MaterialIcons name="person" size={26} color="#E63946" />
            </View>
            <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.ad} {item.soyad}</Text>
                <Text style={styles.cardSub}>
                    Hasta No: {item.hastaNo} · {item.cinsiyet} · {item.dogumTarihi}
                </Text>
                <Text style={styles.cardRegion}>{item.bolgeKoy}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#E63946" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#E63946" />

            {/* Search */}
            <View style={styles.searchWrapper}>
                <MaterialIcons name="search" size={20} color="#aaa" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Hasta ara..."
                    placeholderTextColor="#bbb"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {filtered.length === 0 ? (
                <View style={styles.emptyState}>
                    <MaterialIcons name="people-outline" size={64} color="#ddd" />
                    <Text style={styles.emptyText}>Hasta bulunamadı</Text>
                </View>
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* FAB */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('HastaForm', { patientId: null })}
                activeOpacity={0.85}
            >
                <MaterialIcons name="add" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f8' },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 14,
        marginBottom: 8,
        borderRadius: 12,
        paddingHorizontal: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    searchIcon: { marginRight: 8 },
    searchInput: { flex: 1, height: 44, fontSize: 15, color: '#1a1a2e' },
    list: { paddingHorizontal: 16, paddingBottom: 80, paddingTop: 8 },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 14,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    avatarSmall: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#fff0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardInfo: { flex: 1 },
    cardName: { fontSize: 16, fontWeight: '700', color: '#1a1a2e', marginBottom: 3 },
    cardSub: { fontSize: 12.5, color: '#666', marginBottom: 2 },
    cardRegion: { fontSize: 12, color: '#E63946', fontWeight: '500' },
    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { marginTop: 12, color: '#bbb', fontSize: 16 },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 24,
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#E63946',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowColor: '#E63946',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
});
