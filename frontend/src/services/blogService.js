// Blog API service
export async function fetchBlogPosts() {
  const res = await fetch('/api/blogposts');
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

export async function verifyPassphrase(passphrase) {
  const payload = { passphrase };
  const res = await fetch('/api/blogposts/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res;
}

export async function postBlog(passphrase, blogPost) {
  const payload = { passphrase, blogPost };
  const res = await fetch('/api/blogposts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res;
}

export async function deleteBlogPost(postId) {
  const res = await fetch(`/api/blogposts/${postId}`, {
    method: 'DELETE'
  });
  return res;
}
