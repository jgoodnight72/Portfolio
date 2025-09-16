import { useState, useEffect } from 'react';
import { fetchBlogPosts, postBlog, deleteBlogPost, verifyPassphrase } from '../../services/blogService';

export function useBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchBlogPosts();
      const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
      setPosts(sorted);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    refreshPosts,
    postBlog,
    deleteBlogPost,
    verifyPassphrase
  };
}
