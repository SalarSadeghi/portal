import axiosInstance, { USER_API_URL, PaginatedResponse } from "../axios/axios";

const SAFTY_FINDING_URL = `${USER_API_URL}/hse/safety-findings`;

export enum RoleIdByGroupId {
  ROLE_SAFETY_FINDINGS = "SAFETY_FINDINGS",
  ROLE_PROFESSIONAL_HEALTH = "PROFESSIONAL_HEALTH",
}

interface GetHasRoleIdByGroupId {
  hasRole: boolean;
}
export interface SafetyFindingsRequestDto {
  subject: string;
  region: string;
  unitManager: string;
  priority: string;
  finded: string;
  contractor: string;
  description: string;
  suggestionWork: string;
  correction: boolean;
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
  id: string;
  title: string;
}

interface SafetyFindingResultDto {
  id: string;
  entityNumber: string;
}

export interface Contractor {
  id: string;
  entityCode: string;
  contractorName: string;
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
    `${SAFTY_FINDING_URL}/safetyFindings`
  );
  return res.data;
};

export const getSafetyFindingUnitManagers = async ({
  page,
  size,
  search,
}: {
  page: number;
  size: number;
  search?: string;
}) => {
  const res = await axiosInstance.get<PaginatedResponse<UnitManager>>(
    `${SAFTY_FINDING_URL}/unitManagers`,
    {
      params: {
        page,
        size,
        search,
      },
    }
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

export const getSaftyFindingAllregion = async ({
  page,
  size,
  search,
}: {
  page: number;
  size: number;
  search?: string;
}) => {
  const res = await axiosInstance.get<
    PaginatedResponse<SafetyFindingsCommitteeDto>
  >(`${SAFTY_FINDING_URL}/committees`, {
    params: {
      page,
      size,
      search,
    },
  });
  return res.data;
};

export const getSafetyFindingContractors = async ({
  page,
  size,
  search,
}: {
  page: number;
  size: number;
  search?: string;
}) => {
  const res = await axiosInstance.get<PaginatedResponse<Contractor>>(
    `${SAFTY_FINDING_URL}/contractors`,
    {
      params: {
        page,
        size,
        search,
      },
    }
  );
  return res.data;
};

export const postSafetyFinding = async (data: SafetyFindingsRequestDto) => {
  const res = await axiosInstance.post<SafetyFindingResultDto>(
    `${SAFTY_FINDING_URL}`,
    data
  );
  return res.data;
};

export const postSafetyFindingRefer = async (data: FormData) => {
  const res = await axiosInstance.post(`${SAFTY_FINDING_URL}/refer`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
