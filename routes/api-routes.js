var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function (app) {
    // SCRAPES information from FBI website
    app.get("/scrape", function (req, res) {
        axios.get("https://www.fbi.gov/wanted/kidnap")
            .then(function (response) {
                var $ = cheerio.load(response.data);
                let links = [];

                $("li.portal-type-person").each(function (i, element) {
                    let personLink = $(element).find("a").attr("href");
                    links.push(personLink);
                });

                links.forEach(function (e) {
                    axios.get(e).then(function (response) {
                        var $ = cheerio.load(response.data);
                        $("article").each(function (i, element) {
                            let name = $(element).find("h1.documentFirstHeading").text();
                            let image = $(element).find("div.wanted-person-mug").children("img").attr("src");
                            let details = $(element).find("div.wanted-person-details").children("p").text();
                            db.Person.create({
                                link: e,
                                name: name,
                                imgLink: image,
                                details: details,
                                hasNote: false,
                                saved: false
                            });
                        });
                    });
                });
            })
            .then(function (data) {
                res.end();
            })
            .catch(function (err) {
                res.json(err)
            })
    });

    // GETS all persons
    app.get("/persons", function (req, res) {
        db.Person.find({})
            .then(function (dbPerson) {
                res.json(dbPerson);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // UPDATE a person
    app.post("/person/:id", function (req, res) {
        console.log(req.body)
        db.Person.updateOne({
                _id: req.params.id
            }, {
                note: req.body.noteId,
                saved: req.body.saved
            })
            .then(function (data) {
                res.end();
            });
    });

    // Create NOTE and associate with a person
    app.post("/submitNote/person/:id", function (req, res) {
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Person.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    $set: {
                        note: dbNote._id
                    }
                }, {
                    new: true
                });
            })
            .then(function (dbPerson) {
                console.log("person: " + dbPerson)
                // res.json(dbPerson);
                res.end();
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/cleardata/", function (req, res) {
        db.Person.remove({})
            .then(function (data) {
                res.end();
            })
            .catch(function (err) {
                res.json(err);
            });
    })

};
