// const fs = require("fs");
// const path = require("path");

// const dirName = require("../Utils/dir");
// const HomePath = path.join(dirName, "Data", "Homes.json");

const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  photo: {
    type: String,
    required: true,
  },
  rating: String,
});

module.exports = mongoose.model("Home", homeSchema);
// module.exports = mongoose.Model("Home", homeSchema);

//mongo database
// const { ObjectId } = require("mongodb");
// const { getDb } = require("../Utils/database");
// module.exports = class Home {
//   constructor(houseName, location, price, rating, id) {
//     ((this.houseName = houseName),
//       (this.location = location),
//       (this.price = price),
//       (this.rating = rating),
//       (this.id = id));
//   }

//   save() {
//     if (this.id) {
//       const db = getDb();
//       return db
//         .collection("homes")
//         .updateOne({ _id: new ObjectId(String(this.id)) }, { $set: this });
//     } else {
//       const db = getDb();
//       return db.collection("homes").insertOne(this);
//     }
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection("homes").find().toArray();
//   }

//   static findById(homeId) {
//     const db = getDb();
//     return db
//       .collection("homes")
//       .find({ _id: new ObjectId(String(homeId)) })
//       .next();
//   }

//   static deleteHome(homeId) {
//     const db = getDb();
//     db.collection("homes").deleteOne({ _id: new ObjectId(String(homeId)) });
//   }
// };

// module.exports = class Home {
//   constructor(houseName, location, price, rating) {
//     ((this.houseName = houseName),
//       (this.location = location),
//       (this.price = price),
//       (this.rating = rating));
//   }

//   save() {
//     Home.fetchAll((registeredHomes) => {
//       if (this.id) {
//         registeredHomes = registeredHomes.map((home) => {
//           if (home.id === Number(this.id)) {
//             return this;
//           }
//           return home;
//         });
//       } else {
//         this.id = Math.random();
//         registeredHomes.push(this);
//       }
//       fs.writeFile(HomePath, JSON.stringify(registeredHomes), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static fetchAll(callback) {
//     fs.readFile(HomePath, (err, data) => {
//       if (err) {
//         console.log(err);
//         callback([]);
//         return;
//       }
//       const parsed = JSON.parse(data);
//       callback(parsed);
//     });
//   }

//   static findById(HomeId, callback) {
//     Home.fetchAll((registeredHomes) => {
//       const home = registeredHomes.find((home) => home.id === Number(HomeId));
//       callback(home);
//     });
//   }
// };
