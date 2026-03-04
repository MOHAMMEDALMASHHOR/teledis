# TeleDiş 🦷

Doğrudan telekonsültasyon ile diş hekimi-hasta iletişimini güçlendiren mobil uygulama.

## 📱 Ekran Görüntüleri
Uygulama 8 ekrandan oluşmaktadır:
- **Giriş Ekranı** (Hekim / Hasta / Yönetici rolleri)
- **Hasta Listesi** (arama, filtreleme)
- **Hasta Formu** (fotoğraf yükleme, kamera)
- **Hasta Detayı** (bilgiler + anamnez)
- **Dental Değerlendirme** (diş haritası, renk kodlu durum)
- **Genel Değerlendirme** (diş eti + periodontal)
- **Kullanıcı Profili**
- **Geri Bildirim** (yıldız puanlama)

## 🛠 Kullanılan Teknolojiler
- **React Native** + **Expo** (Blank template)
- **React Navigation** v6 — Stack + Drawer navigasyon
- **@react-native-picker/picker** — Dropdown seçiciler
- **expo-image-picker** — Galeri & kamera entegrasyonu
- **@expo/vector-icons** (MaterialIcons) — İkon seti
- Mock data (in-memory state, React Context API)

## 📦 Kurulum & Çalıştırma

```bash
# Repoyu klonla
git clone https://github.com/<KULLANICI_ADI>/teledis.git
cd teledis

# Bağımlılıkları yükle
npm install

# Expo Go ile çalıştır
npx expo start
```

Ardından telefonunuzdaki **Expo Go** uygulamasıyla QR kodu okutun.

### Android APK
```bash
npx expo build:android
# veya EAS Build:
npx eas build --platform android
```

## 🎯 Hedef Kullanıcı Kitlesi
Kırsal bölgelerdeki hastaları değerlendiren telekonsültan diş hekimleri ve sahada görev yapan sağlık ekipleri.

## 💡 Çözdüğü Problem
Uzak bölgelerdeki hastalara uzman diş hekimi erişimi sağlamak için fotoğraf tabanlı remote-dental-consultation platformu.

## 🗂 Proje Yapısı
```
teledis/
├── App.js                  # Navigasyon & Root
├── src/
│   ├── context/
│   │   └── AppContext.js   # Global state (React Context)
│   ├── data/
│   │   └── mockData.js     # Mock hasta verisi
│   ├── components/
│   │   └── CustomDrawer.js # Kırmızı drawer menü
│   └── screens/
│       ├── LoginScreen.js
│       ├── HastaListesiScreen.js
│       ├── HastaFormScreen.js
│       ├── HastaDetayScreen.js
│       ├── DentalDegerlendirmeScreen.js
│       ├── GenelDegerlendirmeScreen.js
│       ├── KullaniciProfiliScreen.js
│       └── GeriBildirimScreen.js
```

## ✅ Değerlendirme Kriterleri Karşılaması
| Kriter | Durum |
|--------|-------|
| Seçilen pano hissiyatı (kırmızı/beyaz dental tema) | ✅ |
| En az 2-3 ekran navigasyon | ✅ 8 ekran |
| Liste-detay veri akışı | ✅ HastaListesi → HastaDetay |
| Basit form | ✅ HastaForm, Anamnez |
| Loading / error / empty state | ✅ Her ekranda |
| API / mock data | ✅ React Context + mockData |
| README.md | ✅ |
