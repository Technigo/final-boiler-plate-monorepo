# Instructions
If you followed the last project, you were tasked with using a set of data (either one you made yourself, one we provided, or one you generated with [ChatGPT](https://chat.openai.com/) or downloaded from a site such as [Kaggle](https://www.kaggle.com/datasets)).

This project follows on from that, but this time you should model your database using Mongoose models, and persist your data in the database.

As before, it's up to you to decide what sort of data you'd like to store in your database and return from your API endpoints. In the repository, we've included some datasets you can use if you'd like:

- Golden globes nominations 2010-2019
- 500 book reviews
- Avocado sales and average prices from a selection of US states
- 1375 Netflix titles and some data about them
- 50 popular Spotify tracks and some data about the music type

If you'd like to build your own data set - feel free! You could write it yourself, or use AI to help you greate some mock data to use. [ChatGPT](https://chat.openai.com/) can help with this, just be specific and give it an example.

In order to get all this data into your database, you'll need to write some code to generate the data - see the '**Making seed data**' section further down for tips on how to do this.

Once you have the data stored, you will need to write appropriate RESTful endpoints to return the data and make use of [Mongoose Queries](https://mongoosejs.com/docs/queries.html) to find and return the correct data given the route and any filter params passed.

## Making seed data 🧞‍♂️

[Seeding a database](https://en.wikipedia.org/wiki/Database_seeding) is a process in which an initial set of data is provided to a database when it is being installed or set up. In the videos for this week, we showed a way to generate a small amount of data, but in this project, some of the JSON files have thousands of rows, so we don't want to have it all in our server file.

Instead, we can load the JSON and iterate over it to generate a lot of entries in our database. Let's say we had a file called `people.json`, and a `Person` model and the person model has exactly the same property names as the objects in the JSON file. Then we could write something like this in our server file to seed the database from the JSON:

```jsx
import data from './people.json'

const Person = mongoose.model('Person', {
  // Properties defined here match the keys from the people.json file
})

if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    await People.deleteMany({})

    data.forEach((personData) => {
      new Person(personData).save()
    })
  }

  seedDatabase()
}
```

This whole process can be a little tricky and relies on your models having the same keys. Give it a try and if you run into issues, don't hesitate to ask your team, ask in Slack, or post your code on Stack Overflow to get some help!

## Requirements:
- Your API should have at least 3 routes. Try to push yourself to do more, though!
  - The endpoint "/" should return documentation of your API using e.g. [Express List Endpoints](https://www.npmjs.com/package/express-list-endpoints)
  - A minimum of one endpoint to return a **collection** of results (array of elements).
  - A minimum of one endpoint to return a **single** result (single element).
- Your API should use Mongoose models to model your data and use these models to fetch data from the database.
- Your API should be [RESTful](https://www.notion.so/23473abe980e40aaa932914751055d22?pvs=21).


## Stretch goals
So you’ve completed the requirements? Great job! Make sure you've committed and pushed a version of your project before starting on the stretch goals. Remember that the stretch goals are optional.

### Intermediate Stretch Goals
_The intermediate stretch goals from the previous project can be applied here as well._
- If you are doing any sort of manipulation after retrieving the data from the database. Try using mongoose to do these operations instead.
- Accept filters via query parameters to filter (via mongoose) the data you return from endpoints which return an array of data.

### Advanced Stretch Goals
_The advanced stretch goals from the previous project can be applied here as well._
- Try implementing 'pages' using [.skip()](https://mongoosejs.com/docs/api.html#query_Query-skip) and [.limit()](https://mongoosejs.com/docs/api.html#query_Query-limit) (instead of `.slice()`) to return only a selection of results from the array. You could then use a query parameter to allow the client to ask for the next 'page'.
- Try to create an endpoint that uses [mongoose's aggregate function](https://mongoosejs.com/docs/api/aggregate.html#aggregate_Aggregate) which allows you to use the [MongoDB aggregate pipeline](https://docs.mongodb.com/manual/core/aggregation-pipeline/). This is super-useful when doing more complex operations on database data, and a lot faster!
