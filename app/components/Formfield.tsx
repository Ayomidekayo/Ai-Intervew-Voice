import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'file';
}

function FormField<T extends FieldValues>(props: FormFieldProps<T>) {
  const { control, name, label, placeholder, type = 'text' } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <Input
              className="!bg-dark-200 !rounded-full !min-h-12 !px-5 placeholder:!text-light-100"
              placeholder={placeholder}
              type={type}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormField;
