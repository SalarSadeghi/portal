import { SafetyFindingsCommitteeDto } from "@/api/officeAutomation/safetyFinding";
import { produce } from "immer";
import { create } from "zustand";

interface StoreState {
  selectedRegion: SafetyFindingsCommitteeDto | null;
  changeSelectedRegion: (region: SafetyFindingsCommitteeDto) => void;
}

const store = create<StoreState>((set) => ({
  selectedRegion: null,
  changeSelectedRegion: (region: SafetyFindingsCommitteeDto) =>
    set(
      produce((draft) => {
        draft.selectedRegion = region;
      }),
      false
    ),
}));

export const safetyFindingStore = store;
