import { HygineUnitManagerDTO } from "@/api/officeAutomation/hygienFinding";
import {
  Contractor,
  SafetyFindingsCommitteeDto,
} from "@/api/officeAutomation/safetyFinding";
import { produce } from "immer";
import { create } from "zustand";

interface StoreState {
  selectedRegion: SafetyFindingsCommitteeDto | null;
  selectedUnitManager: HygineUnitManagerDTO | null;
  selectedContractor: Contractor | null;
  changeSelectedRegion: (region: SafetyFindingsCommitteeDto | null) => void;
  changeSelectedUnitManager: (unitManager: HygineUnitManagerDTO | null) => void;
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
  changeSelectedUnitManager: (unitManager: HygineUnitManagerDTO | null) =>
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

export const hygienFindingStore = store;
