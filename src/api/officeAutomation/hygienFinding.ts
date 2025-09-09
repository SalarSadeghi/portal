import axiosInstance, { PaginatedResponse, USER_API_URL } from "../axios/axios";

const HYGIENE_FINDING_URL = `${USER_API_URL}/hse/professionalHealth`;
interface PriorityOption {
  entityCode: number; // ID
  name: string; // Display name
  id: string;
}

interface HarmfulFactorDTO {
  entityCode: number; // ID
  name: string; // Display name
  id: string;
}

export interface HygineUnitManagerDTO {
  id: string;
  roleId: number;
  firstName: string;
  lastName: string;
  roleName: string;
}

 interface HygieneResultDto {
  id: string;
  entityNumber: string;
}
export interface HygieneRequetstDto {
  regionId: string;
  unitManagerId: string;
  priorityId: string;
  harmfulFactorId: string;
  contractorId: string;
  description: string;
  suggestionWork: string;
  correction: boolean;
}

export const getHygienePriority = async () => {
  const res = await axiosInstance.get<PriorityOption[]>(
    `${HYGIENE_FINDING_URL}/priorityTypes`
  );
  return res.data;
};

export const getHygienHarmfulFactor = async () => {
  const res = await axiosInstance.get<HarmfulFactorDTO[]>(
    `${HYGIENE_FINDING_URL}/harmfulFactors`
  );
  return res.data;
};

export const getHyginenUnitManagers = async ({
  page,
  size,
  search,
}: {
  page: number;
  size: number;
  search?: string;
}) => {
  const res = await axiosInstance.get<PaginatedResponse<HygineUnitManagerDTO>>(
    `${HYGIENE_FINDING_URL}/unitManagers`,
    {
      params: {
        search,
        page,
        size,
      },
    }
  );
  return res.data;
};

export const postHygiene = async (data: HygieneRequetstDto) => {
  const res = await axiosInstance.post<HygieneResultDto>(
    `${HYGIENE_FINDING_URL}`,
    data
  );
  return res.data;
};

export const postHygieneRefer = async (id: string) => {
  const res = await axiosInstance.post(`${HYGIENE_FINDING_URL}/refer`, {id});
  return res.data;
};
