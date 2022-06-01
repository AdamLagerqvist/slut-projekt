https://github.com/markdown-it/markdown-it

idé:
blogg posts med pagination så man kan bläddra mellan olika posts av samma user och så att alla posts inte finns på en sida + loggin. sidan ska stilas med bootstrap.

databaser:
    login:
        username varchar(20)
        password varchar(255)
        id int
        created_at timestamp
    posts:
        id int
        created_at timestamp
        uid int
        heading varchar(40)
        description varchar(255)
        fulltext TEXT
        other ?

Routes:
    post:
        loggin (hantera inloggnings-data från ett formulär)
        register (hantera registrerings-data från ett formulär)
        loggout (se till att cookies inte håller användaren inloggad nå mer)
        post (till för att posta bloggposts från ett formulär till databasen)
        delete/:id (deletar posts om användaren har tilåtelse)
    get:
        / (tar dig till hemsidan/index.njk)
        fullpost (tar dig till fulla bloggposten)
        loggin (skickar dig till loggin sidan)
        register (skickar dig till register sidan)
        secret (skickar dig till secret/användar sidan)

Routes jag behövt lägga till:
    get:
        content/:id (En separeing av "/" och content las till när pagination på "hemsidan/index.njk" introducerades)

