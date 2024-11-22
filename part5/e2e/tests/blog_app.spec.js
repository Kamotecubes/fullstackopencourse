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
        await page.getByTestId('username').fill('josh')
        await page.getByTestId('password').fill('asdqwe')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('josh logged in')).toBeVisible()
      })
  
      test('fails with wrong credentials', async ({ page }) => {
        await page.getByTestId('username').fill('josh')
        await page.getByTestId('password').fill('haha')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('wrong username or password')).toBeVisible()
      })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('josh')
            await page.getByTestId('password').fill('asdqwe')
            await page.getByRole('button', { name: 'login' }).click()
        })
        
        test('a new blog can be created', async ({ page }) => {
          const textboxes = await page.getByRole('textbox').all()
          
          await page.getByRole('button', { name: 'new blog' }).click()

          await page.getByTestId('blogform-title').fill('POWER')
          await page.getByTestId('blogform-author').fill('kanye')
          await page.getByTestId('blogform-url').fill('asdqwe')
          await page.getByRole('button', { name: 'create' }).click()
  
          await expect(page.getByText('POWER kanye')).toBeVisible()
        })
        
    })
})

