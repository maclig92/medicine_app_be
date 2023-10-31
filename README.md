# Portfel e-recept

Aplikacja do zarządzania e-receptami i lekami posiadanymi w domowej apteczce.

## Podgląd na żywo

[maclig92.smallhost.pl](https://maclig92.smallhost.pl)

### Kluczowe cechy:
- #### Recepty:
  - dodawanie recept z portfela z podziałem czy recepta jest roczna lub jest na antybiotyk oraz usuwanie ich
  - wyświetlanie kodu QR recepty powiązanego z PESELem użytkownika
  - przypisywanie leków do recepty
- #### Leki:
  - dodawanie i usuwanie leków
  - wyświetlanie szczegółów leku, gdzie znajduje się link z numerem powiązanej e-recepty, dawkowanie, notatka o leku oraz ewentualna data rozpoczęcia i zakończenia stosowania
  - edycja dawkowania
    

## Wykorzystane technologie:
- backend
  - nodejs
  - express.js
  - mySQL
  - typescript
  - bcrypt
  - jwt
  - crypto
  - dotenv
  - qrcode
- frontend
  - react
  - react-router
  - react-hook-form
  - styled-components
  - typescript
  - vite



## Uruchomienie aplikacji lokalnie

### Backend

stwórz katalog z projektem np.:

```
mkdir medicnie_app
```
przejdź do tego katalogu i pobierz kod z repozytorium

```
cd ./medicine_app
```
```
git clone https://github.com/maclig92/medicine_app_be.git
```
```
cd ./medicine_app_be
```
otwórz phpMyAdmin albo innego klienta SQL,
skopuj kod z pliku createDb.sql z katalogu sql
i wykonaj go w kliencie SQL

```
npm install
```
edytuj pliki w katalogu config:
- config.example.ts -> zmień nazwę na config.ts, odkomentuj kod i wypełnij zmienne swoimi danymi
- .env.egample -> zmień nazwę na .env, przenieś do głównego katalogu aplikacji backendowej i ustaw swoje wartości zmiennych środowiskowych
```
npm run start:dev
```

### Frontend

```
cd ~/medicine_app
git clone https://github.com/maclig92/medicine_app_fe.git
cd ./medicine_app_fe
npm install
npm run dev
```
