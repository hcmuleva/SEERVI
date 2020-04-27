import {createStd,deleteStd,updateStd} from "./mutation/std"
import  {createUnit,deleteUnit,updateUnit} from "./mutation/unit"
import {createTopic,deleteTopic,updateTopic} from './mutation/topic'
import {createContent,deleteContent,updateContent} from './mutation/content'
import {createQuestion,updateQuestion,deleteQuestion} from './mutation/question'
import {createQuiz,updateQuiz,deleteQuiz} from './mutation/quiz'
import {createSubject,updateSubject,deleteSubject} from './mutation/subject'
import {createExample,deleteExample,updateExample} from "./mutation/example"
export const educationMutation={
    createStd,deleteStd,updateStd, 
    createUnit,deleteUnit,updateUnit,
    createTopic,deleteTopic,updateTopic,
    createContent,deleteContent,updateContent,
    createQuestion,updateQuestion,deleteQuestion,
    createQuiz,updateQuiz,deleteQuiz,
    createSubject,updateSubject,deleteSubject,
    createExample,deleteExample,updateExample
}