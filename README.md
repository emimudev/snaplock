<h1>
  <a href="https://snaplock.vercel.app/">
    🌠 Snaplock 
  </a>
</h1>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://i.ibb.co/Yym6NfR/snaplock-login-dark.png"/>
    <img src="https://i.ibb.co/KF1D6LN/snaplock-login.png" height="420" alt="" />
    <!--- 
    https://ibb.co/TmC1cbK
    https://ibb.co/mXkmRhD 
    -->
  </picture>
</p>

<hr/>

<p>
  Snaplock is a simple cloud image storage platform based on Cloudinary.
</p>

## Features

- Folders management.
- Image storage.
- Data sharing.

## Environment Variables

It is necessary to set the following environment variables in order to run the application.

- `MONGODB_URI`
- `NEXT_PUBLIC_UPLOAD_PRESET`
- `NEXT_PUBLIC_CLOUD_NAME`
- `JWT_SECRET`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CLIENT_ID`

## Run locally

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
