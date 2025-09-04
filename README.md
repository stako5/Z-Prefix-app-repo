# Z-Prefix-app-repo

\*\*Docker SetUp:

first: In your terminal run docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

Second: run docker exec -it <PSQL-Container-ID> bash

Third: psql -U postgres

Fourth: CREATE DATABASE inventory

Fifth: \c inventory

\*\*Client setup:

First: In your terminal cd client/

Second: npm i

Third: npm run dev

\*\*Server Setup:

First: in a new Terminal cd server/

Second: npm i

Third: npm run dev

\*\*Migration & Seeds setup:

First: npm start in server folder

    My app is an inventory manager with a simple and intuitive layout.

    Homepage: Displays the entire inventory along with a custom list you can create.

    Authentication: Includes a login page with a login button, a signup page with a signup button, and a logout option if you already have an account.

    Navigation: The Home button is available on every page for easy access.

    Item Details: Clicking on an item name takes you to its details page.

    Item Cards: Each item card includes four buttons — increase quantity, decrease quantity, add to list, and delete item.

    Add Item: At the top of the inventory list, there’s an “Add” button. Clicking it opens a form to create a new item.
