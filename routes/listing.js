const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middelware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  // INDEX ROUTES
  .get(wrapAsync(listingController.index))

  // CREATE ROUTES
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// NEW ROUTES
router.get("/new", isLoggedIn, listingController.renderNewform);

router
  .route("/:id")
  // SHOW ROUTES
  .get(wrapAsync(listingController.showListing))

  // UPDATE ROUTES
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updatlisting)
  )

  // DELET ROUTES
  .delete(isLoggedIn, wrapAsync(listingController.destroylisting));

// EDIT ROUTES
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
