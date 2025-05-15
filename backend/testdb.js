const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connecté !"))
  .catch(err => console.error("Erreur :", err))
  .finally(() => mongoose.disconnect());