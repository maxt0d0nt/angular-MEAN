const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/anguklat-auth', {
useNewUrlParser: true,

})
.then(db => console.log('Database is connected'))
.catch(err => console.log(err))