import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
const Blog = ({ blog, addLike, deleteBlog, showDelete }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const delatable = { display: showDelete ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div className="title">
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}{" "}</Link>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.any.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  showDelete: PropTypes.bool.isRequired,
};

export default Blog;
