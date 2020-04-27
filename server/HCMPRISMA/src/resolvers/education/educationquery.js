import { getAllStd } from "./query/std";
import { getAllUnit, getUnitById } from "./query/unit";
import { getAllTopic, getTopicById } from "./query/topic";
import { getAllQuestion } from "./query/question";
import { getAllQuiz, getSingleQuiz } from "./query/quiz";
import {
  getAllSubjects,
  getSubjectById,
  getSubjectByStd,
  getSubgroupSubjects,
} from "./query/subject";
import { getAllExamples } from "./query/example";
export const eduQuery = {
  getAllStd,
  getAllUnit,
  getAllQuestion,
  getAllQuiz,
  getSingleQuiz,
  getAllSubjects,
  getSubjectById,
  getSubjectByStd,
  getSubgroupSubjects,
  getAllExamples,
  getUnitById,
  getAllTopic,
  getTopicById,
};
