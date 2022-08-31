import express from "express";
import ServiceProvidersController from "../controllers/service_providers_controller";

const router = express.Router();

router.get("/", (req, res) => {
  const controller = new ServiceProvidersController();
  controller
    .getServiceProviders()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(422).send(err);
    });
});

router.get("/:serviceProviderId", (req, res) => {
  const controller = new ServiceProvidersController();
  controller
    .getServiceProvider(req.params.serviceProviderId)
    .then((response) => res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:serviceProviderId", (req, res) => {
  const controller = new ServiceProvidersController();
  controller
    .deleteServiceProvider(req.params.serviceProviderId)
    .then((response) => res.send(response))
    .catch((err) => res.status(404).send(err));
});

router.post("/create", (req, res) => {
  const controller = new ServiceProvidersController();
  controller
    .createServiceProvider(req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(422).send(err));
});

router.put("/update/:serviceProviderId", (req, res) => {
  const controller = new ServiceProvidersController();
  controller
    .updateServiceProvider(req.params.serviceProviderId, req.body)
    .then((response) => res.send(response))
    .catch((err) => res.status(422).send(err));
});

export default router;
