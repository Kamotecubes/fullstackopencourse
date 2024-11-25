const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')


describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Joshua Icogo',
                username: 'josh',
                password: 'asdqwe'
            }
        })
        await page.goto('/')
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
          await page.getByRole('button', { name: 'new blog' }).click()
            await createBlog(page, {title: 'POWER', author: 'kanye', url: 'asdqwe'})
            await expect(page.getByText('POWER kanye')).toBeVisible()
        })

        test('blog can be liked.', async ({ page }) => {
          await page.getByRole('button', { name: 'new blog' }).click()
          await createBlog(page, {title: 'POWER', author: 'kanye', url: 'asdqwe'})
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()

            await expect(page.getByText('likes 1')).toBeVisible()
        })

        test('user who added the blog can delete the blog', async ({ page }) => {
          await page.getByRole('button', { name: 'new blog' }).click()
          await createBlog(page, {title: 'POWER', author: 'kanye', url: 'asdqwe'})
          await page.getByRole('button', { name: 'view' }).click()
          page.on('dialog', dialog => dialog.accept());
          await page.getByRole('button', { name: 'remove' }).click()

          await expect(page.getByText('POWER kanye')).not.toBeVisible()
        })

        test('only the user who added the blog sees the blog\'s delete button.', async ({ page, request }) => {
          await request.post('/api/users', {
            data: {
                name: 'Lai',
                username: 'lai',
                password: 'asdqwe'
            }
          })
          await page.getByRole('button', { name: 'new blog' }).click()
          await createBlog(page, {title: 'POWER', author: 'kanye', url: 'asdqwe'})
          await page.getByRole('button', { name: 'view' }).click()

          await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()

          await page.getByRole('button', { name: 'logout' }).click()
          await loginWith(page, 'lai', 'asdqwe')
          await page.getByRole('button', { name: 'view' }).click()

          await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })

        test('blogs are arranged in the order according to the likes, the blog with the most likes first.', async ({ page }) => {
          await page.getByRole('button', { name: 'new blog' }).click()
          await createBlog(page, {title: 'POWER', author: 'kanye', url: 'asdqwe'})
          const firstBlogElement = await page.getByText('POWER kanye').locator('..')
          await firstBlogElement.getByRole('button', {name: 'view'}).click()
          await firstBlogElement.getByRole('button', {name: 'like'}).click()
          await firstBlogElement.getByRole('button', {name: 'like'}).click()
          await firstBlogElement.getByRole('button', {name: 'like'}).click()
          await firstBlogElement.getByRole('button', {name: 'like'}).click()

          await createBlog(page, {title: 'All of the lights', author: 'kanye', url: 'asdqwe'})
          const secondBlogElement = await page.getByText('All of the lights kanye').locator('..')
          await secondBlogElement.getByRole('button', {name: 'view'}).click()
          await secondBlogElement.getByRole('button', {name: 'like'}).click()
          await secondBlogElement.getByRole('button', {name: 'like'}).click()

          await createBlog(page, {title: 'Runaway', author: 'kanye', url: 'asdqwe'})
          const thirdBlogElement = await page.getByText('Runaway kanye').locator('..')
          await thirdBlogElement.getByRole('button', {name: 'view'}).click()
          await thirdBlogElement.getByRole('button', {name: 'like'}).click()
          await thirdBlogElement.getByRole('button', {name: 'like'}).click()
          await thirdBlogElement.getByRole('button', {name: 'like'}).click()

          const titles = await page.locator('.title').all()

          await expect(titles[0]).toContainText('POWER kanye')
          await expect(titles[1]).toContainText('Runaway kanye')
          await expect(titles[2]).toContainText('All of the lights kanye')
        })
        
    })
})

