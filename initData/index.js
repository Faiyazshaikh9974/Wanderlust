const mongoose = require('mongoose');

const Listing = require('../models/listing.js');
const initData = require('../initData/data.js');


async function main() {
    let Mongo_url = "mongodb://127.0.0.1:27017/wanderlust"
    await mongoose.connect(Mongo_url);
}

main().then(() =>{
    console.log("connected With Mongoose");
});


async function insertData() {
    await Listing.deleteMany({}); // Clear existing data

    // Assuming initData.data is an array of objects
    initData.data = initData.data.map(newData => ({
        ...newData,  // Spread existing properties
        owner: '67b47116657d6e39683eb21e' // Add owner key
    }));

    await Listing.insertMany(initData.data); // Insert modified data
    console.log("Data inserted successfully");
}
  

insertData();