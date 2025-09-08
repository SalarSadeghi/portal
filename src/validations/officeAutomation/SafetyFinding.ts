import * as yup from "yup";
import Texts from "@/assets/json/Texts.json";

export const SafetyFindingFormSchema = yup.object().shape({
  subject: yup
    .object()
    .shape({
      id: yup.string().required(Texts.validation.required),
      label: yup.string().required(),
    })
    .required(Texts.validation.required),
  region: yup.string().required(Texts.validation.required),
  unitManager: yup.string().required(Texts.validation.required),
  priority: yup
    .object()
    .shape({
      id: yup.string().required(Texts.validation.required),
      label: yup.string().required(),
    })
    .required(Texts.validation.required),
  finded: yup
    .object()
    .shape({
      id: yup.string().required(Texts.validation.required),
      label: yup.string().required(),
    })
    .required(Texts.validation.required),
  // contractor: yup.string().required(Texts.validation.required),
  description: yup.string().required(Texts.validation.required),
  suggestionWork: yup.string().required(Texts.validation.required),
});
