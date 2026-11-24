"use client";

import { useState } from "react";
import { Avatar, Icon } from "./Shared";

const suggestedPeople = [
  { name: "Meera Kapoor", role: "Founder at The Thoughtful Co.", mutual: 12, avatar: "MK", tone: "rose" },
  { name: "Arjun Mehta", role: "Career Coach & Mentor", mutual: 8, avatar: "AM", tone: "blue" },
  { name: "Sarah Williams", role: "Travel Creator & Storyteller", mutual: 6, avatar: "SW", tone: "peach" },
  { name: "Riya Malhotra", role: "Wedding Planner", mutual: 9, avatar: "RM", tone: "lavender" },
  { name: "Kabir Singh", role: "Global Mobility Consultant", mutual: 4, avatar: "KS", tone: "mint" },
  { name: "Nisha Rao", role: "Senior Product Designer", mutual: 15, avatar: "NR", tone: "rose" },
];

function PersonCard({ person, requested, onConnect }) {
  return <article className="card network-person">
    <div className={`network-cover ${person.tone}`}><span aria-hidden="true">&#10035;</span></div>
    <div className="network-person-body">
      <Avatar initials={person.avatar} tone={person.tone} large />
      <h3>{person.name}</h3>
      <p className="network-role">{person.role}</p>
      <div className="mutual"><Icon name="users" size={15} /> {person.mutual} mutual connections</div>
      <button className={`connect-button ${requested ? "requested" : ""}`} onClick={onConnect} aria-pressed={requested}>{requested ? "Request sent - Cancel" : "+ Connect"}</button>
    </div>
  </article>;
}

export default function Network() {
  const [requests, setRequests] = useState([]);
  return <>
    <div className="network-intro"><div className="network-intro-icon" aria-hidden="true">&#10035;</div><div className="eyebrow">BETTER TOGETHER</div><h1>Your next connection<br/><span>starts here.</span></h1><p>Find your people and grow your circle, one connection at a time.</p><div className="network-summary"><Icon name="users" size={16}/><span><strong>{requests.length}</strong> requests sent</span></div></div>
    <div className="network-heading"><div><h2>People you may know</h2><p>Discover new connections across MyCircle</p></div><span>{suggestedPeople.length} suggestions</span></div>
    <div className="section-grid network-grid">{suggestedPeople.map(person => <PersonCard key={person.name} person={person} requested={requests.includes(person.name)} onConnect={() => setRequests(current => current.includes(person.name) ? current.filter(name => name !== person.name) : [...current, person.name])} />)}</div>
  </>;
}
