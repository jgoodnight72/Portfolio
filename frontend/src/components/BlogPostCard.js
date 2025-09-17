import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPostCard.css';

function BlogPostCard({ post, previewLength }) {
  return (
    <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
      <div className="blog-post">
        <h3>{post.title}</h3>
        <h4><strong>Date:</strong> {post.date}</h4>
        <hr />
        <p>{post.message.length > previewLength ? post.message.slice(0, previewLength) + '...' : post.message}</p>
      </div>
    </Link>
  );
}

export default BlogPostCard;
