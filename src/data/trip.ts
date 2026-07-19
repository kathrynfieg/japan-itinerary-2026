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
    note: '22 July · Drive folder',
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
    note: '25 July · Drive folder',
  },
  {
    label: 'Kyoto accommodation',
    href: 'https://drive.google.com/drive/folders/1K8RI5p9EKy_tkFTGLrWT9K28EaGprvNY?usp=drive_link',
    note: '26 July · Drive folder',
  },
  {
    label: 'K36 rooftop bar',
    href: 'https://www.princehotels.com/seiryu-kiyomizu/restaurant/k36-the-bar-rooftoppartner-restaurant/',
    note: '26 July · Birthday drinks',
  },
  {
    label: 'Menya Inoichi',
    href: 'https://www.the-kansai-guide.com/en/directory/item/22116/',
    note: '26 July · Birthday ramen · queue tips',
  },
  {
    label: 'Osaka accommodation',
    href: 'https://drive.google.com/drive/folders/1lLXQALDkWclZIcDAyqPr4yGV23LFm4lZ?usp=drive_link',
    note: '29 July · Drive folder',
  },
  {
    label: 'Daruma painting experience',
    href: 'https://drive.google.com/drive/folders/1rlxskWuPg-PgZKyx54rMJl18X-xbnaRf',
    note: '29 July · 10:00 AM · DARUMA CLUB, Nipponbashi',
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
        place: 'Tokyo accommodation',
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
      'Celebrate Zac’s 30th birthday with a Lake Ashi morning, a journey to Kyoto, exceptional ramen and a memorable night in Gion.',
    activities: [
      {
        time: '7:30 AM',
        title: 'Birthday breakfast by Lake Ashi',
        place: 'Hakone-machi / Moto-Hakone',
        maps: 'https://www.google.com/maps/search/?api=1&query=Moto-Hakone',
        type: 'food',
        notes: [
          'Begin Zac’s birthday with a relaxed breakfast beside the mountains and Lake Ashi.',
          'Choose somewhere overlooking the lake or prepare breakfast at the accommodation.',
          'Keep the morning calm before the journey to Kyoto.',
        ],
      },
      {
        time: '8:30 AM',
        title: 'Hakone Shrine',
        place: 'Moto-Hakone',
        maps: 'https://www.google.com/maps/search/?api=1&query=Hakone+Shrine',
        type: 'suggestion',
        notes: [
          'A historic forest shrine known for its red torii gate beside Lake Ashi.',
          'Walk through the cedar trees, visit the main shrine and see the lakeside gate.',
          'Go early for cooler weather and smaller crowds.',
        ],
      },
      {
        time: '9:45 AM',
        title: 'Return and check out',
        place: 'Hakone accommodation',
        type: 'stay',
        notes: [
          'Collect the overnight bags and check out.',
          'Allow enough time to reach the bus stop without rushing.',
        ],
      },
      {
        time: '10:30 AM',
        title: 'Bus to Mishima Station',
        place: 'Moto-Hakone → Mishima',
        type: 'suggestion',
        notes: [
          'A mountain bus connecting the Lake Ashi side of Hakone with the Shinkansen.',
          'The route avoids travelling back through Hakone-Yumoto and Odawara.',
          'Confirm the exact departure and allow extra time for traffic.',
        ],
      },
      {
        time: '12:30 PM',
        title: 'Shinkansen to Kyoto',
        place: 'Mishima → Kyoto',
        type: 'suggestion',
        notes: [
          'Travel west on the Tokaido Shinkansen towards Kyoto.',
          'Some journeys may require a simple train change at Nagoya.',
          'Reserve seats once the Hakone bus timetable is confirmed.',
        ],
      },
      {
        time: '3:00 PM',
        title: 'Arrive and check in',
        place: 'Kyoto accommodation',
        type: 'stay',
        notes: [
          'Kyoto was Japan’s imperial capital and is known for temples, traditional streets and refined culture.',
          'Collect the luggage forwarded from Tokyo.',
          'Shower, change and rest before Zac’s birthday evening.',
        ],
        link: 'https://drive.google.com/drive/folders/1K8RI5p9EKy_tkFTGLrWT9K28EaGprvNY?usp=drive_link',
      },
      {
        time: '4:30 PM',
        title: 'Travel to downtown Kyoto',
        place: 'Kyoto accommodation → Kawaramachi',
        type: 'train',
        notes: [
          'Kawaramachi is Kyoto’s central shopping, dining and nightlife district.',
          'Aim to reach the ramen restaurant before its dinner service begins.',
        ],
      },
      {
        time: '5:00 PM',
        title: 'Queue for Menya Inoichi',
        place: 'Downtown Kyoto',
        maps: 'https://www.google.com/maps/search/?api=1&query=Menya+Inoichi+Kyoto',
        type: 'suggestion',
        notes: [
          'A tiny and highly regarded ramen restaurant known for elegant dashi-based broth.',
          'The restaurant has limited seating and can develop a significant queue.',
          'Arrive before opening and follow any numbered-ticket instructions.',
        ],
        link: 'https://www.the-kansai-guide.com/en/directory/item/22116/',
      },
      {
        time: '5:30 PM',
        title: 'Zac’s birthday ramen',
        place: 'Menya Inoichi',
        maps: 'https://www.google.com/maps/search/?api=1&query=Menya+Inoichi+Kyoto',
        type: 'food',
        notes: [
          'Celebrate with one of Kyoto’s most acclaimed bowls of ramen.',
          'Choose between the lighter white-soy dashi and richer dark-soy versions.',
          'Add Kyoto pork, wagyu or a seasoned egg depending on the available menu.',
          'Backup option: Ramen Muraji if the wait would make the evening too rushed.',
        ],
        link: 'https://www.the-kansai-guide.com/en/directory/item/22116/',
      },
      {
        time: '6:30 PM',
        title: 'Walk to Gion',
        place: 'Kawaramachi → Gion',
        type: 'suggestion',
        notes: [
          'Cross the Kamo River into Kyoto’s best-known traditional entertainment district.',
          'Gion is recognised for wooden townhouses, teahouses, geiko and maiko culture.',
          'Arrive at the theatre at least 15 minutes before the performance.',
        ],
      },
      {
        time: '7:00 PM',
        title: 'Gion Corner traditional arts show',
        place: 'Gion Kobu',
        maps: 'https://www.google.com/maps/search/?api=1&query=Gion+Corner+Kyoto',
        type: 'experience',
        notes: [
          'A compact introduction to several traditional Japanese performing arts.',
          'The show includes maiko dance, tea ceremony, koto music and classical theatre.',
          'Book premium seats or seats with tea and sweets to make the birthday feel more special.',
        ],
        link: 'https://www.kyoto-gioncorner.com/global/en.html',
      },
      {
        time: 'Evening · TBC',
        title: 'Alternative: Kyoto ghost tour',
        place: 'Arashiyama',
        maps: 'https://www.google.com/maps/search/?api=1&query=Arashiyama+Bamboo+Grove',
        type: 'suggestion',
        notes: [
          'A small-group night walk exploring Kyoto’s darker history, ghost stories and urban legends.',
          'The tour passes through atmospheric parts of Arashiyama, including the bamboo forest after dark.',
          'Lasts approximately two-and-a-half hours and requires advance booking.',
          'Choose this instead of Gion Corner; allow around 40–50 minutes to travel from central Kyoto.',
          'The later finish may mean skipping or shortening the K36 rooftop drinks.',
        ],
        link: 'https://www.getyourguide.com/kyoto-l96826/kyoto-ghost-tour-legends-dark-tales-bamboo-forest-night-t507045/',
      },
      {
        time: '8:00 PM',
        title: 'Gion night walk',
        place: 'Hanamikoji and Yasaka Shrine',
        maps: 'https://www.google.com/maps/search/?api=1&query=Hanamikoji+Street+Gion+Kyoto',
        type: 'suggestion',
        notes: [
          'See Gion’s stone lanes and traditional wooden buildings illuminated by lanterns.',
          'Walk along Hanamikoji, through Gion Shirakawa and towards Yasaka Shrine.',
          'Respect the residential streets and avoid photographing geiko or maiko without permission.',
        ],
      },
      {
        time: '9:15 PM',
        title: '30th birthday drinks at K36',
        place: 'The Hotel Seiryu Kyoto Kiyomizu',
        maps: 'https://www.google.com/maps/search/?api=1&query=The+Hotel+Seiryu+Kyoto+Kiyomizu',
        type: 'suggestion',
        notes: [
          'A stylish rooftop bar with panoramic views over Kyoto and Higashiyama.',
          'Toast Zac’s 30th with cocktails, dessert and views of Yasaka Pagoda.',
          'Reserve a birthday package or table in advance if available.',
          'The rooftop may close during rain or strong winds, with indoor seating as a backup.',
        ],
        link: 'https://www.princehotels.com/seiryu-kiyomizu/restaurant/k36-the-bar-rooftoppartner-restaurant/',
      },
      {
        time: '10:45 PM',
        title: 'Return to the accommodation',
        place: 'Higashiyama → Kyoto accommodation',
        type: 'train',
        notes: [
          'Take a taxi or public transport back after the birthday celebrations.',
          'Keep the finish time flexible depending on energy and rooftop weather.',
        ],
      },
    ],
  },
  {
    id: 'jul-27',
    date: '2026-07-27',
    weekday: 'Monday',
    title: 'Historic Kyoto',
    summary:
      'Fushimi Inari, Kiyomizu-dera and the traditional streets of eastern Kyoto.',
    activities: [
      {
        time: '6:30 AM',
        title: 'Fushimi Inari Taisha',
        place: 'Fushimi',
        maps: 'https://www.google.com/maps/search/?api=1&query=Fushimi+Inari+Taisha',
        type: 'suggestion',
        notes: [
          'Start early before the heat and crowds',
          'Walk beyond the busiest lower torii gates for a quieter experience',
          'There is no need to climb to the summit unless everyone wants to',
        ],
      },
      {
        time: '9:00 AM',
        title: 'Breakfast and rest',
        place: 'Kyoto',
        type: 'food',
        notes: [
          'Have breakfast after returning from Fushimi Inari',
          'Use this break to cool down before the next walking area',
        ],
      },
      {
        time: '10:30 AM',
        title: 'Kiyomizu-dera',
        place: 'Higashiyama',
        maps: 'https://www.google.com/maps/search/?api=1&query=Kiyomizu-dera',
        type: 'suggestion',
        notes: [
          'Explore the temple and its hillside views',
          'Expect slopes, stairs and limited shade',
        ],
      },
      {
        time: '12:00 PM',
        title: 'Sannenzaka and Ninenzaka',
        place: 'Higashiyama',
        maps: 'https://www.google.com/maps/search/?api=1&query=Sannenzaka+Ninenzaka+Kyoto',
        type: 'suggestion',
        notes: [
          'Walk through the preserved historic streets',
          'Browse cafés, sweets and traditional shops',
          'Continue towards Yasaka Pagoda if everyone has energy',
        ],
      },
      {
        time: '2:00 PM',
        title: 'Lunch and afternoon rest',
        place: 'Kyoto',
        type: 'food',
        notes: [
          'Take a proper break during the hottest part of the day',
          'Return to the accommodation before the evening',
        ],
      },
      {
        time: 'Evening',
        title: 'Pontocho and Kawaramachi',
        place: 'Central Kyoto',
        maps: 'https://www.google.com/maps/search/?api=1&query=Pontocho+Alley+Kyoto',
        type: 'suggestion',
        notes: [
          'Explore the narrow Pontocho alley after sunset',
          'Choose dinner around the Kamo River or Kawaramachi',
        ],
      },
    ],
  },
  {
    id: 'jul-28',
    date: '2026-07-28',
    weekday: 'Tuesday',
    title: 'Nara Day Trip',
    summary: 'A day among Nara’s deer, temples, gardens and historic streets.',
    activities: [
      {
        time: '7:30 AM',
        title: 'Train to Nara',
        place: 'Kyoto → Nara',
        type: 'suggestion',
        notes: [
          'Leave early to arrive before the largest crowds',
          'Kintetsu Nara Station is generally closer to Nara Park',
          'The exact route will depend on the Kyoto accommodation location',
        ],
      },
      {
        time: '9:00 AM',
        title: 'Nara Park',
        place: 'Nara Park',
        maps: 'https://www.google.com/maps/search/?api=1&query=Nara+Park',
        type: 'suggestion',
        notes: [
          'Walk through the park and see the free-roaming deer',
          'Only feed deer approved shika senbei crackers',
          'Keep food, maps and loose belongings secured around the deer',
        ],
      },
      {
        time: '10:00 AM',
        title: 'Tōdai-ji',
        place: 'Nara Park',
        maps: 'https://www.google.com/maps/search/?api=1&query=Todai-ji+Nara',
        type: 'suggestion',
        notes: [
          'Visit the Great Buddha Hall and its enormous bronze Buddha',
          'Allow approximately one hour for the temple complex',
          'This is one of the main highlights of the Nara day trip',
        ],
      },
      {
        time: '11:30 AM',
        title: 'Nigatsu-dō',
        place: 'Tōdai-ji complex',
        maps: 'https://www.google.com/maps/search/?api=1&query=Nigatsu-do+Nara',
        type: 'suggestion',
        notes: [
          'Walk uphill for a quieter temple area and views across Nara',
          'Skip this detour if the weather is excessively hot',
        ],
      },
      {
        time: '12:30 PM',
        title: 'Lunch in Nara',
        place: 'Nara Park or Higashimuki',
        maps: 'https://www.google.com/maps/search/?api=1&query=Higashimuki+Shopping+Street+Nara',
        type: 'food',
        notes: [
          'Try kakinoha-zushi, udon or another local specialty',
          'Use lunch as a proper air-conditioned rest break',
        ],
      },
      {
        time: '2:00 PM',
        title: 'Kasuga Taisha',
        place: 'Nara Park',
        maps: 'https://www.google.com/maps/search/?api=1&query=Kasuga+Taisha+Nara',
        type: 'suggestion',
        notes: [
          'Walk through the lantern-lined forest paths',
          'The shrine is known for its stone and bronze lanterns',
          'Consider using a local bus if everyone is tired from walking',
        ],
      },
      {
        time: '3:30 PM',
        title: 'Explore Naramachi',
        place: 'Naramachi',
        maps: 'https://www.google.com/maps/search/?api=1&query=Naramachi+Nara',
        type: 'suggestion',
        notes: [
          'Browse preserved merchant streets, cafés and small shops',
          'This can be shortened or skipped depending on energy levels',
        ],
      },
      {
        time: '5:00 PM',
        title: 'Return to Kyoto',
        place: 'Nara → Kyoto',
        type: 'train',
        notes: [
          'Return before dinner',
          'Keep the final Kyoto evening relaxed after the day trip',
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
      'Travel to Osaka, paint a daruma and experience Dotonbori after dark.',
    activities: [
      {
        time: 'Morning',
        title: 'Travel to Osaka',
        place: 'Kyoto → Osaka',
        type: 'train',
        notes: [
          'Travel early enough to reach Osaka before the 10:00 AM daruma experience',
          'Drop luggage at the Osaka accommodation before sightseeing',
          'Exact train route depends on both accommodation locations',
        ],
      },
      {
        time: 'Morning',
        title: 'Check-in Hotel',
        place: 'Apartment Hotel 11 Namba',
        maps: 'https://www.google.com/maps/search/?api=1&query=Apartment+Hotel+11+Namba',
        type: 'stay',
        notes: [
          'Hotel notified of check-in on the 29th rather than the 28th — can check in as soon as we arrive in the morning',
        ],
        link: 'https://drive.google.com/drive/folders/1lLXQALDkWclZIcDAyqPr4yGV23LFm4lZ?usp=drive_link',
      },
      {
        time: '10:00 AM',
        title: 'Daruma painting experience',
        place: 'DARUMA CLUB · Nipponbashi',
        maps: 'https://www.google.com/maps/search/?api=1&query=DARUMA+CLUB+日本橋2丁目10-9+大阪',
        type: 'booking',
        notes: [
          'Paint and personalise a traditional Japanese daruma',
          '日本橋2丁目10−9, Chuo-ku, Osaka 542-0073',
          'Near Namba — short walk or one stop from the accommodation',
        ],
        link: 'https://drive.google.com/drive/folders/1rlxskWuPg-PgZKyx54rMJl18X-xbnaRf',
      },
      {
        time: 'Afternoon',
        title: 'Explore Osaka',
        place: 'Namba, Umeda or Osaka Castle',
        maps: 'https://www.google.com/maps/search/?api=1&query=Osaka+Castle',
        type: 'suggestion',
        notes: [
          'Daruma Club is in Nipponbashi, close to Namba',
          'Do not cross the city unnecessarily during the hottest part of the day',
          'Return to the accommodation for a break before Dotonbori',
        ],
      },
      {
        time: 'Evening',
        title: 'Dotonbori at night',
        place: 'Dotonbori and Namba',
        maps: 'https://www.google.com/maps/search/?api=1&query=Dotonbori+Osaka',
        type: 'sight',
        notes: [
          'See the illuminated canal and Glico running-man sign',
          'Walk through Hozenji Yokocho',
          'Try takoyaki, okonomiyaki or kushikatsu',
          'This is a better fit than attempting Dotonbori after Universal Studios',
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
