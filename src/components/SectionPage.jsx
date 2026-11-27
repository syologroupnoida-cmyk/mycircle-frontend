"use client";

import { useState } from "react";
import { Header, Discover } from "./Dashboard";
import { Avatar } from "./Shared";
import { interests } from "./data";
import Network from "./Network";
import Messages from "./Messages";
import Notifications from "./Notifications";




function Profile() {
  const [activeTab, setActiveTab] = useState("Posts");
  const [following, setFollowing] = useState([]);
  const [editor, setEditor] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");

  const initialProfile = {
    name: "Aanya Patel",
    pronouns: "She/Her",
    headline: "BIO",
    location: "Noida, India",
    about:"bio",
    language: "English",
    publicUrl: "aanya-patel",
    interests: "Careers, Travel, Creative communities",
  };

  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);

  const [coverImage, setCoverImage] = useState("");
  const [avatarImage, setAvatarImage] = useState("");

  const [posts, setPosts] = useState([]);
  const [postDraft, setPostDraft] = useState("");

  const suggestions = [
    ["SS", "Sanika Shede", "Immediate Joiner | DevOps & Cloud Engineer", "rose"],
    ["GT", "Ganesh Tambe", "Aspiring Data Analyst & Data Scientist", "mint"],
    ["NM", "Nimisha Mohanty", "Computer Science Student", "blue"],
    ["KT", "Khushi Trivedi", "Web Developer Intern", "peach"],
  ];

  // Open editor
  const openEditor = (type) => {
    setDraft({ ...profile });
    setEditor(type);
    setMessage("");
    setMenuOpen(false);
  };

  // Update form fields
  const handleChange = (key, value) => {
    setDraft((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  // Save changes
  const handleSave = (e) => {
    e.preventDefault();

    if (editor === "post") {
      if (!postDraft.trim()) return;

      setPosts((previous) => [
        {
          id: Date.now(),
          text: postDraft.trim(),
          date: "Just now",
        },
        ...previous,
      ]);

      setPostDraft("");
      setMessage("Post published successfully!");
    } else {
      setProfile(draft);
      setMessage("Profile updated successfully!");
    }

    setEditor(null);
  };

  // Image upload
  const handleImageUpload = (e, type) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size must be less than 5 MB.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    if (type === "cover") {
      setCoverImage(imageUrl);
    } else {
      setAvatarImage(imageUrl);
    }

    setEditor(null);
    setMessage("Image preview updated successfully!");
  };

  const closeEditor = () => {
    setEditor(null);
    setDraft({ ...profile });
    setPostDraft("");
  };

  // Form field
  const inputField = (label, key, multiline = false) => (
    <label className="profile-edit-field" key={key}>
      <span>{label}</span>

      {multiline ? (
        <textarea
          rows={4}
          value={draft[key] || ""}
          onChange={(e) => handleChange(key, e.target.value)}
        />
      ) : (
        <input
          value={draft[key] || ""}
          onChange={(e) => handleChange(key, e.target.value)}
        />
      )}
    </label>
  );

  const editorTitles = {
    profile: "Edit introduction",
    about: "Edit About",
    cover: "Update cover photo",
    avatar: "Update profile picture",
    language: "Profile language",
    url: "Public profile URL",
    openTo: "Open to opportunities",
    sections: "Add profile section",
    enhance: "Enhance your profile",
    interests: "Edit interests",
    post: "Create a post",
  };

  const renderEditor = () => {
    if (!editor) return null;

    return (
      <div
        className="profile-modal-backdrop"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeEditor();
        }}
      >
        <section
          className="profile-edit-modal"
          role="dialog"
          aria-modal="true"
        >
          <div className="profile-modal-header">
            <h2>{editorTitles[editor]}</h2>

            <button type="button" onClick={closeEditor}>
              ×
            </button>
          </div>

          <form onSubmit={handleSave}>

            {/* INTRODUCTION */}
            {editor === "profile" && (
              <>
                {inputField("Full name", "name")}
                {inputField("Pronouns", "pronouns")}
                {inputField("Professional headline", "headline", true)}
                {inputField("Location", "location")}
              </>
            )}

            {/* ABOUT */}
            {editor === "about" && (
              inputField("About description", "about", true)
            )}

            {/* LANGUAGE */}
            {editor === "language" && (
              <label className="profile-edit-field">
                <span>Select language</span>

                <select
                  value={draft.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>

                </select>
              </label>
            )}

            {/* PUBLIC URL */}
            {editor === "url" && (
              <>
                {inputField("Profile URL", "publicUrl")}

                <p className="profile-modal-help">
                  Preview: mycircle.com/profile/{draft.publicUrl}
                </p>
              </>
            )}

          


            {/* INTERESTS */}
            {editor === "interests" && (
              <>
                {inputField("Your interests", "interests", true)}
              </>
            )}

            {/* IMAGE UPLOAD */}
            {(editor === "cover" || editor === "avatar") && (
              <label className="profile-upload-area">
                <span className="upload-symbol">↑</span>
                <strong>Choose an image</strong>
                <small>PNG, JPG or WEBP · Maximum 5 MB</small>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) =>
                    handleImageUpload(
                      e,
                      editor === "cover" ? "cover" : "avatar"
                    )
                  }
                />
              </label>
            )}

            {/* CREATE POST */}
            {editor === "post" && (
              <label className="profile-edit-field">
                <span>Share something with your circle</span>

                <textarea
                  rows={5}
                  value={postDraft}
                  onChange={(e) => setPostDraft(e.target.value)}
                  placeholder="What would you like to share?"
                  required
                />
              </label>
            )}

            {/* ADD SECTION */}
            {editor === "sections" && (
              <div className="profile-section-choices">

                <button type="button" onClick={() => openEditor("about")}>
                  ＋ Add About
                </button>

                <button type="button" onClick={() => openEditor("interests")}>
                  ＋ Add interests
                </button>
              </div>
            )}

            {/* ENHANCE */}
            {editor === "enhance" && (
              <div className="profile-section-choices">
                <p>Improve your professional profile.</p>

                <button type="button" onClick={() => openEditor("profile")}>
                  Edit introduction →
                </button>

                <button type="button" onClick={() => openEditor("about")}>
                  Improve About →
                </button>

               

               
              </div>
            )}

            {/* MORE ACTIONS */}
            {editor === "more" && (
              <div className="profile-section-choices">
                <button type="button" onClick={() => openEditor("profile")}>
                  Edit introduction
                </button>

                <button type="button" onClick={() => openEditor("cover")}>
                  Change cover photo
                </button>

                <button type="button" onClick={() => openEditor("avatar")}>
                    Change profile picture
                </button>

                <button
                   type="button"
                   onClick={() => {
                   window.location.href = "/api/auth/google";
                  }}
>
                <img
                 src="https://www.google.com/favicon.ico"
                 alt="Google"
                  width="16"
                 height="16"
                  />
                  Use Google profile picture
                </button>

                <button type="button" onClick={() => openEditor("url")}>
                  Edit public URL
                </button>
              </div>
            )}

            {/* SAVE BUTTONS */}
            {!["cover", "avatar", "sections", "enhance", "more"].includes(editor) && (
              <div className="profile-modal-actions">
                <button
                  type="button"
                  className="profile-modal-cancel"
                  onClick={closeEditor}
                >
                  Cancel
                </button>

                <button type="submit" className="profile-modal-save">
                  Save changes
                </button>
              </div>
            )}

          </form>
        </section>
      </div>
    );
  };

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      {/* PROFILE INTRO */}
      <div className="section-intro profile-intro">
        <div>
          <div className="eyebrow">YOUR PROFESSIONAL IDENTITY</div>
          <h1>Your profile</h1>
          <p>
            Showcase your experience, build credibility and grow your
            professional circle.
          </p>
        </div>
      </div>

      {message && (
        <div className="profile-save-notice" role="status">
          {message}
          <button onClick={() => setMessage("")}>×</button>
        </div>
      )}

      <div className="profile-linkedin-layout">

        {/* LEFT COLUMN */}
        <main className="profile-main-column">

          {/* PROFILE HEADER */}
          <section className="card linkedin-hero">

            <div
              className="linkedin-cover"
              style={
                coverImage
                  ? {
                      backgroundImage: `url(${coverImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            >
              {!coverImage && (
                <>
                  <div className="cover-orbit orbit-one" />
                  <div className="cover-orbit orbit-two" />

                  <div className="cover-copy">
                    <span>BUILD · CONNECT · GROW</span>
                    <strong>{profile.name}</strong>
                  </div>
                </>
              )}

              <button
                className="profile-edit-cover"
                onClick={() => openEditor("cover")}
                title="Edit cover photo"
              >
                ✎
              </button>
            </div>

            <div className="linkedin-hero-content">

              {avatarImage ? (
                <img
                  src={avatarImage}
                  className="profile-photo-image"
                  alt="Profile"
                />
              ) : (
                <Avatar initials={initials} tone="peach" large />
              )}

              <button
                className="profile-edit-main"
                onClick={() => openEditor("profile")}
                title="Edit profile"
              >
                ✎
              </button>

              <button
                className="profile-photo-edit"
                onClick={() => openEditor("avatar")}
                title="Change profile photo"
              >
                +
              </button>

              <div className="linkedin-identity">

                <div className="linkedin-name-row">
                  <h2>{profile.name}</h2>
                  <span className="profile-pronouns">
                    {profile.pronouns}
                  </span>
                </div>

                <p className="linkedin-headline">
                  {profile.headline}
                </p>

                <p className="linkedin-location">
                  {profile.location}
                  <span>·</span>

                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      openEditor("profile");
                    }}
                  >
                    Contact info
                  </a>
                </p>

                <a className="profile-connections" href="#activity">
                  10 connections
                </a>

                <div className="profile-action-row">

                  <button
                    className="profile-primary-action"
                    onClick={() => openEditor("openTo")}
                  >
                    Open to
                  </button>

                  <button
                    className="profile-secondary-action"
                    onClick={() => openEditor("sections")}
                  >
                    Add profile section
                  </button>

                  <button
                    className="profile-secondary-action"
                    onClick={() => openEditor("enhance")}
                  >
                    Enhance profile
                  </button>

                  <div className="profile-more-wrap">
                    <button
                      className="profile-more-action"
                      onClick={() => setMenuOpen((v) => !v)}
                      aria-expanded={menuOpen}
                    >
                      ···
                    </button>

                    {menuOpen && (
                      <div className="profile-more-menu">
                        <button onClick={() => openEditor("more")}>
                          More profile actions
                        </button>
                        <button onClick={() => openEditor("url")}>
                          Edit public URL
                        </button>
                        <button onClick={() => openEditor("cover")}>
                          Change cover
                        </button>
                        <button onClick={() => openEditor("avatar")}>
                          Change profile photo
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>
          </section>

         

          {/* DASHBOARD */}
          <section className="card profile-dashboard" id="dashboard">
            <div className="profile-card-heading">
              <div>
                <h2>Dashboard</h2>
                <span>◉ &nbsp;Private to you</span>
              </div>
            </div>

            <div className="profile-metrics">
              <div>
                <span className="metric-icon">♟</span>
                <div>
                  <strong>2 profile views</strong>
                  <p>Discover who's viewed your profile.</p>
                </div>
              </div>

              <div>
                <span className="metric-icon">▥</span>
                <div>
                  <strong>0 post impressions</strong>
                  <p>Start a post to increase engagement.</p>
                  <small>Past 7 days</small>
                </div>
              </div>

              <div>
                <span className="metric-icon">⌕</span>
                <div>
                  <strong>7 search appearances</strong>
                  <p>See how often you appear in search results.</p>
                </div>
              </div>
            </div>

            <a className="profile-show-all" href="#activity">
              Show all →
            </a>
          </section>

          {/* ABOUT */}
          <section className="card profile-about" id="about">
            <div className="profile-card-heading">
              <h2>About</h2>
              <button onClick={() => openEditor("about")}>✎</button>
            </div>
            <p>{profile.about}</p>
          </section>

         

          

          {/* INTERESTS */}
          <section className="card profile-about">
            <div className="profile-card-heading">
              <h2>Interests</h2>
              <button onClick={() => openEditor("interests")}>✎</button>
            </div>
            <p>{profile.interests}</p>
          </section>

          {/* ACTIVITY */}
          <section className="card profile-activity" id="activity">

            <div className="profile-card-heading activity-heading">
              <div>
                <h2>Activity</h2>
                <a href="#activity">0 followers</a>
              </div>

              <div className="activity-actions">
                <button
                  className="profile-secondary-action"
                  onClick={() => openEditor("post")}
                >
                  Create a post
                </button>

                <button onClick={() => openEditor("post")}>
                  ✎
                </button>
              </div>
            </div>

            <div className="activity-tabs">
              {["Posts", "Comments", "Images"].map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Posts" ? (
              posts.length ? (
                posts.map((post) => (
                  <div className="activity-item" key={post.id}>
                    <small>
                      {profile.name} shared an update · {post.date}
                    </small>
                    <p>{post.text}</p>
                  </div>
                ))
              ) : (
                <div className="activity-empty">
                  No posts yet. Create your first post!
                </div>
              )
            ) : (
              <div className="activity-empty">
                Your {activeTab.toLowerCase()} activity will appear here.
              </div>
            )}

          </section>
        </main>

        {/* RIGHT COLUMN */}
        <aside className="profile-side-column">

          {/* PROFILE SETTINGS */}
          <section className="card profile-side-card profile-public-card">

            <div className="profile-side-setting">
              <div>
                <h3>Profile language</h3>
                <p>{profile.language}</p>
              </div>
              <button onClick={() => openEditor("language")}>✎</button>
            </div>

            <div className="profile-side-setting">
              <div>
                <h3>Public profile & URL</h3>
                <p>mycircle.com/profile/{profile.publicUrl}</p>
              </div>
              <button onClick={() => openEditor("url")}>✎</button>
            </div>

          </section>

          {/* PEOPLE */}
          <section className="card profile-side-card">
            <h3>People you may know</h3>

            <p className="profile-side-subtitle">
              From your professional community
            </p>

            {suggestions.map(([initials, name, role, tone]) => (
              <div className="profile-suggestion" key={name}>
                <Avatar initials={initials} tone={tone} />

                <div>
                  <strong>{name}</strong>
                  <p>{role}</p>

                  <button
                    className={following.includes(name) ? "is-following" : ""}
                    onClick={() =>
                      setFollowing((current) =>
                        current.includes(name)
                          ? current.filter((item) => item !== name)
                          : [...current, name]
                      )
                    }
                  >
                    {following.includes(name) ? "Requested" : "＋ Connect"}
                  </button>
                </div>
              </div>
            ))}

            <a className="profile-side-see-all" href="/network">
              Show all
            </a>
          </section>

          {/* PROFILE RESOURCES */}
          <section className="card profile-side-card profile-resources">
            <h3>Profile resources</h3>
            <p>Make your profile work harder for you.</p>

            <a
              href="#about"
              onClick={() => openEditor("about")}
            >
              Improve your About section →
            </a>

            <a
              href="#activity"
              onClick={() => openEditor("skills")}
            >
              Add your skills →
            </a>
          </section>

        </aside>
      </div>

      {renderEditor()}
    </>
  );
}

export default function SectionPage({ section }) {
  const titles = {
    network: "My network",
    discover: "Discover",
    messages: "Messages",
    notifications: "Notifications",
    profile: "",
  };

  return (
    <>
      <Header active={titles[section]} />

      <main
        className={`section-layout ${
          section === "profile" ? "profile-section-layout" : ""
        }`}
      >
        {section === "network" ? (
          <Network />
        ) : section === "discover" ? (
          <Discover />
        ) : section === "messages" ? (
          <Messages />
        ) : section === "notifications" ? (
          <Notifications />
        ) : (
          <Profile />
        )}
      </main>
    </>
  );
}