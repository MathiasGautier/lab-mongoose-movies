const express = require("express");
const router = new express.Router();
const Movie = require("../models/movie");


router.get("/movies", (req, res) => {
    Movie.find({})
        .then((dbResult) => {
            res.render("movies/index.hbs", {

                movies: dbResult,
            });
        })
        .catch((err) => {
            console.log(err)
            res.render('error.hbs', {
                message : err,
            });
        });
});

router.get("/movies/new", (req, res)=> {
    res.render("movies/new.hbs")
});


router.post("/movies", (req, res) => {
    Movie.create(req.body)
    .then((dbResult) => {
      res.redirect("/movies");
    })
    .catch((err) => {
        res.render("error.hbs", {
            message: err.message,
        })
    });
});


router.get("/movies/:id", (req, res)=> {
    Movie.findById(req.params.id)
    .then((dbResult)=> {
        res.render("movies/show.hbs", {
            movie:dbResult,
        });
    })
    .catch((err)=> {
        res.render("error.hbs", {
            message: err.message,
        });
    });
});




router.post("/movies/:id/delete", (req, res)=> {
    Movie.findByIdAndDelete(req.params.id)
    .then((dbResult) =>{
        res.redirect("/movies");
    })
    .catch((err)=> {
        res.render("error.hbs", {
            message: err.message,
        });
    });
});


router.get("/movies/:id/edit", (req, res)=> {
    Movie.findById(req.params.id)
    .then((dbResult)=> {
        res.render("movies/edit.hbs", {
            movie: dbResult,
            error:"",
        });
    })
    .catch((dbErr=> {
        res.render("error.hbs", {
            message: err.message,
        });
    }));
});

router.post("/movies/:id/edit", (req, res) => {
    if (req.body.title === "" || req.body.plot ==="")
    {
        Movie.findById(req.params.id)
        .then((dbReslut)=> {
            res.render("movies/edit.hbs", {
                movie: dbResult,
                error: "Please enter all the fields",
            });
        })
        .catch((dbErr)=> {
            res.render("error.hbs", {
                message: err.message,
            });
        });
    } else {
        Movie.findByIdAndUpdate(req.params.id, req.body, {new :true})
        .then((dbResult)=> {
            res.redirect("/movies");
        })
        .catch((dbErr)=> {
            res.render("error.hbs", {
                message: err.message,
            });
        });
    }
});

module.exports = router;