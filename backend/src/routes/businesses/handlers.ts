import { RequestHandler } from "express";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { addDoc } from "firebase/firestore/lite";
import { database } from "../../firebase";
import { BusinessDraft } from "./types";

export const getAllBusinesses: RequestHandler = async (req, res) => {
  const citiesCol = collection(database, "business");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  res.json(cityList);
};

export const getBusinessById: RequestHandler<{ itemId: string }> = async (
  req,
  res
) => {
  getDoc(doc(database, `business/${req.params.itemId}`))
    .then((snapshot) => {
      snapshot.exists() ? res.json(snapshot.data()) : res.sendStatus(404);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

export const createBusiness: RequestHandler<{}, {}, BusinessDraft> = async (
  req,
  res
) => {
  const citiesCol = collection(database, "business");
  addDoc(citiesCol, req.body).then((doc) => {
    res.status(201).send(doc.id);
  });
};
