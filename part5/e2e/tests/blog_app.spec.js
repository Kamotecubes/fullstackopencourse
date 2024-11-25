const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')


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
        await loginWith(page, 'josh', 'asdqwe')
        await expect(page.getByText('josh logged in')).toBeVisible()
      })
  
      test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'josh', 'haha')
        await expect(page.getByText('wrong username or password')).toBeVisible()
      })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'josh', 'asdqwe')
        })
        
        test('a new blog can be created', async ({ page }) => {

            await createBlog(page, {title: 'POWER', author: 'kanye', url: 'asdqwe'})
    
            await expect(page.getByText('POWER kanye')).toBeVisible()
        })

        test('blog can be liked.', async ({ page }) => {
          
            await createBlog(page, {title: 'So appaled', author: 'kanye', url: 'asdqwe'})
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()

            await expect(page.getByText('likes 1')).toBeVisible()
    
            
        })
        
    })
})

