const { test, expect, describe, beforeEach } = require('@playwright/test')


describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Joshua Icogo',
                username: 'josh',
                password: 'asdqwe'
            }
        })
        await page.goto('http://localhost:5173')
    })
  
    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('login to application')
        await expect(locator).toBeVisible()
    })
  
    describe('Login', () => {
      test('succeeds with correct credentials', async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await textboxes[0].fill('josh')
        await textboxes[1].fill('asdqwe')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('josh logged in')).toBeVisible()
      })
  
      test('fails with wrong credentials', async ({ page }) => {
        const textboxes = await page.getByRole('textbox').all()
        await textboxes[0].fill('josh')
        await textboxes[1].fill('haha')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('wrong username or password')).toBeVisible()
      })
    })
})

