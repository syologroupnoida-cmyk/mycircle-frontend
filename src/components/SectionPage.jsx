"use client";
import { useState } from "react";
import { Header } from "./Dashboard";
import { Avatar } from "./Shared";
import { interests } from "./data";
import Network from "./Network";
import Messages from "./Messages";

const notices = [
  ["MK", "rose", "Meera Kapoor started following you", "2 hours ago"],
  ["AM", "blue", "Arjun Mehta liked your recent post", "Yesterday"],
  ["TE", "mint", "Travel Together has a new discussion", "2 days ago"],
];
function Discover() {
 const [selected, setSelected] = useState(null);
 return <><div className="section-intro"><div><div className="eyebrow">FIND WHAT MOVES YOU</div><h1>Discover something new</h1><p>Explore ideas, communities and services for every chapter of life.</p></div></div><div className="section-grid discover-grid">{interests.slice(1).map(item => <button className="card discovery-tile" key={item.name} onClick={() => setSelected(item)}><span className={`interest-icon ${item.color}`}>{item.icon}</span><small>{item.brand}</small><h2>{item.name}</h2><p>{({Weddings:"Inspiration and trusted vendors for your special day.",Immigration:"Guidance for your journey across borders.",Travel:"Discover places and experiences worth sharing.",Careers:"Find opportunities to learn and grow."})[item.name]}</p><strong>Explore {item.name}</strong></button>)}</div>{selected && <div className="card section-panel"><h2>Explore {selected.name} with {selected.brand}</h2><p>Discover community stories and service providers related to {selected.name.toLowerCase()}. Specialist portal integrations are coming soon.</p><a className="text-link" href="/">Explore the feed</a></div>}</>;
}
function Notifications() {
 const [read, setRead] = useState(false);
 return <><div className="section-intro"><div><div className="eyebrow">STAY IN THE LOOP</div><h1>Notifications</h1><p>See what's happening in your circle.</p></div><button className="outline-button compact" onClick={() => setRead(true)}>Mark all as read</button></div><div className="card section-panel notifications">{notices.map(([avatar,tone,text,time]) => <div className="notification" key={text}><Avatar initials={avatar} tone={tone}/><div><strong>{text}</strong><small>{time}</small></div>{!read && <span className="unread"/>}</div>)}</div></>;
}
function Profile() { return <><div className="section-intro"><div><div className="eyebrow">YOUR SPACE</div><h1>Your profile</h1><p>A little about you and the things that matter to you.</p></div></div><div className="card profile-page"><div className="cover"></div><div className="profile-page-content"><Avatar initials="AP" tone="peach" large/><h2>Aanya Patel</h2><p>Product Designer & curious explorer</p><small>Bangalore, India</small><div className="profile-stats"><div><strong>284</strong><span>Connections</span></div><div><strong>1.2k</strong><span>Profile views</span></div></div><h3>About</h3><p>Designing meaningful experiences, exploring new places, and connecting with curious people.</p><h3>Interests</h3><div className="filter-list"><span>Careers</span><span>Travel</span><span>Creative communities</span></div></div></div></>; }
export default function SectionPage({ section }) {
 const titles = {network:"My network",discover:"Discover",messages:"Messages",notifications:"Notifications",profile:""};
 return <><Header active={titles[section]}/><main className="section-layout">{section === "network" ? <Network/> : section === "discover" ? <Discover/> : section === "messages" ? <Messages/> : section === "notifications" ? <Notifications/> : <Profile/>}</main></>;
}
