import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createEmployee } from 'apiSdk/employees';
import { Error } from 'components/error';
import { employeeValidationSchema } from 'validationSchema/employees';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { EmployeeInterface } from 'interfaces/employee';

function EmployeeCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EmployeeInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEmployee(values);
      resetForm();
      router.push('/employees');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EmployeeInterface>({
    initialValues: {
      job_title: '',
      department: '',
      vacation_days_remaining: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: employeeValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Employee
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="job_title" mb="4" isInvalid={!!formik.errors?.job_title}>
            <FormLabel>Job Title</FormLabel>
            <Input type="text" name="job_title" value={formik.values?.job_title} onChange={formik.handleChange} />
            {formik.errors.job_title && <FormErrorMessage>{formik.errors?.job_title}</FormErrorMessage>}
          </FormControl>
          <FormControl id="department" mb="4" isInvalid={!!formik.errors?.department}>
            <FormLabel>Department</FormLabel>
            <Input type="text" name="department" value={formik.values?.department} onChange={formik.handleChange} />
            {formik.errors.department && <FormErrorMessage>{formik.errors?.department}</FormErrorMessage>}
          </FormControl>
          <FormControl id="vacation_days_remaining" mb="4" isInvalid={!!formik.errors?.vacation_days_remaining}>
            <FormLabel>Vacation Days Remaining</FormLabel>
            <NumberInput
              name="vacation_days_remaining"
              value={formik.values?.vacation_days_remaining}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('vacation_days_remaining', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.vacation_days_remaining && (
              <FormErrorMessage>{formik.errors?.vacation_days_remaining}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'employee',
  operation: AccessOperationEnum.CREATE,
})(EmployeeCreatePage);
