var db = require("../models");

module.exports = function (app) {

    app.get('/', (req, res) => {
        db.Person.find({})
            .populate('note')
            .then(function (data) {
                res.render('index', {
                    persons: data
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    });

};
