import React, { useState } from 'react';
import { Briefcase, Users, ClipboardList, Menu, Database, Trash2, X } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Role, Contact, Activity } from './types';
import { RolesView } from './components/RolesView';
import { ContactsView } from './components/ContactsView';
import { seedTestData } from './utils/seedData';
import { ActivityLog } from './components/ActivityLog';

function App() {
    const [activeTab, setActiveTab] = useState<'roles' | 'contacts'>('roles');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [roles, setRoles, roleOps] = useLocalStorage<Role[]>('m_roles', []);
    const [contacts, setContacts, contactOps] = useLocalStorage<Contact[]>('m_contacts', []);
    const [activities, setActivities, activityOps] = useLocalStorage<Activity[]>('m_activities', []);

    const handleAddRole = (roleData: Omit<Role, 'id' | 'updatedAt'>) => {
        const newRole: Role = {
            ...roleData,
            id: crypto.randomUUID(),
            updatedAt: new Date().toISOString(),
        };
        roleOps.addItem(newRole);
    };

    const handleAddContact = (contactData: Omit<Contact, 'id'>) => {
        const newContact: Contact = {
            ...contactData,
            id: crypto.randomUUID(),
        };
        contactOps.addItem(newContact);
    };

    const handleAddActivity = (activityData: Omit<Activity, 'id'>) => {
        const newActivity: Activity = {
            ...activityData,
            id: crypto.randomUUID(),
        };
        activityOps.addItem(newActivity);
    };

    const handleClearData = () => {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            setRoles([]);
            setContacts([]);
            setActivities([]);
            setIsMenuOpen(false);
        }
    };

    return (
        <div className="app">
            <header className="header">
                <div className="header-inner container">
                    <div className="flex-between w-full">
                        <div className="flex items-center gap-075">
                            <div className="logo-icon">
                                <Briefcase size={20} />
                            </div>
                            <h1 className="logo-text">Mercenary</h1>
                        </div>
                        <div className="header-actions">
                            <button
                                className="secondary p-04 br-50 bg-none border-none"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>

                            {isMenuOpen && (
                                <>
                                    <div className="overlay" onClick={() => setIsMenuOpen(false)} />
                                    <div className="dropdown-menu">
                                        <button className="dropdown-item" onClick={() => { seedTestData(); setIsMenuOpen(false); }}>
                                            <Database size={18} /> Load Sample Data
                                        </button>
                                        <button className="dropdown-item danger" onClick={handleClearData}>
                                            <Trash2 size={18} /> Clear All Data
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-6 pb-6">
                {activeTab === 'roles' && (
                    <RolesView
                        roles={roles}
                        contacts={contacts}
                        activities={activities}
                        onAdd={handleAddRole}
                        onUpdate={roleOps.updateItem}
                        onDelete={roleOps.removeItem}
                        onAddActivity={handleAddActivity}
                        onDeleteActivity={activityOps.removeItem}
                    />
                )}
                {activeTab === 'contacts' && (
                    <ContactsView
                        contacts={contacts}
                        roles={roles}
                        activities={activities}
                        onAdd={handleAddContact}
                        onUpdate={contactOps.updateItem}
                        onDelete={contactOps.removeItem}
                        onAddActivity={handleAddActivity}
                        onDeleteActivity={activityOps.removeItem}
                    />
                )}

            </main>

            <nav className="nav-bottom">
                <button
                    className={`nav-item ${activeTab === 'roles' ? 'active' : ''} bg-none border-none p-0`}
                    onClick={() => setActiveTab('roles')}
                >
                    <Briefcase size={24} />
                    <span>Roles</span>
                </button>
                <button
                    className={`nav-item ${activeTab === 'contacts' ? 'active' : ''} bg-none border-none p-0`}
                    onClick={() => setActiveTab('contacts')}
                >
                    <Users size={24} />
                    <span>Contacts</span>
                </button>

            </nav>
        </div>
    );
}

export default App;
