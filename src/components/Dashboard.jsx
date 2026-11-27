"use client";

import { useState } from "react";
import { Avatar, Icon } from "./Shared";
import { interests, initialPosts, people } from "./data";

/* =====================================================
   HEADER
===================================================== */

export function Header({ active = "Home" }) {
  const links = [
    ["Home", "/", "home"],
    ["My network", "/network", "users"],
    ["Discover", "/discover", "compass"],
    ["Messages", "/messages", "message"],
    ["Notifications", "/notifications", "bell"],
  ];

  return (
    <header className="topbar">
      <div className="top-inner">

        <a className="brand" href="/">
          <span className="brand-mark">&#10035;</span>
          <span>
            my<span>circle</span>
            <small>ONE PLATFORM. EVERY OPPORTUNITY.</small>
          </span>
        </a>

        <div className="search">
          <Icon name="search" size={18} />
          <input
            aria-label="Search MyCircle"
            placeholder="Search people, topics, and more"
          />
        </div>

        <nav className="top-nav" aria-label="Main navigation">
          {links.map(([label, href, icon]) => (
            <a
              key={href}
              href={href}
              className={active === label ? "current" : ""}
              aria-current={active === label ? "page" : undefined}
            >
              <Icon name={icon} />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <a className="top-profile" href="/profile">
          <Avatar initials="AP" tone="peach" />
          <span>Me</span>
        </a>

      </div>
    </header>
  );
}

/* =====================================================
   LEFT SIDEBAR
===================================================== */

function Sidebar() {
  return (
    <aside className="left-column">

      <section className="card profile-card">

        <div className="cover">
          <span>&#10035;</span>
          <i></i>
        </div>

        <div className="profile-body">

          <Avatar initials="AP" tone="peach" large />

          <h2>
            Aanya Patel <span className="verified">&#10035;</span>
          </h2>

          <p>Product Designer & curious explorer</p>

          <span className="location">Noida, India</span>

          <div className="profile-stats">
            <div>
              <strong>284</strong>
              <span>Connections</span>
            </div>

            <div>
              <strong>1.2k</strong>
              <span>Profile views</span>
            </div>
          </div>

          <a className="outline-button profile-link" href="/profile">
            View profile
          </a>

        </div>
      </section>

      <section className="card sidebar-card" id="communities">

        <div className="section-heading">
          <h3>Your communities</h3>
          <span>+</span>
        </div>

        <div className="community">
          <span className="community-icon lavender">&#10035;</span>
          <div>
            <strong>Design & Creative Minds</strong>
            <small>2.4k members</small>
          </div>
        </div>

        <div className="community">
          <span className="community-icon sand">&#10035;</span>
          <div>
            <strong>Travel Together</strong>
            <small>1.8k members</small>
          </div>
        </div>

        <div className="community">
          <span className="community-icon blush">&#10035;</span>
          <div>
            <strong>Wedding Diaries</strong>
            <small>956 members</small>
          </div>
        </div>

        <a className="text-link" href="/discover">
          Explore communities <span>›</span>
        </a>

      </section>

      <div className="side-footer">
        About &nbsp; · &nbsp; Privacy &nbsp; · &nbsp; Terms
        <br />
        <span>© 2026 MyCircle</span>
      </div>

    </aside>
  );
}

/* =====================================================
   FEED POST
===================================================== */

function FeedPost({ post, onEdit, onDelete }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(post.text || "");

  const isOwner = post.name === "Aanya Patel";

  // SHARE POST
  const handleShare = async () => {
    const text = `${post.name}: ${post.text || ""}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "MyCircle",
          text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(text);
        alert("Post copied to clipboard!");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        alert("Unable to share this post.");
      }
    }
  };

  // EDIT POST
  const handleEdit = () => {
    if (!editText.trim()) {
      alert("Post cannot be empty.");
      return;
    }

    onEdit(post.id, editText.trim());
    setEditing(false);
  };

  // ADD COMMENT
  const handleComment = (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    setComments((current) => [
      ...current,
      comment.trim(),
    ]);

    setComment("");
  };

  return (
    <article className="card post">

      {/* POST HEADER */}

      <div className="post-header">

        <Avatar
          initials={post.avatar}
          tone={post.tone}
        />

        <div className="post-person">

          <strong>
            {post.name}
            <span className="verified">&#10035;</span>
          </strong>

          <small>{post.role}</small>

          <small>{post.time} · Public</small>

        </div>

        <div className="post-menu-wrapper">

          <button
            className="more"
            aria-label="More post options"
            onClick={() => setShowMenu((value) => !value)}
          >
            ···
          </button>

          {showMenu && (
            <div className="post-dropdown">

              {isOwner && (
                <>
                  <button
                    onClick={() => {
                      setEditText(post.text || "");
                      setEditing(true);
                      setShowMenu(false);
                    }}
                  >
                    ✎ Edit post
                  </button>

                  <button
                    className="delete-option"
                    onClick={() => {
                      setShowMenu(false);

                      if (
                        window.confirm(
                          "Are you sure you want to delete this post?"
                        )
                      ) {
                        onDelete(post.id);
                      }
                    }}
                  >
                    🗑 Delete post
                  </button>
                </>
              )}

              <button onClick={handleShare}>
                ↗ Share post
              </button>

              <button onClick={() => setSaved((value) => !value)}>
                ♡ {saved ? "Remove saved post" : "Save post"}
              </button>

            </div>
          )}

        </div>

      </div>

      {/* POST CONTENT */}

      <div className="post-copy">

        {editing ? (
          <div className="post-edit-box">

            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Edit your post..."
              rows={4}
            />

            <div className="post-edit-actions">

              <button onClick={handleEdit}>
                Save changes
              </button>

              <button
                onClick={() => {
                  setEditText(post.text || "");
                  setEditing(false);
                }}
              >
                Cancel
              </button>

            </div>

          </div>
        ) : (
          <>
            {post.text && <p>{post.text}</p>}

            {post.detail && <p>{post.detail}</p>}

            {post.tags && <span>{post.tags}</span>}
          </>
        )}

      </div>

      {/* POST IMAGE OR VIDEO */}

      {post.image && (
        <div className="post-art">

          {post.mediaType === "video" ? (
            <video
              src={post.image}
              controls
              className="post-uploaded-media"
            />
          ) : post.mediaType === "image" ? (
            <img
              src={post.image}
              alt="Post attachment"
              className="post-uploaded-media"
            />
          ) : (
            <div>
              <span>THE WEDDING EDIT</span>

              <strong>
                Made of<br />
                <em>little moments.</em>
              </strong>

              <small>
                Stories worth celebrating, together.
              </small>
            </div>
          )}

        </div>
      )}

      {/* POST COUNTS */}

      <div className="post-count">

        <span>
          <b>&#9829;</b> &nbsp;
          {post.likes + Number(liked)} people liked this
        </span>

        <span>
          {post.comments + comments.length} comments
        </span>

      </div>

      {/* POST ACTION BUTTONS */}

      <div className="post-actions">

        <button
          className={liked ? "selected" : ""}
          onClick={() => setLiked((value) => !value)}
        >
          <Icon name="heart" size={18} />
          {liked ? "Liked" : "Like"}
        </button>

        <button
          onClick={() => setShowComments((value) => !value)}
        >
          <Icon name="message" size={18} />
          Comment
        </button>

        <button onClick={handleShare}>
          <Icon name="share" size={18} />
          Share
        </button>

        <button
          className={saved ? "selected" : ""}
          onClick={() => setSaved((value) => !value)}
        >
          <Icon name="bookmark" size={18} />
          {saved ? "Saved" : "Save"}
        </button>

      </div>

      {/* COMMENTS SECTION */}

      {showComments && (
        <div className="comments">

          {comments.map((item, index) => (
            <p key={index}>
              <strong>You:</strong> {item}
            </p>
          ))}

          <form onSubmit={handleComment}>

            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a thoughtful comment..."
              aria-label="Write a comment"
            />

            <button
              type="submit"
              disabled={!comment.trim()}
            >
              Post
            </button>

          </form>

        </div>
      )}

    </article>
  );
}

/* =====================================================
   MAIN FEED
===================================================== */

function Feed() {
  const [active, setActive] = useState("For you");
  const [posts, setPosts] = useState(initialPosts);
  const [draft, setDraft] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [articleMode, setArticleMode] = useState(false);

  // FILTER POSTS
  const visible =
    active === "For you"
      ? posts
      : posts.filter(
          (post) =>
            post.category === active ||
            post.category === "For you"
        );

  // IMAGE / VIDEO UPLOAD
  const handleUpload = (e, type) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const valid =
      type === "image"
        ? file.type.startsWith("image/")
        : file.type.startsWith("video/");

    if (!valid) {
      alert(`Please select a valid ${type} file.`);
      e.target.value = "";
      return;
    }

    if (attachment) {
      URL.revokeObjectURL(attachment);
    }

    setAttachment(URL.createObjectURL(file));
    setMediaType(type);

    e.target.value = "";
  };

  // CREATE POST
  const createPost = (e) => {
    e.preventDefault();

    if (!draft.trim() && !attachment) return;

    const newPost = {
      id: Date.now(),
      name: "Aanya Patel",
      role: "Product Designer & curious explorer",
      avatar: "AP",
      tone: "peach",
      time: "Just now",
      category: active,
      text: draft.trim(),
      detail: "",
      tags: "",
      image: attachment || "",
      mediaType: mediaType,
      likes: 0,
      comments: 0,
    };

    setPosts((current) => [
      newPost,
      ...current,
    ]);

    setDraft("");
    setAttachment(null);
    setMediaType("");
    setArticleMode(false);
    setActive("For you");
  };

  // EDIT POST
  const editPost = (id, newText) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? { ...post, text: newText }
          : post
      )
    );
  };

  // DELETE POST
  const deletePost = (id) => {
    setPosts((current) =>
      current.filter((post) => post.id !== id)
    );
  };

  return (
    <main className="feed" id="feed">

      {/* WELCOME SECTION */}

      <div className="welcome">

        <div>

          <div className="eyebrow">
            YOUR WORLD, ALL IN ONE PLACE
            <span>&#10035;</span>
          </div>

          <h1>
            Welcome Back, Aanya
            <span>&#10035;</span>
          </h1>

          <p>
            Discover, connect, and make your next move.
          </p>

        </div>

        <span className="welcome-spark">
          &#10035;
        </span>

      </div>

      {/* CREATE POST */}

      <section className="card composer">

        <form onSubmit={createPost}>

          <div className="composer-top">

            <Avatar initials="AP" tone="peach" />

            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={
                articleMode
                  ? "Write your article..."
                  : "Share something with your circle..."
              }
              aria-label="Write a post"
            />

            <button
              className="post-button"
              type="submit"
              disabled={!draft.trim() && !attachment}
            >
              {articleMode ? "Publish" : "Post"}
            </button>

          </div>

          {/* ATTACHMENT PREVIEW */}

          {attachment && (
            <div className="composer-preview">

              {mediaType === "image" ? (
                <img
                  src={attachment}
                  alt="Selected upload"
                />
              ) : (
                <video
                  src={attachment}
                  controls
                />
              )}

              <button
                type="button"
                onClick={() => {
                  URL.revokeObjectURL(attachment);
                  setAttachment(null);
                  setMediaType("");
                }}
              >
                Remove attachment ✕
              </button>

            </div>
          )}

        </form>

        {/* COMPOSER OPTIONS */}

        <div className="composer-options">

          <label>
            <Icon name="image" size={18} />
            Photo

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleUpload(e, "image")}
            />
          </label>

          <label>
            <Icon name="video" size={18} />
            Video

            <input
              type="file"
              accept="video/*"
              hidden
              onChange={(e) => handleUpload(e, "video")}
            />
          </label>

          <button
            type="button"
            onClick={() => setArticleMode((value) => !value)}
          >
            <Icon name="edit" size={18} />
            {articleMode ? "Write a post" : "Write an article"}
          </button>

          <small>Share your story</small>

        </div>

      </section>

      {/* FEED TITLE */}

      <div className="feed-title">

        <div>
          <h2>Your feed</h2>
          <p>
            A little inspiration for wherever life takes you.
          </p>
        </div>

        <span>
          Sort by: <strong>{active}</strong>
        </span>

      </div>

      {/* CATEGORY FILTERS */}

      <div className="filter-list" aria-label="Filter feed">

        {interests.map((item) => (
          <button
            key={item.name}
            className={active === item.name ? "active" : ""}
            onClick={() => setActive(item.name)}
          >
            {item.icon} &nbsp;{item.name}
          </button>
        ))}

      </div>

      {/* FEED POSTS */}

      {visible.length > 0 ? (
        visible.map((post) => (
          <FeedPost
            key={post.id}
            post={post}
            onEdit={editPost}
            onDelete={deletePost}
          />
        ))
      ) : (
        <div className="card empty">
          No posts in this interest yet.
          Start the conversation above.
        </div>
      )}

    </main>
  );
}

/* =====================================================
   RIGHT SIDEBAR
===================================================== */

function Rightbar() {
  const [following, setFollowing] = useState([]);

  return (
    <aside className="right-column" id="discover">

      {/* EXPLORE INTERESTS */}

      <section className="card discover">

        <div className="section-heading">

          <div>
            <h3>Explore your interests</h3>
            <p>One life, so many possibilities.</p>
          </div>

          <span>&#10035;</span>

        </div>

        {interests.slice(1).map((item) => (
          <div className="interest" key={item.name}>

            <span className={`interest-icon ${item.color}`}>
              {item.icon}
            </span>

            <div>
              <strong>{item.name}</strong>
              <small>Explore {item.brand}</small>
            </div>

            <span className="interest-arrow">›</span>

          </div>
        ))}

        <a href="/discover" className="text-link">
          Discover more <span>›</span>
        </a>

      </section>

      {/* PEOPLE TO CONNECT */}

      <section className="card people">

        <div className="section-heading">

          <div>
            <h3>People to connect with</h3>
            <p>Grow your circle, your way.</p>
          </div>

          <span>&#10035;</span>

        </div>

        {people.map((person) => (
          <div className="person" key={person.name}>

            <Avatar
              initials={person.avatar}
              tone={person.tone}
            />

            <div>
              <strong>{person.name}</strong>

              <small>{person.role}</small>

              <button
                className={
                  following.includes(person.name)
                    ? "following-button"
                    : ""
                }
                onClick={() =>
                  setFollowing((current) =>
                    current.includes(person.name)
                      ? current.filter(
                          (name) => name !== person.name
                        )
                      : [...current, person.name]
                  )
                }
              >
                {following.includes(person.name)
                  ? "Following"
                  : "+ Follow"}
              </button>

            </div>

          </div>
        ))}

        <a href="/network" className="text-link">
          See all suggestions <span>›</span>
        </a>

      </section>

      {/* COMMUNITY CARD */}

      <section className="join-card">

        <span>&#10035;</span>

        <h3>Better together.</h3>

        <p>
          Find your people, share your story,
          and discover what’s next.
        </p>

        <a href="/network">
          Explore communities
        </a>

      </section>

    </aside>
  );
}




/* =====================================================
   DISCOVER PAGE
===================================================== */

export function Discover() {
  const [selected, setSelected] = useState(null);

  const descriptions = {
    Weddings: "Inspiration and trusted vendors for your special day.",
    Immigration: "Guidance for your journey across borders.",
    Travel: "Discover places and experiences worth sharing.",
    Careers: "Find opportunities to learn and grow.",
  };

  return (
    <>
      <div className="section-intro">
        <div>
          <div className="eyebrow">FIND WHAT MOVES YOU</div>
          <h1>Discover something new</h1>
          <p>
            Explore ideas, communities and services for every chapter of life.
          </p>
        </div>
      </div>

      <div className="section-grid discover-grid">
        {interests.slice(1).map((item) => (
          <button
            className="card discovery-tile"
            key={item.name}
            onClick={() => setSelected(item)}
          >
            <span className={`interest-icon ${item.color}`}>
              {item.icon}
            </span>

            <small>{item.brand}</small>
            <h2>{item.name}</h2>
            <p>{descriptions[item.name]}</p>
            <strong>Explore {item.name}</strong>
          </button>
        ))}
      </div>

      {selected && (
        <div className="card section-panel">
          <h2>
            Explore {selected.name} with {selected.brand}
          </h2>

          <p>
            Discover community stories and services related to{" "}
            {selected.name.toLowerCase()}.
          </p>

          <button onClick={() => setSelected(null)}>
            Close
          </button>
        </div>
      )}
    </>
  );
}


/* =====================================================
   DASHBOARD
===================================================== */

export default function Dashboard() {
  return (
    <div id="home">

      <Header />

      <div className="layout">

        <Sidebar />

        <Feed />

        <Rightbar />

      </div>

    </div>
  );
}
