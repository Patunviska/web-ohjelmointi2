## Tietokannan luonti

Projektissa on mukana tiedosto "luonti.sql", jossa on tietokannan luomiseen käytettävä skripti.
Luikauta tuo skripti MariaDB:ssä ennen palvelimen käynnistämistä

Ennen projektin käynnistämistä, projektin juureen tulee luoda myös .env -tiedosto, koska se ei tule gitignoren mukana.

Luo projektin juureen .env -tiedosto näillä asetuksilla:

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=oma_salasana
DB_NAME=urheilijat
PORT=3001

muokkaa tarvittaessa salasanaa, käyttäjää tai portteja vastaamaan omia asetuksiasi
