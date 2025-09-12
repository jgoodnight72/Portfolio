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
  const [showPassphraseModal, setShowPassphraseModal] = useState(false);
  const [passPhrase, setPassPhrase] = useState('');
  const [passphraseError, setPassphraseError] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const [postForm, setPostForm] = useState({ title: '', content: '' });

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

  const handlePostClick = () => {
    setShowPassphraseModal(true);
    setPassPhrase('');
    setPassphraseError('');
  };

  const handlePassPhraseSubmit = (e) => {
    e.preventDefault();
    if (passPhrase === 'isitfridayyet') {
      setShowPassphraseModal(false);
      setShowPostModal(true);
      setPassphraseError('');
    } else {
      setPassphraseError('Incorrect pass phrase.');
    }
  };

  const handlePostFormChange = (e) => {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  };

  const handlePostFormSubmit = async (e) => {
    e.preventDefault();
    // Replace with your backend API endpoint
    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postForm)
    });
    if (response.ok) {
      setShowPostModal(false);
      setPostForm({ title: '', content: '' });
      // Optionally refresh blog list here
    } else {
      setError('Failed to post blog.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="blog-container">
      <div className="blog-header-container">
        <h2>My Blog</h2>
        <button onClick={handlePostClick} className="post-blog-btn">
          <img src="/global/lock-icon.png" alt="Lock Icon" className="lock-icon" />
          Post
        </button>
      </div>
      {showPassphraseModal && (
        <div className="blog-modal-overlay">
          <div className="blog-modal">
            <form onSubmit={handlePassPhraseSubmit}>
              <label className="post-blog-label" htmlFor="passphrase">One does not simply... publish a post.</label>
              <input
                id="passphrase"
                type="password"
                value={passPhrase}
                onChange={e => setPassPhrase(e.target.value)}
                className="post-blog-input"
                autoFocus
                placeholder="Enter passphrase..."
              />
              {passphraseError && <div className="blog-error">{passphraseError}</div>}
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowPassphraseModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      {showPostModal && (
        <div className="blog-modal-overlay">
          <div className="blog-modal">
            <form className="post-blog-form" onSubmit={handlePostFormSubmit}>
              <label className="post-blog-label" htmlFor="blog-title">Title: </label>
              <input
                id="blog-title"
                name="title"
                value={postForm.title}
                onChange={handlePostFormChange}
                className="post-blog-input"
                placeholder="Title"
                required
              />
              <label className="post-blog-label" htmlFor="blog-year">Year: </label>
              <input
                id="blog-year"
                name="year"
                value={postForm.year}
                onChange={handlePostFormChange}
                className="post-blog-input"
                placeholder="Year"
                required
              />
              <label className="post-blog-label" htmlFor="blog-message">Message: </label>
              <textarea
                id="blog-message"
                name="message"
                value={postForm.message}
                onChange={handlePostFormChange}
                className="post-blog-input"
                placeholder="Message"
                required
              />
              <div>
                <button type="submit">Post</button>
                <button type="button" onClick={() => setShowPostModal(false)}>Cancel</button>
              </div>
              {error && <div className="blog-error">{error}</div>}
            </form>
          </div>
        </div>
      )}
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
