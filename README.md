# ARCFiction Remade

[Website](https://arcfictionrem.vercel.app/)

## Homepage
![Untitled](https://user-images.githubusercontent.com/97490087/232387551-b9381ed0-2cc4-407e-b190-c1177a0a798e.png)

## Movie page

Is pretty similar to the Homepage, only change is that trending only features movies

## TV Show page

![Untitled](https://user-images.githubusercontent.com/97490087/232388675-6a488555-acb8-4fea-bedc-68b051aeedd8.png)

## Details

You can open any movie or tv show and see its details by clicking on Watch Now.

![Untitled2](https://user-images.githubusercontent.com/97490087/232389317-d6b51fba-8b90-42a9-a818-c19a04d1fd30.png)
![Untitled3](https://user-images.githubusercontent.com/97490087/232389323-58d3d81b-ecb1-4f4a-9b7a-116e4ebce8df.png)

You can also favorite them by clicking on the Favorite Button.

![fav](https://user-images.githubusercontent.com/97490087/232389923-21b62e42-fb35-42c2-b989-426aa0be1c3c.png)

Now in My List page it should appear there.

![sca](https://user-images.githubusercontent.com/97490087/232390082-c86b1f81-c8af-424f-a419-babb2b2d1421.png)

## Auth

![aut](https://user-images.githubusercontent.com/97490087/232390573-a5bfd909-1bd2-4dd5-b3f3-0261fde0d045.png)

In order to be able to list movies or tv shows you must register. As the image says you can also click the offered links in case you don't want to. This is just for checking the website. Since I allowed TV Shows and Movies pages to be accesed even while unregistered, logged users may experience a log out when refreshing the page. Go back to /auth and log in again.

## Local environment

You need to use Prisma and mongodb atlas.

```bash
git clone
npm install
```

Next you need to create the following keys inside an .env file:

```bash
DATABASE_URL=yourmondodbURL
NEXTAUTH_JWT_SECRET="NEXT-JWT-SECRET"
NEXTAUTH_SECRET="NEXT-SECRET"
NEXT_PUBLIC_API_KEY= an api key from TMDB API

```
If you want the providers to work you need also a key from them, then you must name them like so:

```bash
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```
