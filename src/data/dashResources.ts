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
    id: 'example-japan',
    kind: 'example',
    title: 'Japan',
    meta: '11 days · Tokyo, Kyoto & Osaka',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Traditional street in Kyoto at dusk',
  },
  {
    id: 'example-europe',
    kind: 'example',
    title: 'Europe by train',
    meta: '17 days · London to Vienna',
    image:
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Swiss Alps with a lake and mountain village',
  },
  {
    id: 'example-hawaii',
    kind: 'example',
    title: 'Hawaii',
    meta: '5 days · Oahu long weekend',
    image:
      'https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Green coastline with mountains and reef in Hawaii',
  },
  {
    id: 'example-safari',
    kind: 'example',
    title: 'African safari',
    meta: '5 days · Nairobi & Maasai Mara',
    image:
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80',
    imageAlt: 'Safari landscape at golden hour',
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
