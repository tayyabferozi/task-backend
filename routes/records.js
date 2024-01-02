const { body, param, query } = require("express-validator");

const {
  getAllRecords,
  getSingleRecord,
  addRecord,
  updateRecord,
} = require("../controllers/records");

const checkRequestValidity = require("../utils/check-request-validity");
const checkIsValidId = require("../utils/check-is-valid-id");

const router = require("express").Router();

const recordAddOrUpdateValidation = [
  body("name").trim().notEmpty().withMessage("Please enter a name"),
  body("sectors")
    .custom((value) => {
      if (
        typeof value === "object" &&
        value &&
        Array.isArray(value) &&
        value.length
      ) {
        return true;
      } else {
        throw new Error("Invalid array");
      }
    })
    .withMessage("Please choose one ore more sectors"),
  body("sectors.*")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Invalid sector passed"),
];

router.get("/", getAllRecords);
router.get(
  "/:id",
  param("id").custom(checkIsValidId).withMessage("Invalid ID"),
  checkRequestValidity,
  getSingleRecord
);
router.post(
  "/",
  ...recordAddOrUpdateValidation,
  checkRequestValidity,
  addRecord
);
router.put(
  "/:id",
  param("id").custom(checkIsValidId).withMessage("Invalid ID"),
  ...recordAddOrUpdateValidation,
  checkRequestValidity,
  updateRecord
);

module.exports = router;
