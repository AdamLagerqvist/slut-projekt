https://github.com/markdown-it/markdown-it

blogg posts med pagination + loggin
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

