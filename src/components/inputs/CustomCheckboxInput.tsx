// CustomCheckboxInput.tsx
import { Checkbox, FormControl, FormControlLabel, useTheme } from '@mui/material';
import React from 'react';
import { Controller, type Control, type FieldValues } from 'react-hook-form';

interface CustomCheckboxInputProps {
    name: string;
    label: string;
    control: Control<FieldValues>;
    defaultValue?: boolean;
    error?: boolean;
    helperText?: string;
}

const CustomCheckboxInput: React.FC<CustomCheckboxInputProps> = ({
    name='',
    label,
    control,
    defaultValue = false,
    error = false
}) => {
    const theme = useTheme();

    return (
        <FormControl component="fieldset" error={error}>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    // color="primary"
                                    sx={{
                                        '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                                            {
                                                color: theme.palette.primary.main
                                            }
                                    }}
                                    {...field}
                                    checked={field.value}
                                    // defaultChecked={defaultValue}
                                />
                            }
                            style={{}}
                            label={label}
                        />
                    </>
                )}
            />
        </FormControl>
    );
};

export default CustomCheckboxInput;
