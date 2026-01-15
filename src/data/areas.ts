export type Area = {
  slug: string;
  name: string;
  description: string;
  landmarks: string[];
  nearby: string[];
};

export const areas: Area[] = [
  {
    slug: 'brisbane-southside',
    name: 'Brisbane Southside',
    description:
      'Servicing leafy streets, family homes, and busy rentals across the Brisbane Southside with reliable lawn mowing and property maintenance.',
    landmarks: ['Mt Gravatt', 'Eight Mile Plains', 'Sunnybank'],
    nearby: ['Logan', 'Mount Gravatt', 'Wishart']
  },
  {
    slug: 'logan',
    name: 'Logan',
    description:
      'Local, on-time lawn care across Logan, with tidy finishes for residential yards and investment properties.',
    landmarks: ['Logan Central', 'Springwood', 'Browns Plains'],
    nearby: ['Shailer Park', 'Tanah Merah', 'Daisy Hill']
  },
  {
    slug: 'beenleigh',
    name: 'Beenleigh',
    description:
      'Keeping Beenleigh lawns neat with mowing, edging, and green waste removal on flexible schedules.',
    landmarks: ['Beenleigh Town Centre', 'Albert River', 'Eagleby'],
    nearby: ['Eagleby', 'Bahrs Scrub', 'Mount Warren Park']
  },
  {
    slug: 'ormeau',
    name: 'Ormeau',
    description:
      'A dependable mowing crew for Ormeau homes, acreage, and new estates, with seasonal advice included.',
    landmarks: ['Ormeau Hills', 'Ormeau Station', 'Coomera River'],
    nearby: ['Pimpama', 'Coomera', 'Yatala']
  },
  {
    slug: 'pimpama',
    name: 'Pimpama',
    description:
      'Fast, friendly lawn mowing and hedge trimming for Pimpama’s growing neighbourhoods.',
    landmarks: ['Pimpama City Centre', 'Pacific Motorway', 'Pimpama Rivers'],
    nearby: ['Ormeau', 'Coomera', 'Upper Coomera']
  },
  {
    slug: 'yatala',
    name: 'Yatala',
    description:
      'Servicing Yatala industrial and residential properties with tidy, efficient yard maintenance.',
    landmarks: ['Yatala Pie Shop', 'Stapylton', 'Yatala Industrial Estate'],
    nearby: ['Beenleigh', 'Pimpama', 'Stapylton']
  },
  {
    slug: 'mount-warren-park',
    name: 'Mount Warren Park',
    description:
      'Professional mowing and clean-ups for Mount Warren Park with reliable scheduling and clear communication.',
    landmarks: ['Mount Warren Sports Centre', 'Windaroo Valley', 'Albert River'],
    nearby: ['Beenleigh', 'Windaroo', 'Bahrs Scrub']
  },
  {
    slug: 'bahrs-scrub',
    name: 'Bahrs Scrub',
    description:
      'We look after Bahrs Scrub lawns with tidy finishes, weed control options, and green waste removal.',
    landmarks: ['Windaroo Lakes', 'Belivah Road', 'Bahrs Scrub Conservation Area'],
    nearby: ['Mount Warren Park', 'Beenleigh', 'Eagleby']
  },
  {
    slug: 'eagleby',
    name: 'Eagleby',
    description:
      'Affordable and consistent lawn mowing for Eagleby homes, with optional garden clean-ups.',
    landmarks: ['Eagleby Shopping Plaza', 'Albert River', 'Beenleigh High'],
    nearby: ['Beenleigh', 'Mount Warren Park', 'Logan']
  },
  {
    slug: 'bethania',
    name: 'Bethania',
    description:
      'Reliable lawn care in Bethania with flexible booking windows and tidy finishes.',
    landmarks: ['Bethania Station', 'Bethania Lutheran Cemetery', 'Logan River'],
    nearby: ['Logan', 'Shailer Park', 'Tanah Merah']
  },
  {
    slug: 'holmview',
    name: 'Holmview',
    description:
      'Friendly mowing visits for Holmview with edging and whipper snipping included.',
    landmarks: ['Logan River Parklands', 'Holmview Central', 'Waterford West'],
    nearby: ['Logan', 'Bethania', 'Waterford']
  },
  {
    slug: 'coomera',
    name: 'Coomera',
    description:
      'Regular mowing and garden clean-ups for Coomera homes, keeping lawns healthy year-round.',
    landmarks: ['Coomera Town Centre', 'Coomera River', 'Westfield Coomera'],
    nearby: ['Ormeau', 'Pimpama', 'Upper Coomera']
  },
  {
    slug: 'park-ridge',
    name: 'Park Ridge',
    description:
      'Keeping Park Ridge properties tidy with mowing, edging, and green waste removal.',
    landmarks: ['Park Ridge Town Centre', 'Park Ridge State High', 'Eastern Service Road'],
    nearby: ['Logan', 'Browns Plains', 'Greenbank']
  }
];

export const areaBySlug = (slug: string) => areas.find((area) => area.slug === slug);
