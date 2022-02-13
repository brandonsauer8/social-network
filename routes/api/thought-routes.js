const router = require("express").Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require("../../controllers/thought-controller");

//set up thoughts api routes
router.route("/").get(getAllThoughts).post(createThought);

// set up get, put, and delete route by id.
router
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;