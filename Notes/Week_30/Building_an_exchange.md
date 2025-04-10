# What is an exchange

An exchange lets you `swap` assets, usually `INR` for a `stock` like `TATA`.

### Exchanges

1. NYSE

1) NSE

1. BSE

1) Binance

1. CoinBase

### Brokers

1. Robinhood

1) Zerodha

1. Groww

# Core concepts

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F4452dca4-32fb-430c-9899-74871eb13af7%2FScreenshot_2024-06-22_at_8.59.42_AM.png?table=block&id=12c0c1fb-565a-4f44-a1f3-f6fd496f66da&cache=v2 "notion image")

#### 1. Current Price

A price feed which constantly gives you the current price of a stock (the last value at which it was traded)

#### 2. Time series data

A Database that stores the price of a stock over time.

#### 3. Orderbook

The current set of open orders that a user can come and trade on

#### 4. Order placement UI

A UI widget that a user can use to place an order

You build an exchange usually by copying over the API structure of an existing exchange - <https://binance-docs.github.io/apidocs/spot/en/#new-order-trade>

# Types of orders

There are two types of orders that you place on an exchange.

Market and Limit orders

#### Market order

I want to buy stocks of TATA for Rs 2000

I want to buy ETH worth \$200

(market, price, side) is the only input to the API

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fb3fe3e32-ac6c-4741-b0d0-973895a17dc7%2FScreenshot_2024-06-22_at_9.24.46_AM.png?table=block&id=cc5c247d-43ee-4e2e-bb57-9ec81a133583&cache=v2 "notion image")

#### Limit order

I will buy 1 stock of TATA at Rs 200/stock

(market, qty, price, side) is the input to the API

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F982e665a-89ca-4e14-97ed-df5e0e711c57%2FScreenshot_2024-06-22_at_9.24.31_AM.png?table=block&id=6ffcab53-d90d-4ad2-8477-b2729b3faba8&cache=v2 "notion image")

# Jargon

#### Markets

Whenever you trade, you swap one asset for another. Every `pair` that you can trade is called a market.

For example -&#x20;

1. ETH-USDC

1) TATA-INR

1. ETH-BTC (Usualy a combination of two markets, ETH-USDC and BTC-USDC)

#### Base asset

The asset that is being traded (TATA).

#### Quote asset

The asset it is being traded with.

#### Orderbook

A list of currently available `limit orders` that people have placed. The more the number of orders, the more `liquid` the exchange is considered.

#### Bid

A limit order of the following type -&#x20;

I will buy 5 stocks of TATA for Rs 200/stock

#### Ask

A limit order of the following type -&#x20;

I will sell 5 stocks of TATA for Rs 201/stock

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F1a9c883d-74e7-4d58-b336-3d05ef02e0ce%2FScreenshot_2024-06-22_at_9.30.08_AM.png?table=block&id=0846182d-a591-4aa0-8605-de44e9f9fc63&cache=v2 "notion image")

#### Market makers

Big companies that keep the orderbook liquid (that have a lot of open orders on the orderbook)

# How orders are made

### Market makers making the book liquid

Step 1 is that you need market makers to place orders on the book. If they dont, then you dont really have an exchange yet. They are constantly placing orders on the book based on what they think is the fair price of the stock

#### Users sending in orders that eat the book

Users first send an order to get a `quote` for the quantity they want to buy.

Users can send orders that get matched to the current orderbook.&#x20;

Whenever a `big` order is made (orderbook gets eaten), Market makers make the book liquid again.

💡

Even users are placing a limit order, but they set the `type` to be `ioc` (immediate or cancel) and the price to be thee `quote` they received

# Backend Routes

### Users

POST `/api/v1/signup` - Lets a user signup

POST `/api/v1/signin` - Lets a user signin, returns a jwt

### Orders

POST `/api/v1/order` - Lets a user place an order. Returns `orderId` and `fill status`&#x20;

```
type: limit | market
kind: buy | sell
price: number
quantity: number
market: TATA-INR
```

GET `/api/v1/order/:orderId ` - Returns `fill status`

DELETE `/api/v1/order/:orderId` - Removes an order off the book (if it isn’t filled yet)

POST `/api/v1/order/quote`&#x20;

```
kind: buy | sell
quantity: number
market: TATA-INR
```

# Websocket streams

The real time part of an app like this would be the following -

1. Current price

1) Current orderbook

1. Recent trades

1) Graph data

# Architecture

### Backend Architecture

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F4ea83063-e847-4989-8a85-8d3f04658023%2FScreenshot_2024-06-22_at_9.49.01_AM.png?table=block&id=7933da7d-aebe-4e96-8fc6-6563854514e5&cache=v2 "notion image")

#### Backend Architecture (simpler)

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fc298b60b-dcc9-457f-aa30-7d7ddff95e2c%2FScreenshot_2024-06-22_at_4.55.52_PM.png?table=block&id=1d4ada86-83dd-43bb-9b11-713d3fdf7cc3&cache=v2 "notion image")

# Coding the API Server

- Initialize the project

```
mkdir orderbook-server
cd orderbook-server
npm init -y
npx tsc --init
npm install express redis uuid zod
npm install typescript ts-node @types/express @types/node @types/redis @types/uuid
```

- Update `rootDir` and `outDir`

* Create `src/orderbook.ts`

```

interface Order {
    price: number;
    quantity: number;
    orderId: string;
}

interface Bid extends Order {
    side: 'bid';
}

interface Ask extends Order {
    side: 'ask';
}

interface Orderbook {
    bids: Bid[];
    asks: Ask[];
}

export const orderbook: Orderbook = {
  bids: [

  ],
  asks: [

  ]
}

export const bookWithQuantity: {bids: {[price: number]: number}; asks: {[price: number]: number}} = {
    bids: {},
    asks: {}
}
```

- Create `src/types.ts`

```
import { z } from "zod";

export const OrderInputSchema = z.object({
  baseAsset: z.string(),
  quoteAsset: z.string(),
  price: z.number(),
  quantity: z.number(),
  side: z.enum(['buy', 'sell']),
  type: z.enum(['limit', 'market']),
  kind: z.enum(['ioc']).optional(),
});

```

- Create `src/index.ts`

```
import express from "express";
import { OrderInputSchema } from "./types";
import { orderbook, bookWithQuantity } from "./orderbook";

const BASE_ASSET = 'BTC';
const QUOTE_ASSET = 'USD';

const app = express();
app.use(express.json());

let GLOBAL_TRADE_ID = 0;

app.post('/api/v1/order', (req, res) => {
  const order = OrderInputSchema.safeParse(req.body);
  if (!order.success) {
    res.status(400).send(order.error.message);
    return;
  }

  const { baseAsset, quoteAsset, price, quantity, side, kind } = order.data;
  const orderId = getOrderId();

  if (baseAsset !== BASE_ASSET || quoteAsset !== QUOTE_ASSET) {
    res.status(400).send('Invalid base or quote asset');
    return;
  }

  const { executedQty, fills } = fillOrder(orderId, price, quantity, side, kind);

  res.send({
    orderId,
    executedQty,
    fills
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


function getOrderId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

interface Fill {
    "price": number,
    "qty": number,
    "tradeId": number,
}

function fillOrder(orderId: string, price: number, quantity: number, side: "buy" | "sell", type?: "ioc"): { status: "rejected" | "accepted"; executedQty: number; fills: Fill[] } {
    const fills: Fill[] = [];
    const maxFillQuantity = getFillAmount(price, quantity, side);
    let executedQty = 0;

    if (type === 'ioc' && maxFillQuantity < quantity) {
        return { status: 'rejected', executedQty: maxFillQuantity, fills: [] };
    }

    if (side === 'buy') {
        orderbook.asks.forEach(o => {
            if (o.price <= price && quantity > 0) {
                console.log("filling ask");
                const filledQuantity = Math.min(quantity, o.quantity);
                console.log(filledQuantity);
                o.quantity -= filledQuantity;
                bookWithQuantity.asks[o.price] = (bookWithQuantity.asks[o.price] || 0) - filledQuantity;
                fills.push({
                    price: o.price,
                    qty: filledQuantity,
                    tradeId: GLOBAL_TRADE_ID++
                });
                executedQty += filledQuantity;
                quantity -= filledQuantity;
                if (o.quantity === 0) {
                    orderbook.asks.splice(orderbook.asks.indexOf(o), 1);
                }
                if (bookWithQuantity.asks[price] === 0) {
                    delete bookWithQuantity.asks[price];
                }
            }
        });

        // Place on the book if order not filled
        if (quantity !== 0) {
            orderbook.bids.push({
                price,
                quantity: quantity - executedQty,
                side: 'bid',
                orderId
            });
            bookWithQuantity.bids[price] = (bookWithQuantity.bids[price] || 0) + (quantity - executedQty);
        }
    } else {
        orderbook.bids.forEach(o => {
            if (o.price >= price && quantity > 0) {
                const filledQuantity = Math.min(quantity, o.quantity);
                o.quantity -= filledQuantity;
                bookWithQuantity.bids[price] = (bookWithQuantity.bids[price] || 0) - filledQuantity;
                fills.push({
                    price: o.price,
                    qty: filledQuantity,
                    tradeId: GLOBAL_TRADE_ID++
                });
                executedQty += filledQuantity;
                quantity -= filledQuantity;
                if (o.quantity === 0) {
                    orderbook.bids.splice(orderbook.bids.indexOf(o), 1);
                }
                if (bookWithQuantity.bids[price] === 0) {
                    delete bookWithQuantity.bids[price];
                }
            }
        });

        // Place on the book if order not filled
        if (quantity !== 0) {
            orderbook.asks.push({
                price,
                quantity: quantity,
                side: 'ask',
                orderId
            });
            bookWithQuantity.asks[price] = (bookWithQuantity.asks[price] || 0) + (quantity);
        }
    }

    return {
        status: 'accepted',
        executedQty,
        fills
    }
}

function getFillAmount(price: number, quantity: number, side: "buy" | "sell"): number {
    let filled = 0;
    if (side === 'buy') {
        orderbook.asks.forEach(o => {
            if (o.price < price) {
                filled += Math.min(quantity, o.quantity);
            }
        });
    } else {
        orderbook.bids.forEach(o => {
            if (o.price > price) {
                filled += Math.min(quantity, o.quantity);
            }
        });
    }
    return filled;
}
```
