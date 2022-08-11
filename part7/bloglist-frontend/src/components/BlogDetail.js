import { initializeBlogs, updateBlog, addComment } from "../reducers/blogReducer"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from 'react'
import { useParams } from 'react-router-dom'

const BlogDetail = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    const id = useParams().id
    const blog = useSelector(state => {
        const allBlogs = state.blogs
        console.log(allBlogs)
        const foundBlog = allBlogs.find(b => b.id === id)
        return foundBlog
    })

    const handleLike = (e) => {
        e.preventDefault()
        dispatch(updateBlog(blog))
    }

    const handleAddComment = async (e) => {
        e.preventDefault()
        const comment = e.target.comment.value
        e.target.comment.value = ''
        dispatch(addComment(blog.id, comment))
    }
    if (!blog) {
        return null
    }

    return (
        <>
            <h2>{blog.title}</h2>
            <p>{blog.url}</p>
            <span>{blog.likes} likes <button onClick={handleLike}>like</button></span>
            <p>added by {blog.author}</p>
            <h4>comments</h4>
            <form onSubmit={handleAddComment}>
                <input type="text" name="comment"></input>
                <button type="submit">add comment</button>
            </form>
            <ul>
                {blog.comments?.map(c => (
                    <li key={c}>{c}</li>
                ))}
            </ul>
        </>
    )
}

export default BlogDetail