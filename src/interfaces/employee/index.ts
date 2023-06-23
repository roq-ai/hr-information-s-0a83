import { PayrollInterface } from 'interfaces/payroll';
import { VacationRequestInterface } from 'interfaces/vacation-request';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface EmployeeInterface {
  id?: string;
  job_title: string;
  department: string;
  vacation_days_remaining: number;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  payroll?: PayrollInterface[];
  vacation_request?: VacationRequestInterface[];
  user?: UserInterface;
  _count?: {
    payroll?: number;
    vacation_request?: number;
  };
}

export interface EmployeeGetQueryInterface extends GetQueryInterface {
  id?: string;
  job_title?: string;
  department?: string;
  user_id?: string;
}
