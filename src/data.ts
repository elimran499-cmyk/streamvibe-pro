import { MediaItem, Plan } from './types';

export const IPTV_PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter Package',
    price: 29.99,
    currency: '€',
    periodMonths: 3,
    discountPercent: 33,
    isPopular: false,
    features: [
      '115,000+ IPTV Channels Included',
      '120,000+ VOD Movies & Series',
      'Full HD & 4K Streaming Quality',
      'Compatible with Smart TVs & Smartphones',
      'Automatic daily playlist updates',
      'Includes Replay & EPG live TV guide',
      'Anti-Buffer IPTV Pro active technology',
      'Activation in less than 5 minutes',
      'Standard Email Customer Care'
    ]
  },
  {
    id: 'confort',
    name: 'Confort Package',
    price: 39.99,
    currency: '€',
    periodMonths: 6,
    discountPercent: 33,
    isPopular: false,
    features: [
      '115,000+ IPTV Channels Included',
      '120,000+ VOD Movies & Series',
      'Ultra HD, 4K & 8K Streaming',
      'All IPTV Players Compatible',
      'Includes Replay (Up to 7 days stored)',
      'Anti-Buffer Pro Active Engine v2',
      'Activation in less than 5 minutes',
      'Express Support 24/7 Priority Desk'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Ultra 4K',
    price: 49.99,
    currency: '€',
    periodMonths: 12,
    discountPercent: 33,
    isPopular: true,
    features: [
      '115,000+ IPTV Channels Included',
      '120,000+ VOD Movies & Series',
      'Absolute Best IPTV 4K & 8K Quality',
      'IPTV Smarters Pro App & All Players Included',
      'Includes Replay (Up to 7 days stored)',
      'Anti-Buffer Technology Elite Edition',
      'Activation in less than 5 minutes',
      'Dedicated VIP Support Manager 24/7'
    ]
  },
  {
    id: 'pack2',
    name: 'VIP Dual Connection',
    price: 79.99,
    currency: '€',
    periodMonths: 12,
    discountPercent: 27,
    isPopular: false,
    features: [
      '2 Separate Premium Stream Codes',
      '115,000+ Live IPTV Channels',
      '120,000+ Movies & Series VOD',
      'Ultra HD, 4K & 8K on both codes',
      'Full Multiroom simultaneous playback',
      '7 Days Auto-Replay & TimeShift',
      'Anti-Buffer Premium active firewall',
      'Fast Double Activation in 5 mins',
      'Premium VIP Support Desk 24/7'
    ]
  }
];

export const MEDIA_ITEMS: MediaItem[] = [
  // FEATURED MOVIE
  {
    id: 'feat-1',
    title: 'Avatar: The Way of Water',
    type: 'movie',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    backdropUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=1600',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    rating: 'PG-13',
    score: 8.8,
    duration: '3h 12m',
    year: 2022,
    description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home from destruction.',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver', 'Kate Winslet'],
    isFeatured: true,
    category: 'Action',
    authorLogo: 'Disney+'
  },
  // RECOMMENDED FOR YOU
  {
    id: 'rec-1',
    title: 'Avatar',
    type: 'movie',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=600',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    rating: 'PG',
    score: 8.5,
    duration: '2h 41m',
    year: 2009,
    description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
    category: 'Sci-Fi',
    authorLogo: 'Disney+'
  },
  {
    id: 'rec-2',
    title: 'Alien: Earth',
    type: 'series',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=600',
    backdropUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200',
    genre: ['Horror', 'Sci-Fi', 'Thriller'],
    rating: 'NC-16',
    score: 9.1,
    duration: '1 Season',
    year: 2025,
    description: 'When a mysterious vessel crashes on Earth, a young woman and a team of tactical soldiers make a terrifying discovery that puts them face-to-face with the planet\'s ultimate threat.',
    cast: ['Sydney Chandler', 'Alex Lawther', 'Timothy Olyphant'],
    category: 'Horror',
    authorLogo: 'Hulu'
  },
  {
    id: 'rec-3',
    title: 'Made in Korea',
    type: 'series',
    posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=600',
    backdropUrl: 'https://images.unsplash.com/photo-1542204172-e7052809a936?auto=format&fit=crop&q=80&w=1200',
    genre: ['Thriller', 'Crime', 'Drama'],
    rating: 'M-18',
    score: 8.9,
    duration: 'Finale Edition',
    year: 2025,
    description: 'An investigative reporter is dragged into a high-stakes conspiracy with deep ties to South Korea\'s most elite political families and corporate dynasties.',
    cast: ['Lee Jung-jae', 'Park Hae-soo'],
    category: 'Drama',
    authorLogo: 'Hulu'
  },
  {
    id: 'rec-4',
    title: 'Would You Marry Me?',
    type: 'movie',
    posterUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600',
    backdropUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200',
    genre: ['Romantic Comedy', 'Drama'],
    rating: 'PG-13',
    score: 7.7,
    duration: '1h 58m',
    year: 2025,
    description: 'A whimsical turn of events forces two complete strangers to agree to a mock engagement, only to find real sparks starting to fly between them.',
    cast: ['Kim Da-mi', 'Choi Woo-shik'],
    category: 'Romance',
    authorLogo: 'Hulu'
  },
  // YOU MAY ALSO LIKE
  {
    id: 'like-1',
    title: 'Desperate Housewives',
    type: 'series',
    posterUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=600',
    backdropUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200',
    genre: ['Drama', 'Mystery', 'Comedy'],
    rating: 'PG-13',
    score: 8.2,
    duration: '8 Seasons',
    year: 2012,
    description: 'Secrets and truths unfold through the lives of female friends in one suburban neighborhood after the mysterious suicide of a neighbor.',
    cast: ['Teri Hatcher', 'Felicity Huffman', 'Marcia Cross', 'Eva Longoria'],
    category: 'Drama',
    authorLogo: 'Disney+'
  },
  {
    id: 'like-2',
    title: 'Avengers: End Game',
    type: 'movie',
    posterUrl: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&q=80&w=600',
    backdropUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200',
    genre: ['Action', 'Sci-Fi', 'Adventure'],
    rating: 'PG-13',
    score: 9.3,
    duration: '3h 02m',
    year: 2019,
    description: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Scarlett Johansson'],
    category: 'Action',
    authorLogo: 'Disney+'
  },
  {
    id: 'like-3',
    title: 'Tempest',
    type: 'movie',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    backdropUrl: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80&w=1200',
    genre: ['Action', 'Thriller', 'Drama'],
    rating: 'PG-13',
    score: 8.4,
    duration: '2h 15m',
    year: 2024,
    description: 'A retired intelligence officer returns to service to track down a rogue operative weaponizing advanced weather control systems over global financial centers.',
    cast: ['Ju Ji-hoon', 'Han Hyo-joo'],
    category: 'Thriller',
    authorLogo: 'Hulu'
  },
  {
    id: 'like-4',
    title: 'Good American Family',
    type: 'series',
    posterUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600',
    backdropUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=1200',
    genre: ['Drama', 'Family'],
    rating: 'PG',
    score: 7.9,
    duration: '2 Seasons',
    year: 2025,
    description: 'An elegant domestic drama exploring the complex bonds of three generations of a high-achieving Midwestern family during a summer that changes everything.',
    cast: ['Ellen Pompeo', 'Mark Duplass'],
    category: 'Drama',
    authorLogo: 'Hulu'
  },
  {
    id: 'like-5',
    title: 'I Am Boxer',
    type: 'movie',
    posterUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
    backdropUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    genre: ['Action', 'Sports', 'Biography'],
    rating: '18+',
    score: 9.0,
    duration: '2h 11m',
    year: 2025,
    description: 'The intense, raw journey of a street champion who rises through the underground heavyweight circuit only to realize that his greatest battle lies outside the ring.',
    cast: ['Ma Dong-seok', 'Wi Ha-jun'],
    category: 'Sports',
    authorLogo: 'Hulu'
  }
];

export const MOCK_IPTV_CHANNELS = [
  { id: 'ch-1', name: 'Sky Sports Main Event Super HD', logo: '⚽', category: 'Sports', streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', quality: '4K', online: true },
  { id: 'ch-2', name: 'Canal+ Premium France Ultra 4K', logo: '📺', category: 'Movies', streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', quality: '4K', online: true },
  { id: 'ch-3', name: 'HBO US East (Active Stereo EPG)', logo: '🎬', category: 'Movies', streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', quality: '1080p', online: true },
  { id: 'ch-4', name: 'ESPN US Sports Active HD', logo: '🏈', category: 'Sports', streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', quality: '1080p', online: true },
  { id: 'ch-5', name: 'BBC One UK HD Live', logo: '🇬🇧', category: 'Entertainment', streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', quality: '1080p', online: true },
  { id: 'ch-6', name: 'Discovery Channel Ultimate 4K', logo: '🌍', category: 'Science', streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', quality: '4K', online: true },
  { id: 'ch-7', name: 'CNN International News 24/7', logo: '📰', category: 'News', streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', quality: '1080p', online: true },
  { id: 'ch-8', name: 'Disney Channel HD France Latino', logo: '🏰', category: 'Kids', streamUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback.mp4', quality: '720p', online: true }
];

export const COMPAT_DEVICES = [
  {
    id: 'tv',
    name: 'Smart TV',
    description: 'Samsung, LG, Sony, Android TV, Hisense, and Apple TV.',
    logo: '📺',
    steps: ['Install IPTV Smarters Pro or Smart IPTV app from your Store.', 'Enter your account server link and active credentials.', 'Enjoy instant 4K access!']
  },
  {
    id: 'mobile',
    name: 'Smartphones & Tablets',
    description: 'Compatible with all Android devices, iPhones & iPads.',
    logo: '📱',
    steps: ['Download IPTV Smarters Pro from Play Store or App Store.', 'Sign in using the dynamic codes shown in your billing cabinet.', 'Supports offline lists & active parental controls.']
  },
  {
    id: 'firestick',
    name: 'Amazon Fire Stick',
    description: 'Optimized for Fire TV & Fire Stick 4K Max formats.',
    logo: '⚡',
    steps: ['Enable "Apps from Unknown Sources" on firestick settings.', 'Install Downloader app, search and download "smarters.apk".', 'Copy-paste code and start streaming with active secure firewalls.']
  },
  {
    id: 'pc',
    name: 'PC & Mac',
    description: 'Excellent performance on Windows and macOS.',
    logo: '💻',
    steps: ['Install VLC Player or IPTV Smarters desktop version.', 'Load your custom .m3u playlist file or enter credentials.', 'Configure multi-screen streams seamlessly.']
  },
  {
    id: 'mag',
    name: 'MAG & Formuler',
    description: 'Fully supports MAG 250, 254, Formuler Z-boxes & STB portal paths.',
    logo: '📦',
    steps: ['Go to MAG system settings -> servers -> portals.', 'Set Portal 1 name as "Aura IPTV" and copy-paste portal server URL.', 'Reboot device with remote and start streaming instantly.']
  }
];

export const MOCK_GENRES = ['All', 'Action', 'Adventure', 'Sci-Fi', 'Horror', 'Thriller', 'Drama', 'Romance', 'Sports'];
