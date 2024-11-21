import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {


    beforeEach(() => {

    })
    test('renders the blog\'s title and author, but does not render its URL or number of likes by default.', async () => {
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
        const mockaddLike = vi.fn()
        const mockdeleteBlog = vi.fn()
        const showDelete = true
        const {container} = render(<Blog key={blog.id} blog={blog} addLike={mockaddLike} deleteBlog={mockdeleteBlog} showDelete={showDelete}/>)
        
        const titleDiv = container.querySelector('.title')
        const detailsDiv = container.querySelector('.details')
    
        expect(titleDiv).toHaveTextContent('skeletons travis scott')
        expect(detailsDiv).toHaveStyle('display: none')
    })
})

