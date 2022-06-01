# Slutprojekt blogghemsida

Adam Lagerqvist 2022-05-30.

## Inledning

Syftet med projektet var att bygga något där man måste använda de saker vi lärt oss under kurserna webbutveckling 2 och webbserverprogramerings gång i ett sista slutprojekt. Målet jag hade med detta arbetet var att känna mig tillräckligt säker på hur en webbserver fungerar att jag till stort sätt självständigt kan bygga en dynamisk hemsida som använder sig av webbserver och databas-tekniker.

Jag började planera mitt projekt detta innebar att i förstahand funder över vad det var jag skulle bygga för webb applikation. I slutändan valde jag att bygga en blogg hemsida som hämtar bloggposts från en databas och visar dem på en hemsida jag ville även att man från denna hemsida skulle kunna loggain och posta bloggposts.

Utifrån denna idé började jag skriva en utförlig planering som förklarade bland annat hur strukturen på databasen skulle se ut samt vilka router webbservern ska ha och vad de ska göra.

Tanken var sedan att jag skulle följa planeringen och i slutet av varje lektion skriva några få meningar om vad jag gjort och om jag stött på några problem samt hur jag bör gå vidare för att hitta en lösning på dem.

Dock gick inte allting riktigt som planerat jag fick lite problem med att få mina fulla posts att visa och dessutom pajade min dator så att jag tappade all planering jag gjort tidigare detta var två stora saker som segade ner mitt projekt.

Men om man bortser från mina två ganska stora "time sinks" har det gått relativt "smooth" resten av tiden. De festa fel jag fick beroende på att jag missat enkla grejer i min route kod som var lätt att fixa när jag väl såg vad jag skrivit fel.

## Bakgrund

Projektet har i stort sett två stora delar:

Konto-hanteringen och Blogg delen.

### Konto-hantering:

Konto-hanteringen har jag i stort sätt kopierat ifrån vårt loggin projekt vi hade i ALC tidigare mycket av koden för loggin, Register och secret/(användarens egna sida) grejer kommer där ifrån. Dock har jag behövt ändra koden så att den ska fungera som den ska och så att den finns i en js fil eftersom det blev krångligt när vi i ALC projektet hade delat upp det i en API fil och en index fil.

Register skapar ett nytt konto och skickar det till databasen för att registreras. Om lösenorden inte stämmer överens med varandra skickar servern tillbaka passwords do not match. Annars om ditt användarnamn redan är taget säger den det också detta genom att jag gjort användarnamn uniqe i databasen om då du har samma användarnamn som någon annan får servern ett eror från databasen och skickar då meddelandet till användaren.

loggin fungerar på ett liknande sätt den kollar om användarnamnet och lösenordet matchar någon användare i databasen om den gör det blir du inloggad som den användaren.

Att hålla folk inloggade görs genom session cookies som sparas på servern och din klient. Lösenorden som sparas i databasen är även krypterade med Bkryp. För att logga ut tar jag bara bort kakan och skickar dem till inloggnings sidan igen.

### Blogg delen:

Posts har sin egen databas när man kommer till hemsidan visas alla posts i den tabellen.

Man kan skapa nya posts om man är inloggad då varje post behöver en user som har skapat den, detta görs på användarens egen sida där fyller i ett formulär och sedan trycker på submit för att skicka svaret till databasen.

För att bland annat kunna ta bort posts behövde jag använda SQL JOIN detta för att bara du själv ska kunna ta bort dina egna posts. SQL JOIN gör att man kan komma åt två olika tables samtidigt.

Fulla posts skrivs som markdown och renders sendan med hjälp av Markdown-it på sidan. Sidan har även pagination för att inte fylla sidan med posts så fort man öppnar den.

## Positiva erfarenheter

Det har ändå varit relativt kul att arbeta med det här projektet nu när man vet lite mer hur routes och så vidare fungerar. Samt att jag i slutändan har en produkt som jag är nästan nöjd med även om den kanske inte är feature complet.

Jag har även känt att jag börjar behärska tekniken på ett annat sätt än vad jag gjort tidigare.

## Negativa erfarenheter

Datorn paja, jag behövde installera om allt, börja om, fastna med att få markdown att fungera, stressa för att hinna klart.

## Sammanfattning

Det finns flera till features som man skulle kunna lägga till som bland annat kommentarer snyggare stilar och över huvud taget någon strukturering av stilar (ta bort alla stilar skrivna i html dokumenten).

Fler features jag skulle vela ha: Edit funktionalitet, sökfunktion och så vidare och så vidare.

men som helhet är jag nöjd över vad jag åstadkommit med detta projekt och har haft roligt medans jag arbetat med det.