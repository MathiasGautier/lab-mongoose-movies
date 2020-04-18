require("dotenv").config();
const mongoose = require("mongoose");
// const Celebrity = require("../models/celebrity");
const Movie = require("../models/movie");

// const celebrities = [

//     {
//         name: "Rick",
//         occupation: "mad scientist",
//         catchPhrase: "wubba lubba dub dub",
//     },
//     {
//         name: "Morty",
//         occupation: "unknown",
//         catchPhrase: "Oh geeze !"
//     },
//     {
//         name: "Jerry",
//         occupation: "comedian",
//         catchPhrase: "you speak the true true",
//     },
// ];

// mongoose
//     .connect(process.env.MONGODB_URI)
//     .then((self) => {
//         console.log(`Connected to ${self.connection.name}`);

//         // Seeds
//         Celebrity.create(celebrities)
//             .then((celebrities) => {
//                 celebrities.forEach((celebrity) => {
//                     console.log(celebrity.name);
//                 });
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     })
//     .catch((err) => {
//         console.log(`Error occured while connecting to the Database ${err}`);
//     });

const movies = [

    {
        title: "Die Hard",
        genre: "action",
        plot: "a guy saves people from som terrorists",
    },
    {
        title: "Two guys",
        genre: "comedy",
        plot: "It's just two guys !"
    },
    {
        title: "Sad movie project",
        genre: "drama",
        plot: "something bad is about to happen",
    },
];

mongoose
    .connect(process.env.MONGODB_URI)
    .then((self) => {
        console.log(`Connected to ${self.connection.name}`);

        // Seeds
        Movie.create(movies)
            .then((movies) => {
                movies.forEach((movie) => {
                    console.log(movie.title);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch((err) => {
        console.log(`Error occured while connecting to the Database ${err}`);
    });