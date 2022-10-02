This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## NextJS Codehooks Socket Example Dev Setup

Please check out the commit history for the steps taken to get this example up and running.

Here's a brief summary:

1. Create a NextJS app with `create-next-app`

```
npx create-next-app@latest --ts
```

2. Install `concurrently` in the NextJS app

```
npm i -D concurrently
```

3. Install `socket.io-client` in the NextJS app

```
npm i socket.io-client
```

Note: The socket packages would ideally come from a package called `@codehooks/socket` or something along those lines. This is just an example.

4. Create a codehooks app in a directory called `api` in the NextJS app

```
mkdir api
cd api
touch index.js
npm init -y
npm i codehooks codehooks-js
npm i -D nodemon
npm i socket.io
```

Basically following this for a [local setup](https://codehooks.io/docs/localdev).

5. Add this line as your `dev` script -- check how the `package.json` file should look like in the api directory.

```json
"scripts": {
    "dev": "nodemon -w . -x coho localserver --port 4000"
  },
```

6. Add this line as your `dev` script -- check how the `package.json` file should look like in the root directory.

```json
"scripts": {
    "dev": "concurrently \"npm run dev --prefix ./api\" \"next dev\"",
    ...
  },
```

7. Add an `.env.development.local` file in the root directory that contains the API path to the codehooks app.

```
NEXT_PUBLIC_API_PATH=http://localhost:4000/dev
```
