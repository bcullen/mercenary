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
        <div className="container" style={{ maxWidth: '800px' }}>
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
                    <div className="flex flex-col gap-1">
                        <input
                            className="input"
                            placeholder="Company"
                            value={newRole.company}
                            onChange={(e) => setNewRole({ ...newRole, company: e.target.value })}
                            required
                        />
                        <input
                            className="input"
                            placeholder="Position"
                            value={newRole.position}
                            onChange={(e) => setNewRole({ ...newRole, position: e.target.value })}
                            required
                        />
                        <select
                            className="input"
                            value={newRole.status}
                            onChange={(e) => setNewRole({ ...newRole, status: e.target.value as RoleStatus })}
                        >
                            <option value="Interested">Interested</option>
                            <option value="Applied">Applied</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Offered">Offered</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <div className="flex-between gap-1">
                            <button type="button" className="secondary flex-1" onClick={() => setIsAdding(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="flex-1">
                                Add
                            </button>
                        </div>
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
                <div className="table">
                    <div className="table-header">
                        <div className="table-cell grow-2">Position / Company</div>
                        <div className="table-cell shrink hide-mobile">Status</div>
                        <div className="table-cell shrink hide-mobile">Applied</div>
                        <div className="table-cell actions"></div>
                    </div>
                    {roles.map((role) => (
                        <div key={role.id} className="table-row">
                            <div className="table-cell grow-2 flex-col items-start overflow-hidden">
                                <div className="font-600 w-full overflow-hidden" style={{ textOverflow: 'ellipsis' }}>
                                    {role.position}
                                </div>
                                <div className="text-muted font-xs w-full overflow-hidden" style={{ textOverflow: 'ellipsis' }}>
                                    {role.company}
                                </div>
                            </div>
                            <div className="table-cell shrink hide-mobile">
                                <span className={`badge badge-${role.status.toLowerCase()}`} style={{ fontSize: '0.65rem' }}>
                                    {role.status}
                                </span>
                            </div>
                            <div className="table-cell shrink hide-mobile text-muted">
                                {role.dateApplied || '-'}
                            </div>
                            <div className="table-cell actions">
                                <button
                                    className="secondary p-04 br-50 bg-none border-none"
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
