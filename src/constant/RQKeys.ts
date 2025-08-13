export const RQKeys = {
  officeAutomation: {
    saftyFinding: {
      getSafetyFindingSubjects: () => ["saftyFindingSubjects"],
      getSafetyFindingPriority: () => ["safetyFindingPriority"],
      getSafetyFindingUnitManagers: () => ["safetyFindingUnitManagers"],
      getSafetyFindings: () => ["SafetyFindingsData"],
      getHasRoleIdByGroupId: (role: string) => ["hasRoleByGroupId", role],
      getSaftyFindingAllregion: () => ["saftyFindingAllregion"],
    },
  },
};
