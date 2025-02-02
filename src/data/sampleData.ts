import type { Step, Expert } from '../types';

export const sampleSteps: Step[] = [
  {
    id: '1',
    title: 'Passport Application',
    description: 'Complete guide for applying for a new passport or renewal',
    isOnline: true,
    officialLink: 'https://passport.gov.in',
    children: [
      {
        id: '1.1',
        title: 'Document Collection',
        description: 'Gather all required documents for passport application',
        isOnline: false,
        documents: [
          {
            id: 'd1',
            title: 'Identity Proof Checklist',
            url: 'https://example.com/passport-checklist.pdf',
            type: 'guide'
          }
        ]
      },
      {
        id: '1.2',
        title: 'Online Application',
        description: 'Fill and submit the online passport application form',
        isOnline: true,
        officialLink: 'https://passportindia.gov.in'
      }
    ]
  },
  {
    id: '2',
    title: 'Driving License',
    description: 'Process for obtaining a new driving license',
    isOnline: true,
    officialLink: 'https://parivahan.gov.in',
    children: [
      {
        id: '2.1',
        title: 'Learner\'s License',
        description: 'Apply for a learner\'s license',
        isOnline: true
      },
      {
        id: '2.2',
        title: 'Driving Test',
        description: 'Schedule and prepare for the driving test',
        isOnline: false
      }
    ]
  },
  {
    id: '3',
    title: 'GST Registration',
    description: 'Register your business for GST',
    isOnline: true,
    officialLink: 'https://gst.gov.in',
    children: [
      {
        id: '3.1',
        title: 'Document Preparation',
        description: 'Prepare required business documents',
        isOnline: false
      },
      {
        id: '3.2',
        title: 'Online Registration',
        description: 'Complete the GST registration process online',
        isOnline: true
      }
    ]
  }
];

export const sampleExperts: Expert[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    specialization: 'Passport & Visa Services',
    rating: 4.8,
    pricePerMinute: 5,
    availability: true,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  },
  {
    id: '2',
    name: 'Priya Singh',
    specialization: 'Business Registration & GST',
    rating: 4.9,
    pricePerMinute: 5,
    availability: true,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  },
  {
    id: '3',
    name: 'Amit Patel',
    specialization: 'Property Registration',
    rating: 4.7,
    pricePerMinute: 5,
    availability: false,
    nextAvailableSlot: new Date('2024-03-01T10:00:00'),
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
  }
];