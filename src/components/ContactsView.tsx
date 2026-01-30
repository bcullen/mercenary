import React, { useState } from 'react';
import { Plus, Mail, Linkedin, MoreVertical, User, Briefcase, Database } from 'lucide-react';
import { Contact, ContactType } from '../types';
import { seedTestData } from '../utils/seedData';

interface ContactsViewProps {
    contacts: Contact[];
    onAdd: (contact: Omit<Contact, 'id'>) => void;
    onUpdate: (id: string, updates: Partial<Contact>) => void;
    onDelete: (id: string) => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({ contacts, onAdd, onUpdate, onDelete }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
        name: '',
        type: 'Recruiter',
        company: '',
        email: '',
        linkedin: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newContact.name) return;
        onAdd(newContact);
        setNewContact({ name: '', type: 'Recruiter', company: '', email: '', linkedin: '', notes: '' });
        setIsAdding(false);
    };

    return (
        <div className="container">
            <div className="flex-between mb-3">
                <h1 className="m-0">Contacts</h1>
                {!isAdding && (
                    <button onClick={() => setIsAdding(true)}>
                        <Plus size={20} /> Add Contact
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="card mb-3">
                    <input
                        className="input mb-2"
                        placeholder="Name"
                        value={newContact.name}
                        onChange={e => setNewContact({ ...newContact, name: e.target.value })}
                        required
                    />
                    <select
                        className="input mb-2"
                        value={newContact.type}
                        onChange={e => setNewContact({ ...newContact, type: e.target.value as ContactType })}
                    >
                        <option value="Recruiter">Recruiter</option>
                        <option value="Hiring Manager">Hiring Manager</option>
                        <option value="Personal">Personal</option>
                        <option value="Other">Other</option>
                    </select>
                    <input
                        className="input mb-2"
                        placeholder="Company"
                        value={newContact.company}
                        onChange={e => setNewContact({ ...newContact, company: e.target.value })}
                    />
                    <input
                        className="input mb-2"
                        placeholder="Email"
                        type="email"
                        value={newContact.email}
                        onChange={e => setNewContact({ ...newContact, email: e.target.value })}
                    />
                    <input
                        className="input mb-2"
                        placeholder="LinkedIn URL"
                        value={newContact.linkedin}
                        onChange={e => setNewContact({ ...newContact, linkedin: e.target.value })}
                    />
                    <textarea
                        className="input mb-2"
                        placeholder="Notes"
                        rows={3}
                        value={newContact.notes}
                        onChange={e => setNewContact({ ...newContact, notes: e.target.value })}
                    />
                    <div className="flex-between gap-1">
                        <button type="button" className="secondary flex-1" onClick={() => setIsAdding(false)}>Cancel</button>
                        <button type="submit" className="flex-1">Add</button>
                    </div>
                </form>
            )}

            {contacts.length === 0 ? (
                <div className="card empty-state text-muted p-3">
                    <p className="mb-3">No contacts yet. Add your first recruiter or hiring manager, or load sample data.</p>
                    <button className="secondary" onClick={seedTestData}>
                        <Database size={18} /> Load Sample Data
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-1">
                    {contacts.map(contact => (
                        <div key={contact.id} className="card">
                            <div className="flex-between mb-1">
                                <div className="flex items-center gap-075">
                                    <div className="p-04 br-50 text-primary" style={{ background: 'var(--bg-main)', padding: '8px' }}>
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h3 className="m-0">{contact.name}</h3>
                                        <span className="font-xs text-muted">{contact.type}</span>
                                    </div>
                                </div>
                                <button
                                    className="secondary p-04 br-50"
                                    onClick={() => onDelete(contact.id)}
                                >
                                    <MoreVertical size={16} />
                                </button>
                            </div>

                            {contact.company && (
                                <div className="flex items-center gap-05 mb-2 font-sm text-muted">
                                    <Briefcase size={14} /> {contact.company}
                                </div>
                            )}

                            <div className="flex gap-1" style={{ marginTop: '1rem' }}>
                                {contact.email && (
                                    <a href={`mailto:${contact.email}`} className="nav-item font-sm">
                                        <Mail size={18} />
                                        <span>Email</span>
                                    </a>
                                )}
                                {contact.linkedin && (
                                    <a href={contact.linkedin} target="_blank" rel="noreferrer" className="nav-item font-sm">
                                        <Linkedin size={18} />
                                        <span>LinkedIn</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
