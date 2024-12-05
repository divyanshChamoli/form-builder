import { Schema, model } from "mongoose";
import { QuizAnswerType, QuizType } from "../types/type";
const mongoose = import("mongoose");

export const connectToDB = async () => {
  const MONGODB_CONNECTION_STRING = process.env
    .MONGODB_CONNECTION_STRING as string;
  try {
    (await mongoose).connect(MONGODB_CONNECTION_STRING);
    console.log("DB connected");
  } catch (err) {
    console.log("DB not connected", err);
  }
};

connectToDB();

// const QuizSchema = new Schema<QuizType>({
//   title: String, // Title of the quiz
//   questions: [
//     {
//       type: String, // Type of question (e.g., "Categorize", "Cloze", "Comprehension", "MCQ")
//       data: Object, // Content structure depends on the question type
//     },
//   ],
//   createdBy: String, // Optional - identifier for the user if not anonymous
// });

const QuizSchema = new Schema({
  headerImage: {
    fileName: {
      type: String,
    //   required: true,
    },
    url: {
      type: String,
    //   required: true,
    },
  }, // Optional header image
  questions: {
    type: {
      type: {
        type: String,
        enum: ["MCQ", "Categorize", "Cloze", "Comprehension"],
        required: true,
      },
      data: {
        type: Schema.Types.Mixed, // Holds one of the question type schemas
        required: true,
      },
    },
    required: true,
  }, // Array of question types
  submittedBy: { type: String, default: "anonymous" },
});

// Quiz Answer Schema
const QuizAnswerSchema = new Schema({
  quizId: { type: String, required: true },
  userId: { type: String, default: "anonymous" },
  answers: {
    type: [Schema.Types.Mixed], // Mixed schema to hold multiple answer types
    required: true,
  },
});

export const QuizAnswer = model<QuizAnswerType>("QuizAnswer", QuizAnswerSchema);
export const Quiz = model<QuizType>("Quiz", QuizSchema);
