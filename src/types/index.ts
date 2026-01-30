export type RoleStatus = 'Interested' | 'Applied' | 'Interviewing' | 'Offered' | 'Rejected' | 'Accepted';

export interface Role {
    id: string;
    company: string;
    position: string;
    status: RoleStatus;
    dateApplied?: string;
    link?: string;
    notes?: string;
    contactId?: string; // Links to a personal contact or recruiter
    updatedAt: string;
}

export type ContactType = 'Recruiter' | 'Hiring Manager' | 'Personal' | 'Other';

export interface Contact {
    id: string;
    name: string;
    type: ContactType;
    company?: string;
    email?: string;
    linkedin?: string;
    notes?: string;
}

export interface Activity {
    id: string;
    roleId?: string;
    contactId?: string;
    type: 'Email' | 'Call' | 'Message' | 'Interview' | 'Follow-up';
    description: string;
    date: string;
}
