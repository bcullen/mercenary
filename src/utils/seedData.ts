import { Role, Contact, Activity } from '../types';

export const FAKE_CONTACTS: Contact[] = [
    {
        id: 'c1',
        name: 'Sarah Miller',
        type: 'Recruiter',
        company: 'TechCorp',
        email: 'sarah.m@techcorp.com',
        linkedin: 'https://linkedin.com/in/sarahmiller',
        notes: 'Very responsive recruiter.'
    },
    {
        id: 'c2',
        name: 'John Doe',
        type: 'Personal',
        email: 'john.doe@gmail.com',
        notes: 'Met at the networking event last month.'
    },
    {
        id: 'c3',
        name: 'Emily Chen',
        type: 'Hiring Manager',
        company: 'Skyline AI',
        linkedin: 'https://linkedin.com/in/emilychen',
    }
];

export const FAKE_ROLES: Role[] = [
    {
        id: 'r1',
        company: 'TechCorp',
        position: 'Senior Frontend Engineer',
        status: 'Applied',
        dateApplied: '2026-01-15',
        link: 'https://techcorp.com/careers/123',
        notes: 'Used referral from Mark.',
        contactId: 'c1',
        updatedAt: '2026-01-15T10:00:00Z'
    },
    {
        id: 'r2',
        company: 'Skyline AI',
        position: 'Staff Software Engineer',
        status: 'Interviewing',
        dateApplied: '2026-01-20',
        notes: 'Technical screen went well.',
        contactId: 'c3',
        updatedAt: '2026-01-25T14:30:00Z'
    },
    {
        id: 'r3',
        company: 'InnovateSoft',
        position: 'Lead Web Developer',
        status: 'Interested',
        updatedAt: '2026-01-28T09:00:00Z'
    }
];

export const FAKE_ACTIVITIES: Activity[] = [
    {
        id: 'a1',
        roleId: 'r1',
        contactId: 'c1',
        type: 'Email',
        description: 'Sent follow-up email to Sarah about the application status.',
        date: '2026-01-20'
    },
    {
        id: 'a2',
        roleId: 'r2',
        contactId: 'c3',
        type: 'Interview',
        description: 'Technical interview with Emily covering React and system design.',
        date: '2026-01-25'
    },
    {
        id: 'a3',
        contactId: 'c2',
        type: 'Message',
        description: 'Messaged John on LinkedIn to grab coffee and talk about current openings.',
        date: '2026-01-27'
    },
    {
        id: 'a4',
        roleId: 'r2',
        contactId: 'c3',
        type: 'Email',
        description: 'Emily sent a follow-up email about the second round of interviews.',
        date: '2026-01-26'
    },
    {
        id: 'a5',
        roleId: 'r1',
        contactId: 'c1',
        type: 'Call',
        description: 'Quick check-in call with Sarah regarding benefits package.',
        date: '2026-01-22'
    },
    {
        id: 'a6',
        roleId: 'r3',
        type: 'Follow-up',
        description: 'Internal reminder to find a contact at InnovateSoft.',
        date: '2026-01-29'
    },
    {
        id: 'a7',
        roleId: 'r2',
        contactId: 'c3',
        type: 'Interview',
        description: 'Round 2: System design and architectural deep dive.',
        date: '2026-01-28'
    },
    {
        id: 'a8',
        contactId: 'c2',
        type: 'Call',
        description: 'Coffee chat with John. He mentioned a vacancy on the mobile team.',
        date: '2026-01-30'
    }
];

export const seedTestData = () => {
    localStorage.setItem('m_roles', JSON.stringify(FAKE_ROLES));
    localStorage.setItem('m_contacts', JSON.stringify(FAKE_CONTACTS));
    localStorage.setItem('m_activities', JSON.stringify(FAKE_ACTIVITIES));
    window.location.reload(); // Reload to reflect changes
};
