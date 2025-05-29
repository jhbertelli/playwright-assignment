import { expect, test } from '@playwright/test'

test('render register form', async ({ page }) => {
    await page.goto('/register')

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Cadastro')

    await expect(page.getByRole('textbox', { name: 'Nome' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'E-mail' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Senha', exact: true })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Repita sua senha' })).toBeVisible()
})

test('can redirect to login page', async ({ page }) => {
    await page.goto('/register')

    const redirectToLoginButton = page.getByRole('button', { name: 'Já possui uma conta?' })

    await expect(redirectToLoginButton).toBeVisible()
    await redirectToLoginButton.click()

    await expect(page).toHaveTitle('Login')
})
