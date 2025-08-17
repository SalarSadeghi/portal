import {
  Contractor,
  SafetyFindingsCommitteeDto,
  UnitManager,
} from "@/api/officeAutomation/safetyFinding";
import { produce } from "immer";
import { create } from "zustand";

interface StoreState {
  selectedRegion: SafetyFindingsCommitteeDto | null;
  selectedUnitManager: UnitManager | null;
  selectedContractor: Contractor | null;
  changeSelectedRegion: (region: SafetyFindingsCommitteeDto | null) => void;
  changeSelectedUnitManager: (unitManager: UnitManager | null) => void;
  changeSelectedContractor: (contractor: Contractor | null) => void;
}

const store = create<StoreState>((set) => ({
  selectedRegion: null,
  selectedUnitManager: null,
  selectedContractor: null,

  changeSelectedRegion: (region: SafetyFindingsCommitteeDto | null) =>
    set(
      produce((draft) => {
        draft.selectedRegion = region;
      }),
      false
    ),
  changeSelectedUnitManager: (unitManager: UnitManager | null) =>
    set(
      produce((draft) => {
        draft.selectedUnitManager = unitManager;
      }),
      false
    ),
  changeSelectedContractor: (contractor: Contractor | null) =>
    set(
      produce((draft) => {
        draft.selectedContractor = contractor;
      }),
      false
    ),
}));

export const safetyFindingStore = store;
