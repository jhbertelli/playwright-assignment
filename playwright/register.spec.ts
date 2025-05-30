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
