import css from '../NoteForm/NoteForm.module.css';
import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { createNote } from '@/lib/api';

interface NoteFormProps {
  onSuccess: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

const INITIAL_VALUES: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

const NoteScheme = Yup.object({
  title: Yup.string()
    .min(3, 'To short')
    .max(50, 'To long')
    .required('Title is required'),
  content: Yup.string().max(500, 'To long'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

const NoteForm = ({ onSuccess }: NoteFormProps) => {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onSuccess();
    },
    onError: error => {
      console.error(error);
    },
  });

  const handleSubmit = (
    values: NoteFormValues,
    formikHelpers: FormikHelpers<NoteFormValues>
  ) => {
    console.log(values);
    formikHelpers.resetForm();
    mutate(values);
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={NoteScheme}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <span className={css.error} />
        </div>
        <ErrorMessage name="title" component="span" className={css.error} />

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <span className={css.error} />
        </div>
        <ErrorMessage name="content" component="span" className={css.error} />

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <span className={css.error} />
        </div>
        <ErrorMessage name="tag" component="span" className={css.error} />

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onSuccess}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
