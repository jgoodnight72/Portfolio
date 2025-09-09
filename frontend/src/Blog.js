import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Blog.css";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://138.197.194.128:8080/api/blogposts')
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
        {posts.length === 0 ? (
          <div>No posts found.</div>
        ) : (
          posts.map((post) => (
            <Link to={`/blog/${post.id}`} className="blog-link" key={post.id} style={{ textDecoration: 'none' }}>
              <div className="blog-post">
                <h3>{post.title}</h3>
                <h4><strong>Date:</strong> {post.date}</h4>
                <hr />
                <p>{post.message.length > 160 ? post.message.slice(0, 160) + '...' : post.message}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Blog;
