import { Schema, model } from "mongoose";
import { QuizAnswerType, QuizType } from "./type";
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


const QuizSchema = new Schema({
  headerImage: {
    type:{ fileName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    } },
    required: false
  }, // Optional header image
  questions: [{
    type: {
      type: String,
      enum: ["MCQ", "Categorize", "Cloze", "Comprehension"],
      required: true,
    },
    data: {
      type: Schema.Types.Mixed, // Holds one of the question type schemas
      required: true,
    },
    // required: true,
  }], // Array of question types
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

