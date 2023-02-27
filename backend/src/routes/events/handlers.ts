import { RequestHandler } from "express";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { addDoc } from "firebase/firestore/lite";
import { database } from "../../firebase";
import { Event } from "./types";

export const getAllEvents: RequestHandler = async (req, res) => {
  const eventsCol = collection(database, "events");
  const eventSnapshot = await getDocs(eventsCol);
  const eventsList = eventSnapshot.docs.map((doc) => doc.data());
  res.json(eventsList);
};

export const getEventById: RequestHandler<{ itemId: string }> = async (
  req,
  res
) => {
  getDoc(doc(database, `events/${req.params.itemId}`))
    .then((snapshot) => {
      snapshot.exists() ? res.json(snapshot.data()) : res.sendStatus(404);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

export const createEvent: RequestHandler<{}, {}, Event> = async (req, res) => {
  const citiesCol = collection(database, "events");
  addDoc(citiesCol, req.body).then((doc) => {
    res.status(201).send(doc.id);
  });
};
