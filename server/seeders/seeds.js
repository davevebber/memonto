// const faker = require('faker');

// const db = require('../config/connection');
// const { Notebook, User } = require('../models');

// db.once('open', async () => {
//     // await Notebook.deleteMany({});
//     // await User.deleteMany({});

//     const userData = [];

//     for (let i = 0; i < 50; i += 1) {
//         // const username = faker.internet.userName();
//         const email = faker.internet.email();
//         const password = faker.internet.password();

//         userData.push({ email, password });
//     }

//     await User.collection.insertMany(userData);
//     console.log('seed complete')
//     process.exit(0)
// })