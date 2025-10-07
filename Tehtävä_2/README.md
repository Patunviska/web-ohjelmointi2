Kurssin Web-ohjelmointi 2 DT10047-3002 toinen tehtävä
Tehtävässä piti jatkokehittää aiemmassa tehtävässä tehtyä REST API -sanakirjaa
Sanakirja tallennetaan tekstitiedostoon sanakirja.txt, jossa jokaisella rivillä on sanapari: suomenkielinen sana ja sen vastine englanniksi.
Sanakirjalle piti tehdä Reactilla frontend
Projektissa on kaksi osaa:

- REST1/ - Express.js -pohjainen backend REST API
- sanakirja_ui/ - React -pohjainen frontend

Asennus ja käynnistys:

1. Kloonaa projekti omalle koneelle
2. Backendille:

- cd REST1
- npm install

3. Frontendille

- cd sanakirja_ui
- npm install

4. Käynnistä sovellus lokaalisti, ensin backend sitten frontend toisessa terminaalissa

- cd REST1
- node server.js
  --> oletuksena portissa 3000

toisessa terminaalissa

- cd sanakirja_ui
- npm run dev

--> avaa selaimessa http://localhost.5173

Frontend keskustelee backendin kanssa osoitteessa http://localhost:3000

Sanakirjan käyttö:

- Lisää sana: Käyttäjä syöttää suomenkielisen sanan ja sille englanninkielisen vastineen, painaa "lisää"
- Haku: käyttäjä syöttää suomenkielisen sanan ja painaa "hae"
- Näytä kaikki sanat: listaa kaikki sanakirjan rivit

Käytettyjä tekniikoita:

- Node.js
- Express
- fs-moduuli tiedoston käsittelyyn: readFileSync ja appendFileSync
- Frontend React(Vite)
- Tiedontallennus tekstitiedostoon (sanakirja.txt)

Molempien palveluiden pitää olla käynnissä yhtä aikaa, backend ja frontend
CORS on sallittu kaikille vain paikalliseen käyttöön
