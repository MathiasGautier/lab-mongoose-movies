const express = require("express");
const router = new express.Router();
const Celebrity = require("../models/celebrity");

router.get("/celebrities", (req, res) => {
    Celebrity.find({})
        .then((dbResult) => {
            res.render("celebrities/index.hbs", {
                celebrities: dbResult,
            });
        })
        .catch((err) => {
            res.render('error.hbs', {
                message: err.message,
            });
        });
});

router.get("/celebrities/new", (req, res) => {
    res.render("celebrities/new.hbs")
});

router.post("/celebrities", (req, res) => {
    Celebrity.create(req.body)
        .then((dbResult) => {
            res.redirect("/celebrities");
        })
        .catch((err) => {
            res.render("error.hbs", {
                message: err.message,
            })
        });
});


router.get("/celebrities/:id", (req, res,next) => {

    Celebrity.findById(req.params.id)
        .then((dbResult) => {
            res.render("celebrities/show.hbs", {
                celebrity: dbResult,
            });
        })
        .catch((err) => {
            next(err)
        });
});




router.post("/celebrities/:id/delete", (req, res) => {
    Celebrity.findByIdAndDelete(req.params.id)
        .then((dbResult) => {
            res.redirect("/celebrities");
        })
        .catch((err) => {
            res.render("error.hbs", {
                message: err.message,
            });
        });
});


router.get("/celebrities/:id/edit", (req, res) => {
    Celebrity.findById(req.params.id)
        .then((dbResult) => {
            res.render("celebrities/edit.hbs", {
                celebrity: dbResult,
                error: "",
            });
        })
        .catch((dbErr => {
            res.render("error.hbs", {
                message: err.message,
            });
        }));
});


router.post("/celebrities/:id/edit", (req, res) => {
    if (req.body.name === "" || req.body.catchPhrase === "") {
        Celebrity.findById(req.params.id)
            .then((dbReslut) => {
                res.render("celebrities/edit.hbs", {
                    celebrity: dbResult,
                    error: "Please enter all the fields",
                });
            })
            .catch((dbErr) => {
                res.render("error.hbs", {
                    message: err.message,
                });
            });
    } else {
        Celebrity.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            })
            .then((dbResult) => {
                res.redirect("/celebrities");
            })
            .catch((dbErr) => {
                res.render("error.hbs", {
                    message: err.message,
                });
            });
    }
});


module.exports = router;