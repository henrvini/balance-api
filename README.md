# Balance API
This API provides basic functionality for managing banking accounts, supporting operations like deposit, withdraw, and transfer between accounts

# Deployment
The Balance API is deployed and available in production on Railway.app, offering a reliable environment for real-time operations.

Link: https://balance-api-production.up.railway.app

# Development
Install Modules:
```sh
npm install
```
Build App:
```sh
npm run build
```
Start server:
```sh
npm start
```

# Event Types:
- ```deposit```: Adds funds to an account
- ```withdraw```: Removes funds from an account
- ```transfer```: Moves funds between two accounts

# Endpoints:
1. GET /balance?account_id={id}
- Description: Returns the current balance of a specific account
- Parameters:
  - ```account_id``` (string): The unique identifier of the account
- Response:
  - On success: ```{ "balance": number }```
  - On failure: Error message indicating the account was not found

2. POST /event
- Description: Processes a financial event such as a deposit, withdraw, or transfer
- Body: A JSON object representing the event
  - Example for deposit:
    ```{ type: "deposit", "destination": "account_id", "amount": number }```
  - Example for withdraw:
    ```{ type: "withdraw", "origin": "account_id", "amount": number }```
  - Example for transfer:
    ```{ type: "transfer", "origin": "account_id", "destination": "account_id", "amount": number }```
- Response:
  - On success: Update account balance
  - On failure: Error message specifying the issue (insufficient funds, account not found)

3. POST /reset
- Description: Delete all accounts from the database
- Response:
  - On success: Return 'OK'

# Data Model:
- Account:
  - ```id``` (string): Unique identifier for the account
  - ```balance``` (number): Current balance of the account
