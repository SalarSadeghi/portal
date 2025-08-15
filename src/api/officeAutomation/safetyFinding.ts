import axiosInstance, { USER_API_URL, PaginatedResponse } from "../axios/axios";

const SAFTY_FINDING_URL = `${USER_API_URL}/hse/safety-findings`;

export enum RoleIdByGroupId {
  ROLE_SAFETY_FINDINGS = "ROLE_SAFETY_FINDINGS",
  ROLE_PROFESSIONAL_HEALTH = "ROLE_PROFESSIONAL_HEALTH",
}

interface GetHasRoleIdByGroupId {
  hasRole: boolean;
}

export interface SafetyFindingsCommitteeDto {
  id: string;
  committeeCode: string;
  committeeName: string;
  unitName?: string;
}

export interface PriorityOption {
  entityCode: number; // ID
  name: string; // Display name
  id: string;
}

export interface SubjectOption {
  entityCode: number;
  name: string;
  id: string;
}

export interface SaftyFindings {
  entityCode: number;
  name: string;
  id: string;
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
  const res = await axiosInstance.get<PaginatedResponse<UnitManager>>(
    `${SAFTY_FINDING_URL}/unitManagers`
  );
  return res.data;
};

export const getHasRoleIdByGroupId = async (role: RoleIdByGroupId) => {
  const res = await axiosInstance.get<GetHasRoleIdByGroupId>(
    `${SAFTY_FINDING_URL}/hasRole`,
    {
      params: {
        hasRole: role,
      },
    }
  );
  return res.data;
};

export const getSaftyFindingAllregion = async () => {
  const res = await axiosInstance.get<
    PaginatedResponse<SafetyFindingsCommitteeDto>
  >(`${SAFTY_FINDING_URL}/committees`);
  return res.data;
};
