To run this program follow the below given instructions:
1. Create a file with name .env at the location where server.js exists
2. Fill the .env file with below given data in key:value pairs
    PORT=<PORT_NUMBER>
    DB_URI=<LOCAL_MONGO_URL_OR_CONNECTION_STRING>
    DB_NAME=<DATABASE_NAME>
    DB_COLLECTION=<COLLECTION_NAME> 
3. Run the following commands:
    npm i
    npm run dev
4. Completing the above steps will make the program run.

Now two APIs are exposed which you can use to generate and get the tambola tickets
1. Generate Tickets - POST <host>:<port>/api/v1/ticket/generate_ticket
Query: 
    n - is the number of tickets to generate (required field)
    id - is the id against which ticket will be generated if not given then ticket will be generated for random unique id (optional field)
Output:
    This API will return an unique id against which the tickets were generated. Use this id in the below mentioned API to get the ticket.

2. Fetch Tickets - GET <host>:<post>/api/v1/ticket/get_ticket
Query: 
    id - is the id against which ticket will be fetched (required field)
    offset - number of tickets to skip (required field)
    limit - number of ticket to fetche (required field)
Output:
    This API will return an unique id against which the tickets were generated. Use this id in the below mentioned API to get the ticket.

P.S. Currently this program is working perfectly for n = 5 that is when maximum 5 tickets are generated at a single time. For n = 6 the program is getting stuck in infinite loop. This issue will be fixed as soon as possible.