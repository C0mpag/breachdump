export const siteConfig = {
  name: 'Branching Out SEQ',
  description:
    'Friendly, reliable lawn mowing and property maintenance across Brisbane Southside, Logan, and the Gold Coast.',
  url: 'https://www.branchingoutseq.com.au',
  phone: '0400 123 456',
  email: 'hello@branchingoutseq.com.au',
  abn: '12 345 678 901',
  priceRange: '$$',
  openingHours: ['Mo-Fr 07:00-17:30', 'Sa 08:00-13:00'],
  areasServed: ['Brisbane Southside', 'Logan', 'Beenleigh', 'Ormeau', 'Pimpama', 'Yatala'],
  social: {
    facebook: 'https://www.facebook.com/branchingoutseq',
    instagram: 'https://www.instagram.com/branchingoutseq'
  }
} as const;

export const businessAddress = {
  street: 'Service-based business',
  suburb: 'Logan, QLD',
  postcode: '4207',
  country: 'Australia'
};
