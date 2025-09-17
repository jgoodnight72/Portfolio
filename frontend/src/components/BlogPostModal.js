import React from 'react';
import { trashIcon } from '../assets/blog';
import './BlogPostModal.css';

function BlogPostModal({
  activeTab,
  setActiveTab,
  postForm,
  handlePostFormSubmit,
  handlePostFormChange,
  handleDeletePost,
  posts,
  formError,
  setShowPostModal
}) {
  return (
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
            {formError && <div className="blog-error">{formError}</div>}
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
                        <img src={trashIcon} alt="Trash Icon" className="blog-icon" />
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
  );
}

export default BlogPostModal;
