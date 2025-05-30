import { PasswordInput as MantinePasswordInput, PasswordInputProps } from '@mantine/core'

export const PasswordInput = ({ visibilityToggleButtonProps, ...props }: PasswordInputProps) => (
    <MantinePasswordInput
        {...props}
        visibilityToggleButtonProps={{ 'data-testid': 'password-visibility-toggle', ...visibilityToggleButtonProps }}
    />
)
