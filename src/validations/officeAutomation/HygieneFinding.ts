import * as yup from "yup";
import Texts from "../../assets/json/Texts.json";
export const HygieneFindingFormSchema = yup.object().shape({
  region: yup.string().required(Texts.validation.required),
  unitManager: yup.string().required(Texts.validation.required),
  priority: yup
    .object()
    .shape({
      id: yup.string().required(Texts.validation.required),
      label: yup.string().required(),
    })
    .required(Texts.validation.required),
  harmfulFactor: yup
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
