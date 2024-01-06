"use strict";

const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore/lite");
const { getStorage } = require("firebase/storage");

const config = require("../config");
const app = initializeApp(config.firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

module.exports = { db, storage };
