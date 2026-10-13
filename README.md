# Day Context Tracker
Jarmo Pylkkä

Day Context Tracker on JavaScript/Node.js‑pohjainen datankeruuohjelma, joka tallentaa
päiväkohtaista kontekstidataa (sää, uni, työ, fiilis, häiriöt, tuottavuus) ja tarjoaa
web‑käyttöliittymän graafien piirtämiseen sekä yksinkertaisen ennustemallin
seuraavan päivän arvojen arviointiin.

Ohjelma toimii LowDB‑tietokannalla (data.json), eikä vaadi erillistä tietokannan
asennusta. Sovellus käynnistyy komennolla `npm start` ja tarjoaa web‑sivun
http://localhost:3000.

---

### Kloonaa projekti
```bash
git clone https://github.com/awatar101/day-content-tracker.git
```
---

## Asennus

Varmista, että Node.js (v18+) on asennettuna.

Asenna riippuvuudet:´

cd day-content-tracker

npm install
npm install lowdb

Käynnistä palvelin:

npm start

Avaa selaimessa:

http://localhost:3000

---

## Ngrok (valinnainen)

Jos haluat jakaa sovelluksen ulkopuoliselle voit käyttää ngrokia.

Asenna ngrok:

npm install -g ngrok

Käynnistä tunneli porttiin 3000:

ngrok http 3000

Ngrok antaa sinulle julkisen URL‑osoitteen, esim:

https://randomstring.ngrok.io (randomstring.ngrok.io in Bing)

Tämän linkin kautta kuka tahansa voi käyttää sovellusta.

---

## Projektirakenne

day-context-tracker/
│
├── server.js          # Express backend + API
├── data.js            # LowDB tietokanta
├── package.json
├── data.json          # Tallennettu data
│
├── public/
│   ├── index.html     # Web UI
│   ├── style.css      # Light/Dark mode
│   ├── main.js        # Tallennuslomake + API-kutsut
│   ├── chart.js       # Graafin piirto Chart.js:llä
│   ├── predict.js     # Lineaarinen regressioennuste
│   ├── theme.js       # Dark/Light mode nappi
│   └── chart-colors.js# Chart.js väripaletti teeman mukaan
│
└── README.md

---

## Kerättävä data

Tallennus tapahtuu LowDB:n JSON‑tiedostoon `data.json`.

Jokainen päivä tallennetaan muodossa:

{
"date": "2026-10-12",
"weekday": "ma",
"weather_type": "aurinko",
"temperature_c": 12,
"sleep_hours": 7,
"work_hours": 5,
"distractions_count": 3,
"mood_level": 4,
"productivity_level": 3
}

### Miksi nämä sarakkeet?

- **Säätila**: vaikuttaa vireyteen ja fiilikseen  
- **Uni**: yksi tärkeimmistä tuottavuuden selittäjistä  
- **Työaika**: oma arvio tehokkaasta työstä  
- **Häiriöt**: keskeytysten määrä  
- **Fiilis**: subjektiivinen kokemus  
- **Tuottavuus**: kohdemuuttuja ohjattuun oppimiseen  

---

## Graafi

Painamalla **“Piirrä graafi”** sovellus hakee datan API:sta (`/data`) ja piirtää
tuottavuuden kehityksen Chart.js‑kirjastolla.

Graafi vaihtaa värit automaattisesti Light/Dark‑tilan mukaan.

---

## Ennustemalli

Sovellus sisältää yksinkertaisen lineaarisen regressiomallin, 
joka ennustaa seuraavan päivän arvon valitulle avainkentälle:

- Uni (h)
- Työ (h)
- Lämpötila
- Fiilis
- Tuottavuus

### Ehdot

- Jos dataa on **alle 2 päivää**, ennustetta ei tehdä.
- Mitä enemmän dataa kertyy → sitä tarkempi malli.

### Mallin idea

Regressio lasketaan kaavalla:

y = slope * x + intercept

Missä:

- `x` = päiväindeksi (0,1,2,3…)  
- `y` = valitun avainkentän arvo  

---

## Dark / Light mode

Sivulla on nappi **“Vaihda teema”**, joka vaihtaa teeman:

- Light mode  
- Dark mode  

Teema tallennetaan `localStorage`en ja säilyy sivun uudelleenlatauksen jälkeen.

---

## Testaus

1. Käynnistä sovellus:  
npm start

2. Avaa selaimessa:  
http://localhost:3000

3. Syötä päivän data lomakkeeseen  
4. Tallenna  
5. Piirrä graafi  
6. Valitse avainkenttä  
7. Tee ennuste  

---

## Jatkoideat

### 1. Rekisteröityneet käyttäjät
- JWT‑autentikaatio  
- käyttäjäkohtainen data  
- useita käyttäjiä samassa järjestelmässä  
- dashboard jokaiselle käyttäjälle  

### 2. Android APK
Android‑sovellus

- Capacitor.js  
- React Native  
- Cordova  
- Expo  

Backend pysyy samana → vain UI muuttuu.

### 3. Pilvitallennus
- Firebase  
- Supabase  
- MongoDB Atlas  
- Azure Cosmos DB  

### 4. Parempi ennustemalli
- Random Forest  
- Gradient Boosting  
- LSTM (päiväkohtainen sekvenssidata)  

### 5. Päivätyyppien klusterointi
- K‑means  
- DBSCAN  
- PCA‑visualisointi  

---

## Yhteenveto

Day Context Tracker on kevyt, moderni ja helposti laajennettava datankeruuohjelma,
joka toimii Node.js:llä ja LowDB:llä. Se tarjoaa:

- web‑käyttöliittymän  
- graafit  
- ennustemallin  
- dark/light‑tilan  
- ngrok‑tuen  
- selkeän projektirakenteen
---

## Pohdinta

Sovelluksen keräämä data kuvaa päivän sisältöä: 
sää, uni, työ, häiriöt, fiilis ja tuottavuus.
Nämä muuttujat valittiin, koska ne ovat tyypillisiä 
arjen suorituskykyyn vaikuttavia tekijöitä.

Mahdollinen ennustemalli pyrkii arvioimaan seuraavan 
päivän tuottavuutta tai muita avainkenttiä (uni, fiilis, työaika).
Lineaarinen regressiomalli sopii tähän, koska data on 
aikajärjestyksessä ja muuttujien väliset suhteet ovat 
usein likimain lineaarisia.

Tavoitteena ei ole täydellinen ennuste, vaan havainnollistaa, 
miten kerätty data voidaan käyttää yksinkertaisen mallin 
opettamiseen ja miten arjen mittareista voi muodostaa 
ennustettavan kokonaisuuden.