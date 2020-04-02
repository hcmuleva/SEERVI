import {getEducationRelationship} from "./query/relationshipQuery"
import {getAllStd} from "./query/std"
import {getAllUnit} from "./query/unit"
import {getAllQuestion} from "./query/question"
import {getAllQuiz,getSingleQuiz} from "./query/quiz"
import {getAllSubjects} from "./query/subject"
export const eduQuery ={
    getEducationRelationship,
    getAllStd,
    getAllUnit,
    getAllQuestion,
    getAllQuiz,getSingleQuiz,
    getAllSubjects
}