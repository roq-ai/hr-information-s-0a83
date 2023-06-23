import * as yup from 'yup';

export const employeeValidationSchema = yup.object().shape({
  job_title: yup.string().required(),
  department: yup.string().required(),
  vacation_days_remaining: yup.number().integer().required(),
  user_id: yup.string().nullable(),
});
