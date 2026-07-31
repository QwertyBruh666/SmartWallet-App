# About the Project

SmartWallet is my personal pet project, created to explore modern web development technologies and build a full-featured cryptocurrency portfolio tracking application.

# SmartWallet

SmartWallet is a web application for tracking cryptocurrency portfolios, exploring up-to-date market data, and staying informed with the latest cryptocurrency news.

# Features

- Retrieve portfolio information from supported cryptocurrency exchanges using their official APIs.

![Add Wallet](/images/AddWallet.png)

- View asset allocation charts and portfolio value history.

![Wallet composition](/images/WalletPage.png)

![Balance history](/images/WalletPageBalanceDynamics.png)

- Browse recent activity for each connected portfolio.

![Wallet Activity](/images/WalletActivity.png)

- Analyze an aggregated portfolio with charts for asset allocation, connected wallets, and portfolio value changes.

![Aggregated portfolio by assets](/images/AllWalletsPageCoins.png)
![Aggregated portfolio by wallets](/images/AllWalletsPageWallets.png)

- Search for cryptocurrencies and view detailed information about each asset.

![Find asset](/images/FindCoin.png)

![Currency data](/images/CoinPage.png)

- Add cryptocurrencies to a favorites list.

![Favs](/images/Main&favs.png)

- Receive a personalized news feed based on favorite cryptocurrencies and connected exchanges.

![News page](/images/News.png)

## Tech Stack

### Backend

- ASP.NET Core
- Entity Framework Core
- MySQL
- Redis
- JWT Authentication
- Docker

### Frontend

- TypeScript
- React
- TanStack Query
- Chart.js
- React Router

## Environment Variables

The following environment variables are required for the application to work correctly:

- `DB_CONNECTION_DOCKER` and `DB_CONNECTION_EXTERNAL` - Db connection string variables 
- `GOOGLE_AUTH__CLIENTID` and `GOOGLE_AUTH__CLIENTSECRET` — Google authentication.
- `COINMARKETAPI__APIKEY` — CoinGecko API key.
- `NEWSAPI__APIKEY` — News API key.
- `AUTH__JWTSECURITYKEY` — Secret key used for generating and validating JWT tokens.

## Getting Started

You need to match database environment variables in docker-compose.yml file with your .env file
after that run the following command from the project root:

```bash
docker compose up --build
```

> Docker must be installed to run the application.

## Future Plans

Planned improvements include:

- AI-powered cryptocurrency portfolio analysis;
- notifications for trending and favorite cryptocurrencies;
- custom portfolio creation with support for combining multiple exchange accounts and manually adding assets;
- additional analytics and portfolio insights.
