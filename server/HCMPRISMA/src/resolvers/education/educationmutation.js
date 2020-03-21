import {createStd,deleteStd,updateStd} from "./mutation/std"
import  {createUnit,deleteUnit,updateUnit} from "./mutation/unit"
import {createTopic,deleteTopic,updateTopic} from './mutation/topic'
import {createContent,deleteContent,updateContent} from './mutation/content'
import {createEducationRelationship,deleteEducationRelationship} from "./mutation/relationships"
export const educationMutation={
    createStd,deleteStd,updateStd, 
    createUnit,deleteUnit,updateUnit,
    createTopic,deleteTopic,updateTopic,
    createContent,deleteContent,updateContent,
    createEducationRelationship,deleteEducationRelationship
}