'use strict';

//overall creat a new application (npm init -y)

require('dotenv').config();//install dotenv(npm i dotenv)/require .env 

const express = require ('express');//require express (npm i express)

const weatherData =require ('./data/weatherData.json');//require json file

const cors = require('cors');//require Cross-Origin Resource Sharing(npm i cors)

const server = express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Fadi_Nayef:F@d1999a@canbook.cwpa4.mongodb.net/books?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

server.use(cors());// (allow public access permission )

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Fadi_Nayef:F%40d1999a@canbook.cwpa4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/test',
 {useNewUrlParser: true, useUnifiedTopology: true});

const PORT = process.env.PORT;
const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    status: String,
});

const UserSchema = new mongoose.Schema({
    email: String,
    books: [BookSchema],
})

const myUser = mongoose.model('user', UserSchema);
const mybooks = mongoose.model('books', BookSchema);

function seedMyUsercollection() {
    const amro = new myUser({
        email: 'amroalbarham@gmail.com',
        books: [
            {
                name: 'asdf',
                description: 'asdffdas',
                img: 'https://static01.nyt.com/images/2019/12/17/books/review/17fatbooks/17fatbooks-superJumbo.jpg',
                status: 'finish reading',
            },
            {
                name: ';lafdkas;lk',
                description: 'asdffcxvxvcxvcxdas',
                img: 'https://d2r68eeixpqexd.cloudfront.net/41fd2ced63aa8d47a3142fa4cd46849b.jpg',
                status: 'finish reading',
            }
        ]

    });
    const fadi = new myUser({
        email: 'nanawmistkeh@gmail.com',
        books: [
            {
                name: 'fadi',
                description: 'love programming',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT730-A2uDXZwaHw-ABPh_67imtOifFY3Depg&usqp=CAU',
                status: 'finish reading',
            },
            {
                name: ';lafdkas;lk',
                description: 'asdffcxvxvcxvcxdas',
                img: 'https://d2r68eeixpqexd.cloudfront.net/41fd2ced63aa8d47a3142fa4cd46849b.jpg',
                status: 'finish reading',
            }
        ]

    })

    console.log(amro);
    console.log(fadi);

    amro.save();
    fadi.save();
    
    
}
seedMyUsercollection();

// http://localhost:5000/books
server.get('/books',booksHandler);
    // let bookName = request.query.bookName;




server.get('*',(request,response) => {
    response.send(`Something went wrong `)
    })
    

server.listen(PORT ,()=>{
    console.log(`Server Listinig on PORT ${PORT}`);
    })