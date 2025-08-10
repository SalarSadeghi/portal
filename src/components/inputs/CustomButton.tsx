import { Button, CircularProgress, type ButtonProps } from "@mui/material";


interface ICustomButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    label: string;
    variant?: ButtonProps['variant'];
    color?: ButtonProps['color'];
    type?: ButtonProps['type'];
    icon?: React.ReactNode;
    fullWidth?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
}

const CustomButton: React.FC<ICustomButtonProps> = ({
    onClick,
    label,
    variant = 'outlined',
    color = 'primary',
    // type = 'submit',
    type,
    fullWidth = false,
    icon,
    isLoading = false,
    disabled = false
}) => {
    return (
        <Button
            fullWidth={fullWidth}
            className={variant === 'contained' ? '!text-white' : ''}
            onClick={onClick}
            variant={variant}
            color={color}
            type={type}
            startIcon={isLoading ? <CircularProgress size={15} /> : icon ? icon : undefined}
            disabled={isLoading || disabled}>
            {label}
        </Button>
    );
};

export default CustomButton;
