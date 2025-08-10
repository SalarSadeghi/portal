import { Autocomplete, TextField, Typography, type InputProps, type SxProps } from '@mui/material';
import React, { type SyntheticEvent } from 'react';
import { Controller, type Control } from 'react-hook-form';

type Props = {
    label: string;
    value?: any;
    defaultValue?: any;
    options?: any[];
    multiple?: boolean;
    loading?: boolean;
    disabled?: boolean;
    filterSelectedOptions?: boolean;
    sx?: SxProps;
    renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: any) => React.ReactNode;
    handleOnChange?: (event: SyntheticEvent<Element, Event>, value: any) => void;
    getOptionLabel?: (option: any) => string;
    groupBy?: (option: any) => string;
    getOptionDisabled?: (option: any) => boolean;
    inputProps?: Partial<InputProps>;
    control: Control; // Required for React Hook Form
    name: string; // The name of the field,
    noOptionText?: React.ReactNode;
    helperText?: React.ReactNode;
    error?: boolean;
    shrink?: boolean;
};

// This component manages a combobox such that compatible with react-hook-form
function ComboBox({
    label,
    // value,
    defaultValue,
    options,
    sx,
    renderOption,
    multiple,
    filterSelectedOptions,
    noOptionText=<span className='text-gray-400'>موردی یافت نشد</span>,
    handleOnChange,
    loading,
    getOptionLabel,
    getOptionDisabled,
    helperText,
    groupBy,
    inputProps,
    disabled,
    control,
    name,
    shrink
}: Props) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                return (
                    <Autocomplete
                        multiple={!!multiple}
                        disabled={disabled}
                        filterSelectedOptions={!!filterSelectedOptions}
                        defaultValue={defaultValue}
                        value={field.value} // Bind to react-hook-form value
                        aria-label="combo-box"
                        options={options || []}
                        loading={!!loading}
                        noOptionsText={noOptionText ?? undefined}
                        sx={{ ...sx }}
                        getOptionDisabled={
                            getOptionDisabled ? (option) => getOptionDisabled(option) : undefined
                        }
                        getOptionLabel={(option) =>
                            getOptionLabel ? getOptionLabel(option) : option.title || option.label
                        }
                        groupBy={groupBy ? (option) => groupBy(option) : undefined}
                        onChange={(event, newValue) => {
                            // Use field.onChange from react-hook-form
                            field.onChange(newValue);
                            handleOnChange?.(event, newValue); // Optional custom onChange handler
                        }}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    InputProps={
                                        inputProps
                                            ? { ...params.InputProps, ...inputProps }
                                            : { ...params.InputProps }
                                    }
                                    label={label}
                                    error={!!fieldState?.error}
                                    helperText={
                                        fieldState?.error?.message ||
                                        // fieldState?.error?.value?.message ||
                                        helperText
                                    } // Optional validation error message
                                    InputLabelProps={{ shrink: shrink }}
                                />
                            );
                        }}
                        renderOption={(props, option) =>
                            renderOption ? (
                                renderOption(props, option)
                            ) : (
                                <Typography {...props}>{option?.label || option?.title}</Typography>
                            )
                        }
                    />
                );
            }}
        />
    );
}

export default React.memo(ComboBox);
