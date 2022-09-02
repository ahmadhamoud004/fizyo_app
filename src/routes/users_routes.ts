import express from "express";
import UsersController from "../controllers/users_controller";

const router = express.Router();

router.get("/", async (req, res) => {
  const controller = new UsersController();
  controller
    .getUsers()
    .then(async (response) => {
      await res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(422).send(err);
    });
});

router.get("/:userId", (req, res) => {
  const controller = new UsersController();
  controller
    .getUser(req.params.userId)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:userId", (req, res) => {
  const controller = new UsersController();
  controller
    .deleteUser(req.params.userId)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.post("/create", async (req, res) => {
  const controller = new UsersController();
  await controller
    .createUser(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(422).send(err));
});

router.put("/update/:userId", async (req, res) => {
  const controller = new UsersController();
  await controller
    .updateUser(req.params.userId, req.body)
    .then(async (response) => await res.send(response))
    .catch((err) => res.status(422).send(err));
});

export default router;