@echo off
echo [Teledis] APK Olusturma Baslatiliyor...
echo Not: Bu islem icin bilgisayarinizda Android SDK ve Node.js kurulu olmalidir.
echo.
npx eas build --platform android --profile preview --local
echo.
echo Islem tamamlandi. Eger hata almadiysaniz APK dosyasi 'build' klasoru icinde veya gosterilen yolda olacaktir.
pause
