import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('/register')
})

test('render register form', async ({ page }) => {
    await expect(page).toHaveTitle('Cadastro')

    await expect(page.getByRole('textbox', { name: 'Nome' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'E-mail' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Senha', exact: true })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Repita sua senha' })).toBeVisible()
})

test('toggle password visibility', async ({ page }) => {
    const passwordInput = page.getByRole('textbox', { name: 'Senha', exact: true })

    const toggleVisibilityButton = page.getByRole('button', { name: 'Mostrar/ocultar visibilidade do campo Senha' })

    await expect(passwordInput).toBeVisible()
    await expect(toggleVisibilityButton).toBeVisible()

    await expect(passwordInput).toHaveAttribute('type', 'password')

    await toggleVisibilityButton.click()
    await expect(passwordInput).toHaveAttribute('type', 'text')

    await toggleVisibilityButton.click()
    await expect(passwordInput).toHaveAttribute('type', 'password')
})

test('toggle repeat password visibility', async ({ page }) => {
    const repeatPasswordInput = page.getByRole('textbox', { name: 'Repita sua senha' })

    const toggleVisibilityButton = page.getByRole('button', {
        name: 'Mostrar/ocultar visibilidade do campo Repita sua senha',
    })

    await expect(repeatPasswordInput).toBeVisible()
    await expect(toggleVisibilityButton).toBeVisible()

    await expect(repeatPasswordInput).toHaveAttribute('type', 'password')

    await toggleVisibilityButton.click()
    await expect(repeatPasswordInput).toHaveAttribute('type', 'text')

    await toggleVisibilityButton.click()
    await expect(repeatPasswordInput).toHaveAttribute('type', 'password')
})

test('can redirect to login page', async ({ page }) => {
    const redirectToLoginButton = page.getByRole('button', { name: 'Já possui uma conta?' })

    await expect(redirectToLoginButton).toBeVisible()
    await redirectToLoginButton.click()

    await expect(page).toHaveTitle('Login')
})

test('show password requirements popover on password input focus', async ({ page }) => {
    const passwordInput = page.getByRole('textbox', { name: 'Senha', exact: true })

    await expect(passwordInput).toBeVisible()

    const numberRequirement = page.getByText(/A senha deve possuir pelo menos um número/)
    const lowercaseRequirement = page.getByText(/A senha deve possuir pelo menos uma letra minúscula/)
    const specialCharacterRequirement = page.getByText(/A senha deve possuir pelo menos um caractere especial/)
    const eightCharactersRequirement = page.getByText(/A senha deve possuir pelo menos 8 caracteres/)

    await expect(numberRequirement).not.toBeVisible()
    await expect(lowercaseRequirement).not.toBeVisible()
    await expect(specialCharacterRequirement).not.toBeVisible()
    await expect(eightCharactersRequirement).not.toBeVisible()

    await passwordInput.focus()

    await expect(numberRequirement).toBeVisible()
    await expect(lowercaseRequirement).toBeVisible()
    await expect(specialCharacterRequirement).toBeVisible()
    await expect(eightCharactersRequirement).toBeVisible()
})
