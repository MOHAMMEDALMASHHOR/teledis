import React, { useState } from 'react';
import {
    View, Text, ScrollView, TouchableOpacity, StyleSheet,
    StatusBar, Image, Alert, ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useApp } from '../context/AppContext';
import {
    PERMANENT_UPPER, PERMANENT_LOWER, PRIMARY_UPPER, PRIMARY_LOWER,
    DENTAL_MUAYENE_OPTIONS,
} from '../data/mockData';

export default function DentalDegerlendirmeScreen({ navigation, route }) {
    const { patientId } = route.params;
    const { getPatient, updatePatient } = useApp();
    const patient = getPatient(patientId);

    const [dentalMuayene, setDentalMuayene] = useState(patient?.dentalMuayene || []);
    const [selectedTooth, setSelectedTooth] = useState(null);
    const [selectedDurum, setSelectedDurum] = useState('Çürük');
    const [photoIndex, setPhotoIndex] = useState(0);
    const [saving, setSaving] = useState(false);

    const getToothStatus = (toothNo) => {
        const found = dentalMuayene.find((d) => d.dishNo === toothNo);
        return found ? found.durum : null;
    };

    const getToothColor = (toothNo) => {
        const s = getToothStatus(toothNo);
        if (!s) return '#fff';
        switch (s) {
            case 'Çürük': return '#E63946';
            case 'Dolgu': return '#4CAF50';
            case 'Eksik': return '#9E9E9E';
            case 'Kırık': return '#FF9800';
            case 'Kanal Tedavisi': return '#9C27B0';
            case 'Kron': return '#2196F3';
            case 'İmplant': return '#00BCD4';
            default: return '#E8F5E9';
        }
    };

    const handleToothPress = (toothNo) => {
        setSelectedTooth(toothNo);
    };

    const addDentalEntry = () => {
        if (!selectedTooth) {
            Alert.alert('Hata', 'Lütfen önce bir diş seçin.');
            return;
        }
        setDentalMuayene((prev) => {
            const existing = prev.find((d) => d.dishNo === selectedTooth);
            if (existing) {
                return prev.map((d) =>
                    d.dishNo === selectedTooth ? { ...d, durum: selectedDurum } : d
                );
            }
            return [...prev, { dishNo: selectedTooth, durum: selectedDurum }];
        });
    };

    const removeDentalEntry = (dishNo) => {
        setDentalMuayene((prev) => prev.filter((d) => d.dishNo !== dishNo));
    };

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            updatePatient(patientId, { dentalMuayene });
            setSaving(false);
            Alert.alert('Başarılı', 'Dental değerlendirme kaydedildi.', [
                { text: 'Tamam', onPress: () => navigation.goBack() },
            ]);
        }, 500);
    };

    const renderToothRow = (teeth, label) => (
        <View style={styles.toothRowWrap}>
            <Text style={styles.jawLabel}>{label}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.toothRow}>
                    {teeth.map((num) => (
                        <TouchableOpacity
                            key={num}
                            style={[
                                styles.tooth,
                                { backgroundColor: getToothColor(num) },
                                selectedTooth === num && styles.toothSelected,
                            ]}
                            onPress={() => handleToothPress(num)}
                            activeOpacity={0.75}
                        >
                            <Text style={[
                                styles.toothNum,
                                getToothColor(num) === '#E63946' && { color: '#fff' },
                                selectedTooth === num && { fontWeight: '800' },
                            ]}>
                                {num}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#E63946" />

            {/* Photo Area */}
            <View style={styles.photoArea}>
                {patient?.photos?.length > 0 ? (
                    <Image source={{ uri: patient.photos[photoIndex] }} style={styles.photo} />
                ) : (
                    <View style={styles.photoPlaceholder}>
                        <MaterialIcons name="image" size={40} color="#555" />
                    </View>
                )}
                {patient?.photos?.length > 1 && (
                    <TouchableOpacity style={[styles.arrow, styles.arrowLeft]}
                        onPress={() => setPhotoIndex((i) => Math.max(0, i - 1))}>
                        <MaterialIcons name="chevron-left" size={28} color="#fff" />
                    </TouchableOpacity>
                )}
                {patient?.photos?.length > 1 && photoIndex < patient.photos.length - 1 && (
                    <TouchableOpacity style={[styles.arrow, styles.arrowRight]}
                        onPress={() => setPhotoIndex((i) => i + 1)}>
                        <MaterialIcons name="chevron-right" size={28} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* Section Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>DENTAL DEĞERLENDİRME</Text>
                </View>

                {/* Tooth Chart */}
                <View style={styles.chartCard}>
                    {renderToothRow(PRIMARY_UPPER, 'Üst Süt')}
                    {renderToothRow(PERMANENT_UPPER, 'Üst Daimi')}
                    {renderToothRow(PERMANENT_LOWER, 'Alt Daimi')}
                    {renderToothRow(PRIMARY_LOWER, 'Alt Süt')}
                </View>

                {/* Selected Tooth + Condition */}
                {selectedTooth && (
                    <View style={styles.entryCard}>
                        <Text style={styles.entryTitle}>
                            Seçili Diş: <Text style={styles.entryHighlight}>#{selectedTooth}</Text>
                        </Text>
                        <Text style={styles.entryLabel}>Dental Muayene</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={selectedDurum}
                                onValueChange={setSelectedDurum}
                                style={styles.picker}
                                dropdownIconColor="#E63946"
                            >
                                {DENTAL_MUAYENE_OPTIONS.map((opt) => (
                                    <Picker.Item key={opt} label={opt} value={opt} />
                                ))}
                            </Picker>
                        </View>
                        <TouchableOpacity style={styles.addBtn} onPress={addDentalEntry}>
                            <MaterialIcons name="add" size={18} color="#fff" />
                            <Text style={styles.addBtnText}>Ekle</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Entries List */}
                {dentalMuayene.length > 0 && (
                    <View style={styles.entriesCard}>
                        <Text style={styles.entriesTitle}>Kayıtlı Muayeneler</Text>
                        {dentalMuayene.map((d) => (
                            <View key={d.dishNo} style={styles.entryRow}>
                                <View style={[styles.colorDot, { backgroundColor: getToothColor(d.dishNo) }]} />
                                <Text style={styles.entryRowText}>Diş #{d.dishNo} — {d.durum}</Text>
                                <TouchableOpacity onPress={() => removeDentalEntry(d.dishNo)}>
                                    <MaterialIcons name="close" size={18} color="#E63946" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}

                {/* Save */}
                <TouchableOpacity
                    style={[styles.saveBtn, saving && { opacity: 0.7 }]}
                    onPress={handleSave}
                    disabled={saving}
                    activeOpacity={0.85}
                >
                    {saving ? <ActivityIndicator color="#fff" /> :
                        <Text style={styles.saveBtnText}>Kaydet</Text>}
                </TouchableOpacity>

                {/* Legend */}
                <View style={styles.legendCard}>
                    {[
                        { color: '#E63946', label: 'Çürük' },
                        { color: '#4CAF50', label: 'Dolgu' },
                        { color: '#9E9E9E', label: 'Eksik' },
                        { color: '#FF9800', label: 'Kırık' },
                        { color: '#9C27B0', label: 'Kanal' },
                        { color: '#2196F3', label: 'Kron' },
                        { color: '#00BCD4', label: 'İmplant' },
                    ].map((item) => (
                        <View key={item.label} style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                            <Text style={styles.legendLabel}>{item.label}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f8' },
    photoArea: {
        height: 180,
        backgroundColor: '#1a1a2e',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: { width: '100%', height: '100%', resizeMode: 'cover' },
    photoPlaceholder: { alignItems: 'center' },
    arrow: {
        position: 'absolute',
        top: '50%',
        marginTop: -18,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 20,
        padding: 4,
    },
    arrowLeft: { left: 10 },
    arrowRight: { right: 10 },
    scroll: { flex: 1 },
    sectionHeader: {
        backgroundColor: '#E63946',
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 8,
    },
    sectionTitle: { color: '#fff', fontWeight: '800', fontSize: 14, letterSpacing: 1 },
    chartCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 14,
        padding: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
    },
    toothRowWrap: { marginBottom: 8 },
    jawLabel: { fontSize: 11, color: '#888', fontWeight: '600', marginBottom: 4, paddingHorizontal: 4 },
    toothRow: { flexDirection: 'row', gap: 4 },
    tooth: {
        width: 34,
        height: 34,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toothSelected: { borderColor: '#1a1a2e', borderWidth: 2.5 },
    toothNum: { fontSize: 10, color: '#333', fontWeight: '600' },
    entryCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
    },
    entryTitle: { fontSize: 14, color: '#444', marginBottom: 10, fontWeight: '500' },
    entryHighlight: { color: '#E63946', fontWeight: '700' },
    entryLabel: { fontSize: 13, color: '#666', marginBottom: 4, fontWeight: '500' },
    pickerWrapper: {
        borderWidth: 1.5,
        borderColor: '#E63946',
        borderRadius: 10,
        marginBottom: 12,
        overflow: 'hidden',
        backgroundColor: '#fff9f9',
    },
    picker: { height: 50, color: '#1a1a2e' },
    addBtn: {
        backgroundColor: '#E63946',
        borderRadius: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
    },
    addBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
    entriesCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
    },
    entriesTitle: { fontSize: 13, fontWeight: '700', color: '#1a1a2e', marginBottom: 10 },
    entryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        gap: 10,
    },
    colorDot: { width: 12, height: 12, borderRadius: 6 },
    entryRowText: { flex: 1, fontSize: 13, color: '#333' },
    saveBtn: {
        backgroundColor: '#E63946',
        marginHorizontal: 16,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#E63946',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        marginBottom: 14,
    },
    saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
    legendCard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 12,
        padding: 12,
        gap: 10,
        marginBottom: 20,
        elevation: 1,
    },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    legendDot: { width: 10, height: 10, borderRadius: 5 },
    legendLabel: { fontSize: 11.5, color: '#555' },
});
