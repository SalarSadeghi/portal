import { FormControlLabel, Switch } from '@mui/material';
import React from 'react';
import { Controller, type Control } from 'react-hook-form';
interface CustomSwitchProps {
    name: string;
    control: Control;
    label: string;
    defaultChecked?: boolean;
    rules?: object;
}
const CustomSwitchInput: React.FC<CustomSwitchProps> = ({
    control,
    name,
    label,
    defaultChecked = false,
    rules = {}
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultChecked}
            rules={rules}
            render={({ field }) => (
                <FormControlLabel
                    control={<Switch {...field} checked={field.value} />}
                    label={label}
                />
            )}
        />
    );
};

export default CustomSwitchInput;
