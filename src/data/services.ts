export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  keywords: string[];
  inclusions: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: 'lawn-mowing',
    name: 'Lawn Mowing',
    shortDescription: 'Neat, even cuts that keep your lawn healthy and looking sharp.',
    description:
      'Our lawn mowing service keeps your grass at the right height for the season, delivering a tidy finish every visit. We work with standard blocks, acreage-style yards, and rental properties across South East Queensland, always finishing with a clean edge and a blown-down driveway.',
    keywords: ['lawn mowing', 'regular mowing', 'grass cutting'],
    inclusions: [
      'Height-appropriate mowing for the season',
      'Line trimming around edges and obstacles',
      'Blow-down of paths and driveways',
      'Green waste removal available'
    ],
    faqs: [
      {
        question: 'How often should I schedule mowing?',
        answer:
          'In warmer months we recommend fortnightly mowing, and monthly in cooler months. We will tailor the schedule to your lawn type and growth rate.'
      },
      {
        question: 'Do you mow in the rain?',
        answer:
          'We avoid mowing in heavy rain to protect your lawn. If weather is unsafe, we reschedule and keep you updated.'
      }
    ]
  },
  {
    slug: 'edging',
    name: 'Edging',
    shortDescription: 'Crisp edges along paths, driveways, and garden beds.',
    description:
      'Sharp edging makes a lawn look professionally maintained. We create clean lines that keep turf contained and improve your property’s curb appeal.',
    keywords: ['lawn edging', 'edge trimming'],
    inclusions: ['Manual or powered edging', 'Defined borders for gardens and paths', 'Debris blow-down'],
    faqs: [
      {
        question: 'Can edging be added to mowing visits?',
        answer: 'Yes, most customers bundle edging with mowing for a full tidy finish.'
      }
    ]
  },
  {
    slug: 'whipper-snipping',
    name: 'Whipper Snipping',
    shortDescription: 'Neat trimming around fences, trees, and tight corners.',
    description:
      'Whipper snipping keeps the areas a mower cannot reach looking clean. We trim neatly around posts, fences, and garden edges for a consistent finish.',
    keywords: ['whipper snipping', 'line trimming'],
    inclusions: ['Fence line trimming', 'Around trees and garden beds', 'Spot tidy for uneven areas'],
    faqs: [
      {
        question: 'Will whipper snipping damage my plants?',
        answer: 'We work carefully to protect garden beds and will discuss sensitive areas before starting.'
      }
    ]
  },
  {
    slug: 'hedge-trimming',
    name: 'Hedge Trimming',
    shortDescription: 'Shape and maintain hedges for a tidy, healthy look.',
    description:
      'Keep hedges neat, safe, and at the right height. We trim evenly, remove clippings, and leave your garden looking sharp and balanced.',
    keywords: ['hedge trimming', 'hedge maintenance'],
    inclusions: ['Height control and shaping', 'Clipping removal', 'Seasonal growth advice'],
    faqs: [
      {
        question: 'How often should hedges be trimmed?',
        answer: 'Most hedges benefit from a trim every 6 to 10 weeks depending on growth.'
      }
    ]
  },
  {
    slug: 'green-waste-removal',
    name: 'Green Waste Removal',
    shortDescription: 'Quick removal of lawn clippings and garden waste.',
    description:
      'We take care of green waste so you do not have to. Perfect after a garden clean-up or a big mow, with responsible disposal.',
    keywords: ['green waste removal', 'garden waste'],
    inclusions: ['Bagging and removal', 'Responsible disposal', 'Available with any service'],
    faqs: [
      {
        question: 'Can you remove existing piles of green waste?',
        answer: 'Yes, let us know the approximate size so we bring the right capacity.'
      }
    ]
  },
  {
    slug: 'garden-clean-ups',
    name: 'Garden Clean-Ups',
    shortDescription: 'Seasonal tidy-ups for overgrown or neglected yards.',
    description:
      'From overgrown lawns to leaf litter and garden beds, our clean-up service resets your yard and prepares it for regular maintenance.',
    keywords: ['garden clean up', 'yard tidy'],
    inclusions: ['Weeding and pruning', 'Leaf and debris removal', 'Optional green waste haul'],
    faqs: [
      {
        question: 'Do you handle overgrown lawns?',
        answer: 'Yes, we can knock down overgrown lawns and recommend follow-up care.'
      }
    ]
  },
  {
    slug: 'property-maintenance',
    name: 'Small Landscaping & Property Maintenance',
    shortDescription: 'Light landscaping and outdoor maintenance support.',
    description:
      'For busy homeowners and property managers, we handle the extras: small landscaping refreshes, tidy-ups, and ongoing outdoor maintenance tasks.',
    keywords: ['property maintenance', 'small landscaping'],
    inclusions: ['Mulch top-ups', 'Minor garden bed resets', 'Ongoing maintenance plans'],
    faqs: [
      {
        question: 'Can you customise a maintenance plan?',
        answer: 'Absolutely. Tell us what you need and we will tailor a plan.'
      }
    ]
  }
];

export const serviceBySlug = (slug: string) => services.find((service) => service.slug === slug);
