# Slutprojekt blogghemsida

Adam Lagerqvist 2022-05-30.

## Inledning

Syftet med projektet var att bygga något där man måste använda de saker vi lärt oss under kurserna webbutvekling 2 och webservverprogramerings gång i ett sista slutprojekt. Målet jag hade med detta arbetet var att känna mig tillräckligt säker på hur en webbserver fungarear att jag till stortsätt självständigt kan bygga en dynamisk hemsida som använder sig av webserver och databas-tekniker.

Jag började planera mitt prkojekt detta innebar att i förstahand funder över vad det var jag skulle bygga för webb aplikation. I slutändan valde jag att bygga en blogg hemsida som hämtar bloggposts från en databas och visar dem på en hemsida jag ville även att man från denna hemsida skulle kunna loggain och posta bloggposts.

Utifrån denna idé började jag skriva en utförlig planering som förklarade bland annat hur strukturen på databasen skulle se ut samt vilka router webbservern ska ha och vad de ska göra.

Tanken var sedan att jag skulle förlja planeringen och i slutet av varge lektion skriva några få meningar om vad jag gjort och om jag stött på några problem samt hur jag bör gå vidare för att hitta en lösning på dem.

Dock gick inte allting riktigt som planerat jag fick lite problem med att få mina fulla posts att visa och dessutom pajade min dator så att jag tappade all planering jag gjort tidigare detta var två stora saker som sgade ner mitt projekt.

Men om man bortser från mina två ganska stora "time sinks" har det gått rellativt "smooth" resten av tiden. De festa fel jag fick berrode på att jag missat enka grejer i min route kod som var lätt att fixa när jag väl såg vad jag skrivigt fel.

## Bakgrund

Projektet har i stort sett två stora delar:

Konto-hanteringen och Blogg delen.

### Konto-hantering:

Konto-hanteringen har jag i stort sätt kopierat ifrån vårt loggin projekt vi hadde i ALC tidigare mycket av koden för loggin, Register och secret/(användarens egna sida) grejer kommer där ifrån. Dock har jag behövt ändra koden så att den ska fungera som den ska och så att den finns i en js fil eftersom det blev krongligt när vi i ALC projektet hade delat upp det i en API fil och en index fil.

Register skapar ett nytt konto och skickar det till databasen för att registreras. Om lösenorden inte stämmer överens med varandra skickar servern tillbaka passwords do not match. Annars om ditt användarnamn redan är taget säger den det också detta genom att jag gjort användarnam uniqe i databasen om då du har samma användarnamn som någon annan får servern ett eror från databasen och skickar då medelandet till användaren.

loggin fungerar på ett liknande sätt den kollar om användarnamnet och lösenordet matchar någon användare i databasen om den gör det blir du inloggad som den användaren.

Att hålla folk inloggade görs genom session cockies som sparas på servern och din client. Lösenorden som sparas i databasen är även krypterade med Bkryp libraryt. För att loggaut tar jag bara bort kakan och skickar dem till inlogginng sidan igen.

### Blogg delen:

Posts har sin egen databas när man kommer till hemsidan visas alla posts i den tabbelen.

Man kan skapa nya posts om man är inloggad då varge post behöver en user som har skapat den, detta görs på användarens egen sida där fyller i ett formulär och sedan trycker på submit för att skicka svaret till databasen.

För att bland annat kunna tabort posts behövde jag använda SQL JOIN detta för att bara du själv ska kunna tabort dina egna posts. SQL JOIN gör att man kan komma åt två olika tables samtidigt.

Fulla posts skrivs som markdown och renders sendan med hjälp av Markdown-it på sidan. Sidan har även pagination för att inte fylla sidan med posts så fort man öppnar den.

## Positiva erfarenheter

Det har ändå varait relativt kul att arbeta med dethär projektet nu när man vet lite mer hur routes och så vidare fungerar. Samt att jag i slutändan har en produkt som jag är nästan nöjd med även om den kanske inte är feature commplete.

Jag har även kännt att jag börjar behärska tekniken på ett annat sätt än vad jag gjort tidigare.

## Negativa erfarenheter

Datorn paja, jag behövde instaler om allt, borja om, fasna med att få markdown att fungera, stressa för att hinna klart.

## Sammanfattning

Det finns flera till features som man skulle kunna lägga till som bland annat kommentarer snyggare stilar och över huvud taget någon strukturering av stilar (tabort alla stilar skrivna i html dokumenten).

Fler features jag skulle vela ha: eddit funktionalitet, sökfunktion och så vidare och så vidare.

men som helhet är jag nöjd över vad jag åstakommit med detta projekt och har haft roligt medans jag arbetat med det.