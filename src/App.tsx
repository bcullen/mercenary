import React, { useState } from 'react';
import { Briefcase, Users, ClipboardList } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Role, Contact, Activity } from './types';
import { RolesView } from './components/RolesView';
import { ContactsView } from './components/ContactsView';
import { ActivityLog } from './components/ActivityLog';

function App() {
    const [activeTab, setActiveTab] = useState<'roles' | 'contacts'>('roles');
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

    return (
        <div className="app">
            <main className="pb-6">
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
