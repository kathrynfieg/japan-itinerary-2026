import groupPhoto from '../assets/group-photo.jpg';

/** One type per activity — drives chips / icons */
export type ActivityType =
  | 'flight'
  | 'airport'
  | 'train'
  | 'stay'
  | 'sight'
  | 'food'
  | 'experience'
  | 'booking'
  | 'suggestion';

export const activityTypes: Record<
  ActivityType,
  { label: string; emoji: string }
> = {
  flight: { label: 'Flight', emoji: '✈️' },
  airport: { label: 'Airport', emoji: '🛂' },
  train: { label: 'Train', emoji: '🚅' },
  stay: { label: 'Stay', emoji: '🏨' },
  sight: { label: 'Sight', emoji: '🎟️' },
  food: { label: 'Food', emoji: '🍜' },
  experience: { label: 'Experience', emoji: '🎨' },
  booking: { label: 'Booked', emoji: '📅' },
  suggestion: { label: 'Suggestion', emoji: '💡' },
};

export type Activity = {
  /** e.g. "10:00 AM" or "Morning" */
  time?: string;
  /** What you're doing — the only required field */
  title: string;
  /** Neighbourhood, station, or venue name if useful */
  place?: string;
  /** Google Maps (or similar) URL — makes the place line clickable */
  maps?: string;
  /** Extra bits — seats, inclusions, tips, etc. */
  notes?: string[];
  /** One URL — booking, menu, tickets, Drive, etc. */
  link?: string;
  /** One type for chips / icons */
  type?: ActivityType;
};

export type Day = {
  id: string;
  date: string;
  weekday: string;
  title: string;
  summary: string;
  /** Optional visual theme for the day section */
  theme?: 'birthday';
  activities: Activity[];
};

export type TripLink = {
  label: string;
  href: string;
  /** Short context — date, what it is, etc. */
  note?: string;
};

export const trip = {
  name: 'Japan',
  year: '2026',
  start: '2026-07-21',
  end: '2026-07-31',
  rangeLabel: '21 – 31 July',
  travelers: ['Zac', 'Jess', 'Kat'] as const,
  tagline:
    'Tokyo, Hakone, Kyoto & Osaka. Our first Japan adventure, celebrating big milestones and new beginnings along the way.',
  heroImage:
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=80',
  heroAlt: 'Traditional street in Kyoto at dusk',
  groupPhoto,
  groupPhotoAlt: 'Zac, Jess, and Kat',
};

/** Tickets, bookings, and other links worth finding quickly */
export const keyLinks: TripLink[] = [
  {
    label: 'Flight Itinerary',
    href: 'https://drive.google.com/drive/folders/1VLt48SDJMKYr186S3uiFrx4am0OLfLRd?usp=drive_link',
    note: '21 & 31 July · Drive folder',
  },
  {
    label: 'Tokyo accommodation',
    href: 'https://drive.google.com/drive/folders/1c8aMCdnIIhdH_d_AGqAQDU-tL12qTQSY?usp=drive_link',
    note: '22 July · Early check-in from 11:00 AM · Drive folder',
  },
  {
    label: 'Shibuya Sky tickets',
    href: 'https://drive.google.com/drive/folders/17GL2m8-GQiWk6sNjHfDUljYv5BP9597G?usp=drive_link',
    note: '22 July · Drive folder',
  },
  {
    label: 'teamLab Borderless tickets',
    href: 'https://drive.google.com/drive/folders/1oI5JJRNF8hnhqwVSJO8piNBphGoEIBhT?usp=drive_link',
    note: '23 July · Drive folder',
  },
  {
    label: 'Hakone accommodation',
    href: 'https://drive.google.com/drive/folders/1kQaHNVfK0b99pizOgL59WprJm7W4CyeJ?usp=drive_link',
    note: '25 July · Check-in from 3:00 PM · Early check-in possible on request · Drive folder',
  },
  {
    label: 'Kyoto accommodation',
    href: 'https://drive.google.com/drive/folders/1K8RI5p9EKy_tkFTGLrWT9K28EaGprvNY?usp=drive_link',
    note: '26 July · Drive folder',
  },
  {
    label: 'Kyoto ghost tour',
    href: 'https://drive.google.com/drive/folders/1IJG17in0tftnb79nvIt-y5KHgce0VJiu?usp=drive_link',
    note: '26 July · 7:30 PM · Free cancellation until 25 July',
  },
  {
    label: 'Osaka accommodation',
    href: 'https://drive.google.com/drive/folders/1lLXQALDkWclZIcDAyqPr4yGV23LFm4lZ?usp=drive_link',
    note: '29 July · Drive folder',
  },
  {
    label: 'Daruma painting experience',
    href: 'https://drive.google.com/drive/folders/1rlxskWuPg-PgZKyx54rMJl18X-xbnaRf',
    note: '29 July · 10:00 AM · DARUMA CLUB, Nipponbashi · Free cancellation until 28 July',
  },
];

export const days: Day[] = [
  {
    id: 'jul-21',
    date: '2026-07-21',
    weekday: 'Tuesday',
    title: 'Outbound',
    summary: 'Adelaide → Kuala Lumpur → Osaka. Overnight to Kansai.',
    activities: [
      {
        time: '9:50 AM',
        title: 'Adelaide → Kuala Lumpur',
        place: 'Malaysia Airlines MH138',
        type: 'flight',
        notes: ['Arrives 4:00 PM', '6 hr 25 min layover in Kuala Lumpur'],
        link: 'https://drive.google.com/drive/folders/1VLt48SDJMKYr186S3uiFrx4am0OLfLRd?usp=drive_link',
      },
      {
        time: '10:25 PM',
        title: 'Kuala Lumpur → Osaka',
        place: 'Malaysia Airlines MH52',
        type: 'flight',
        notes: ['Arrives 5:45 AM next day'],
        link: 'https://drive.google.com/drive/folders/1VLt48SDJMKYr186S3uiFrx4am0OLfLRd?usp=drive_link',
      },
    ],
  },
  {
    id: 'jul-22',
    date: '2026-07-22',
    weekday: 'Wednesday',
    title: 'Day 1',
    summary:
      'Land at Kansai, travel to Tokyo and spend the evening exploring Shibuya.',
    activities: [
      {
        time: '5:45 AM',
        title: 'Arrive Osaka',
        place: 'Kansai International Airport · Terminal 1',
        maps: 'https://www.google.com/maps/search/?api=1&query=Kansai+International+Airport+Terminal+1',
        type: 'flight',
        notes: ['MH52 from Kuala Lumpur'],
      },
      {
        time: '6:00 AM',
        title: 'Immigration and luggage',
        place: 'Kansai International Airport',
        maps: 'https://www.google.com/maps/search/?api=1&query=Kansai+International+Airport',
        type: 'airport',
        notes: [
          'Allow approximately one hour after landing',
          'Collect or activate any transport cards before leaving the airport',
        ],
      },
      {
        time: '7:30 AM',
        title: 'HARUKA to Shin-Osaka',
        place: 'KIX → Shin-Osaka',
        type: 'train',
        notes: [
          'Limited-express airport train',
          'Journey takes approximately 50 minutes',
          'Allow additional time to find the Shinkansen platforms',
        ],
      },
      {
        time: '9:00 AM',
        title: 'Nozomi to Tokyo',
        place: 'Shin-Osaka → Tokyo Station',
        type: 'train',
        notes: [
          'Shinkansen journey takes approximately 2 hr 30 min',
          'Reserve oversized-luggage seats if required',
          'Pick up an ekiben, snacks or drinks before boarding',
        ],
      },
      {
        time: '12:00 PM',
        title: 'Travel to the accommodation',
        place: 'Ōkubo / Shin-Ōkubo',
        maps: 'https://www.google.com/maps/search/?api=1&query=Shin-Okubo+Station+Tokyo',
        type: 'stay',
        notes: [
          'Early check-in available from 11:00 AM',
          'Approximately 20–30 minutes from Tokyo Station',
          'Drop off luggage before heading out again',
        ],
        link: 'https://drive.google.com/drive/folders/1c8aMCdnIIhdH_d_AGqAQDU-tL12qTQSY?usp=drive_link',
      },
      {
        time: '12:45 PM',
        title: 'First Japanese 7-Eleven stop',
        place: 'Near the accommodation',
        type: 'food',
        notes: [
          'Pick up cold drinks, snacks and breakfast supplies',
          'Try an onigiri, egg sandwich, fried chicken or convenience-store dessert',
          'Use the ATM or withdraw cash if required',
          'Keep this quick so there is still time to rest before Shibuya',
        ],
      },
      {
        time: '1:15 PM',
        title: 'Rest and reset',
        place: 'Accommodation',
        type: 'stay',
        notes: [
          'Have lunch, shower and rest after the overnight journey',
          'Charge phones and portable batteries',
          'Aim to leave for Shibuya at approximately 3:30 PM',
        ],
      },
      {
        time: '3:30 PM',
        title: 'Train to Shibuya',
        place: 'Shin-Ōkubo → Shibuya',
        type: 'train',
        notes: [
          'Allow extra time to navigate Shibuya Station',
          'Head towards the Hachikō exit',
        ],
      },
      {
        time: '4:05 PM',
        title: 'Hachikō and Shibuya Crossing',
        place: 'Hachikō Square',
        maps: 'https://www.google.com/maps/search/?api=1&query=Hachiko+Square+Shibuya',
        type: 'sight',
        notes: [
          'See the Hachikō statue outside Shibuya Station',
          'Walk across the famous Shibuya Scramble Crossing',
          'Keep this visit brief so the Shibuya Sky booking is not rushed',
          'You can return after dark for the full neon-lit experience',
        ],
      },
      {
        time: '4:50 PM',
        title: 'Shibuya Sky Roof Bar Entry',
        place: 'Shibuya Sky',
        maps: 'https://www.google.com/maps/search/?api=1&query=Shibuya+Sky',
        type: 'booking',
        notes: [
          'Arrive early because entry is tied to the booked time',
          'Explore the indoor gallery and outdoor observation areas',
        ],
        link: 'https://drive.google.com/drive/folders/17GL2m8-GQiWk6sNjHfDUljYv5BP9597G?usp=drive_link',
      },
      {
        time: '5:40 PM',
        title: 'Shibuya Sky Sunset Access',
        place: 'Shibuya Sky',
        maps: 'https://www.google.com/maps/search/?api=1&query=Shibuya+Sky',
        type: 'booking',
        notes: [
          'Stay through sunset and the early evening city lights',
          'Look for Tokyo Tower, Tokyo Skytree and Mount Fuji if visibility is good',
          'Allow the departure time to remain flexible',
        ],
        link: 'https://drive.google.com/drive/folders/17GL2m8-GQiWk6sNjHfDUljYv5BP9597G?usp=drive_link',
      },
      {
        time: '7:15 PM',
        title: 'Shibuya PARCO',
        place: 'Shibuya PARCO · 6F',
        maps: 'https://www.google.com/maps/search/?api=1&query=Shibuya+PARCO',
        type: 'suggestion',
        notes: [
          'Visit Nintendo TOKYO and Pokémon Center Shibuya',
          'The floor also has several other gaming and character stores',
          'Aim to arrive before 8:00 PM because the shops close at 9:00 PM',
          'Swap this for Shibuya 109 if fashion is a higher priority',
        ],
      },
      {
        time: '8:30 PM',
        title: 'Dinner in Shibuya',
        place: 'Dōgenzaka',
        maps: 'https://www.google.com/maps/search/?api=1&query=Uobei+Shibuya+Dogenzaka',
        type: 'food',
        notes: [
          'Recommended easy option: Uobei for affordable made-to-order sushi',
          'Alternative: Gyukatsu Motomura for beef cutlet if the queue is reasonable',
        ],
      },
      {
        time: '9:30 PM',
        title: 'MEGA Don Quijote',
        place: 'Shibuya',
        maps: 'https://www.google.com/maps/search/?api=1&query=MEGA+Don+Quijote+Shibuya',
        type: 'suggestion',
        notes: [
          'Browse Japanese snacks, beauty products, souvenirs and travel essentials',
          'The store is open late, so there is no need to rush here before dinner',
          'Avoid buying too much on the first night because everything must travel with you',
        ],
      },
      {
        time: '10:15 PM',
        title: 'Shibuya Crossing at night',
        place: 'Shibuya Scramble Crossing',
        maps: 'https://www.google.com/maps/search/?api=1&query=Shibuya+Scramble+Crossing',
        type: 'sight',
        notes: [
          'Walk across again once the billboards and surrounding streets are illuminated',
          'Head back to the accommodation whenever the group begins feeling tired',
        ],
      },
    ],
  },
  {
    id: 'jul-23',
    date: '2026-07-23',
    weekday: 'Thursday',
    title: 'Day 2',
    summary:
      'Explore Meiji Jingu, Harajuku and Omotesando before an immersive afternoon at teamLab Borderless.',
    activities: [
      {
        time: '8:00 AM',
        title: 'Meiji Jingu',
        place: 'Harajuku',
        maps: 'https://www.google.com/maps/search/?api=1&query=Meiji+Jingu',
        type: 'suggestion',
        notes: [
          'A peaceful Shinto shrine surrounded by a large forest in the middle of Tokyo.',
          'It is a beautiful contrast to the busy streets of Harajuku and a calm way to begin the day.',
          'Walk through the enormous torii gates and follow the forested path to the main shrine.',
          'Look out for the decorative sake barrels displayed along the approach.',
          'Allow approximately 60–90 minutes and visit early before the heat and crowds build.',
        ],
      },
      {
        time: '10:00 AM',
        title: 'Explore Harajuku',
        place: 'Takeshita Street',
        maps: 'https://www.google.com/maps/search/?api=1&query=Takeshita+Street+Harajuku',
        type: 'suggestion',
        notes: [
          'Harajuku is one of Tokyo’s best-known neighbourhoods for colourful fashion, character shops, street food and youth culture.',
          'Walk down Takeshita Street and browse the small fashion, accessory and souvenir stores.',
          'Try a Japanese crepe, candied fruit or another fun street snack.',
          'Visit stores such as Kiddy Land, the Sanrio shop or character-themed shops that interest the group.',
          'Takeshita Street becomes extremely crowded later in the day, so exploring during the morning is ideal.',
        ],
      },
      {
        time: '11:15 AM',
        title: 'Walk through Omotesando',
        place: 'Harajuku → Omotesando',
        maps: 'https://www.google.com/maps/search/?api=1&query=Omotesando+Hills',
        type: 'suggestion',
        notes: [
          'Omotesando is a stylish tree-lined avenue known for impressive architecture, designer stores and polished cafés.',
          'It feels calmer and more sophisticated than neighbouring Takeshita Street.',
          'Browse Omotesando Hills and the flagship stores along the main avenue.',
          'Stop for an early lunch or coffee before travelling to Azabudai Hills.',
          'Keep the shopping flexible so there is plenty of time to reach teamLab.',
        ],
      },
      {
        time: '12:15 PM',
        title: 'Travel to Azabudai Hills',
        place: 'Omotesando → Kamiyachō',
        type: 'train',
        notes: [
          'Azabudai Hills is a modern city precinct with landscaped public spaces, restaurants, shops and striking architecture.',
          'Allow approximately 30–40 minutes for the train journey and walking through the complex.',
          'Have lunch before teamLab if you did not eat around Omotesando.',
          'Aim to arrive at least 15–20 minutes before the booked entry time.',
        ],
      },
      {
        time: '1:30 PM',
        title: 'teamLab Borderless',
        place: 'Azabudai Hills',
        maps: 'https://www.google.com/maps/search/?api=1&query=teamLab+Borderless+Azabudai+Hills',
        type: 'booking',
        notes: [
          'An immersive digital-art museum where projections, light, sound and interactive artworks flow between interconnected rooms.',
          'There is no fixed route, which makes exploring and discovering hidden installations part of the experience.',
          'Take your time moving between rooms because some artworks change or appear differently when revisited.',
          'Look for the Bubble Universe, Infinite Crystal World and the flower-filled interactive spaces.',
          'Allow approximately two to three hours and wear comfortable shoes.',
          'Includes free gelato at EN TEA HOUSE.',
        ],
        link: 'https://drive.google.com/drive/folders/1oI5JJRNF8hnhqwVSJO8piNBphGoEIBhT?usp=drive_link',
      },
      {
        time: '4:30 PM',
        title: 'Explore Azabudai Hills',
        place: 'Azabudai Hills',
        maps: 'https://www.google.com/maps/search/?api=1&query=Azabudai+Hills',
        type: 'suggestion',
        notes: [
          'A newly developed neighbourhood combining unusual architecture, gardens, shops, cafés and city views.',
          'It is worth exploring after teamLab rather than immediately leaving the area.',
          'Walk through the central garden and admire the curved architecture of the surrounding buildings.',
          'Browse the shops or stop for a drink and dessert.',
          'Tokyo Tower is nearby and can be added if everyone still has energy.',
        ],
      },
      {
        time: '5:30 PM',
        title: 'Tokyo Tower and Zōjō-ji',
        place: 'Minato City',
        maps: 'https://www.google.com/maps/search/?api=1&query=Zojoji+Temple+Tokyo+Tower',
        type: 'suggestion',
        notes: [
          'Tokyo Tower is one of the city’s most recognisable landmarks, inspired by the Eiffel Tower and painted bright orange and white.',
          'The nearby Zōjō-ji temple provides one of the best ground-level views of the tower.',
          'Walk around the temple grounds and photograph the contrast between old Tokyo and the modern skyline.',
          'Going up Tokyo Tower is optional because Shibuya Sky already provides a major observation-deck experience.',
          'Skip this stop and head back earlier if the group is tired.',
        ],
      },
      {
        time: 'Evening',
        title: 'Dinner in Shinjuku',
        place: 'Shinjuku',
        maps: 'https://www.google.com/maps/search/?api=1&query=Omoide+Yokocho+Shinjuku',
        type: 'food',
        notes: [
          'Shinjuku is one of Tokyo’s busiest entertainment districts, filled with restaurants, neon streets, department stores and late-night activity.',
          'Explore Omoide Yokocho for narrow lantern-lit alleys and small yakitori restaurants.',
          'Walk through Kabukichō to see the neon signs and the giant Godzilla head above Hotel Gracery.',
          'Consider ramen, yakitori, Japanese curry or izakaya-style shared dishes for dinner.',
          'Keep the evening flexible and return to the accommodation whenever the group begins feeling tired.',
          'Optional alternative: watch Adelaide vs Collingwood at Irish Pub Craic in Akasaka.',
        ],
      },
    ],
  },
  {
    id: 'jul-24',
    date: '2026-07-24',
    weekday: 'Friday',
    title: 'Day 3',
    summary:
      'Discover old Tokyo in Asakusa, explore the markets of Ueno and finish among the games, anime and electronics of Akihabara.',
    activities: [
      {
        time: '7:00 AM',
        title: 'Sensō-ji',
        place: 'Asakusa',
        maps: 'https://www.google.com/maps/search/?api=1&query=Senso-ji+Asakusa',
        type: 'suggestion',
        notes: [
          'Tokyo’s oldest temple and one of the city’s most recognisable traditional landmarks.',
          'It is especially atmospheric early in the morning before the main crowds and shops arrive.',
          'Enter through the enormous Kaminarimon Gate and walk beneath its famous red lantern.',
          'Continue along Nakamise Street towards the temple’s main hall and five-storey pagoda.',
          'Draw an omikuji fortune, observe the incense ritual and explore the quieter side areas of the temple grounds.',
          'Allow approximately 60–90 minutes.',
        ],
      },
      {
        time: '8:30 AM',
        title: 'Breakfast in Asakusa',
        place: 'Asakusa',
        maps: 'https://www.google.com/maps/search/?api=1&query=Asakusa+Tokyo',
        type: 'food',
        notes: [
          'A relaxed breakfast stop before the surrounding shopping streets become busier.',
          'Look for a Japanese café breakfast, bakery, onigiri or a small traditional set meal.',
          'Use this as an air-conditioned break after walking around the temple grounds.',
          'Keep breakfast relatively light because there will be plenty of food around Ameyoko later.',
        ],
      },
      {
        time: '9:30 AM',
        title: 'Nakamise Street and old Asakusa',
        place: 'Nakamise-dōri',
        maps: 'https://www.google.com/maps/search/?api=1&query=Nakamise-dori+Asakusa',
        type: 'suggestion',
        notes: [
          'A traditional shopping street leading directly towards Sensō-ji, lined with snacks, crafts and souvenirs.',
          'The shops generally begin opening later than the temple, which is why it is worth returning after breakfast.',
          'Browse folding fans, chopsticks, lucky charms, sweets and small Japanese gifts.',
          'Try ningyō-yaki cakes, melon bread or another local snack that catches your attention.',
          'Explore the nearby side streets rather than staying only on the busiest central path.',
          'Avoid buying anything bulky because it will need to be carried for the rest of the day.',
        ],
      },
      {
        time: '10:45 AM',
        title: 'Travel to Ueno',
        place: 'Asakusa → Ueno',
        type: 'train',
        notes: [
          'A short journey connecting traditional Asakusa with one of Tokyo’s busiest market districts.',
          'The Ginza Line provides a straightforward connection between the two areas.',
          'Allow additional time to navigate the station and find the correct exit.',
        ],
      },
      {
        time: '11:15 AM',
        title: 'Explore Ameyoko',
        place: 'Ueno and Okachimachi',
        maps: 'https://www.google.com/maps/search/?api=1&query=Ameyoko+Market+Ueno',
        type: 'suggestion',
        notes: [
          'A lively market street running beneath and alongside the railway tracks between Ueno and Okachimachi.',
          'It feels busy, colourful and less polished than Tokyo’s major department-store districts.',
          'Browse street food, snacks, cosmetics, clothing, trainers and discount shops.',
          'Walk through both the main market street and the smaller lanes beneath the railway tracks.',
          'Compare prices before buying because similar products appear in multiple stores.',
          'The market stretches for roughly 500 metres, so allow time to wander without following a strict route.',
        ],
      },
      {
        time: '12:30 PM',
        title: 'Lunch around Ameyoko',
        place: 'Ueno / Okachimachi',
        maps: 'https://www.google.com/maps/search/?api=1&query=Ameyoko+Market+Ueno',
        type: 'food',
        notes: [
          'Ameyoko is a good place for an informal lunch surrounded by market energy.',
          'Look for sushi, grilled seafood, ramen, curry, donburi or small street-food portions.',
          'Choose somewhere with indoor seating so everyone can cool down before Akihabara.',
          'Avoid spending too long queuing because there are many good casual options nearby.',
        ],
      },
      {
        time: '1:30 PM',
        title: 'Travel to Akihabara',
        place: 'Okachimachi → Akihabara',
        type: 'train',
        notes: [
          'Akihabara is Tokyo’s most famous district for video games, anime, manga, figures and electronics.',
          'It is only one stop from Okachimachi on the JR Yamanote Line.',
          'Walking is also possible, but the train may be preferable in the July heat.',
          'Start near Akihabara Station before gradually exploring the shops along Chūō-dōri.',
        ],
      },
      {
        time: '2:00 PM',
        title: 'Akihabara Radio Kaikan',
        place: 'Akihabara Station · Electric Town Exit',
        maps: 'https://www.google.com/maps/search/?api=1&query=Akihabara+Radio+Kaikan',
        type: 'suggestion',
        notes: [
          'A multi-store hobby building packed with figures, trading cards, collectibles, model kits and character merchandise.',
          'It is one of the easiest places to understand the Akihabara experience because many specialist shops are inside one building.',
          'Browse the different floors rather than stopping only at the entrance-level stores.',
          'Look out for anime figures, Pokémon cards, Gundam models and glass display cases filled with second-hand collectibles.',
          'Prices can vary significantly between shops, so photograph items and compare before purchasing.',
          'Allow approximately 60–75 minutes.',
        ],
      },
      {
        time: '3:15 PM',
        title: 'Animate Akihabara',
        place: 'Akihabara',
        maps: 'https://www.google.com/maps/search/?api=1&query=Animate+Akihabara',
        type: 'suggestion',
        notes: [
          'A large specialist store dedicated to anime, manga, games and Japanese character merchandise.',
          'Each floor focuses on different products and currently popular series.',
          'Browse manga, art books, stationery, character goods, keychains, plush toys and limited merchandise.',
          'This is especially worthwhile when someone in the group already has favourite anime or game franchises.',
          'Some items may be specific to Japan and difficult to find at home.',
          'Allow approximately 45–60 minutes, or shorten the visit if anime shopping is not a major priority.',
        ],
      },
      {
        time: '4:15 PM',
        title: 'Super Potato',
        place: 'Akihabara',
        maps: 'https://www.google.com/maps/search/?api=1&query=Super+Potato+Akihabara',
        type: 'suggestion',
        notes: [
          'A compact retro-gaming store filled with older Japanese consoles, cartridges, accessories and gaming memorabilia.',
          'It feels partly like a shop and partly like a small museum of Japanese gaming history.',
          'Browse games and hardware from Nintendo, Sega, PlayStation and other classic systems.',
          'Look through the display cabinets even if you are not planning to buy anything.',
          'The narrow floors can become crowded, so keep bags close and be patient on the stairs.',
          'Treat this primarily as a nostalgia stop because rare items may be expensive.',
        ],
      },
      {
        time: '5:00 PM',
        title: 'GiGO arcade',
        place: 'Akihabara',
        maps: 'https://www.google.com/maps/search/?api=1&query=GiGO+Akihabara',
        type: 'suggestion',
        notes: [
          'A multi-floor Japanese game centre with crane machines, rhythm games, racing games and arcade cabinets.',
          'It is a fun way to experience Akihabara rather than spending the entire afternoon shopping.',
          'Try a rhythm game, driving game or photo booth as a group.',
          'Set a small budget before attempting the crane machines because repeated tries add up quickly.',
          'Explore beyond the first floor, as different types of games are often separated across the building.',
          'Allow approximately 45–60 minutes.',
        ],
      },
      {
        time: '6:15 PM',
        title: 'Yodobashi Akiba',
        place: 'Akihabara Station',
        maps: 'https://www.google.com/maps/search/?api=1&query=Yodobashi+Camera+Akiba',
        type: 'suggestion',
        notes: [
          'A huge electronics department store covering cameras, computers, gaming, appliances, toys and everyday technology.',
          'It provides the modern electronics side of Akihabara after the more specialised anime and retro stores.',
          'Browse Japanese gadgets, gaming accessories, headphones, cameras and travel electronics.',
          'Check voltage and language compatibility before buying anything intended for use in Australia.',
          'Bring your passport in case eligible purchases qualify for tax-free shopping.',
          'This is an optional final shopping stop and can be skipped if everyone has had enough retail time.',
        ],
      },
      {
        time: '7:30 PM',
        title: 'Dinner in Akihabara',
        place: 'Akihabara',
        maps: 'https://www.google.com/maps/search/?api=1&query=Akihabara+Tokyo',
        type: 'food',
        notes: [
          'A relaxed dinner after an afternoon of shopping and arcade games.',
          'Look for ramen, Japanese curry, tonkatsu, yakiniku or an informal izakaya.',
          'Yodobashi Akiba has restaurant floors if the group wants an easy option without searching the surrounding streets.',
          'Choose based on queue length and energy rather than locking in a strict restaurant.',
          'A themed café is optional, but research the pricing and experience before entering.',
        ],
      },
      {
        time: '8:45 PM',
        title: 'Return to the accommodation',
        place: 'Akihabara → Shin-Ōkubo',
        type: 'train',
        notes: [
          'Return after dinner and prepare for the following morning’s journey to Hakone.',
          'The JR Yamanote Line provides a convenient connection between Akihabara and Shin-Ōkubo.',
          'Keep the departure time flexible if the group wants more time in the arcades or shops.',
        ],
      },
      {
        time: '9:30 PM',
        title: 'Forward large luggage to Kyoto',
        place: 'Yamato Transport – Shinjuku Hyakunincho Office',
        maps: 'https://www.google.com/maps/place/%E3%83%A4%E3%83%9E%E3%83%88%E9%81%8B%E8%BC%B8+%E6%96%B0%E5%AE%BF%E7%99%BE%E4%BA%BA%E7%94%BA%E5%96%B6%E6%A5%AD%E6%89%80%EF%BC%88%E7%99%BE%E4%BA%BA%E7%94%BA%EF%BC%91%E4%B8%81%E7%9B%AE%EF%BC%89/@35.7012274,139.6957877,17z/data=!3m1!4b1!4m6!3m5!1s0x60188d5fa5c4d0f9:0xfb3520b89fca5010!8m2!3d35.7012274!4d139.6957877!16s%2Fg%2F11c58kls80!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D',
        type: 'suggestion',
        notes: [
          'Japan’s luggage-delivery services can send the large suitcases directly to the Kyoto accommodation.',
          'This allows everyone to travel through Hakone with only a small overnight bag.',
          'Confirm in advance that the Kyoto accommodation accepts forwarded luggage.',
          'Ask the Tokyo accommodation for help completing the delivery form if needed.',
          'Keep medication, valuables, chargers and the clothes needed for Hakone in the overnight bag.',
          'This is an important practical task rather than an optional sightseeing activity.',
        ],
      },
    ],
  },
  {
    id: 'jul-25',
    date: '2026-07-25',
    weekday: 'Saturday',
    title: 'Day 4',
    summary:
      'Leave Tokyo for Hakone, cycle through its forests and finish beside Lake Ashi.',
    activities: [
      {
        time: '6:30 AM',
        title: 'Check out and travel to Shinjuku',
        place: 'Shin-Ōkubo → Shinjuku',
        type: 'train',
        notes: [
          'Begin the journey from Tokyo into the mountains of Hakone.',
          'Travel with small overnight bags only; the large luggage should already be on its way to Kyoto.',
          'Allow extra time to find the Romancecar platforms.',
        ],
      },
      {
        time: '7:30 AM',
        title: 'Romancecar to Hakone',
        place: 'Shinjuku → Hakone-Yumoto',
        type: 'suggestion',
        notes: [
          'A reserved-seat limited express travelling directly from Tokyo to Hakone.',
          'The journey takes approximately 90 minutes.',
          'Book the exact departure once reservations become available.',
        ],
      },
      {
        time: '9:20 AM',
        title: 'Bus to Hakone Visitor Center',
        place: 'Hakone-Yumoto → Shirayuridai / Tōgendai',
        type: 'suggestion',
        notes: [
          'Travel towards Lake Ashi and the cycling-tour meeting point.',
          'The bus journey takes approximately 40 minutes.',
          'Confirm the connection carefully because the cycling check-in begins shortly after arrival.',
        ],
      },
      {
        time: '10:15 AM',
        title: 'Mountain Ripper check-in',
        place: 'Hakone Visitor Center',
        maps: 'https://www.google.com/maps/search/?api=1&query=Hakone+Visitor+Center+Shirayuridai',
        type: 'suggestion',
        notes: [
          'Meet the guide, receive the mountain bikes and complete the safety briefing.',
          'Ask in advance where the group can securely leave its overnight bags.',
          'Wear breathable clothing and bring sunscreen.',
        ],
        link: 'https://mountainripper.com/en/',
      },
      {
        time: '10:30 AM',
        title: 'Deep Forest cycling tour',
        place: 'Sengokuhara',
        maps: 'https://www.google.com/maps/search/?api=1&query=Sengokuhara+Hakone',
        type: 'suggestion',
        notes: [
          'A guided 16 km ride through the forests and quieter landscapes of Hakone.',
          'The three-hour experience includes bike rental, water, teatime and insurance.',
          'It is the basic and most approachable Mountain Ripper course.',
          'Advance booking is required.',
        ],
        link: 'https://mountainripper.com/en/',
      },
      {
        time: '1:45 PM',
        title: 'Lunch near Tōgendai',
        place: 'Tōgendai',
        maps: 'https://www.google.com/maps/search/?api=1&query=Togendai+Hakone',
        type: 'food',
        notes: [
          'Have a proper lunch and cool down after cycling.',
          'Choose somewhere close to the port so the afternoon remains easy.',
          'Check restaurant closing times before the day.',
        ],
      },
      {
        time: '3:00 PM',
        title: 'Lake Ashi sightseeing cruise',
        place: 'Tōgendai → Hakone-machi',
        maps: 'https://www.google.com/maps/search/?api=1&query=Hakone+Sightseeing+Cruise+Togendai',
        type: 'suggestion',
        notes: [
          'A scenic pirate-ship-style cruise across Lake Ashi.',
          'Look for Mount Fuji and Hakone Shrine’s lakeside torii if the weather is clear.',
          'Disembarking at Hakone-machi places you near the accommodation.',
        ],
      },
      {
        time: '4:00 PM',
        title: 'Explore Hakone-machi',
        place: 'Lake Ashi',
        maps: 'https://www.google.com/maps/search/?api=1&query=Hakone-machi+Port',
        type: 'suggestion',
        notes: [
          'A quiet lakeside area with views across Lake Ashi and the surrounding mountains.',
          'Take a short waterfront walk or visit the nearby Hakone Checkpoint if time permits.',
          'Keep this flexible after the cycling tour.',
        ],
      },
      {
        time: '4:45 PM',
        title: 'Check in to the Hakone accommodation',
        place: '571-30 Hakone, Hakone-machi',
        maps: 'https://www.google.com/maps/search/?api=1&query=571-30+Hakone+Hakone-machi',
        type: 'stay',
        notes: [
          'Check-in from 3:00 PM — ask the host about early check-in if arriving sooner',
          'Take a short local bus or taxi from Hakone-machi.',
          'Settle in and enjoy the slower atmosphere after Tokyo.',
          'Confirm the exact check-in process with the Airbnb host.',
        ],
        link: 'https://drive.google.com/drive/folders/1kQaHNVfK0b99pizOgL59WprJm7W4CyeJ?usp=drive_link',
      },
      {
        time: 'Evening',
        title: 'Dinner and quiet Hakone evening',
        place: 'Hakone-machi',
        maps: 'https://www.google.com/maps/search/?api=1&query=Hakone-machi',
        type: 'food',
        notes: [
          'Relax after the morning travel and afternoon cycling.',
          'Reserve dinner or buy food beforehand because lakeside restaurants may close early.',
          'Enjoy an onsen if one is available nearby.',
        ],
      },
    ],
  },
  {
    id: 'jul-26',
    date: '2026-07-26',
    weekday: 'Sunday',
    title: 'Day 5',
    theme: 'birthday',
    summary:
      'Celebrate Zac’s 30th with a peaceful Hakone morning, birthday ramen in Arashiyama and a ghost tour through the bamboo forest after dark.',
    activities: [
      {
        time: '7:30 AM',
        title: 'Birthday breakfast by Lake Ashi',
        place: 'Hakone-machi / Moto-Hakone',
        maps: 'https://www.google.com/maps/search/?api=1&query=Moto-Hakone',
        type: 'food',
        notes: [
          'Begin Zac’s birthday with a relaxed breakfast beside Lake Ashi.',
          'Choose somewhere with lake views or prepare breakfast at the accommodation.',
        ],
      },
      {
        time: '8:30 AM',
        title: 'Hakone Shrine',
        place: 'Moto-Hakone',
        maps: 'https://www.google.com/maps/search/?api=1&query=Hakone+Shrine',
        type: 'suggestion',
        notes: [
          'A forest shrine known for its red torii gate beside Lake Ashi.',
          'Visit the main shrine and walk beneath the tall cedar trees.',
          'Keep the visit fairly short so checkout and transport remain comfortable.',
        ],
      },
      {
        time: '9:45 AM',
        title: 'Return and check out',
        place: 'Hakone accommodation',
        type: 'stay',
        notes: [
          'Collect the overnight bags and check out.',
          'Allow enough time to reach the correct bus stop.',
        ],
      },
      {
        time: '10:30 AM',
        title: 'Bus to Mishima Station',
        place: 'Moto-Hakone → Mishima',
        type: 'train',
        notes: [
          'Travel directly from the Lake Ashi side of Hakone towards the Shinkansen.',
          'Confirm the bus timetable and allow extra time for mountain traffic.',
        ],
      },
      {
        time: '12:30 PM',
        title: 'Shinkansen to Kyoto',
        place: 'Mishima → Kyoto',
        type: 'train',
        notes: [
          'The journey generally takes around two hours.',
          'Some services may require a simple change at Nagoya.',
          'Pick up lunch at Mishima Station before boarding.',
        ],
      },
      {
        time: '3:00 PM',
        title: 'Arrive and check in',
        place: 'Kyoto accommodation',
        type: 'stay',
        notes: [
          'Collect the luggage forwarded from Tokyo.',
          'Shower, change and rest briefly before the birthday evening.',
        ],
        link: 'https://drive.google.com/drive/folders/1K8RI5p9EKy_tkFTGLrWT9K28EaGprvNY?usp=drive_link',
      },
      {
        time: '4:15 PM',
        title: 'Travel to Arashiyama',
        place: 'Kyoto accommodation → Arashiyama',
        type: 'train',
        notes: [
          'Arashiyama is Kyoto’s scenic western district, known for its bamboo forest, river and mountain views.',
          'From Kyoto Station, the JR Sagano Line reaches Saga-Arashiyama in around 15–20 minutes.',
          'Allow additional time to walk from the station.',
        ],
      },
      {
        time: '5:00 PM',
        title: 'Zac’s birthday ramen',
        place: 'Gion Duck Noodles Arashiyama',
        maps: 'https://www.google.com/maps/search/?api=1&query=Gion+Duck+Noodles+Arashiyama',
        type: 'food',
        notes: [
          'A refined ramen restaurant specialising in rich Kishu duck broth and handmade rye noodles.',
          'Book an early table because the Arashiyama branch currently closes around 6:00 PM.',
          'This keeps dinner close to the ghost-tour area and removes the rush from downtown Kyoto.',
        ],
        link: 'https://www.tablecheck.com/en/shops/gion-duck-noodles-arashiyama/reserve',
      },
      {
        time: '6:00 PM',
        title: 'Birthday walk through Arashiyama',
        place: 'Togetsukyō Bridge and Katsura River',
        maps: 'https://www.google.com/maps/search/?api=1&query=Togetsukyo+Bridge',
        type: 'suggestion',
        notes: [
          'Take a relaxed walk along the river and across Arashiyama’s famous bridge.',
          'The area should be much quieter as the daytime visitors begin leaving.',
          'Pick up a birthday dessert or drink before the tour if somewhere remains open.',
        ],
      },
      {
        time: '6:45 PM',
        title: 'Head to the ghost-tour meeting point',
        place: 'Arashiyama',
        type: 'train',
        notes: [
          'Follow the exact meeting instructions in the GetYourGuide booking.',
          'Arrive at least 15 minutes early.',
          'Use the bathroom and buy water before checking in.',
        ],
      },
      {
        time: '7:30 PM',
        title: 'Kyoto ghost tour',
        place: 'Arashiyama',
        maps: 'https://www.google.com/maps/search/?api=1&query=Arashiyama+Bamboo+Grove',
        type: 'booking',
        notes: [
          'A 2.5-hour guided night walk through Kyoto’s dark history, folklore and ghost stories.',
          'The experience includes the bamboo forest after dark and a short solo walk.',
          'Wear comfortable enclosed shoes and bring insect repellent.',
          'Booked through GetYourGuide with free cancellation until 25 July.',
        ],
        link: 'https://drive.google.com/drive/folders/1IJG17in0tftnb79nvIt-y5KHgce0VJiu?usp=drive_link',
      },
      {
        time: '10:00 PM',
        title: 'Return to the accommodation',
        place: 'Arashiyama → Kyoto accommodation',
        type: 'train',
        notes: [
          'Check the final train options in advance.',
          'A taxi may be easier after the late finish, especially if the accommodation is not near Kyoto Station.',
          'Keep a convenience-store birthday dessert or drinks at the accommodation for a final toast.',
        ],
      },
    ],
  },
  {
    id: 'jul-27',
    date: '2026-07-27',
    weekday: 'Monday',
    title: 'Day 6',
    summary:
      'Walk beneath Fushimi Inari’s torii gates, explore historic Higashiyama and finish with the food and lantern-lit streets of Gion and Pontocho.',
    activities: [
      {
        time: '6:30 AM',
        title: 'Fushimi Inari Taisha',
        place: 'Fushimi',
        maps: 'https://www.google.com/maps/search/?api=1&query=Fushimi+Inari+Taisha',
        type: 'suggestion',
        notes: [
          'Kyoto’s famous mountainside shrine, known for thousands of bright red torii gates.',
          'Walk beyond the busy lower gates for quieter forest paths and smaller shrines.',
          'Turn back whenever the group is ready; the full summit walk is not essential.',
        ],
      },
      {
        time: '9:00 AM',
        title: 'Breakfast at Vermillion Café',
        place: 'Near Fushimi Inari',
        maps: 'https://www.google.com/maps/search/?api=1&query=Vermillion+Cafe+Kyoto',
        type: 'food',
        notes: [
          'A peaceful café near the shrine with coffee, brunch and a terrace overlooking greenery.',
          'A convenient place to cool down after the torii-gate walk.',
          'Confirm opening hours closer to the date.',
        ],
      },
      {
        time: '10:00 AM',
        title: 'Travel to Higashiyama',
        place: 'Fushimi Inari → Kiyomizu-dera',
        type: 'train',
        notes: [
          'Travel north towards Kyoto’s historic eastern district.',
          'The final approach to Kiyomizu-dera involves an uphill walk.',
        ],
      },
      {
        time: '10:45 AM',
        title: 'Kiyomizu-dera',
        place: 'Higashiyama',
        maps: 'https://www.google.com/maps/search/?api=1&query=Kiyomizu-dera',
        type: 'suggestion',
        notes: [
          'A historic hillside temple known for its large wooden stage and views across Kyoto.',
          'Explore the main hall, pagoda and Otowa Waterfall.',
          'Expect slopes, stairs and limited shade.',
        ],
      },
      {
        time: '12:15 PM',
        title: 'Sannenzaka, Ninenzaka and Yasaka Pagoda',
        place: 'Higashiyama',
        maps: 'https://www.google.com/maps/search/?api=1&query=Sannenzaka+Ninenzaka+Kyoto',
        type: 'suggestion',
        notes: [
          'Preserved stone streets lined with wooden buildings, cafés, sweets and traditional shops.',
          'Walk downhill from Kiyomizu-dera towards the Yasaka Pagoda.',
          'Try matcha, yatsuhashi or another small Kyoto sweet along the way.',
        ],
      },
      {
        time: '1:30 PM',
        title: 'Kyoto tofu lunch',
        place: 'Kiyomizu Junsei Okabeya',
        maps: 'https://www.google.com/maps/search/?api=1&query=Kiyomizu+Junsei+Okabeya',
        type: 'food',
        notes: [
          'A traditional restaurant specialising in yudofu—delicate tofu served hot with seasonal accompaniments.',
          'A good opportunity to try a meal closely associated with Kyoto’s temple cuisine.',
          'Check availability and reserve ahead if possible.',
        ],
        link: 'https://www.gltjp.com/en/directory/item/14727/',
      },
      {
        time: '3:00 PM',
        title: 'Return for an afternoon rest',
        place: 'Kyoto accommodation',
        type: 'stay',
        notes: [
          'Cool down and rest during the hottest part of the afternoon.',
          'Shower and recharge before returning to central Kyoto.',
        ],
      },
      {
        time: '5:30 PM',
        title: 'Gion Shirakawa and Pontocho food walk',
        place: 'Gion → Pontocho',
        maps: 'https://www.google.com/maps/search/?api=1&query=Gion+Shirakawa+Kyoto',
        type: 'suggestion',
        notes: [
          'A self-guided evening through Gion’s canal-side streets and Pontocho’s lantern-lit dining alley.',
          'Look for obanzai, Kyoto’s home-style selection of small seasonal dishes.',
          'Other easy choices include yakitori, tempura, sushi or a casual izakaya.',
        ],
      },
      {
        time: 'Evening',
        title: 'Kamo River after dark',
        place: 'Central Kyoto',
        maps: 'https://www.google.com/maps/search/?api=1&query=Kamo+River+Kyoto',
        type: 'suggestion',
        notes: [
          'Finish with a relaxed walk beside the river and the lights of central Kyoto.',
          'Optional depending on when dinner finishes.',
        ],
      },
    ],
  },
  {
    id: 'jul-28',
    date: '2026-07-28',
    weekday: 'Tuesday',
    title: 'Day 7',
    summary:
      'Meet Nara’s deer, see the Great Buddha, follow forest paths to Kasuga Taisha and finish among the shops and historic streets of Naramachi.',
    activities: [
      {
        time: '7:30 AM',
        title: 'Train to Nara',
        place: 'Kyoto → Kintetsu Nara',
        type: 'train',
        notes: [
          'Travel from Kyoto to Nara for an easy day trip.',
          'Kintetsu Nara Station is the most convenient arrival point for Nara Park.',
          'Pick up water and breakfast before boarding if needed.',
        ],
      },
      {
        time: '8:30 AM',
        title: 'Walk into Nara Park',
        place: 'Kintetsu Nara Station → Nara Park',
        maps: 'https://www.google.com/maps/search/?api=1&query=Nara+Park',
        type: 'suggestion',
        notes: [
          'Nara Park is a huge green area filled with temples, woodland and free-roaming deer.',
          'The first deer usually appear within a short walk of the station.',
          'Take the morning slowly before the heat builds.',
        ],
      },
      {
        time: '9:00 AM',
        title: 'Meet the Nara deer',
        place: 'Nara Park',
        maps: 'https://www.google.com/maps/search/?api=1&query=Nara+Park',
        type: 'suggestion',
        notes: [
          'Feed the deer approved shika senbei crackers sold around the park.',
          'Some deer may bow for food, but they can also become pushy once they see crackers.',
          'Keep paper, food and loose belongings secured.',
        ],
      },
      {
        time: '10:00 AM',
        title: 'Tōdai-ji',
        place: 'Nara Park',
        maps: 'https://www.google.com/maps/search/?api=1&query=Todai-ji+Nara',
        type: 'suggestion',
        notes: [
          'One of Japan’s most impressive temples, housing a roughly 15-metre bronze Buddha.',
          'Enter through the enormous Nandaimon Gate and see its guardian statues.',
          'Allow approximately one hour for the Great Buddha Hall and surrounding grounds.',
        ],
      },
      {
        time: '11:15 AM',
        title: 'Nigatsu-dō',
        place: 'Tōdai-ji complex',
        maps: 'https://www.google.com/maps/search/?api=1&query=Nigatsu-do+Nara',
        type: 'suggestion',
        notes: [
          'A quieter hillside hall behind Tōdai-ji with wide views across Nara.',
          'The uphill walk is short but exposed in places.',
          'Continue from here through the park towards Kasuga Taisha.',
        ],
      },
      {
        time: '12:15 PM',
        title: 'Kasuga Taisha',
        place: 'Nara Park',
        maps: 'https://www.google.com/maps/search/?api=1&query=Kasuga+Taisha+Nara',
        type: 'suggestion',
        notes: [
          'An important Shinto shrine surrounded by forest and thousands of stone and bronze lanterns.',
          'Walk through the lantern-lined approach and explore the vermilion shrine buildings.',
          'Use a local bus for part of the route if the heat becomes tiring.',
        ],
      },
      {
        time: '1:30 PM',
        title: 'Lunch at Kasuga Ninai Jaya',
        place: 'Near Kasuga Taisha',
        maps: 'https://www.google.com/maps/search/?api=1&query=Kasuga+Ninai+Jaya',
        type: 'food',
        notes: [
          'A traditional tea house managed by Kasuga Taisha.',
          'Try kakinoha sushi, seasonal rice porridge, tea or Japanese sweets.',
          'A convenient air-conditioned break before leaving the park.',
        ],
      },
      {
        time: '2:30 PM',
        title: 'Travel to Naramachi',
        place: 'Kasuga Taisha → Naramachi',
        type: 'train',
        notes: [
          'Take a local bus or taxi to avoid repeating the long walk across the park.',
          'Naramachi is Nara’s former merchant district, filled with restored townhouses and small shops.',
        ],
      },
      {
        time: '3:00 PM',
        title: 'Explore Naramachi',
        place: 'Naramachi',
        maps: 'https://www.google.com/maps/search/?api=1&query=Naramachi+Nara',
        type: 'suggestion',
        notes: [
          'Wander through quiet streets lined with traditional machiya townhouses.',
          'Browse small cafés, craft shops, galleries and deer-themed souvenirs.',
          'Keep the walk flexible depending on the heat and everyone’s energy.',
        ],
      },
      {
        time: '3:30 PM',
        title: 'Browse Yu Nakagawa',
        place: 'Naramachi',
        maps: 'https://www.google.com/maps/search/?api=1&query=Yu+Nakagawa+Nara',
        type: 'suggestion',
        notes: [
          'A long-established Nara brand known for traditional hemp fabric and modern Japanese crafts.',
          'Browse textiles, bags, homewares, wooden pieces and stylish deer-themed gifts.',
          'The flagship store is inside a restored merchant townhouse.',
        ],
        link: 'https://www.yu-nakagawa.co.jp/p/honten',
      },
      {
        time: '4:15 PM',
        title: 'Fresh mochi at Nakatanidō',
        place: 'Sanjo-dōri',
        maps: 'https://www.google.com/maps/search/?api=1&query=Nakatanidou+Nara',
        type: 'food',
        notes: [
          'A famous mochi shop known for rapid traditional mochi-pounding demonstrations.',
          'Try the freshly made yomogi mochi filled with sweet red-bean paste.',
          'Demonstration times are not fixed, so treat seeing one as a bonus.',
        ],
      },
      {
        time: '4:45 PM',
        title: 'Higashimuki Shopping Arcade',
        place: 'Near Kintetsu Nara Station',
        maps: 'https://www.google.com/maps/search/?api=1&query=Higashimuki+Shopping+Street+Nara',
        type: 'suggestion',
        notes: [
          'A covered shopping street with restaurants, snacks and souvenir stores.',
          'Buy deer gifts or local food products before returning to Kyoto.',
          'Optional stop at Kakinohazushi Tanaka for Nara’s persimmon-leaf sushi.',
        ],
      },
      {
        time: '5:30 PM',
        title: 'Return to Kyoto',
        place: 'Kintetsu Nara → Kyoto',
        type: 'train',
        notes: [
          'Return to Kyoto before dinner.',
          'Keep the final Kyoto evening relaxed after a full day of walking.',
        ],
      },
    ],
  },
  {
    id: 'jul-29',
    date: '2026-07-29',
    weekday: 'Wednesday',
    title: 'Kyoto to Osaka',
    summary:
      'Travel to Osaka, paint a personalised daruma and explore the markets, shops, food and neon streets around Namba.',
    activities: [
      {
        time: '7:00 AM',
        title: 'Travel to Osaka',
        place: 'Kyoto → Osaka Namba',
        type: 'train',
        notes: [
          'Leave Kyoto early enough to arrive without rushing before the 10:00 AM booking.',
          'The exact route will depend on the Kyoto accommodation, but Namba is the final destination.',
          'Keep the painted daruma in mind when packing—leave space to carry it safely.',
        ],
      },
      {
        time: '8:30 AM',
        title: 'Check in and leave luggage',
        place: 'Apartment Hotel 11 Namba',
        maps: 'https://www.google.com/maps/search/?api=1&query=Apartment+Hotel+11+Namba',
        type: 'stay',
        notes: [
          'The hotel has been notified that arrival will be on 29 July instead of 28 July.',
          'Check in, leave the luggage and carry only what is needed for the day.',
          'Aim to leave the hotel again by around 9:30 AM.',
        ],
        link: 'https://drive.google.com/drive/folders/1lLXQALDkWclZIcDAyqPr4yGV23LFm4lZ?usp=drive_link',
      },
      {
        time: '9:30 AM',
        title: 'Walk to DARUMA CLUB',
        place: 'Apartment Hotel 11 Namba → Nipponbashi',
        type: 'train',
        notes: [
          'DARUMA CLUB is around a seven-minute walk from Nippombashi Station.',
          'Arrive approximately 10–15 minutes before the booking.',
        ],
      },
      {
        time: '10:00 AM',
        title: 'Daruma painting experience',
        place: 'DARUMA CLUB · Nipponbashi',
        maps: 'https://www.google.com/maps/search/?api=1&query=DARUMA+CLUB+日本橋2丁目10-9+大阪',
        type: 'booking',
        notes: [
          'Create and personalise a traditional Japanese daruma based on a wish or goal.',
          'Choose the colour and design before painting your own one-of-a-kind keepsake.',
          'The experience lasts approximately 90–110 minutes.',
          '日本橋2丁目10−9, Chuo-ku, Osaka 542-0073.',
          'Free cancellation until 28 July.',
        ],
        link: 'https://drive.google.com/drive/folders/1rlxskWuPg-PgZKyx54rMJl18X-xbnaRf',
      },
      {
        time: '12:00 PM',
        title: 'Lunch through Kuromon Market',
        place: 'Kuromon Ichiba Market',
        maps: 'https://www.google.com/maps/search/?api=1&query=Kuromon+Ichiba+Market',
        type: 'food',
        notes: [
          'A historic covered market known as “Osaka’s kitchen”, with seafood, produce, snacks and small restaurants.',
          'Share a few items rather than filling up at the first stall.',
          'Look for seafood, sushi, grilled skewers, tamagoyaki, fruit or matcha desserts.',
          'Some stalls are tourist-priced, so check prices before ordering.',
        ],
        link: 'https://osaka-info.jp/en/spot/kuromon-market/',
      },
      {
        time: '1:15 PM',
        title: 'Browse Doguyasuji Kitchenware Street',
        place: 'Sennichimae',
        maps: 'https://www.google.com/maps/search/?api=1&query=Sennichimae+Doguyasuji',
        type: 'suggestion',
        notes: [
          'A covered shopping arcade specialising in Japanese knives, ceramics, cookware and restaurant supplies.',
          'Look for chopsticks, small bowls, tea tools and realistic plastic food models.',
          'Design Pocket is a fun stop for miniature food-replica souvenirs.',
        ],
        link: 'https://osaka-info.jp/en/spot/sennichimae-doguyasuji-shopping-street/',
      },
      {
        time: '2:15 PM',
        title: 'Namba Yasaka Shrine',
        place: 'Namba',
        maps: 'https://www.google.com/maps/search/?api=1&query=Namba+Yasaka+Shrine',
        type: 'suggestion',
        notes: [
          'A small Osaka shrine known for its enormous lion-head-shaped stage.',
          'It is a quick but memorable stop rather than a large temple visit.',
          'Skip it and return to the hotel sooner if the afternoon heat is uncomfortable.',
        ],
        link: 'https://nambayasaka.jp/',
      },
      {
        time: '3:00 PM',
        title: 'Hotel rest',
        place: 'Apartment Hotel 11 Namba',
        type: 'stay',
        notes: [
          'Return to the hotel during the hottest part of the afternoon.',
          'Cool down, unpack and store the painted daruma safely.',
          'Head back out once Dotonbori begins lighting up.',
        ],
      },
      {
        time: '5:30 PM',
        title: 'Hozenji Temple and Hozenji Yokocho',
        place: 'Namba',
        maps: 'https://www.google.com/maps/search/?api=1&query=Hozenji+Yokocho+Osaka',
        type: 'sight',
        notes: [
          'A small temple and atmospheric stone alley hidden behind the busy streets of Namba.',
          'See the moss-covered Mizukake Fudō statue and pour water over it while making a wish.',
          'The surrounding alley contains intimate restaurants, bars and traditional Osaka character.',
        ],
      },
      {
        time: '6:15 PM',
        title: 'Dotonbori food and neon walk',
        place: 'Dotonbori and Namba',
        maps: 'https://www.google.com/maps/search/?api=1&query=Dotonbori+Osaka',
        type: 'food',
        notes: [
          'See the illuminated canal, giant restaurant signs and the famous Glico running man.',
          'Try a proper Osaka dinner such as okonomiyaki or kushikatsu, then add takoyaki as a shared snack.',
          'Walk along the canal and through the surrounding Namba streets after dinner.',
          'Avoid trying every famous shop—the longest queue is not necessarily the best option.',
        ],
      },
      {
        time: '7:45 PM · Optional',
        title: 'Tombori River Cruise',
        place: 'Dotonbori Canal',
        maps: 'https://www.google.com/maps/search/?api=1&query=Tombori+River+Cruise',
        type: 'suggestion',
        notes: [
          'A short guided cruise beneath Dotonbori’s bridges and illuminated signs.',
          'The ride lasts approximately 20 minutes.',
          'Buy a timed ticket earlier in the evening because popular departures may sell out.',
          'Skip it if everyone would rather continue eating and exploring on foot.',
        ],
        link: 'https://www.ipponmatsu.co.jp/cruise/tombori.html',
      },
      {
        time: '8:30 PM',
        title: 'Shinsaibashi and Dotonbori after dark',
        place: 'Dotonbori → Shinsaibashi',
        maps: 'https://www.google.com/maps/search/?api=1&query=Shinsaibashi-suji+Shopping+Street',
        type: 'suggestion',
        notes: [
          'Continue beneath the covered Shinsaibashi shopping arcade or stay beside the canal.',
          'Browse shops, arcades, Don Quijote and dessert stores depending on energy.',
          'The hotel is nearby, so there is no need for a fixed finish time.',
        ],
      },
    ],
  },
  {
    id: 'jul-30',
    date: '2026-07-30',
    weekday: 'Thursday',
    title: 'Universal Studios',
    summary:
      'A possible full day at Universal Studios Japan before the flight home.',
    activities: [
      {
        time: '7:00 AM',
        title: 'Arrive at Universal Studios Japan',
        place: 'Universal City',
        maps: 'https://www.google.com/maps/search/?api=1&query=Universal+Studios+Japan',
        type: 'suggestion',
        notes: [
          'Arrive well before the official opening time',
          'Actual gates may open earlier on busy days',
          'Download the official USJ app before arriving',
        ],
      },
      {
        time: 'All day',
        title: 'Universal Studios Japan',
        place: 'Universal City',
        maps: 'https://www.google.com/maps/search/?api=1&query=Universal+Studios+Japan',
        type: 'suggestion',
        notes: [
          'A Studio Pass is required for park admission',
          'An Express Pass is separate and may include timed-area entry',
          'Prioritise Super Nintendo World and the attractions most important to the group',
          'Book as soon as the group decides to attend',
          'Keep this marked as a suggestion until tickets are purchased',
        ],
      },
      {
        time: 'Evening',
        title: 'Return to the accommodation',
        place: 'Osaka',
        type: 'stay',
        notes: [
          'Have a simple dinner near the accommodation or Universal City',
          'Pack before bed for the early airport transfer',
        ],
      },
    ],
  },
  {
    id: 'jul-31',
    date: '2026-07-31',
    weekday: 'Friday',
    title: 'Homeward',
    summary: 'Osaka → Kuala Lumpur → Adelaide. Arrive Saturday morning.',
    activities: [
      {
        time: '6:00 AM',
        title: 'Travel to Kansai Airport',
        place: 'Osaka → KIX',
        type: 'suggestion',
        notes: [
          'Aim to arrive approximately three hours before departure',
          'Update the departure time once the Osaka accommodation is confirmed',
          'Confirm the first available airport train or transfer option',
        ],
      },
      {
        time: '9:55 AM',
        title: 'Osaka → Kuala Lumpur',
        place: 'Malaysia Airlines MH53',
        type: 'flight',
        notes: ['Arrives 3:45 PM', '6 hr 40 min layover in Kuala Lumpur'],
        link: 'https://drive.google.com/drive/folders/1VLt48SDJMKYr186S3uiFrx4am0OLfLRd?usp=drive_link',
      },
      {
        time: '10:25 PM',
        title: 'Kuala Lumpur → Adelaide',
        place: 'Malaysia Airlines MH139',
        type: 'flight',
        notes: ['Arrives 7:00 AM Sat 1 Aug'],
        link: 'https://drive.google.com/drive/folders/1VLt48SDJMKYr186S3uiFrx4am0OLfLRd?usp=drive_link',
      },
    ],
  },
];
