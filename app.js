const express = require('express');
const app = express();
// const bodyParser= require('body-parser')
app.use(express.json());
require('./connect');
const mongoose = require('mongoose');
const User = require('./userSchema');

app.listen(8000, () => {
    console.log('Listening on Port 8000');
});

app.post("/register", async (req, res) => {
    // console.log(req.body);
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: "User Created" });

});
app.get('/users', pagination(User), (req, res) => {
    res.json(res.pagination)

})

function pagination(middle) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const searchvalue = String(req.query.searchValue);
        const selkey = req.query.selectionKey;
        const searchkey = req.query.searchKey;

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}
        // // if (endIndex < await middle.countDocuments().exec()) {
        // //     results.next = {
        // //         page: page + 1,
        // //         limit: limit
        // //     }
        // // }

        // // if (startIndex > 0) {
        // //     results.previous = {
        // //         page: page - 1,
        // //         limit: limit
        // //     }
        // // }

        try {
            results.results = await middle.find({ [searchkey]: { $regex: searchvalue } }, { [selkey]: 1 })
                .limit(limit).skip(startIndex).exec()
            res.pagination = results
            next()
        } catch (err) {
            res.status(500).json({ message: err.message })
        }

    };

}