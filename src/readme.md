### General explination of Files

* **app.js** is the server Its purpose is to full page requests as well as requests for data from MongoDB. Mongo requests can be bundled into arrays to minimise the number of seperate requests. 

* **console.html & database.js** Provided a sort of visual console for an older version of this app. Mainly for testing purposes. It is not currently compatible with app.js soshould probably be ignored for now.

* **index.html & local.js** This is the principal client landing page and corresponding code.

* **variables.js** Just a place to keep globals.

* **mapdb.js** Allows client side transfer of data.

* **map.js** Use GoogleMaps API to provide map functionality.

In addition to these files you should have another folder, **node_modules**, which will appear when you set up NodeJS in your directory.

There is always a need to clean and polish code. It isn't well commented and has changed a lot so may be a bit messy. It is always worth the time to clean up code. 





**NOTE:** When you set up Node.js on your computer, a new file and a folder full of node-stuff should appear in this folder.
