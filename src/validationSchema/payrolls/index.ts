import * as yup from 'yup';

export const payrollValidationSchema = yup.object().shape({
  salary: yup.number().integer().required(),
  payment_frequency: yup.string().required(),
  employee_id: yup.string().nullable(),
});
