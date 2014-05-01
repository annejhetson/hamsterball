Hamsterball
===========

Stats keepers at basketball games need to record data quickly and calculate statistics on the fly. This is an app to help them out.

Start out by just creating an Ember app using the starter kit from the homepage. So that you don't have to create a Rails API app for saving and retrieving records, use the Ember Data Local Storage Adapter.

Before the game starts, the stats keeper needs to enter the names of the teams who are playing, and the names of the players on the teams. To keep things simple, we'll make it so that this app can only be used for a single game at a time, at least to start (otherwise, we'd have to have a many-to-many relationship between teams and games). Hint: Read the Ember guides on relationships in models; a team has many players.

