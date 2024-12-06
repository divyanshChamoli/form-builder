require("dotenv").config();
import express, { Request, Response } from "express";
import multer from "multer";
import { storage } from "./cloudinary";
import { Quiz, QuizAnswer } from "./db";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors())
const upload = multer({ storage });
const PORT = process.env.PORT || 3000

app.post(
  "/quiz",
  upload.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "questionImages", maxCount: 20 }, // Adjust maxCount as needed
  ]),
  async (req: Request, res: Response) => {
    try {
      // Type the files correctly
      const files = req.files as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;

      // Extract the header image if it exists
      const headerImage = files?.["headerImage"]?.[0]
        ? {
            fileName: files["headerImage"][0].filename,
            url: files["headerImage"][0].path,
          }
        : undefined; // Make headerImage optional

      // Parse questions from the request body
      const questions = req.body.questions
        ? req.body.questions.map((question: any, index: number) => {
            // Extract question image if it exists for this index
            const questionImage = files?.["questionImages"]?.[index];
            return {
              ...question,
              data: {
                ...question.data,
                image: questionImage
                  ? {
                      fileName: questionImage.filename,
                      url: questionImage.path,
                    }
                  : undefined, // Make question image optional
              },
            };
          })
        : []; // Default to an empty array if no questions provided

      // Create and save the new quiz
      const newQuiz = new Quiz({
        headerImage,
        questions,
      });

      await newQuiz.save();

      res.status(201).json({ message: "Quiz created successfully", newQuiz });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create quiz" });
    }
  }
);

app.get("/quizzes", async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

app.get("/quiz/:quizId", async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
        throw new Error("Quiz not found")
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
});

app.put(
  "/quiz/:quizId",
  upload.fields([
    { name: "headerImage", maxCount: 1 },
    { name: "questionImages", maxCount: 20 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const { quizId } = req.params;

      // Type-check the files object
      const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

      // Handle header image, set to undefined if not provided
      const headerImage = files?.["headerImage"]?.[0]
        ? {
            fileName: files["headerImage"][0].filename,
            url: files["headerImage"][0].path,
          }
        : undefined;

      // Parse questions from the request body
      const questions = req.body.questions
        ? req.body.questions.map((question: any, index: number) => {
            // Handle question images, set to undefined if not provided
            const questionImage = files?.["questionImages"]?.[index];
            return {
              ...question,
              data: {
                ...question.data,
                image: questionImage
                  ? {
                      fileName: questionImage.filename,
                      url: questionImage.path,
                    }
                  : undefined, // Optional field
              },
            };
          })
        : []; // Default to empty array if questions are not provided

      // Update the quiz in the database
      const updatedQuiz = await Quiz.findByIdAndUpdate(
        quizId,
        {
          title: req.body.title,
          headerImage,
          questions,
        },
        { new: true } // Return the updated document
      );

      if (!updatedQuiz) {
        throw new Error("Quiz not found")
        // return res.status(404).json({ error: "Quiz not found" });
      }

      res.status(200).json({ message: "Quiz updated successfully", updatedQuiz });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update quiz" });
    }
  }
);


  app.post("/answers", async (req: Request, res: Response) => {
  try {
    const { quizId, answers, submittedBy } = req.body;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
        throw new Error("Quiz not found")
    }

    const newAnswer = new QuizAnswer({
      quizId,
      submittedBy: submittedBy || "anonymous",
      answers,
    });

    await newAnswer.save();

    res.status(201).json({ message: "Answers submitted successfully", newAnswer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit answers" });
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "Working",
  });
});

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});
