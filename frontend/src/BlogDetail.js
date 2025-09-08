import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./BlogDetail.css";

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/blogposts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  function Linkify(text) {
    return text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Blog post not found.</div>;

  return (
    <div className="blog-detail-container">
      <div className="blog-detail-post">
        <h2>{post.title}</h2>
        <h3><strong>Date:</strong> {post.date}</h3>
        <hr />
        {post.message.split('\n\n').map((para, idx) => (
          <p key={idx} dangerouslySetInnerHTML={{ __html: Linkify(para) }} />
        ))}
        <br />
        <br />
        <Link className="return-to-blog" to="/blog">&larr; Back to Blog</Link>
      </div>
    </div>
  );
}

export default BlogDetail;
