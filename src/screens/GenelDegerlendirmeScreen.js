import React, { useState } from 'react';
import {
    View, Text, ScrollView, TouchableOpacity, StyleSheet,
    StatusBar, Image, Alert, ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useApp } from '../context/AppContext';
import { DISH_ETI_OPTIONS, PERIODONTAL_OPTIONS } from '../data/mockData';

export default function GenelDegerlendirmeScreen({ navigation, route }) {
    const { patientId } = route.params;
    const { getPatient, updatePatient } = useApp();
    const patient = getPatient(patientId);

    const [dishEti, setDishEti] = useState(patient?.dishEtiMuayenesi || DISH_ETI_OPTIONS[0]);
    const [periodontal, setPeriodontal] = useState(patient?.periodontalMuayene || PERIODONTAL_OPTIONS[0]);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            updatePatient(patientId, { dishEtiMuayenesi: dishEti, periodontalMuayene: periodontal });
            setSaving(false);
            Alert.alert('Başarılı', 'Genel değerlendirme kaydedildi.', [
                { text: 'Tamam', onPress: () => navigation.goBack() },
            ]);
        }, 500);
    };

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
                    <>
                        {photoIndex > 0 && (
                            <TouchableOpacity style={[styles.arrow, styles.arrowLeft]}
                                onPress={() => setPhotoIndex((i) => i - 1)}>
                                <MaterialIcons name="chevron-left" size={28} color="#fff" />
                            </TouchableOpacity>
                        )}
                        {photoIndex < patient.photos.length - 1 && (
                            <TouchableOpacity style={[styles.arrow, styles.arrowRight]}
                                onPress={() => setPhotoIndex((i) => i + 1)}>
                                <MaterialIcons name="chevron-right" size={28} color="#fff" />
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* Section Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>GENEL DEĞERLENDİRME</Text>
                </View>

                {/* Diş Eti Muayenesi */}
                <View style={styles.card}>
                    <Text style={styles.fieldLabel}>Diş Eti Muayenesi</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={dishEti}
                            onValueChange={setDishEti}
                            style={styles.picker}
                            dropdownIconColor="#E63946"
                        >
                            {DISH_ETI_OPTIONS.map((opt) => (
                                <Picker.Item key={opt} label={opt} value={opt} />
                            ))}
                        </Picker>
                    </View>

                    <Text style={styles.fieldLabel}>Periodontal Muayene</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={periodontal}
                            onValueChange={setPeriodontal}
                            style={styles.picker}
                            dropdownIconColor="#E63946"
                        >
                            {PERIODONTAL_OPTIONS.map((opt) => (
                                <Picker.Item key={opt} label={opt} value={opt} />
                            ))}
                        </Picker>
                    </View>
                </View>

                {/* Summary */}
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Özet</Text>
                    <SummaryRow label="Diş Eti Muayenesi" value={dishEti} />
                    <SummaryRow label="Periodontal Muayene" value={periodontal} />
                </View>

                {/* Save */}
                <TouchableOpacity
                    style={[styles.saveBtn, saving && { opacity: 0.7 }]}
                    onPress={handleSave}
                    disabled={saving}
                    activeOpacity={0.85}
                >
                    {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Kaydet</Text>}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.outlineBtn}
                    onPress={() => navigation.navigate('DentalDegerlendirme', { patientId })}
                    activeOpacity={0.85}
                >
                    <MaterialIcons name="grid-on" size={18} color="#E63946" />
                    <Text style={styles.outlineBtnText}>Dental Değerlendirmeye Git</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

function SummaryRow({ label, value }) {
    return (
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{label}</Text>
            <View style={styles.summaryBadge}>
                <Text style={styles.summaryValue}>{value}</Text>
            </View>
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
        marginBottom: 12,
    },
    sectionTitle: { color: '#fff', fontWeight: '800', fontSize: 14, letterSpacing: 1 },
    card: {
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
    fieldLabel: { fontSize: 14, color: '#555', fontWeight: '600', marginBottom: 8, marginTop: 4 },
    pickerWrapper: {
        borderWidth: 1.5,
        borderColor: '#E63946',
        borderRadius: 10,
        marginBottom: 14,
        overflow: 'hidden',
        backgroundColor: '#fff9f9',
    },
    picker: { height: 50, color: '#1a1a2e' },
    summaryCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 14,
        padding: 16,
        marginBottom: 14,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
    },
    summaryTitle: { fontSize: 14, fontWeight: '700', color: '#1a1a2e', marginBottom: 12 },
    summaryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    summaryLabel: { fontSize: 13, color: '#666' },
    summaryBadge: {
        backgroundColor: '#fff0f0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: '#ffd0d3',
    },
    summaryValue: { color: '#E63946', fontSize: 13, fontWeight: '600' },
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
        marginBottom: 12,
    },
    saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
    outlineBtn: {
        borderWidth: 1.5,
        borderColor: '#E63946',
        marginHorizontal: 16,
        borderRadius: 12,
        paddingVertical: 13,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 24,
    },
    outlineBtnText: { color: '#E63946', fontSize: 14, fontWeight: '600' },
});
