export type DashResourceIcon = 'smartphone' | 'share' | 'paperclip' | 'book'

export type DashResource =
  | {
      id: string
      kind: 'example'
      title: string
      meta: string
      image: string
      imageAlt: string
    }
  | {
      id: string
      kind: 'guide'
      title: string
      description: string
      icon: DashResourceIcon
    }

export const dashResources: DashResource[] = [
  {
    id: 'example-tokyo-food',
    kind: 'example',
    title: 'Food tour in Tokyo',
    meta: '1 day · Markets & ramen',
    image:
      'https://images.unsplash.com/photo-1502364271109-0a9a75a2a9df?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Chef preparing food in Tokyo',
  },
  {
    id: 'example-south-island',
    kind: 'example',
    title: 'Our South Island road trip',
    meta: '7 days · Road trip',
    image:
      'https://images.unsplash.com/photo-1585933654851-820691b3740f?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Person sitting in a car on a South Island road trip',
  },
  {
    id: 'example-paris',
    kind: 'example',
    title: 'Surprise weekend in Paris',
    meta: '3 days · City break',
    image:
      'https://images.unsplash.com/photo-1662466819118-fc1d1629b78b?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Couple overlooking the Paris skyline',
  },
  {
    id: 'example-japan',
    kind: 'example',
    title: 'Japan 2026',
    meta: '14 days · Tokyo | Osaka | Kyoto',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Traditional street in Kyoto at dusk',
  },
  {
    id: 'example-europe-christmas',
    kind: 'example',
    title: 'Europe for Christmas',
    meta: 'Winter · Markets & cities',
    image:
      'https://images.unsplash.com/photo-1735303821653-9a565356f378?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Christmas carnival at night with a crowd',
  },
  {
    id: 'guide-homescreen',
    kind: 'guide',
    title: 'Save to home screen',
    description: 'Open Daymark like an app while you travel.',
    icon: 'smartphone',
  },
  {
    id: 'guide-share',
    kind: 'guide',
    title: 'Share with your group',
    description: 'Send one link — no sign-up needed.',
    icon: 'share',
  },
  {
    id: 'guide-bookings',
    kind: 'guide',
    title: 'Keep bookings handy',
    description: 'Attach tickets and PDFs to each day.',
    icon: 'paperclip',
  },
  {
    id: 'guide-structure',
    kind: 'guide',
    title: 'Start with the outline',
    description: 'Add days first, then fill in plans as you go.',
    icon: 'book',
  },
]
