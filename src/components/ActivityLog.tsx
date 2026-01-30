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
            case 'Email': return <Mail size={14} />;
            case 'Call': return <Phone size={14} />;
            case 'Message': return <MessageSquare size={14} />;
            case 'Interview': return <Calendar size={14} />;
            case 'Follow-up': return <Filter size={14} />;
            default: return <MessageSquare size={14} />;
        }
    };

    const getRoleName = (id?: string) => roles.find(r => r.id === id)?.position || 'No Role';
    const getContactName = (id?: string) => contacts.find(c => c.id === id)?.name || 'No Contact';

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
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
                    <div className="flex flex-col gap-1">
                        <select
                            className="input"
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
                            className="input"
                            placeholder="What happened?"
                            rows={2}
                            value={newActivity.description}
                            onChange={e => setNewActivity({ ...newActivity, description: e.target.value })}
                            required
                        />

                        <input
                            className="input"
                            type="date"
                            value={newActivity.date}
                            onChange={e => setNewActivity({ ...newActivity, date: e.target.value })}
                        />

                        <select
                            className="input"
                            value={newActivity.roleId}
                            onChange={e => setNewActivity({ ...newActivity, roleId: e.target.value })}
                        >
                            <option value="">Link to Role (Optional)</option>
                            {roles.map(r => <option key={r.id} value={r.id}>{r.position} @ {r.company}</option>)}
                        </select>

                        <select
                            className="input"
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
                <div className="table">
                    <div className="table-header">
                        <div className="table-cell shrink hide-mobile">Date</div>
                        <div className="table-cell shrink hide-mobile">Type</div>
                        <div className="table-cell grow-3">Description</div>
                        <div className="table-cell actions"></div>
                    </div>
                    {[...activities].sort((a, b) => b.date.localeCompare(a.date)).map(activity => (
                        <div key={activity.id} className="table-row">
                            <div className="table-cell shrink hide-mobile text-muted">
                                {activity.date}
                            </div>
                            <div className="table-cell shrink hide-mobile">
                                <div className="flex items-center gap-05">
                                    <div className="text-primary">{getIcon(activity.type)}</div>
                                    <span className="font-600 font-xs">{activity.type}</span>
                                </div>
                            </div>
                            <div className="table-cell grow-3 flex-col items-start overflow-hidden">
                                <div className="w-full overflow-hidden" style={{ textOverflow: 'ellipsis' }}>
                                    {activity.description}
                                </div>
                                <div className="flex gap-025 mt-05 flex-wrap">
                                    {activity.roleId && (
                                        <span className="badge" style={{ background: 'var(--border)', color: 'var(--text-main)', fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>
                                            {getRoleName(activity.roleId)}
                                        </span>
                                    )}
                                    {activity.contactId && (
                                        <span className="badge" style={{ background: 'var(--border)', color: 'var(--text-main)', fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>
                                            {getContactName(activity.contactId)}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="table-cell actions">
                                <button
                                    className="secondary p-04 br-50 bg-none border-none"
                                    onClick={() => onDelete(activity.id)}
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
