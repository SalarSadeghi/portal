import axiosInstance, { USER_API_URL } from "../axios/axios";

const SAFTY_FINDING_URL = `${USER_API_URL}/hse/safety-findings`;

export interface PriorityOption {
  entityCode: number; // ID
  name: string; // Display name
}

export interface SubjectOption {
  entityCode: number;
  name: string;
}

export interface SaftyFindings {
  entityCode: number;
  name: string;
}

export interface UnitManager {
  id: number;
  title: string;
}

export const getSafetyFindingSubjects = async () => {
  const res = await axiosInstance.get<SubjectOption[]>(
    `${SAFTY_FINDING_URL}/subjects`
  );
  return res.data;
};

export const getSafetyFindingPriority = async () => {
  const res = await axiosInstance.get<PriorityOption[]>(
    `${SAFTY_FINDING_URL}/priorityTypes`
  );
  return res.data;
};

export const getSafetyFindings = async () => {
  const res = await axiosInstance.get<SaftyFindings[]>(
    `${SAFTY_FINDING_URL}/saftyFindings`
  );
  return res.data;
};

export const getSafetyFindingUnitManagers = async () => {
  const res = await axiosInstance.get<UnitManager[]>(
    `${SAFTY_FINDING_URL}/unitManagers`
  );
  return res.data;
};
