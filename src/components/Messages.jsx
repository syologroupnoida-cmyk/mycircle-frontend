"use client";

import { useState } from "react";
import { Avatar, Icon } from "./Shared";

const conversations = [
  { name: "Meera Kapoor", role: "Founder at The Thoughtful Co.", avatar: "MK", tone: "rose", messages: ["Hi Aanya! It was lovely connecting with you.", "That sounds like a great idea!"] },
  { name: "Arjun Mehta", role: "Career Coach & Mentor", avatar: "AM", tone: "blue", messages: ["Thanks for sharing those resources."] },
  { name: "Sarah Williams", role: "Travel Creator & Storyteller", avatar: "SW", tone: "peach", messages: ["Where are you travelling next?"] },
  { name: "Riya Malhotra", role: "Wedding Planner", avatar: "RM", tone: "lavender", messages: ["Hello Aanya! Great to connect with you."] },
  { name: "Kabir Singh", role: "Global Mobility Consultant", avatar: "KS", tone: "mint", messages: ["Let me know if you have any questions."] },
  { name: "Nisha Rao", role: "Senior Product Designer", avatar: "NR", tone: "rose", messages: ["I'd love to hear more about your work."] },
];

export default function Messages() {
  const [selected, setSelected] = useState(null);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState({});
  const conversation = selected === null ? null : conversations[selected];

  function openConversation(index) {
    setDraft("");
    setSelected(index);
  }

  return <>
    <div className="network-intro messages-intro">
      <div className="network-intro-icon"><Icon name="message" size={20}/></div>
      <div className="eyebrow">KEEP IN TOUCH</div>
      <h1>Good conversations<br/><span>start here.</span></h1>
      <p>Choose someone in your circle and say hello.</p>
    </div>
    {conversation ? <section className="card message-conversation" aria-label={`Conversation with ${conversation.name}`}>
      <div className="conversation-header">
        <button className="back-to-people" onClick={() => openConversation(null)} aria-label="Back to people">&#8249;</button>
        <Avatar initials={conversation.avatar} tone={conversation.tone}/>
        <div><strong>{conversation.name}</strong><small>{conversation.role}</small></div>
      </div>
      <div className="conversation-body" aria-live="polite">
        <div className="conversation-date">Your conversation</div>
        {conversation.messages.map((message, i) => <p className="bubble" key={i}>{message}</p>)}
        {(sent[selected] || []).map((message, i) => <p className="bubble mine" key={i}>{message}</p>)}
      </div>
      <form className="thread-form" onSubmit={e => { e.preventDefault(); if (draft.trim()) { setSent(current => ({...current, [selected]: [...(current[selected] || []), draft.trim()]})); setDraft(""); } }}>
        <input aria-label={`Message ${conversation.name}`} placeholder="Write a message..." value={draft} onChange={e => setDraft(e.target.value)}/>
        <button className="post-button" disabled={!draft.trim()}>Send</button>
      </form>
    </section> : <>
      <div className="network-heading"><div><h2>Your conversations</h2><p>Pick up where you left off</p></div><span>{conversations.length} people</span></div>
      <div className="section-grid message-people-grid">{conversations.map((person, i) => <article className="card message-person" key={person.name}>
        <div className={`network-cover ${person.tone}`}><span aria-hidden="true">&#10035;</span></div>
        <div className="message-person-body"><Avatar initials={person.avatar} tone={person.tone} large/><h3>{person.name}</h3><p>{person.role}</p><button className="connect-button" onClick={() => openConversation(i)}><Icon name="message" size={16}/> Message</button></div>
      </article>)}</div>
    </>}
  </>;
}
