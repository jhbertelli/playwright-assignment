import { expect, test } from '@playwright/test'

test.skip('render login form', async ({ page }) => {
    await page.goto('/login')

    await expect(page).toHaveTitle('Login')

    await expect(page.getByRole('textbox', { name: 'E-mail'})).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Senha'})).toBeVisible()
})

test.skip('can redirect to register page', async ({ page }) => {
    await page.goto('/login')

    const redirectToRegisterButton = page.getByRole('button', { name: 'Não possui uma conta?'})

    await expect(redirectToRegisterButton).toBeVisible()
    await redirectToRegisterButton.click()

    await expect(page).toHaveTitle('Cadastro')
})
