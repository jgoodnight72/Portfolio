import React from 'react';

function PassphraseModal({ passPhrase, setPassPhrase, passphraseError, onSubmit, onCancel }) {
  return (
    <div className="blog-modal-overlay">
      <div className="blog-modal">
        <form onSubmit={onSubmit}>
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
          <button className="post-blog-form-btn" type="button" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default PassphraseModal;
