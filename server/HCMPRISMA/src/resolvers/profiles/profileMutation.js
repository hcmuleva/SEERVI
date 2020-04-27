import { createSubjectSubscription,createSubscriptionBulkSubjects,deleteSubjectSubscription } from "./mutation/subjectsubscriptiion";
import {
  createProfile,
  createEducationProfile,
  createPersonalProfile,
  createAddress
} from "./mutation/educationProfile";
export const subjectSubs = {
  createSubjectSubscription,
  createProfile,
  createEducationProfile,
  createPersonalProfile,
  createAddress,createSubscriptionBulkSubjects,
  deleteSubjectSubscription
};
