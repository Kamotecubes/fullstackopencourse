import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    let container
    let mockcreateBlog

    beforeEach(() => {
        mockcreateBlog = vi.fn()
        container = render(<BlogForm createBlog={mockcreateBlog} />).container

    })
    test('form calls the event handler it received as props with the right details when a new blog is created.', async () => {

        const user = userEvent.setup()
        const createButton = screen.getByText('create')
        const titleInput = screen.getByPlaceholderText('title')
        const authorInput = screen.getByPlaceholderText('author')
        const urlInput = screen.getByPlaceholderText('url')

        await user.type(titleInput, 'jpegultra')
        await user.type(authorInput, 'jpegmafia')
        await user.type(urlInput, 'asdqwe')
        await user.click(createButton)
        
        expect(mockcreateBlog.mock.calls).toHaveLength(1)
        expect(mockcreateBlog.mock.calls[0][0]).toStrictEqual({title: 'jpegultra', author: 'jpegmafia', url: 'asdqwe'})
    
    })
})

