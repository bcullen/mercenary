import React, { useState } from 'react';
import { Plus, Mail, Phone, MessageSquare, Calendar, Trash2, Filter } from 'lucide-react';
import { Activity, Role, Contact } from '../types';

interface ActivitySectionProps {
    activities: Activity[];
    roles: Role[];
    contacts: Contact[];
    onAdd: (activity: Omit<Activity, 'id'>) => void;
    onDelete: (id: string) => void;
    roleId?: string;
    contactId?: string;
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({
    activities,
    roles,
    contacts,
    onAdd,
    onDelete,
    roleId,
    contactId
}) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newActivity, setNewActivity] = useState<Omit<Activity, 'id'>>({
        type: 'Email',
        description: '',
        date: new Date().toISOString().split('T')[0],
        roleId: roleId || '',
        contactId: contactId || '',
    });

    const filteredActivities = activities
        .filter(a => {
            if (roleId) return a.roleId === roleId;
            if (contactId) return a.contactId === contactId;
            return true;
        })
        .sort((a, b) => b.date.localeCompare(a.date));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newActivity.description) return;
        onAdd(newActivity);
        setNewActivity({
            type: 'Email',
            description: '',
            date: new Date().toISOString().split('T')[0],
            roleId: roleId || '',
            contactId: contactId || '',
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
        <div className="activity-section mt-3">
            <div className="flex-between mb-2">
                <h3 className="m-0 font-sm uppercase text-muted tracking-wider">Activity Timeline</h3>
                {!isAdding && (
                    <button className="secondary font-xs py-04" onClick={() => setIsAdding(true)}>
                        <Plus size={14} /> Log
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="card mb-2 p-2 bg-alt">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                            <select
                                className="input flex-1"
                                value={newActivity.type}
                                onChange={e => setNewActivity({ ...newActivity, type: e.target.value as any })}
                            >
                                <option value="Email">Email</option>
                                <option value="Call">Call</option>
                                <option value="Message">Message</option>
                                <option value="Interview">Interview</option>
                                <option value="Follow-up">Follow-up</option>
                            </select>
                            <input
                                className="input flex-1"
                                type="date"
                                value={newActivity.date}
                                onChange={e => setNewActivity({ ...newActivity, date: e.target.value })}
                            />
                        </div>

                        {!roleId && (
                            <select
                                className="input"
                                value={newActivity.roleId}
                                onChange={e => setNewActivity({ ...newActivity, roleId: e.target.value })}
                            >
                                <option value="">Link to Role (Optional)</option>
                                {roles.map(r => <option key={r.id} value={r.id}>{r.position} @ {r.company}</option>)}
                            </select>
                        )}

                        {!contactId && (
                            <select
                                className="input"
                                value={newActivity.contactId}
                                onChange={e => setNewActivity({ ...newActivity, contactId: e.target.value })}
                            >
                                <option value="">Link to Contact (Optional)</option>
                                {contacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        )}

                        <textarea
                            className="input"
                            placeholder="Add a note..."
                            rows={2}
                            value={newActivity.description}
                            onChange={e => setNewActivity({ ...newActivity, description: e.target.value })}
                            required
                        />

                        <div className="flex-between gap-1">
                            <button type="button" className="secondary flex-1 font-xs py-04" onClick={() => setIsAdding(false)}>Cancel</button>
                            <button type="submit" className="flex-1 font-xs py-04">Log Activity</button>
                        </div>
                    </div>
                </form>
            )}

            {filteredActivities.length === 0 ? (
                <div className="text-muted font-xs italic text-center p-2">
                    No activities logged for this {roleId ? 'role' : 'contact'}.
                </div>
            ) : (
                <div className="timeline">
                    {filteredActivities.map(activity => (
                        <div key={activity.id} className="timeline-item flex gap-1 mb-2">
                            <div className="timeline-icon text-primary mt-05">
                                {getIcon(activity.type)}
                            </div>
                            <div className="timeline-content flex-1 card p-15 font-xs">
                                <div className="flex-between mb-05">
                                    <span className="font-600 color-primary">{activity.type}</span>
                                    <span className="text-muted font-xxs">{activity.date}</span>
                                </div>
                                <div className="mb-05">{activity.description}</div>
                                <div className="flex-between items-center">
                                    <div className="flex gap-025 flex-wrap">
                                        {!roleId && activity.roleId && (
                                            <span className="badge-outline">{getRoleName(activity.roleId)}</span>
                                        )}
                                        {!contactId && activity.contactId && (
                                            <span className="badge-outline">{getContactName(activity.contactId)}</span>
                                        )}
                                    </div>
                                    <button
                                        className="bg-none border-none p-0 text-muted hover-danger"
                                        onClick={() => onDelete(activity.id)}
                                        title="Delete Activity"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
