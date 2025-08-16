import axiosInstance, { USER_API_URL } from "../axios/axios";

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
