import React, { useState } from 'react';
import { usePagination } from '../features/blog/usePagination';
import { useBlog } from '../features/blog/useBlog';
import "./Blog.css";
import { lockIcon } from '../assets/blog';
import PassphraseModal from '../components/PassphraseModal';
import BlogPostModal from '../components/BlogPostModal';
import BlogPostCard from '../components/BlogPostCard';

function Blog() {
  const {
    posts,
    loading,
    error,
    refreshPosts,
    postBlog,
    deleteBlogPost,
    verifyPassphrase
  } = useBlog();
  const postsPerPage = 3;
  const previewLength = 110;
  const {
    currentPage,
    pageNumbers,
    getCurrentItems,
    handlePageChange
  } = usePagination({ totalItems: posts.length, itemsPerPage: postsPerPage });
  const [showPassphraseModal, setShowPassphraseModal] = useState(false);
  const [passPhrase, setPassPhrase] = useState('');
  const [passphraseError, setPassphraseError] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const [postForm, setPostForm] = useState({ title: '', date: '', message: '' });
  const [activeTab, setActiveTab] = useState('post');
  const [formError, setFormError] = useState('');

  // ...existing code...
  const currentPosts = getCurrentItems(posts);

  // Data fetching and refresh logic now handled by useBlog
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
    // Verify passphrase using service
    const response = await verifyPassphrase(passPhrase);
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
      setFormError('All fields are required.');
      return;
    }
    const response = await postBlog(passPhrase, postForm);
    if (response.ok) {
      setShowPostModal(false);
      setPostForm({ title: '', date: '', message: '' });
      setFormError('');
      refreshPosts();
    } else {
      setFormError('Failed to post blog.');
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const response = await deleteBlogPost(postId);
      if (response.ok) {
        refreshPosts();
        setFormError('');
      } else {
        setFormError('Failed to delete post.');
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
          <img src={lockIcon} alt="Lock Icon" className="blog-icon" />
          Post
        </button>
      </div>
      {showPassphraseModal && (
        <PassphraseModal
          passPhrase={passPhrase}
          setPassPhrase={setPassPhrase}
          passphraseError={passphraseError}
          onSubmit={handlePassPhraseSubmit}
          onCancel={() => setShowPassphraseModal(false)}
        />
      )}
      {showPostModal && (
        <BlogPostModal
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          postForm={postForm}
          setPostForm={setPostForm}
          handlePostFormSubmit={handlePostFormSubmit}
          handlePostFormChange={handlePostFormChange}
          handleDeletePost={handleDeletePost}
          posts={posts}
          formError={formError}
          setShowPostModal={setShowPostModal}
        />
      )}
      <div className="blog-posts">
        {currentPosts.length === 0 ? (
          <div>No posts found.</div>
        ) : (
          currentPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} previewLength={previewLength} />
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
