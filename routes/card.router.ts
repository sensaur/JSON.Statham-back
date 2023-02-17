const { Router } = require("express");
import { getAllCards , editCard, createCard, getCard, deleteCard } from "../controllers/card.controller";

const cardsRouter = Router();

cardsRouter.get("/", getAllCards);
cardsRouter.post("/", createCard);
cardsRouter.route("/:id").patch(editCard)
cardsRouter.route("/:id").get(getCard)
cardsRouter.route("/:id").delete(deleteCard)

module.exports = cardsRouter;

