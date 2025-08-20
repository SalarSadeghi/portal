export const RQKeys = {
  officeAutomation: {
    saftyFinding: {
      getSafetyFindingSubjects: () => ["saftyFindingSubjects"],
      getSafetyFindingPriority: () => ["safetyFindingPriority"],
      getSafetyFindingUnitManagers: ({
        page,
        size,
        search,
      }: {
        page: string | number;
        size: string | number;
        search?: string;
      }) => ["safetyFindingUnitManagers", page, size, search],
      getSafetyFindings: () => ["SafetyFindingsData"],
      getHasRoleIdByGroupId: (role: string) => ["hasRoleByGroupId", role],
      getSaftyFindingAllregion: ({
        page,
        size,
        search,
      }: {
        page: string | number;
        size: string | number;
        search?: string;
      }) => ["saftyFindingAllregion", page, size, search],
      getSafetyFindingContractors: ({
        page,
        size,
        search,
      }: {
        page: string | number;
        size: string | number;
        search?: string;
      }) => ["safetyFindingContractors", page, size, search],
    },
    hygieneFinding: {
      getHygienePriority: () => ["hygienePriority"],
      getHygienHarmfulFactor: () => ["hygieneHarmfulFactor"],
      getHyginenUnitManagers: ({
        page,
        size,
        search,
      }: {
        page: string | number;
        size: string | number;
        search?: string;
      }) => ["hygieneUnitManagers", page, size, search],
    },
  },
};
