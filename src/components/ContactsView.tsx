import React, { useState } from 'react';
import { Plus, Mail, Linkedin, Database, Trash2, X } from 'lucide-react';
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
    const [editingContact, setEditingContact] = useState<Contact | null>(null);
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
        if (editingContact) {
            onUpdate(editingContact.id, {
                name: editingContact.name,
                type: editingContact.type,
                company: editingContact.company,
                email: editingContact.email,
                linkedin: editingContact.linkedin,
                notes: editingContact.notes,
            });
            setEditingContact(null);
        } else {
            if (!newContact.name) return;
            onAdd(newContact);
            setNewContact({ name: '', type: 'Recruiter', company: '', email: '', linkedin: '', notes: '' });
            setIsAdding(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div className="flex-between mb-3">
                <h1 className="m-0">Contacts</h1>
                {!isAdding && !editingContact && (
                    <button onClick={() => setIsAdding(true)}>
                        <Plus size={20} /> Add Contact
                    </button>
                )}
            </div>

            {(isAdding || editingContact) && (
                <form onSubmit={handleSubmit} className="card mb-3">
                    <div className="flex-between mb-2">
                        <h2 className="m-0 font-sm">{editingContact ? 'Edit Contact' : 'Add New Contact'}</h2>
                        <button type="button" className="secondary p-04 br-50 bg-none border-none" onClick={() => { setIsAdding(false); setEditingContact(null); }}>
                            <X size={18} />
                        </button>
                    </div>
                    <div className="flex flex-col gap-1">
                        <input
                            className="input"
                            placeholder="Name"
                            value={editingContact ? editingContact.name : newContact.name}
                            onChange={(e) => editingContact
                                ? setEditingContact({ ...editingContact, name: e.target.value })
                                : setNewContact({ ...newContact, name: e.target.value })}
                            required
                        />
                        <select
                            className="input"
                            value={editingContact ? editingContact.type : newContact.type}
                            onChange={(e) => editingContact
                                ? setEditingContact({ ...editingContact, type: e.target.value as ContactType })
                                : setNewContact({ ...newContact, type: e.target.value as ContactType })}
                        >
                            <option value="Recruiter">Recruiter</option>
                            <option value="Hiring Manager">Hiring Manager</option>
                            <option value="Personal">Personal</option>
                            <option value="Other">Other</option>
                        </select>
                        <input
                            className="input"
                            placeholder="Company"
                            value={editingContact ? editingContact.company : newContact.company}
                            onChange={(e) => editingContact
                                ? setEditingContact({ ...editingContact, company: e.target.value })
                                : setNewContact({ ...newContact, company: e.target.value })}
                        />
                        <input
                            className="input"
                            placeholder="Email"
                            type="email"
                            value={editingContact ? editingContact.email : newContact.email}
                            onChange={(e) => editingContact
                                ? setEditingContact({ ...editingContact, email: e.target.value })
                                : setNewContact({ ...newContact, email: e.target.value })}
                        />
                        <input
                            className="input"
                            placeholder="LinkedIn URL"
                            value={editingContact ? editingContact.linkedin : newContact.linkedin}
                            onChange={(e) => editingContact
                                ? setEditingContact({ ...editingContact, linkedin: e.target.value })
                                : setNewContact({ ...newContact, linkedin: e.target.value })}
                        />
                        <textarea
                            className="input"
                            placeholder="Notes"
                            rows={3}
                            value={editingContact ? editingContact.notes : newContact.notes}
                            onChange={(e) => editingContact
                                ? setEditingContact({ ...editingContact, notes: e.target.value })
                                : setNewContact({ ...newContact, notes: e.target.value })}
                        />
                        <div className="flex-between gap-1">
                            {editingContact ? (
                                <>
                                    <button type="button" className="secondary danger flex-1" onClick={() => { onDelete(editingContact.id); setEditingContact(null); }}>
                                        <Trash2 size={16} /> Delete
                                    </button>
                                    <button type="submit" className="flex-1">
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="secondary flex-1" onClick={() => setIsAdding(false)}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="flex-1">
                                        Add
                                    </button>
                                </>
                            )}
                        </div>
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
                <div className="table">
                    <div className="table-header">
                        <div className="table-cell grow-2">Name / Company</div>
                        <div className="table-cell shrink">Type</div>
                        <div className="table-cell shrink hide-mobile">Links</div>
                    </div>
                    {contacts.map((contact) => (
                        <div key={contact.id} className="table-row">
                            <div
                                className="table-cell grow-2 flex-col items-start overflow-hidden clickable-cell"
                                onClick={() => setEditingContact(contact)}
                            >
                                <div className="font-600 w-full overflow-hidden" style={{ textOverflow: 'ellipsis' }}>
                                    {contact.name || 'Unknown'}
                                </div>
                                <div className="text-muted font-xs w-full overflow-hidden" style={{ textOverflow: 'ellipsis' }}>
                                    {contact.company || '-'}
                                </div>
                            </div>
                            <div className="table-cell shrink">
                                <span className="font-xs" style={{ color: 'var(--text-muted)' }}>{contact.type}</span>
                            </div>
                            <div className="table-cell shrink hide-mobile gap-05">
                                {contact.email && (
                                    <a href={`mailto:${contact.email}`} className="text-primary hover-opacity" title="Email" onClick={e => e.stopPropagation()}>
                                        <Mail size={16} />
                                    </a>
                                )}
                                {contact.linkedin && (
                                    <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-primary hover-opacity" title="LinkedIn" onClick={e => e.stopPropagation()}>
                                        <Linkedin size={16} />
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
