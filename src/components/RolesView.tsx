import React, { useState, useRef, useEffect } from 'react';
import { Plus, Link as LinkIcon, Calendar, MoreVertical, Database, Edit2, Trash2, X } from 'lucide-react';
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
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [newRole, setNewRole] = useState<Omit<Role, 'id' | 'updatedAt'>>({
        company: '',
        position: '',
        status: 'Interested',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingRole) {
            onUpdate(editingRole.id, {
                company: editingRole.company,
                position: editingRole.position,
                status: editingRole.status,
                updatedAt: new Date().toISOString()
            });
            setEditingRole(null);
        } else {
            if (!newRole.company || !newRole.position) return;
            onAdd(newRole);
            setNewRole({ company: '', position: '', status: 'Interested' });
            setIsAdding(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div className="flex-between mb-3">
                <h1 className="m-0">Roles</h1>
                {!isAdding && !editingRole && (
                    <button onClick={() => setIsAdding(true)}>
                        <Plus size={20} /> Add Role
                    </button>
                )}
            </div>

            {(isAdding || editingRole) && (
                <form onSubmit={handleSubmit} className="card mb-3">
                    <div className="flex-between mb-2">
                        <h2 className="m-0 font-sm">{editingRole ? 'Edit Role' : 'Add New Role'}</h2>
                        <button type="button" className="secondary p-04 br-50 bg-none border-none" onClick={() => { setIsAdding(false); setEditingRole(null); }}>
                            <X size={18} />
                        </button>
                    </div>
                    <div className="flex flex-col gap-1">
                        <input
                            className="input"
                            placeholder="Company"
                            value={editingRole ? editingRole.company : newRole.company}
                            onChange={(e) => editingRole
                                ? setEditingRole({ ...editingRole, company: e.target.value })
                                : setNewRole({ ...newRole, company: e.target.value })}
                            required
                        />
                        <input
                            className="input"
                            placeholder="Position"
                            value={editingRole ? editingRole.position : newRole.position}
                            onChange={(e) => editingRole
                                ? setEditingRole({ ...editingRole, position: e.target.value })
                                : setNewRole({ ...newRole, position: e.target.value })}
                            required
                        />
                        <select
                            className="input"
                            value={editingRole ? editingRole.status : newRole.status}
                            onChange={(e) => editingRole
                                ? setEditingRole({ ...editingRole, status: e.target.value as RoleStatus })
                                : setNewRole({ ...newRole, status: e.target.value as RoleStatus })}
                        >
                            <option value="Interested">Interested</option>
                            <option value="Applied">Applied</option>
                            <option value="Interviewing">Interviewing</option>
                            <option value="Offered">Offered</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <div className="flex-between gap-1">
                            <button type="button" className="secondary flex-1" onClick={() => { setIsAdding(false); setEditingRole(null); }}>
                                Cancel
                            </button>
                            <button type="submit" className="flex-1">
                                {editingRole ? 'Save Changes' : 'Add'}
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
                            <div className="table-cell actions dropdown-container">
                                <button
                                    className="action-btn bg-none border-none p-0"
                                    onClick={() => setActiveMenu(activeMenu === role.id ? null : role.id)}
                                    title="Menu"
                                >
                                    <MoreVertical size={18} />
                                </button>

                                {activeMenu === role.id && (
                                    <>
                                        <div className="overlay" onClick={() => setActiveMenu(null)} />
                                        <div className="dropdown-menu">
                                            <button className="dropdown-item" onClick={() => { setEditingRole(role); setActiveMenu(null); }}>
                                                <Edit2 size={14} /> Edit
                                            </button>
                                            <button className="dropdown-item danger" onClick={() => { onDelete(role.id); setActiveMenu(null); }}>
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
