import React, { useEffect, useState } from 'react';
import "./Blog.css";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/blogposts')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setPosts(data);
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
            <div key={post.id} className="blog-post">
              <h3>{post.title}</h3>
              <p><strong>Date:</strong> {post.date}</p>
              <p>{post.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Blog;
