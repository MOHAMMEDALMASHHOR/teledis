import React, { useState } from 'react';
import {
    View, Text, ScrollView, TouchableOpacity, StyleSheet,
    StatusBar, Image, Modal, Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

const SECTION = {
    INFO: 'info',
    ANAMNEZ: 'anamnez',
};

export default function HastaDetayScreen({ navigation, route }) {
    const { patientId } = route.params;
    const { getPatient } = useApp();
    const patient = getPatient(patientId);
    const [infoExpanded, setInfoExpanded] = useState(false);
    const [anamnezExpanded, setAnamnezExpanded] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [menuVisible, setMenuVisible] = useState(false);

    if (!patient) {
        return (
            <View style={styles.center}>
                <MaterialIcons name="error-outline" size={64} color="#ddd" />
                <Text style={styles.emptyText}>Hasta bulunamadı</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#E63946" />

            {/* Photo Carousel */}
            <View style={styles.photoArea}>
                {patient.photos && patient.photos.length > 0 ? (
                    <Image source={{ uri: patient.photos[photoIndex] }} style={styles.photo} />
                ) : (
                    <View style={styles.photoPlaceholder}>
                        <MaterialIcons name="photo-camera" size={44} color="#555" />
                        <Text style={styles.photoPlaceholderText}>Fotoğraf Eklenmemiş</Text>
                    </View>
                )}
                {patient.photos?.length > 1 && (
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
                {/* Dots menu */}
                <TouchableOpacity style={styles.dotsBtn} onPress={() => setMenuVisible(true)}>
                    <MaterialIcons name="more-horiz" size={24} color="#fff" />
                </TouchableOpacity>
                {patient.photos?.length > 0 && (
                    <View style={styles.photoLabelBar}>
                        <Text style={styles.photoLabel}>
                            {photoIndex === 0 ? 'Ön Ağız içi Fotoğraf' :
                                photoIndex === 1 ? 'Alt Okluzal Fotoğraf' : `Fotoğraf ${photoIndex + 1}`}
                        </Text>
                    </View>
                )}
            </View>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* Hasta Bilgileri Accordion */}
                <TouchableOpacity
                    style={styles.accordion}
                    onPress={() => setInfoExpanded((v) => !v)}
                    activeOpacity={0.85}
                >
                    <MaterialIcons name="info" size={20} color="#E63946" />
                    <Text style={styles.accordionTitle}>Hasta Bilgileri</Text>
                    <MaterialIcons
                        name={infoExpanded ? 'expand-less' : 'expand-more'}
                        size={22} color="#666"
                    />
                </TouchableOpacity>

                {infoExpanded && (
                    <View style={styles.infoCard}>
                        <InfoRow label="Hasta No:" value={patient.hastaNo} />
                        <InfoRow label="Cinsiyet:" value={patient.cinsiyet} />
                        <InfoRow label="Doğum Tarihi:" value={patient.dogumTarihi} />
                        <InfoRow label="Bölge/Köy:" value={patient.bolgeKoy} />
                        <TouchableOpacity style={styles.tamam} onPress={() => setInfoExpanded(false)}>
                            <Text style={styles.tamamText}>Tamam</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Anamnez Accordion */}
                <TouchableOpacity
                    style={styles.accordion}
                    onPress={() => setAnamnezExpanded((v) => !v)}
                    activeOpacity={0.85}
                >
                    <MaterialIcons name="info" size={20} color="#E63946" />
                    <Text style={styles.accordionTitle}>Anamnez</Text>
                    <MaterialIcons
                        name={anamnezExpanded ? 'expand-less' : 'expand-more'}
                        size={22} color="#666"
                    />
                </TouchableOpacity>

                {anamnezExpanded && (
                    <View style={styles.infoCard}>
                        <Text style={styles.anamnezText}>{patient.anamnez || 'Anamnez bilgisi girilmemiş.'}</Text>
                        <TouchableOpacity style={styles.tamam} onPress={() => setAnamnezExpanded(false)}>
                            <Text style={styles.tamamText}>Tamam</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Action Buttons */}
                <View style={styles.actionRow}>
                    <ActionCard
                        icon="grid-on"
                        label="Dental\nDeğerlendirme"
                        onPress={() => navigation.navigate('DentalDegerlendirme', { patientId })}
                    />
                    <ActionCard
                        icon="assignment"
                        label="Genel\nDeğerlendirme"
                        onPress={() => navigation.navigate('GenelDegerlendirme', { patientId })}
                    />
                    <ActionCard
                        icon="edit"
                        label="Hasta\nFormu"
                        onPress={() => navigation.navigate('HastaForm', { patientId })}
                    />
                </View>
            </ScrollView>

            {/* Actions menu */}
            <Modal visible={menuVisible} transparent animationType="fade"
                onRequestClose={() => setMenuVisible(false)}>
                <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
                    <View style={styles.menuCard}>
                        <TouchableOpacity style={styles.menuOpt}
                            onPress={() => { setMenuVisible(false); navigation.navigate('HastaForm', { patientId }); }}>
                            <MaterialIcons name="edit" size={20} color="#333" />
                            <Text style={styles.menuOptText}>Düzenle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuOpt} onPress={() => setMenuVisible(false)}>
                            <MaterialIcons name="share" size={20} color="#333" />
                            <Text style={styles.menuOptText}>Paylaş</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

function InfoRow({ label, value }) {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

function ActionCard({ icon, label, onPress }) {
    return (
        <TouchableOpacity style={styles.actionCard} onPress={onPress} activeOpacity={0.82}>
            <View style={styles.actionIcon}>
                <MaterialIcons name={icon} size={26} color="#E63946" />
            </View>
            <Text style={styles.actionLabel}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f4f8' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { color: '#bbb', fontSize: 16, marginTop: 12 },
    photoArea: {
        height: 220,
        backgroundColor: '#1a1a2e',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photo: { width: '100%', height: '100%', resizeMode: 'cover' },
    photoPlaceholder: { alignItems: 'center' },
    photoPlaceholderText: { color: '#aaa', marginTop: 8 },
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
    dotsBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.35)',
        borderRadius: 16,
        padding: 6,
    },
    photoLabelBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    photoLabel: { color: '#fff', fontSize: 13, fontWeight: '500' },
    scroll: { flex: 1 },
    accordion: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        gap: 10,
    },
    accordionTitle: { flex: 1, fontSize: 15, fontWeight: '700', color: '#1a1a2e' },
    infoCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 4,
        borderRadius: 12,
        padding: 16,
        elevation: 1,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    infoLabel: { fontSize: 13, color: '#888', fontWeight: '500' },
    infoValue: { fontSize: 13, color: '#1a1a2e', fontWeight: '600' },
    anamnezText: { fontSize: 13.5, color: '#444', lineHeight: 20 },
    tamam: {
        alignSelf: 'flex-end',
        marginTop: 12,
        borderWidth: 1,
        borderColor: '#E63946',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 5,
    },
    tamamText: { color: '#E63946', fontSize: 13, fontWeight: '600' },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 20,
        gap: 10,
    },
    actionCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 14,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
    },
    actionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionLabel: { fontSize: 11.5, color: '#1a1a2e', textAlign: 'center', fontWeight: '600' },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-start', alignItems: 'flex-end' },
    menuCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 52,
        marginRight: 10,
        paddingVertical: 8,
        minWidth: 160,
        elevation: 8,
    },
    menuOpt: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, paddingHorizontal: 16 },
    menuOptText: { fontSize: 14, color: '#333' },
});
