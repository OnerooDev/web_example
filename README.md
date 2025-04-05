# web_example
 Test task special for EffectiveMobile Back=GraphQL+typeORM+express(postgres) Web=Next.js

Instructions to start project 

1. Change variables to connect PostgresQL server

/back/src/contacts.ts

export const database_data: DataBaseProps = {
    database: "database_name",
    username: 'database_username',
    passwors: 'database_password'
}

______________________________
* If need to change standart Host name for Postgres Server

/back/src/typeormConfig.ts

Add variable to (export const typeormConfig)
( host: 'hostname', )
______________________________

2. Start Back-end service
- run new terminal window
- open directory /back
- run command "yarn" or "npm"
- run command "yarn dev"
- back-end started on "http://localhost:4000/graphql"

3. Start Front-end service if needed (or make POST requests to back-end server manualy)
- run new terminal window
- open directory /front_ex
- run "yarn" or "npm"
- run command "yarn dev"
- front-end started on "http://localhost:3000"
