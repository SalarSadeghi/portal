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
  changeSelectedRegion: (region: SafetyFindingsCommitteeDto) => void;
  changeSelectedUnitManager: (unitManager: UnitManager) => void;
  changeSelectedContractor: (contractor: Contractor) => void;
}

const store = create<StoreState>((set) => ({
  selectedRegion: null,
  selectedUnitManager: null,
  selectedContractor: null,

  changeSelectedRegion: (region: SafetyFindingsCommitteeDto) =>
    set(
      produce((draft) => {
        draft.selectedRegion = region;
      }),
      false
    ),
  changeSelectedUnitManager: (unitManager: UnitManager) =>
    set(
      produce((draft) => {
        draft.selectedUnitManager = unitManager;
      }),
      false
    ),
  changeSelectedContractor: (contractor: Contractor) =>
    set(
      produce((draft) => {
        draft.selectedContractor = contractor;
      }),
      false
    ),
}));

export const hygienFindingStore = store;
