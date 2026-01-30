import React, { useState } from 'react';
import { Plus, Mail, Phone, MessageSquare, Calendar, Trash2, Filter, Database } from 'lucide-react';
import { Activity, Role, Contact } from '../types';
import { seedTestData } from '../utils/seedData';

interface ActivityLogProps {
    activities: Activity[];
    roles: Role[];
    contacts: Contact[];
    onAdd: (activity: Omit<Activity, 'id'>) => void;
    onDelete: (id: string) => void;
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ activities, roles, contacts, onAdd, onDelete }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newActivity, setNewActivity] = useState<Omit<Activity, 'id'>>({
        type: 'Email',
        description: '',
        date: new Date().toISOString().split('T')[0],
        roleId: '',
        contactId: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newActivity.description) return;
        onAdd(newActivity);
        setNewActivity({
            type: 'Email',
            description: '',
            date: new Date().toISOString().split('T')[0],
            roleId: '',
            contactId: '',
        });
        setIsAdding(false);
    };

    const getIcon = (type: Activity['type']) => {
        switch (type) {
            case 'Email': return <Mail size={16} />;
            case 'Call': return <Phone size={16} />;
            case 'Message': return <MessageSquare size={16} />;
            case 'Interview': return <Calendar size={16} />;
            case 'Follow-up': return <Filter size={16} />;
            default: return <MessageSquare size={16} />;
        }
    };

    const getRoleName = (id?: string) => roles.find(r => r.id === id)?.position || 'No Role';
    const getContactName = (id?: string) => contacts.find(c => c.id === id)?.name || 'No Contact';

    return (
        <div className="container">
            <div className="flex-between mb-3">
                <h1 className="m-0">Activity</h1>
                {!isAdding && (
                    <button onClick={() => setIsAdding(true)}>
                        <Plus size={20} /> Log Activity
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="card mb-3">
                    <select
                        className="input mb-2"
                        value={newActivity.type}
                        onChange={e => setNewActivity({ ...newActivity, type: e.target.value as any })}
                    >
                        <option value="Email">Email</option>
                        <option value="Call">Call</option>
                        <option value="Message">Message</option>
                        <option value="Interview">Interview</option>
                        <option value="Follow-up">Follow-up</option>
                    </select>

                    <textarea
                        className="input mb-2"
                        placeholder="What happened?"
                        rows={2}
                        value={newActivity.description}
                        onChange={e => setNewActivity({ ...newActivity, description: e.target.value })}
                        required
                    />

                    <input
                        className="input mb-2"
                        type="date"
                        value={newActivity.date}
                        onChange={e => setNewActivity({ ...newActivity, date: e.target.value })}
                    />

                    <select
                        className="input mb-2"
                        value={newActivity.roleId}
                        onChange={e => setNewActivity({ ...newActivity, roleId: e.target.value })}
                    >
                        <option value="">Link to Role (Optional)</option>
                        {roles.map(r => <option key={r.id} value={r.id}>{r.position} @ {r.company}</option>)}
                    </select>

                    <select
                        className="input mb-2"
                        value={newActivity.contactId}
                        onChange={e => setNewActivity({ ...newActivity, contactId: e.target.value })}
                    >
                        <option value="">Link to Contact (Optional)</option>
                        {contacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>

                    <div className="flex-between gap-1">
                        <button type="button" className="secondary flex-1" onClick={() => setIsAdding(false)}>Cancel</button>
                        <button type="submit" className="flex-1">Log</button>
                    </div>
                </form>
            )}

            {activities.length === 0 ? (
                <div className="card empty-state text-muted p-3">
                    <p className="mb-3">No activities logged yet. Log your first interaction or load sample data.</p>
                    <button className="secondary" onClick={seedTestData}>
                        <Database size={18} /> Load Sample Data
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-1">
                    {[...activities].sort((a, b) => b.date.localeCompare(a.date)).map(activity => (
                        <div key={activity.id} className="card">
                            <div className="flex-between mb-2">
                                <div className="flex items-center gap-05">
                                    <div className="text-primary">{getIcon(activity.type)}</div>
                                    <span className="font-600">{activity.type}</span>
                                    <span className="text-muted font-sm">• {activity.date}</span>
                                </div>
                                <button
                                    className="secondary p-04 br-50"
                                    onClick={() => onDelete(activity.id)}
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                            <p className="m-0 mb-2">{activity.description}</p>

                            {(activity.roleId || activity.contactId) && (
                                <div className="flex gap-05 flex-wrap">
                                    {activity.roleId && (
                                        <span className="badge" style={{ background: 'var(--border)', color: 'var(--text-main)' }}>
                                            {getRoleName(activity.roleId)}
                                        </span>
                                    )}
                                    {activity.contactId && (
                                        <span className="badge" style={{ background: 'var(--border)', color: 'var(--text-main)' }}>
                                            {getContactName(activity.contactId)}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
