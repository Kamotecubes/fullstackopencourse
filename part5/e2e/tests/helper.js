const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }

const createBlog = async (page, content) => {
  await page.getByTestId('blogform-title').fill(content.title)
  await page.getByTestId('blogform-author').fill(content.author)
  await page.getByTestId('blogform-url').fill(content.url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${content.title} ${content.author}`).waitFor()
}
  
  export { loginWith, createBlog }