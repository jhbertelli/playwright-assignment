import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('/login');
});

test('render login form', async ({ page }) => {
    await expect(page).toHaveTitle('Login')

    await expect(page.getByRole('textbox', { name: 'E-mail' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Senha' })).toBeVisible()
})

test('toggle password visibility', async ({ page }) => {
    const passwordInput = page.getByRole('textbox', { name: 'Senha' })
    const toggleVisibilityButton = page.getByTestId('password-visibility-toggle')

    await expect(passwordInput).toBeVisible()
    await expect(toggleVisibilityButton).toBeVisible()

    await expect(passwordInput).toHaveAttribute('type', 'password')
    
    await toggleVisibilityButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'text')
    
    await toggleVisibilityButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'password')
})

test('can redirect to register page', async ({ page }) => {
    const redirectToRegisterButton = page.getByRole('button', { name: 'Não possui uma conta?' })

    await expect(redirectToRegisterButton).toBeVisible()
    await redirectToRegisterButton.click()

    await expect(page).toHaveTitle('Cadastro')
})
