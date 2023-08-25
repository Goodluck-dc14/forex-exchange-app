# forex-exchange-app
Designed and implemented a backend API for a Forex Exchange application. An application for currency conversion and exchange rate data.

## Prerequisites

- Node.js
- MongoDB
- Javascript
- axios
- cors
- dotenv
- express
- express-rate-limit
- express-validator
- jsonwebtoken
- mongoose

## Installation

1. Clone the repository:
   ### git clone [<repository-url>](https://github.com/Goodluck-dc14/forex-exchange-app)https://github.com/Goodluck-dc14/forex-exchange-app
  
3. Move to the project directory:
   ### cd forex-exchange-app

4. Install dependencies:
   ### npm install

## Configuration

1. Create a `.env` file.

2. Configure the following environment variables in the `.env` file:
   
   `MONGODB_URI`: MongoDB connection URI.
   
   `EXCHANGE_RATES_API_KEY`: API key for exchange rate data.

## Database Setup

1. Create a MongoDB database and collections.

## API Key Setup

1. Obtain an API key for exchange rate data and place it in the `.env` file.

## Running the Application

1. Start the application:
   ### npm run dev

## Deployed API link:
## https://forex-exchange-app.cyclic.cloud/

## Usage

- Access API endpoints: `/api/live`, `/api/convert`, `/api/historical`.

## Endpoints

- `/api/live`: Fetch live exchange rates.
- `/api/convert`: Convert currencies.
- `/api/historical`: Fetch historical exchange rate data.


