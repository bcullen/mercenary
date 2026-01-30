import React, { useState } from 'react';
import { Plus, Link as LinkIcon, Calendar, MoreVertical, Database } from 'lucide-react';
import { Role, RoleStatus } from '../types';
import { seedTestData } from '../utils/seedData';

interface RolesViewProps {
    roles: Role[];
    onAdd: (role: Omit<Role, 'id' | 'updatedAt'>) => void;
    onUpdate: (id: string, updates: Partial<Role>) => void;
    onDelete: (id: string) => void;
}

export const RolesView: React.FC<RolesViewProps> = ({ roles, onAdd, onUpdate, onDelete }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newRole, setNewRole] = useState<Omit<Role, 'id' | 'updatedAt'>>({
        company: '',
        position: '',
        status: 'Interested',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newRole.company || !newRole.position) return;
        onAdd(newRole);
        setNewRole({ company: '', position: '', status: 'Interested' });
        setIsAdding(false);
    };

    return (
        <div className="container">
            <div className="flex-between mb-3">
                <h1 className="m-0">Roles</h1>
                {!isAdding && (
                    <button onClick={() => setIsAdding(true)}>
                        <Plus size={20} /> Add Role
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="card mb-3">
                    <input
                        className="input mb-2"
                        placeholder="Company"
                        value={newRole.company}
                        onChange={e => setNewRole({ ...newRole, company: e.target.value })}
                        required
                    />
                    <input
                        className="input mb-2"
                        placeholder="Position"
                        value={newRole.position}
                        onChange={e => setNewRole({ ...newRole, position: e.target.value })}
                        required
                    />
                    <select
                        className="input mb-2"
                        value={newRole.status}
                        onChange={e => setNewRole({ ...newRole, status: e.target.value as RoleStatus })}
                    >
                        <option value="Interested">Interested</option>
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offered">Offered</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <div className="flex-between gap-1">
                        <button type="button" className="secondary flex-1" onClick={() => setIsAdding(false)}>Cancel</button>
                        <button type="submit" className="flex-1">Add</button>
                    </div>
                </form>
            )}

            {roles.length === 0 ? (
                <div className="card empty-state text-muted p-3">
                    <p className="mb-3">No roles tracked yet. Click Add to begin or load sample data.</p>
                    <button className="secondary" onClick={seedTestData}>
                        <Database size={18} /> Load Sample Data
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-1">
                    {roles.map(role => (
                        <div key={role.id} className="card">
                            <div className="flex-between mb-1">
                                <h3 className="m-0">{role.position}</h3>
                                <span className={`badge badge-${role.status.toLowerCase()}`}>
                                    {role.status}
                                </span>
                            </div>
                            <p className="mb-2 text-muted">{role.company}</p>

                            <div className="flex-between">
                                <div className="flex gap-075 text-muted font-sm">
                                    {role.dateApplied && (
                                        <span className="flex items-center gap-05">
                                            <Calendar size={14} /> {role.dateApplied}
                                        </span>
                                    )}
                                    {role.link && (
                                        <a href={role.link} target="_blank" rel="noreferrer" className="text-primary flex items-center gap-05">
                                            <LinkIcon size={14} /> Job Post
                                        </a>
                                    )}
                                </div>
                                <button
                                    className="secondary p-04 br-50"
                                    onClick={() => onDelete(role.id)}
                                >
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
