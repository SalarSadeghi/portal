export const RQKeys = {
  officeAutomation: {
    saftyFinding: {
      getSafetyFindingSubjects: () => ["saftyFindingSubjects"],
      getSafetyFindingPriority: () => ["safetyFindingPriority"],
      getSafetyFindingUnitManagers: ({
        page,
        size,
      }: {
        page: string | number;
        size: string | number;
      }) => ["safetyFindingUnitManagers", page, size],
      getSafetyFindings: () => ["SafetyFindingsData"],
      getHasRoleIdByGroupId: (role: string) => ["hasRoleByGroupId", role],
      getSaftyFindingAllregion: ({
        page,
        size,
      }: {
        page: string | number;
        size: string | number;
      }) => ["saftyFindingAllregion", page, size],
      getSafetyFindingContractors: ({
        page,
        size,
      }: {
        page: string | number;
        size: string | number;
      }) => ["safetyFindingContractors", page, size],
    },
    hygieneFinding: {
      getHygienePriority: () => ["hygienePriority"],
      getHygienHarmfulFactor: () => ["hygieneHarmfulFactor"],
    },
  },
};
