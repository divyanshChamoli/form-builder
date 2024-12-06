
export interface CategoryType {
  id: string;
  name: string;
  value: QuestionType; // Add this property
  placeholder: string; // Add this property
}



export interface ItemType{
    id: string,
    placeholder: string
}

export interface UnderlinedOptionType {
    id: string,
    placeholder: string,
    checked: boolean,
    deletable: boolean
}

export type QuestionType = "Comprehension" | "Categorize" | "Cloze"

export interface Image {
    fileName: string; // Name of the uploaded file
    url: string; // URL for accessing the image on Cloudinary
  }
  
  export interface CategorizeQuestion {
    type: "Categorize";
    data: {
      questionText: string,
      categories: string[]; // List of category titles
      items: {
        text: string; // Option text
        category: string; // Associated category
      }[];
      image?: Image; // Optional image for the question
    };
  }
  
  export interface ClozeQuestion {
    type: "Cloze";
    data: {
      sentence: string; // Full sentence or paragraph with blanks
      options: string[]; // List of draggable options
      correctAnswers: string[]; // Correct answers in the order of blanks
      image?: Image; // Optional image for the question
    };
  }
  
  export interface MCQQuestion {
    type: "MCQ";
    questionText: string; // Question text
    options: string[]; // List of possible answers
    correctAnswer: string; // Correct answer explicitly stored
    image?: Image; // Optional image for the question
  }
  
  export interface ComprehensionQuestion {
    type: "Comprehension";
    data: {
      passage: string; // Reference text or passage
      subQuestions: MCQQuestion[]; // Array of associated MCQ questions with answers
      image?: Image; // Optional image for the question
    };
  }
  
  export interface QuizType {
    _id: string; // MongoDB ObjectId as a string
    title: string; // Title of the quiz
    headerImage?: Image; // Optional header image at the top of the form
    questions: any[]; // Array of different question types
    createdAt: Date; // Timestamp for when the quiz was created
    createdBy: string; // Identifier for the creator, e.g., "anonymous" or user ID
  }