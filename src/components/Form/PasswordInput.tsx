import { PasswordInput as MantinePasswordInput, PasswordInputProps as MantinePasswordInputProps } from '@mantine/core'
import { FieldError } from 'react-hook-form'

interface PasswordInputProps extends Omit<MantinePasswordInputProps, 'error'> {
    error?: FieldError
}

export const PasswordInput = ({ visibilityToggleButtonProps, label, error, ...props }: PasswordInputProps) => (
    <MantinePasswordInput
        label={label}
        {...props}
        error={error?.message}
        visibilityToggleButtonProps={{
            'aria-label': `Mostrar/ocultar visibilidade do campo ${label}`,
            ...visibilityToggleButtonProps,
        }}
    />
)
