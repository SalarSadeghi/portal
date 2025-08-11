import * as yup from "yup";
import Texts from "../../assets/json/Texts.json";
export const HygieneFindingFormSchema = yup.object().shape({
  contractor: yup.string().required(Texts.validation.required),
  region: yup.string().required(Texts.validation.required),
  responsiblePerson: yup.string().required(Texts.validation.required),
  priority: yup
    .object()
    .shape({
      value: yup.string().required(Texts.validation.required),
      label: yup.string().required(),
    })
    .required(Texts.validation.required),
  description: yup.string().required(Texts.validation.required),
  date: yup.date().required(Texts.validation.required),
});
