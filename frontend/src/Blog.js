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
  const [postForm, setPostForm] = useState({ title: '', date: '', message: '' });
  const [activeTab, setActiveTab] = useState('post');

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

    // Helper to refresh posts after post/delete
    const refreshPosts = () => {
      setLoading(true);
      fetch('/api/blogposts')
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then((data) => {
          const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
          setPosts(sorted);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    };
  const handlePostClick = () => {
    setShowPassphraseModal(true);
    setPassPhrase('');
    setPassphraseError('');
  };

  const handlePassPhraseSubmit = async (e) => {
    e.preventDefault();
    if (!passPhrase) {
      setPassphraseError('Passphrase required.');
      return;
    }
    // Verify passphrase using dedicated endpoint
    const payload = { passphrase: passPhrase };
    const response = await fetch('/api/blogposts/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (response.status === 403) {
      setPassphraseError('Incorrect pass phrase.');
      return;
    }
    setShowPassphraseModal(false);
    setShowPostModal(true);
    setPassphraseError('');
  };

  const handlePostFormChange = (e) => {
    setPostForm({ ...postForm, [e.target.name]: e.target.value });
  };

  const handlePostFormSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    if (!postForm.title || !postForm.date || !postForm.message) {
      setError('All fields are required.');
      return;
    }
    const payload = {
      passphrase: passPhrase,
      blogPost: postForm
    };
    const response = await fetch('/api/blogposts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      setShowPostModal(false);
      setPostForm({ title: '', date: '', message: '' });
      refreshPosts();
    } else {
      setError('Failed to post blog.');
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const response = await fetch(`/api/blogposts/${postId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        refreshPosts();
      } else {
        setError('Failed to delete post.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="blog-container">
      <div className="blog-header-container">
        <h2>My Blog</h2>
        <button onClick={handlePostClick} className="post-blog-btn">
          <img src="/blog/lock-icon.png" alt="Lock Icon" className="blog-icon" />
          Post
        </button>
      </div>
      {showPassphraseModal && (
        <div className="blog-modal-overlay">
          <div className="blog-modal">
            <form onSubmit={handlePassPhraseSubmit}>
              <label className="post-blog-label" htmlFor="passphrase">One does not simply... publish a blog.</label>
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
              <button className="post-blog-form-btn" type="submit">Submit</button>
              <button className="post-blog-form-btn" type="button" onClick={() => setShowPassphraseModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      {showPostModal && (
        <div className="blog-modal-overlay">
          <div className="blog-modal">
            <div className="blog-modal-tabs">
              <button className={`blog-modal-tab blog-modal-tab-post${activeTab === 'post' ? ' active' : ''}`} onClick={() => setActiveTab('post')}>
                Post
              </button>
              <button className={`blog-modal-tab blog-modal-tab-delete${activeTab === 'delete' ? ' active' : ''}`} onClick={() => setActiveTab('delete')}>
                Delete
              </button>
            </div>
            {activeTab === 'post' && (
              <form className="post-blog-form" onSubmit={handlePostFormSubmit}>
                <input
                  id="blog-title"
                  name="title"
                  value={postForm.title}
                  onChange={handlePostFormChange}
                  className="post-blog-input"
                  placeholder="Title"
                  required
                />
                <input
                  id="blog-date"
                  name="date"
                  type="date"
                  value={postForm.date}
                  onChange={handlePostFormChange}
                  className="post-blog-input"
                  placeholder="Date"
                  required
                />
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
                  <button className="post-blog-form-btn" type="submit">Post</button>
                  <button className="post-blog-form-btn" type="button" onClick={() => setShowPostModal(false)}>Cancel</button>
                </div>
                {error && <div className="blog-error">{error}</div>}
              </form>
            )}
            {activeTab === 'delete' && (
              <div className="delete-blog-table">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Title</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map(post => (
                      <tr key={post.id}>
                        <td>{post.date}</td>
                        <td>{post.title}</td>
                        <td>
                          <button className="delete-blog-btn" onClick={() => handleDeletePost(post.id)}>
                            <img src="/blog/trash-icon.png" alt="Trash Icon" className="blog-icon" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="post-blog-form-btn" type="button" onClick={() => setShowPostModal(false)}>Cancel</button>
              </div>
            )}
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
