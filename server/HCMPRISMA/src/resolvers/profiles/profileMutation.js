import { createSubjectSubscription } from "./mutation/subjectsubscriptiion";
import {
  createProfile,
  createEducationProfile,
  createPersonalProfile,
  createAddress,
  assignProfileToRoles
} from "./mutation/educationProfile";
export const subjectSubs = {
  createSubjectSubscription,
  createProfile,
  createEducationProfile,
  createPersonalProfile,
  createAddress,
  assignProfileToRoles
};
