const mongoose = require('mongoose');

const DataBase = 'mongodb+srv://aditya1810:NLsf6gkWaqjQ5T0e@cluster0.wgqpi.mongodb.net/userdata?retryWrites=true&w=majority'

mongoose.connect(DataBase, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("connection successful")
}).catch((err) => console.log("no connection"));