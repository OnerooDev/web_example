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

--------------------------------
EXAMPLE requests to GraphQL API server

Appeal statuses:
1 - "New";
2 - "In work";
3 - "Completed"
4 - "Canceled"

1. Query to recieve Appeals. Variables: {status: (1, 2, 3, 4, null), start_date: 'year-month-day', end_date: 'year-month-day'}

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query GetAppeals($status: Int, $start_date: String, $end_date: String) { showAppeals(status: $status, start_date: $start_date, end_date: $end_date) { appeals { id title state createdAt } error } }",
    "variables": {
      "status": null,
      "start_date": "2025-04-05",
      "end_date": "2025-04-05"
    }
  }' \
  http://localhost:4000/graphql


2. Mutation to create new appeal. Variables: {title: 'string', message: 'string'}

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation CreateAppeal($title: String!, $message: String!) { createUserTg(title: $title, message: $message) { appeal { id title state } error } }",
    "variables": {
      "title": "Проблема с доставкой",
      "message": "Заказ не прибыл в срок"
    }
  }' \
  http://localhost:4000/graphql

3. Mutation to change appeal status - "In work". Variables: {id: uniq_appeal_number}

  curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation TakeToWork($id: Int!) { updateToWorkAppeal(id: $id) { appeal { id state } error } }",
    "variables": {
      "id": 1
    }
  }' \
  http://localhost:4000/graphql

4. Mutation to change appeal status - "Completed". Variables: {id: uniq_appeal_number, message: "operator_answer_string"}

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation CompleteAppeal($id: Int!, $message: String!) { updateToDoneAppeal(id: $id, message: $message) { appeal { id state answer } error } }",
    "variables": {
      "id": 1,
      "message": "Проблема решена"
    }
  }' \
  http://localhost:4000/graphql

5. Mutation to change appeal status - "Canceled". Variables: {id: uniq_appeal_number, message: "operator_answer_string"}

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation CancelAppeal($id: Int!, $message: String!) { updateToCancelAppeal(id: $id, message: $message) { appeal { id state answer } error } }",
    "variables": {
      "id": 2,
      "message": "Отменено по причине..."
    }
  }' \
  http://localhost:4000/graphql

6. Mutation to change all appeal "In work" status to "Canceled". Variables: null

  curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation CancelAllInProgress { updateAllToCancelAppeal { appeals { id state } error } }"
  }' \
  http://localhost:4000/graphql