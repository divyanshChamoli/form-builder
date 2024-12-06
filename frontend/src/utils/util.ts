//to match Category[] for convinience

import { QuestionType } from "../types/types";

// export const questions = [
//   { id: "1", placeholder: "Categorize" },
//   { id: "2", placeholder: "Close" },
//   { id: "3", placeholder: "Comprehension" },
// ];


export const questions: {value: QuestionType, placeholder: string}[] = [
  { value: "Categorize", placeholder: "Categorize" },
  { value: "Cloze", placeholder: "Cloze" },
  { value: "Comprehension", placeholder: "Comprehension" },
];
