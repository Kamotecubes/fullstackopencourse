import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container
    let mockaddLike

    beforeEach(() => {
        const blog = {
            title: "skeletons",
            author: "travis scott",
            url: "asdqwe",
            likes: 124,
            user: {
                username: "root",
                name: "Superuser",
                id: "123"
            },
        }
        mockaddLike = vi.fn()
        const mockdeleteBlog = vi.fn()
        const showDelete = true
        container = render(<Blog key={blog.id} blog={blog} addLike={mockaddLike} deleteBlog={mockdeleteBlog} showDelete={showDelete}/>).container

    })
    test('renders the blog\'s title and author, but does not render its URL or number of likes by default.', async () => {

        const titleDiv = container.querySelector('.title')
        const detailsDiv = container.querySelector('.details')
    
        expect(titleDiv).toHaveTextContent('skeletons travis scott')
        expect(detailsDiv).toHaveStyle('display: none')
    })

    test('URL and number of likes are shown when the button controlling the shown details has been clicked.', async () => {

        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        const detailsDiv = container.querySelector('.details')

        expect(detailsDiv).not.toHaveStyle('display: none')
    })

    test('like button is clicked twice, the event handler the component received as props is called twice.', async () => {

        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        const likeButton = screen.getByText('like')
        await user.click(viewButton)
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockaddLike.mock.calls).toHaveLength(2)
    })
})

