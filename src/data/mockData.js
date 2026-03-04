export const MOCK_PATIENTS = [
  {
    id: 1,
    hastaNo: '75',
    ad: 'Ayşe',
    soyad: 'Yılmaz',
    cinsiyet: 'Kadın',
    dogumTarihi: '2016/6yaş',
    bolgeKoy: 'Merkez/SİVAS',
    photos: [],
    anamnez:
      "Hastanın herhangi bir sistemik rahatsızlığı bulunmamaktadır. Devamı kullandığı ilaç yoktur. Bilinen alerji hikayesi yoktur. Sol üst arkadaki dişinin geç sürmesi sebebiyle kliniğimize başvurmuştur. Hasta daha öncesinde diş tedavisi ilgili herhangi bir kliniğe başvurmamıştır.",
    dishEtiMuayenesi: 'Kanama Yok',
    periodontalMuayene: 'Hafif Plak',
    dentalMuayene: [
      { dishNo: 53, durum: 'Çürük' },
    ],
  },
  {
    id: 2,
    hastaNo: '76',
    ad: 'Mehmet',
    soyad: 'Kaya',
    cinsiyet: 'Erkek',
    dogumTarihi: '2010/16yaş',
    bolgeKoy: 'Merkez/ANKARA',
    photos: [],
    anamnez:
      'Hastanın diş ağrısı şikayeti mevcuttur. Daha önce herhangi bir sistemik hastalık yoktur.',
    dishEtiMuayenesi: 'Hafif Kanama',
    periodontalMuayene: 'Orta Plak',
    dentalMuayene: [
      { dishNo: 16, durum: 'Çürük' },
      { dishNo: 36, durum: 'Dolgu' },
    ],
  },
  {
    id: 3,
    hastaNo: '77',
    ad: 'Fatma',
    soyad: 'Demir',
    cinsiyet: 'Kadın',
    dogumTarihi: '2008/18yaş',
    bolgeKoy: 'Köy/KONYA',
    photos: [],
    anamnez: 'Diş hassasiyeti şikayeti mevcut. Önceki tedavi kaydı bulunmamaktadır.',
    dishEtiMuayenesi: 'Kanama Yok',
    periodontalMuayene: 'Yok',
    dentalMuayene: [],
  },
];

export const DISH_ETI_OPTIONS = [
  'Kanama Yok',
  'Hafif Kanama',
  'Orta Kanama',
  'Şiddetli Kanama',
];

export const PERIODONTAL_OPTIONS = [
  'Yok',
  'Hafif Plak',
  'Orta Plak',
  'Yoğun Plak',
  'Taş',
];

export const DENTAL_MUAYENE_OPTIONS = [
  'Sağlıklı',
  'Çürük',
  'Dolgu',
  'Eksik',
  'Kırık',
  'Kanal Tedavisi',
  'Kron',
  'İmplant',
];

// Tooth numbers for the dental chart (upper and lower jaw)
export const UPPER_TEETH = [
  55, 54, 53, 52, 51, 61, 62, 63, 64, 65,
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28,
];

export const LOWER_TEETH = [
  85, 84, 83, 82, 81, 71, 72, 73, 74, 75,
  48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
];

export const PRIMARY_UPPER = [55, 54, 53, 52, 51, 61, 62, 63, 64, 65];
export const PRIMARY_LOWER = [85, 84, 83, 82, 81, 71, 72, 73, 74, 75];
export const PERMANENT_UPPER = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
export const PERMANENT_LOWER = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
