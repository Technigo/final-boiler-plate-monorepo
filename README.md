# Final project Technigo Bootcamp 

Welcome to Olga Lepistö and Elin Olausson's final project for the Technigo bootcamp: 
RESCUE HELPER - the site dedicated to making adopting a rescue dog more accessible.

The idea for this site came to us after realizing that dog rescue organisations and shelters don't often have that great websites all - some even just have a facebook group to display the dogs that need new homes. Even though people that are interested in adopting a rescue dog might not have such particular preferences when it comes to their future furry friend (as opposed to some that want a specific breed, for example), people have different life situations and lifestyles, and we want to make it easier for them to find the dog that best suits them.

Rescue Helper has two main purposes:
- A place for people that are interested in adopting a rescue dog to see what kind of dogs are available for adoption across different adoption organisations, and search for the kind of dogs they would like to adopt
- A platform for shelters and organisations to display the dogs they currently have up for adoption, to increase their chances of finding their forever homes

The site doesn't have a sign up option - we figured it would be more realistic for a site like this, so not just anyone can pretend to be a dog shelter and spam the database with dogs. Organisations can get an account through the site admin and add/delete dogs anytime they want. We wanted to make the app user friendly and easy to use, so the people at the rescue organisations could spend their time helping even more dogs find good forever homes.

For the non-organisation user, there is the dog search, where a person interested in adopting a dog can search and filter the database and find dogs they are interested in.


# Tech

For this project we've used the following tech:

## Figma
## React
## React Router
## Node.js/Express
## Mongoose/MongoDB
## CSS
## Vite
## Zustand
## ChatGPT

# Planning

We started with making a design sketch for the app in Figma, since we both are of the opinion that it's easier to start with a basic sketch to see what components, pages and buttons we need. We like to first see a little how it could look like before we'll figure out how it works.

After that we discussed what features the app should have, and shared responsibilities. At first we made branches in GitHub and worked on them separately, but eventually ended up only working in the main branch.

We used ChatGPT to create the "About us"-page, a .json file that contained 45 dogs and their attributes (such as name, estimated age, if it's a special adoption or not).


# Problems

We encountered a bunch of problems during this project. 
The first, and biggest problem was with connecting to the Mongo database. We spent several hours trying to figure out what was wrong, including googling, searching for answers on youtube and asking ChatGPT. We then booked a meeting with one of our teachers at Technigo, and the solution ended up being seeding the database, which we hadn't done.

We've been struggling a bit with the whole backend part - both of us unfortunately fell quite a bit behind during the backend sprint due to work and life getting in the way, and only really got into it when working on this project. It's been a tight and fast learning curve!

We found log in and authorization to be the trickiest parts. Connecting the frontend and backend didn't go through without lots of errors first, but eventually solutions were found. We sure did have some hard days when we wanted to tear our hair out, but the aha moments we reached (almost) every day kept our spirits up!

The biggest negative impact on our project was lack of time. The final project stretched over christmas and new years, which was a bit tricky for us, and we are both working alongside the studying, which of course also has had an impact on the time we've been able to spend on the project. 

But even though we've had some struggles during the project, we've had lots of fun and many laughs together! 

# Future implementations

A few things that were supposed to be in this version but unfortunately fell through because of time constraints:
- images for the dogs. We had these originally when we seeded the database, but weren't able to fix an input for the users to add images to go with the dogs yet, so they have all been taken out for now
- the "organisation" choice in the logged-in UI is a bit silly now - even though you are logged in as a specific organisation, you need to choose the right one from the select menu. Tried to make this so that the username would be picked automatically for the "organisation" field, but wasn't able to make it work for this deadline
- and regarding the previous point, there's currently no indication as to who's logged in, except for the dogs that are added through that user. So there would need to be some indication of that...

Bigger stuff:
- it would be wonderful to have little profiles for the dogs that would have extra information, images and videos
- informational profiles for the organisations for users to view
- contact forms for the user to get in touch about a specific dog with the respective organisation, maybe even a separate login for non-organisation users
- a stories page for cute stories about dogs that have found a home through Rescue Helper
- a form for organisations to apply for an account on Rescue Helper

# View it live!

Frontend: https://rescuehelper.netlify.app
Backend: https://rescue-helper.onrender.com/

Try out the log-in with these:
Username: Happy Paws
Password: happypaws123