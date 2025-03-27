# Building any project

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fc0f1bf4b-4659-4b61-bca4-c168206024b4%2FScreenshot_2024-03-22_at_9.34.38_PM.png?table=block\&id=0dbf363d-26f7-4d27-b085-e0116851fe87\&cache=v2 "notion image")

#### Points

1. Where to start - Feature planning

1) Design UI/UX

   1. UX - First principles/Copy the biggest website out there
   2. UI - Designer. Today there are tools but havent found any good one

1. High level Design

   1. Auth provider
   2. Database
   3. Backend Stack
   4. Frontend stack
   5. Modules you’ll have (common/ui/backend)
   6. Cloud to deploy to

1) LLD

   1. Schema
   2. Route signatures
   3. Frontend Components - debatable

1. ER Diagrams -&#x20;

   1. We can build these today, but usually not needed unless you’re a very visual person

1) How to think about features

   1. Usually come from product
   2. If you’re a founder, then just whatever u think is right

1. How much complexity is needed

   1. Depends on the size of the company. For a startup, whatever helps you move fast w/o tech debt. For a company there are a lot of layers of review to go through

 

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ff39fc76b-c07b-47cd-afee-2352b2865fe7%2FScreenshot_2024-03-23_at_6.35.20_PM.png?table=block\&id=f4eb62dc-7d78-4c88-bcf7-da331ff8ad62\&cache=v2 "notion image")

💡

If you want a voice speaker that says `Paytm Received 100 rs from someone` we need to add another ws service in here We’ll also be doing DB polling in the middle which should rather be done via a queue



# Feature planning

#### User login

1. Auth (In this case, probably email/phone)

1) On ramp from bank, off ramp to bank

1. Support transfers via phone number/name

1) Support scanning a QR code for transferring to merchants

#### Merchant login

1. Login with google

1) Generate a QR Code for acceptance

1. Merchants get an alert/notification on payment

1) Merchant gets money offramped to bank every 2 days



# UI/UX (End User)

#### Login

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F5ae523e4-e78b-4f4a-813e-5361b7141209%2FScreenshot_2024-03-23_at_3.50.31_PM.png?table=block\&id=851446b5-f061-4e1a-b520-c0b2c3d74975\&cache=v2 "notion image")

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd5cc25a9-5388-4c47-b58a-3cdd3267d59c%2FScreenshot_2024-03-23_at_3.51.15_PM.png?table=block\&id=649353f6-38c7-49d9-8c14-d18aecfeac1a\&cache=v2 "notion image")

#### Landing page

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fe1b61e53-12dd-457c-8d15-e29e01b96015%2FScreenshot_2024-03-23_at_3.59.24_PM.png?table=block\&id=155720f2-d082-46d8-984c-a159379d17ad\&cache=v2 "notion image")

#### User Home page

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F700c8355-0144-4b7a-bd13-dfe246fb0278%2FScreenshot_2024-03-23_at_4.24.03_PM.png?table=block\&id=9acd009f-d0ae-4440-a9b9-a33947419c14\&cache=v2 "notion image")

#### User Transfer page

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd3797762-106e-48f3-b485-af1bb3672d66%2FScreenshot_2024-03-23_at_4.30.01_PM.png?table=block\&id=552fcc9b-f4c7-45bb-a397-df306c9f498d\&cache=v2 "notion image")

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fb60305f9-002f-4c9e-a0ec-3d5a5fe80fcf%2FScreenshot_2024-03-23_at_4.35.17_PM.png?table=block\&id=628881c0-2025-4f01-aeac-8ef123ae38e5\&cache=v2 "notion image")

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fa21f1cb6-5316-4eed-9526-d546214bef9c%2FScreenshot_2024-03-23_at_4.54.15_PM.png?table=block\&id=4306697c-9de5-4fa2-8927-7deaf408a1ce\&cache=v2 "notion image")



# UI/UX (Merchant)

 

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F34abda73-3b96-49c4-8b6c-d6070463b5c1%2FScreenshot_2024-03-23_at_3.56.35_PM.png?table=block\&id=2f19f24c-2928-4b95-8ae8-66716834d8ce\&cache=v2 "notion image")

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F1bf49584-45a2-4c5b-a3c1-3d882b4d3106%2FScreenshot_2024-03-23_at_4.32.45_PM.png?table=block\&id=98911895-2359-4177-8781-caa302467e36\&cache=v2 "notion image")

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fb60305f9-002f-4c9e-a0ec-3d5a5fe80fcf%2FScreenshot_2024-03-23_at_4.35.17_PM.png?table=block\&id=d2cfa2ad-c154-43f5-9e6f-c2ffbb4ba166\&cache=v2 "notion image")



# Architecture

 

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F888fec18-4140-4f67-9820-7878a4897e84%2FScreenshot_2024-03-23_at_6.35.20_PM.png?table=block\&id=c791d5db-4676-4d03-b8e6-587f9854dab5\&cache=v2 "notion image")

 

#### Hot paths

1. Send money to someone

1) Withdraw balance of merchant

1. Withdraw balance of user back to bank

1) Webhooks from banks to transfer in money

 

#### This is \~1 month job for a 2 engineer team.

We can cut scope in either

1. UI

1) Number of features we support (remove merchant altogether)

1. Number of services we need (merge bank server, do withdrawals directly and not in a queue assuming banks are always up)



# Stack

1. Frontend and Backend - Next.js (or Backend)

1) Express - Auxilary backends

1. Turborepo

1) Postgres Database

1. Prisma ORM

1) Tailwind



# Bootstrap the app

* Init turborepo

```
 npx create-turbo@latest
```

* Rename the two Next apps to

  * > 1. user-app
    >
    > 1) merchant-app

- Add tailwind to it.&#x20;

```TypeScript
cd apps/user-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

cd ../merchant-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

💡

You can also use <https://github.com/vercel/turbo/tree/main/examples/with-tailwind>

Update `tailwind.config.js`

```TypeScript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `global.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

💡

Ensure tailwind is working as expected



# Adding prisma

Ref - <https://turbo.build/repo/docs/handbook/tools/prisma>

1. Create a new `db` folder

1) Initialise package.json

```
npm init -y
npx tsc --init
```

1. Update package.json

```TypeScript
{
    "name": "@repo/db",
    "version": "0.0.0",
    "dependencies": {
        "@prisma/client": "^5.11.0"
    },
    "devDependencies": {
        "prisma": "5.11.0"
    },
    "exports": {
        "./client": "./index.ts"
    }
}

```

1. Update tsconfig.json

```TypeScript
{
    "extends": "@repo/typescript-config/react-library.json",
    "compilerOptions": {
      "outDir": "dist"
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
  }
  
```

1. Init prisma

```
npx prisma init
```

1. Start DB locally/on neon.db/on aiven

1) Update .env with the new database URL

1. Add a basic schema

```
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

1. MIgrate DB

```
npx prisma migrate
```

1. Update `index.ts`

```
export * from '@prisma/client';
```

1. Try adding `api/user/route.ts`&#x20;

```TypeScript
import { NextResponse } from "next/server"
import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export const GET = async () => {
    await client.user.create({
        data: {
            email: "asd",
            name: "adsads"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}
```



# Add a recoil/store module

* Create `store` package

```
cd packages
mkdir store
npm init -y
npx tsc --init
```

* Install dependencies

```
npm i recoil
```

* Update tsconfig.json

```TypeScript
{
    "extends": "@repo/typescript-config/react-library.json",
    "compilerOptions": {
      "outDir": "dist"
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
}
```

* Update package.json

```TypeScript
{
  "name": "@repo/store",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "recoil": "^0.7.7"
  }
}

```

* Create a simple `atom` called balance in `src/atoms/balance.ts`

```TypeScript
import { atom } from "recoil";

export const balanceAtom = atom<number>({
    key: "balance",
    default: 0,
})
```

* Create a simple `hook` called `src/hooks/useBalance.ts`

```TypeScript
import { useRecoilValue } from "recoil"
import { balanceAtom } from "../atoms/balance"

export const useBalance = () => {
    const value = useRecoilValue(balanceAtom);
    return value;
}   
```

* Add export to package.json

```
"exports": {
    "./useBalance": "./src/hooks/useBalance"
}

```



# Import recoil in the next.js apps

* Install recoil in them

```
npm i recoil
```

* Add a `providers.tsx` file

```TypeScript
"use client"
import { RecoilRoot } from "recoil";

export const Providers = ({children}: {children: React.ReactNode}) => {
    return <RecoilRoot>
        {children}
    </RecoilRoot>
}
```

* Update `layout.tsx`

```TypeScript
 return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
```

* Create a simple client component and try using the `useBalance` hook in there

```TypeScript
"use client";

import { useBalance } from "@repo/store/useBalance";

export default function() {
  const balance = useBalance();
  return <div>
    hi there {balance}
  </div>
}
```

 

If you see this, we’ll try to debug it end of class. Should still work in dev mode

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd540a280-eabd-4f82-a158-2247776c18b5%2FScreenshot_2024-03-23_at_6.16.32_PM.png?table=block\&id=a424ad0d-7648-4d22-a5b8-09a8b5468159\&cache=v2 "notion image")



# Add next-auth

### Database

Update the database schema

```TypeScript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          Int      @id @default(autoincrement())
  email       String?  @unique
  name        String? 
  number      String  @unique
  password    String
}

model Merchant {
  id          Int     @id @default(autoincrement())
  email       String  @unique
  name        String?
  auth_type   AuthType   
}

enum AuthType {
  Google
  Github
}
```

#### User-app

* &#x20;Go to `apps/user-app`&#x20;

- Initialize next-auth

```
npm install next-auth
```

* Initialize a simple next auth config in `lib/auth.ts`

```TypeScript
import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
            password: { label: "Password", type: "password" }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {
            // Do zod validation, OTP validation here
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        number: credentials.phone,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
 
```

* Create a `/api/auth/[...nextauth]/route.ts`

```TypeScript
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

* Update .env

```
JWT_SECRET=test
NEXTAUTH_URL=http://localhost:3001
```

* Ensure u see a signin page at <http://localhost:3000/api/auth/signin>

 

#### Merchant-app

Create `lib/auth.ts`

```TypeScript
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
  }
```

* Create a `/api/auth/[...nextauth]/route.ts`

```TypeScript
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

* Put your google client and secret in `.env` of the merchant app.  Ref <https://next-auth.js.org/providers/google>

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=kiratsecr3t
```

* Ensure u see a signin page at <http://localhost:3001/api/auth/signin>

- Try signing in and make sure it reaches the DB



# Add auth

#### Client side

* Wrap the apps around `SessionProvider` context from the next-auth package

- Go to `merchant-app/providers.tsx`

```
"use client"
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

export const Providers = ({children}: {children: React.ReactNode}) => {
    return <RecoilRoot>
        <SessionProvider>
            {children}
        </SessionProvider>
    </RecoilRoot>
}
```

* Do the same for `user-app/providers.tsx`

 

#### Server side

Create `apps/user-app/app/api/user.route.ts`

```TypeScript
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    if (session.user) {
        return NextResponse.json({
            user: session.user
        })
    }
    return NextResponse.json({
        message: "You are not logged in"
    }, {
        status: 403
    })
}
```

Ensure login works as exptected



# Add an Appbar component

 

* Update the `Button`  component in UI

```TypeScript
"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
      {children}
    </button>

  );
};

```

* Create a `ui/Appbar` component that is highly generic (doesnt know anything about the user/how to logout).&#x20;

```TypeScript
import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4">
        <div className="text-lg flex flex-col justify-center">
            PayTM
        </div>
        <div className="flex flex-col justify-center pt-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}
```

 

# Checkpoint

We are here - <https://github.com/100xdevs-cohort-2/paytm-project-starter-monorepo>



# On Ramping

#### Creating a dummy bank server

* Allows PayTM to generate a `token` for a payment for a user for some amount

```TypeScript
POST /api/transaction
{
	"user_identifier": "1",
	"amount": "59900", // Rs 599
	"webhookUrl": "http://localhost:3003/hdfcWebhook"
}
```

* PayTM should redirect the user to&#x20;

```TypeScript
https://bank-api-frontend.com/pay?token={token_from_step_1}
```

* If user made a successful payment, `Bank` should hit the `webhookUrl` for the company

#### Creating a bank\_webhook\_handler Node.js project

* Init node.js project + esbuild

```TypeScript
cd apps
mkdir bank_webhook_handler
cd bank_webhook_handler
npm init -y
npx tsc --init
npm i esbuild express @types/express
```

* Update tsconfig

```TypeScript
{
    "extends": "@repo/typescript-config/base.json",
    "compilerOptions": {
      "outDir": "dist"
    },
    "include": ["src"],
    "exclude": ["node_modules", "dist"]
  }
  
```

* Create `src/index.ts`

```TypeScript
import express from "express";

const app = express();

app.post("/hdfcWebhook", (req, res) => {
    //TODO: Add zod validation here?
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    // Update balance in db, add txn
})
```

* Update DB Schema

```TypeScript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                Int                 @id @default(autoincrement())
  email             String?             @unique
  name              String?
  number            String              @unique
  password          String
  OnRampTransaction OnRampTransaction[]
  Balance           Balance[]
}

model Merchant {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  auth_type AuthType
}

model OnRampTransaction {
  id        Int          @id @default(autoincrement())
  status    OnRampStatus
  token     String       @unique
  provider  String
  amount    Int
  startTime DateTime
  userId    Int
  user      User         @relation(fields: [userId], references: [id])
}

model Balance {
  id     Int  @id @default(autoincrement())
  userId Int  @unique
  amount Int
  locked Int
  user   User @relation(fields: [userId], references: [id])
}

enum AuthType {
  Google
  Github
}

enum OnRampStatus {
  Success
  Failure
  Processing
}

```

* Migrate the DB

```TypeScript
Go to the right folder (packages/db)
npx prisma migrate dev --name add_balance
```

* Add `repo/db` as a dependency to packate.json

```
"@repo/db": "*"
```

* Add transaction to update the balance and transactions DB Ref - <https://www.prisma.io/docs/orm/prisma-client/queries/transactions>

```TypeScript
import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003);



```





# Create generic appbar

* Create a new `AppbarClient` component in `apps/user-app/AppbarClient.tsx`

```TypeScript
"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Appbar onSignin={signIn} onSignout={async () => {
        await signOut()
        router.push("/api/auth/signin")
      }} user={session.data?.user} />
   </div>
  );
}

```

* Add `AppbarClient` to `layout.tsx`

```TypeScript
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { AppbarClient } from "../components/AppbarClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet",
  description: "Simple wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <AppbarClient />
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}

```



# Create sidebar

* Create `user-app/(dashboard)` folder

- Add 3 pages inside it

  * dashboard/page.tsx
  * transactions/page.tsx
  * transfer/page.tsx

```TypeScript

export default function() {
    return <div>
        Dashboard Page (or transfer/txn page)
    </div>
}
```

* Create `user-app/(dashboard)/layout.tsx`

💡

Icons come from <https://heroicons.com/> SidebarItem will be created in the next step

```TypeScript
import { SidebarItem } from "../../components/SidebarItem";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex">
        <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
            <div>
                <SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Home" />
                <SidebarItem href={"/transfer"} icon={<TransferIcon />} title="Transfer" />
                <SidebarItem href={"/transactions"} icon={<TransactionsIcon />} title="Transactions" />
            </div>
        </div>
            {children}
    </div>
  );
}

// Icons Fetched from https://heroicons.com/
function HomeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
}
function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}

function TransactionsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
}
```

* Create `SidebarItem` component

```TypeScript
"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname()
    const selected = pathname === href

    return <div className={`flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2 pl-8`} onClick={() => {
        router.push(href);
    }}>
        <div className="pr-2">
            {icon}
        </div>
        <div className={`font-bold ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}
```

 

You should have 3 pages that look like this

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fee181e5d-9943-4947-bde7-2f7d1a15e29b%2FScreenshot_2024-03-30_at_2.08.54_PM.png?table=block\&id=11fec526-d179-4363-9426-ee72d97e7d96\&cache=v2 "notion image")

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F634d34bb-4f0d-4923-a7d2-f7c1661dfb67%2FScreenshot_2024-03-30_at_2.11.54_PM.png?table=block\&id=22d51b92-a9ab-4d40-a488-f56febfb0041\&cache=v2 "notion image")



# Create transfer page

![notion image](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F6750f545-9dc8-4b13-8834-d5970c5bb038%2FScreenshot_2024-03-30_at_2.43.20_PM.png?table=block\&id=8e3107bc-491c-4c44-850b-204c4cafb228\&cache=v2 "notion image")

 

* Add a better `card` component to `packages/ui`

```TypeScript
import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border p-4"
    >
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  );
}
```

* Add a `Center` component that centralizes (both verticaly and horizontally) the children given to it (in `packages/ui` )

💡

Make sure to export it in `package.json`

```TypeScript
import React from "react"

export const Center = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex justify-center flex-col h-full">
        <div className="flex justify-center">
            {children}
        </div>
    </div>
}
```

* Add a `Select` component to `packages/ui`  (Make sure to export it)

```TypeScript
"use client"
export const Select = ({ options, onSelect }: {
    onSelect: (value: string) => void;
    options: {
        key: string;
        value: string;
    }[];
}) => {
    return <select onChange={(e) => {
        onSelect(e.target.value)
    }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
        {options.map(option => <option value={option.key}>{option.value}</option>)}
  </select>
}
```

* Add TextInput component to `packages/ui`&#x20;

```TypeScript
"use client"

export const TextInput = ({
    placeholder,
    onChange,
    label
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
}) => {
    return <div className="pt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input onChange={(e) => onChange(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} />
    </div>
}
```

* Create `user-app/components/AddMoneyCard.tsx`

```TypeScript
"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={() => {

        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={() => {
                window.location.href = redirectUrl || "";
            }}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}
```

* Create `user-app/components/BalanceCard.tsx`&#x20;

💡

We’re diving my 100 because we store in `paise` denomination in the db

```TypeScript
import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return <Card title={"Balance"}>
        <div className="flex justify-between border-b border-slate-300 pb-2">
            <div>
                Unlocked balance
            </div>
            <div>
                {amount / 100} INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                Total Locked Balance
            </div>
            <div>
                {locked / 100} INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div>
                Total Balance
            </div>
            <div>
                {(locked + amount) / 100} INR
            </div>
        </div>
    </Card>
}
```

* Create `user-app/components/OnRampTransaction.tsx`

```TypeScript
import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}
```

* Create `user-app/app/(dashboard)/transfer/page.tsx`

```TypeScript
import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}
```



# Add some seed data

* Go to `packages/db`

- Add `prisma/seed.ts`

```TypeScript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: '9999999999' },
    update: {},
    create: {
      number: '9999999999',
      password: 'alice',
      name: 'alice',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await prisma.user.upsert({
    where: { number: '9999999998' },
    update: {},
    create: {
      number: '9999999998',
      password: 'bob',
      name: 'bob',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

* Update package.json

```TypeScript
"prisma": {
    "seed": "ts-node prisma/seed.ts"
}
```

* Run command to seed db

```TypeScript
npx prisma db seed
```

* Explore db

```TypeScript
npx prisma studio

```

# Make landing page redirect

The user should go to either the `signin page` or the `dashboard page` based on if they are logged in

Update root `page.tsx`

```TypeScript
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/dashboard')
  } else {
    redirect('/api/auth/signin')
  }
  
}
```

 

Final codebase - <https://github.com/100xdevs-cohort-2/week-17-final-code>
