const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }

const createBlog = async (page, content) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('blogform-title').fill(content.title)
  await page.getByTestId('blogform-author').fill(content.author)
  await page.getByTestId('blogform-url').fill(content.url)
  await page.getByRole('button', { name: 'create' }).click()
}
  
  export { loginWith, createBlog }