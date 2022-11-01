# Girchi payments connect
Backend for https://github.com/Girchi/ged-transfer

## Default configuration
1. Make local instance of the project: `git clone git@github.com:Girchi/girchi-payments-connect.git; cd girchi-payments-connect`
1. Create `.env` file in the project's root directory(where `package.json` is) and use `example.env` as a template

     A. Create `/cert` directory also in the root directory

     B. Generate SSL key and certificate in the `/cert` folder(`.gitignore` will automatically ignore it)
     
     C. Insert client_id and client_secret in `.env` from Drupal's Ouath module
     
     D. To set up a localhost environment, put in your SSL key(for example: `SSL_KEY=./cert/example.key`)

     E. Change `"DRUPAL_DOMAIN"` in `.env` to 'http://girchi.docker.localhost'
1. It's essential to have configured JSON:API, Simple Oauth and Token in Drupal side
1. Run `npm i` in terminal to automatically install all the neccessary npm packages
1. Run `npm run dev` to start the app
