const express = require("express");
const router = express.Router();

const feedbacksController = require("../controllers/feedbacksController")

     /* Gets all feedbacks */
     router.get("/", feedbacksController.getAllFeedbacks)

     /* Gets all user feedbacks */
     router.get("/:user", feedbacksController.getAllUserFeedbacks)
     
     /* Delete feedback */
     router.delete("/:id", feedbacksController.deleteFeedbackById)
     
     /* Create new feedback */
     router.post("/", feedbacksController.createNewFeedback)

     /* Patch (update) feedback*/
     router.patch("/:id", feedbacksController.updatFeedbackById)
  
module.exports = router