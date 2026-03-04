import React, { useState, useEffect } from 'react';
import {
    View, Text, ScrollView, TouchableOpacity, StyleSheet,
    Alert, TextInput, Modal, Pressable, Image, FlatList,
    ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useApp } from '../context/AppContext';

export default function HastaFormScreen({ navigation, route }) {
    const { patientId } = route.params || {};
    const { addPatient, getPatient, updatePatient } = useApp();
    const existing = patientId ? getPatient(patientId) : null;

    const [ad, setAd] = useState(existing?.ad || '');
    const [soyad, setSoyad] = useState(existing?.soyad || '');
    const [hastaNo, setHastaNo] = useState(existing?.hastaNo || '');
    const [photos, setPhotos] = useState(existing?.photos || []);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [photoMenuVisible, setPhotoMenuVisible] = useState(false);
    const [saving, setSaving] = useState(false);

    const pickFromGallery = async () => {
        setPhotoMenuVisible(false);
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            quality: 0.8,
        });
        if (!result.canceled && result.assets?.length > 0) {
            setPhotos((prev) => [...prev, result.assets[0].uri]);
        }
    };

    const pickFromCamera = async () => {
        setPhotoMenuVisible(false);
        const perm = await ImagePicker.requestCameraPermissionsAsync();
        if (!perm.granted) {
            Alert.alert('İzin Gerekli', 'Kamera erişim izni verilmedi.');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
        if (!result.canceled && result.assets?.length > 0) {
            setPhotos((prev) => [...prev, result.assets[0].uri]);
        }
    };

    const handleSave = () => {
        if (!ad.trim() || !soyad.trim()) {
            Alert.alert('Hata', 'Lütfen ad ve soyad alanlarını doldurun.');
            return;
        }
        setSaving(true);
        setTimeout(() => {
            if (existing) {
                updatePatient(existing.id, { ad, soyad, hastaNo, photos });
                setSaving(false);
                navigation.goBack();
            } else {
                const np = addPatient({ ad, soyad, hastaNo, photos });
                setSaving(false);
                navigation.replace('HastaDetay', { patientId: np.id });
            }
        }, 500);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}>
            {/* Photo Carousel */}
            <View style={styles.photoSection}>
                <View style={styles.photoCarousel}>
                    {photos.length > 0 ? (
                        <Image source={{ uri: photos[photoIndex] }} style={styles.photoImage} />
                    ) : (
                        <View style={styles.photoPlaceholder}>
                            <MaterialIcons name="photo-camera" size={48} color="#ccc" />
                            <Text style={styles.photoPlaceholderText}>Fotoğraf Yok</Text>
                        </View>
                    )}
                    {photos.length > 1 && (
                        <>
                            {photoIndex > 0 && (
                                <TouchableOpacity style={[styles.arrow, styles.arrowLeft]}
                                    onPress={() => setPhotoIndex((i) => i - 1)}>
                                    <MaterialIcons name="chevron-left" size={28} color="#fff" />
                                </TouchableOpacity>
                            )}
                            {photoIndex < photos.length - 1 && (
                                <TouchableOpacity style={[styles.arrow, styles.arrowRight]}
                                    onPress={() => setPhotoIndex((i) => i + 1)}>
                                    <MaterialIcons name="chevron-right" size={28} color="#fff" />
                                </TouchableOpacity>
                            )}
                        </>
                    )}
                </View>
                {photos.length > 0 && (
                    <Text style={styles.photoCounter}>{photoIndex + 1} / {photos.length}</Text>
                )}

                {/* Upload Controls */}
                <View style={styles.uploadRow}>
                    <Text style={styles.uploadLabel}>Resim{'\n'}Ekle</Text>
                    <TouchableOpacity style={styles.uploadBtn} onPress={() => setPhotoMenuVisible(true)}>
                        <MaterialIcons name="add-photo-alternate" size={18} color="#555" />
                        <Text style={styles.uploadBtnText}>Choose Files</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.uploadBtn} onPress={() => setPhotoMenuVisible(true)}>
                        <MaterialIcons name="upload" size={18} color="#E63946" />
                        <Text style={[styles.uploadBtnText, { color: '#E63946' }]}>Yükle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.uploadBtn} onPress={pickFromCamera}>
                        <MaterialIcons name="camera-alt" size={18} color="#555" />
                        <Text style={styles.uploadBtnText}>Kamera</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Form Fields */}
            <View style={styles.formSection}>
                <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Hasta No</Text>
                    <TextInput
                        style={styles.fieldInput}
                        value={hastaNo}
                        onChangeText={setHastaNo}
                        keyboardType="numeric"
                        placeholder="1"
                    />
                </View>
                <View style={styles.divider} />
                <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Adı</Text>
                    <TextInput
                        style={styles.fieldInput}
                        value={ad}
                        onChangeText={setAd}
                        placeholder="Ad"
                    />
                </View>
                <View style={styles.divider} />
                <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Soyadı</Text>
                    <TextInput
                        style={styles.fieldInput}
                        value={soyad}
                        onChangeText={setSoyad}
                        placeholder="Soyad"
                    />
                </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity
                style={[styles.saveBtn, saving && { opacity: 0.7 }]}
                onPress={handleSave}
                disabled={saving}
                activeOpacity={0.85}
            >
                {saving ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.saveBtnText}>{existing ? 'Güncelle' : 'Kaydet'}</Text>
                )}
            </TouchableOpacity>

            {/* Photo Source Modal */}
            <Modal
                visible={photoMenuVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setPhotoMenuVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setPhotoMenuVisible(false)}>
                    <View style={styles.menuCard}>
                        <Text style={styles.menuTitle}>Resim Ekle</Text>
                        <TouchableOpacity style={styles.menuOption} onPress={pickFromGallery}>
                            <MaterialIcons name="photo-library" size={22} color="#555" />
                            <Text style={styles.menuOptionText}>Fotoğraf Arşivi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuOption} onPress={pickFromCamera}>
                            <MaterialIcons name="camera-alt" size={22} color="#555" />
                            <Text style={styles.menuOptionText}>Fotoğraf Çek</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuOption} onPress={pickFromGallery}>
                            <MaterialIcons name="folder-open" size={22} color="#555" />
                            <Text style={styles.menuOptionText}>Dosya Seç</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f8' },
    photoSection: {
        backgroundColor: '#fff',
        marginBottom: 12,
    },
    photoCarousel: {
        height: 220,
        backgroundColor: '#1a1a2e',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    photoImage: { width: '100%', height: '100%', resizeMode: 'cover' },
    photoPlaceholder: { alignItems: 'center' },
    photoPlaceholderText: { color: '#aaa', marginTop: 8, fontSize: 13 },
    arrow: {
        position: 'absolute',
        top: '50%',
        marginTop: -18,
        backgroundColor: 'rgba(0,0,0,0.45)',
        borderRadius: 20,
        padding: 4,
    },
    arrowLeft: { left: 10 },
    arrowRight: { right: 10 },
    photoCounter: { textAlign: 'center', color: '#888', fontSize: 12, paddingVertical: 6 },
    uploadRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    uploadLabel: { fontSize: 12, color: '#555', fontWeight: '600', marginRight: 4, lineHeight: 16 },
    uploadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#e8e8e8',
    },
    uploadBtnText: { fontSize: 12, color: '#555', fontWeight: '500' },
    formSection: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        marginBottom: 16,
    },
    fieldRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
    fieldLabel: { width: 90, fontSize: 14, color: '#444', fontWeight: '600' },
    fieldInput: { flex: 1, fontSize: 14, color: '#1a1a2e', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 4 },
    divider: { height: 1, backgroundColor: '#f2f2f2' },
    saveBtn: {
        backgroundColor: '#E63946',
        marginHorizontal: 16,
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#E63946',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        width: 260,
        elevation: 8,
    },
    menuTitle: { fontSize: 16, fontWeight: '700', color: '#1a1a2e', marginBottom: 16 },
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 13,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuOptionText: { fontSize: 15, color: '#333' },
});
