Urheilija_ui on reactilla ja bootstrapilla luotu frontend urheilija REST APIn käyttöön.
Sovelluksella onnistuu CRUD-toiminnot eli tietokantaan voi lisätä sekä poistaa urheilijan
tietokannassa olevan urheilijan tietoja voi myös muokata ja sovellus listaa tietokannassa olevat urheilijat tietoineen

Sovellus käyttää Context API -arkkitehtuuria tilanhallintaan ja Axiosia tiedonsiirtoon REST-rajapinnan kautta.

Testaajalle:
Luo projektin juureen .env-tiedosto ja määritä API-osoite esim:
VITE_API_URL=http://localhost:3001/api

Jos oma APIsi pyörii eri portissa, muuta osoitetta sen mukaan.

Käyttöohje testaukselle:

1. Käynnistä backend ensin (esim. `http://localhost:3001/api` )
2. määritä backendisi osoite .env tiedostoon, joka pitää luoda tämän projektin, frontendin, juureen.

Huomioi omat porttisi osoitteet

3. Käynnistä react-projekti (frontend) komennolla:
   npm install
   npm run dev

Käytetyt teknologiat:

- React + Vite
- Bootstrap
- Context API
- Axios
- Express.js (backend)
- MariaDB (tietokanta)

## Huomio

Käyttöliittymä on oman rajallisuuden vuoksi äärimmäisen yksinkertainen. Funktionaalisuus on läsnä ja homman pitäisi toimia tehtävänannon mukaisesti.
