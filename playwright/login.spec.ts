import { expect, test } from '@playwright/test'

// O código dentro desta função é executado para todos os testes do arquivo
test.beforeEach(async ({ page }) => {
    await page.goto('/login')
})

// Caso de teste CT-001
test('render login form', async ({ page }) => {
    await expect(page).toHaveTitle('Login')

    await expect(page.getByRole('textbox', { name: 'E-mail' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Senha' })).toBeVisible()
})

// CT-002
test('can redirect to register page', async ({ page }) => {
    const redirectToRegisterButton = page.getByRole('button', { name: 'Não possui uma conta?' })

    await expect(redirectToRegisterButton).toBeVisible()
    await redirectToRegisterButton.click()

    await expect(page).toHaveTitle('Cadastro')
})

// CT-003
test('toggle password visibility', async ({ page }) => {
    const passwordInput = page.getByRole('textbox', { name: 'Senha' })
    const toggleVisibilityButton = page.getByRole('button', {
        name: 'Mostrar/ocultar visibilidade do campo Senha',
    })

    await expect(passwordInput).toBeVisible()
    await expect(toggleVisibilityButton).toBeVisible()

    await expect(passwordInput).toHaveAttribute('type', 'password')

    await toggleVisibilityButton.click()
    await expect(passwordInput).toHaveAttribute('type', 'text')

    await toggleVisibilityButton.click()
    await expect(passwordInput).toHaveAttribute('type', 'password')
})
