import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Blog.css";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const previewLength = 110;

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetch('/api/blogposts')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        // Sort posts by date descending
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        setPosts(sorted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
  <div className="blog-container">
    <div className="blog-header">
      <h2>My Blog</h2>
    </div>
    <div className="blog-posts">
      {currentPosts.length === 0 ? (
        <div>No posts found.</div>
      ) : (
        currentPosts.map((post) => (
          <Link to={`/blog/${post.id}`} className="blog-link" key={post.id} style={{ textDecoration: 'none' }}>
            <div className="blog-post">
              <h3>{post.title}</h3>
              <h4><strong>Date:</strong> {post.date}</h4>
              <hr />
              <p>{post.message.length > previewLength ? post.message.slice(0, previewLength) + '...' : post.message}</p>
            </div>
          </Link>
        ))
      )}
    </div>
        {posts.length > postsPerPage && (
          <div className="pagination">
            {pageNumbers.map((pageNum) => (
              <button key={pageNum} onClick={() => handlePageChange(pageNum)} className={pageNum === currentPage ? 'active' : ''}>
                {pageNum}
              </button>
            ))}
          </div>
        )}
  </div>
);
}

export default Blog;
