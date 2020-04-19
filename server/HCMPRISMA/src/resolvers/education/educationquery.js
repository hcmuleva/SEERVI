import {getAllStd} from "./query/std"
import {getAllUnit} from "./query/unit"
import {getAllQuestion} from "./query/question"
import {getAllQuiz,getSingleQuiz} from "./query/quiz"
import {getAllSubjects,getSubjectById,getSubjectByStd,getSubgroupSubjects} from "./query/subject"
export const eduQuery ={
    getAllStd,
    getAllUnit,
    getAllQuestion,
    getAllQuiz,getSingleQuiz,
    getAllSubjects,getSubjectById,getSubjectByStd,getSubgroupSubjects
}