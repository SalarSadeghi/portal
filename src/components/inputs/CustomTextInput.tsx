import { TextField, type InputProps, type SxProps } from '@mui/material';
import {type Control, Controller, type FieldValues } from 'react-hook-form';

interface TextInputProps {
    name: string;
    label: string;
    control: Control<FieldValues>;
    defaultValue?: string;
    value?: string;
    type?: string;
    error?: boolean;
    helperText?: React.ReactNode;
    // required?: boolean;
    multiline?: boolean;
    rows?: number;
    sx?: SxProps;
    InputProps?: InputProps;
    focused?: boolean;
    shrink?: boolean;
}
const CustomTextInput: React.FC<TextInputProps> = ({
    name,
    label,
    control,
    defaultValue = '',
    // value,
    type = 'text',
    // error = false,
    helperText,
    // required = false,
    multiline = false,
    rows = 1,
    sx,
    InputProps,
    focused,
    shrink
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <TextField
                    sx={{ ...sx }}
                    {...field}
                    // value={value }
                    // required={required}
                    focused={focused}
                    defaultValue={defaultValue}
                    rows={rows}
                    type={type}
                    fullWidth
                    label={label}
                    multiline={multiline}
                    error={!!fieldState.error}
                    helperText={fieldState?.error?.message || helperText} // Optional validation error message
                    InputProps={{ ...InputProps }}
                    InputLabelProps={{
                        shrink: shrink
                    }}
                />
            )}
        />
    );
};

export default CustomTextInput;
