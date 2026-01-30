import { Product, Seller } from './types';

const MOCK_REVIEWS = [
  { id: 'r1', user: 'Amit P.', avatar: 'AP', rating: 5, comment: 'Video verification was spot on. Item arrived exactly as shown.', date: '2 days ago' },
  { id: 'r2', user: 'Sarah J.', avatar: 'SJ', rating: 4, comment: 'Trusted seller. Fast shipping.', date: '1 week ago' },
  { id: 'r3', user: 'Rahul K.', avatar: 'RK', rating: 5, comment: 'Love the transparency. I will only buy verified now.', date: '2 weeks ago' },
  { id: 'r4', user: 'Priya M.', avatar: 'PM', rating: 5, comment: 'Excellent quality, exactly as described in the video.', date: '3 days ago' },
  { id: 'r5', user: 'Vikram S.', avatar: 'VS', rating: 4, comment: 'Good product, but shipping took a day longer than expected.', date: '5 days ago' }
];

const MOCK_HISTORICAL_VIDEOS = [
  { id: 'v1', thumbnail: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=200&q=80', date: 'Oct 12', productName: 'Vintage Lens', duration: '0:45' },
  { id: 'v2', thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80', date: 'Oct 15', productName: 'Smart Watch', duration: '1:12' },
  { id: 'v3', thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80', date: 'Oct 20', productName: 'Sneakers', duration: '0:58' }
];

const MOCK_SELLERS: Record<string, Seller> = {
  s1: {
    id: 's1',
    name: 'TechHaven India',
    verified: true,
    joinedDate: '2023-01-15',
    rating: 4.9,
    completedVerifications: 142,
    trustHistory: [{ date: 'Jan', score: 88 }, { date: 'Feb', score: 92 }, { date: 'Mar', score: 95 }, { date: 'Apr', score: 94 }, { date: 'May', score: 98 }],
    historicalVideos: MOCK_HISTORICAL_VIDEOS
  },
  s2: {
    id: 's2',
    name: 'LuxeBags Delhi',
    verified: true,
    joinedDate: '2023-03-10',
    rating: 4.7,
    completedVerifications: 89,
    trustHistory: [{ date: 'Jan', score: 75 }, { date: 'Feb', score: 80 }, { date: 'Mar', score: 85 }, { date: 'Apr', score: 90 }, { date: 'May', score: 92 }],
    historicalVideos: MOCK_HISTORICAL_VIDEOS.slice(0, 2)
  },
  s3: {
    id: 's3',
    name: 'Urban Kicks Mumbai',
    verified: true,
    joinedDate: '2022-11-05',
    rating: 4.8,
    completedVerifications: 310,
    trustHistory: [{ date: 'Jan', score: 90 }, { date: 'Feb', score: 91 }, { date: 'Mar', score: 89 }, { date: 'Apr', score: 95 }, { date: 'May', score: 97 }],
    historicalVideos: MOCK_HISTORICAL_VIDEOS
  },
  s4: {
    id: 's4',
    name: 'HomeDecor Bengaluru',
    verified: true,
    joinedDate: '2023-06-20',
    rating: 4.6,
    completedVerifications: 56,
    trustHistory: [{ date: 'Jan', score: 82 }, { date: 'Feb', score: 85 }, { date: 'Mar', score: 88 }, { date: 'Apr', score: 91 }, { date: 'May', score: 93 }],
    historicalVideos: []
  },
  s5: {
    id: 's5',
    name: 'Glamour Beauty Hub',
    verified: true,
    joinedDate: '2023-08-01',
    rating: 4.9,
    completedVerifications: 200,
    trustHistory: [{ date: 'Jan', score: 95 }, { date: 'Feb', score: 96 }, { date: 'Mar', score: 97 }, { date: 'Apr', score: 98 }, { date: 'May', score: 99 }],
    historicalVideos: MOCK_HISTORICAL_VIDEOS
  },
  s6: {
    id: 's6',
    name: 'AutoParts Prime',
    verified: true,
    joinedDate: '2023-05-15',
    rating: 4.5,
    completedVerifications: 78,
    trustHistory: [{ date: 'Jan', score: 85 }, { date: 'Feb', score: 87 }, { date: 'Mar', score: 86 }, { date: 'Apr', score: 89 }, { date: 'May', score: 91 }],
    historicalVideos: []
  }
};

// Generic stock video URL to simulate product trailers
const STOCK_VIDEO = "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4";

export const MOCK_PRODUCTS: Product[] = [
  // --- ELECTRONICS ---
  {
    id: 'e1',
    name: 'Sony Alpha a7 III Mirrorless Camera',
    description: 'Full-frame mirrorless interchangeable-lens camera. Body only. Pristine condition with minor cosmetic wear on the grip.',
    features: ['24.2MP Sensor', '4K HDR Video', '693 AF Points', '10fps Silent Shooting'],
    price: 164990,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519183071298-a2962feb14f4?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s1,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'e2',
    name: 'Apple MacBook Pro M2',
    description: '13-inch, 8GB RAM, 256GB SSD. Space Grey. Factory sealed box with 1 year warranty.',
    features: ['M2 Chip', 'Retina Display', '20h Battery', 'Touch Bar'],
    price: 119900,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s1,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'e3',
    name: 'iPhone 15 Pro Max',
    description: 'Natural Titanium, 256GB storage. Unlocked. Includes original USB-C cable. Screen protector installed since day 1.',
    features: ['A17 Pro Chip', 'Titanium Design', '48MP Main Camera', 'USB-C'],
    price: 148900,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s1,
    reviews: MOCK_REVIEWS.slice(0, 2)
  },
  {
    id: 'e4',
    name: 'Bose QuietComfort Ultra',
    description: 'Noise cancelling headphones, sandstone color. Spatial audio enabled. Like new condition.',
    features: ['World-class ANC', 'Spatial Audio', '24h Battery', 'Bluetooth 5.3'],
    price: 29900,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s1,
    reviews: MOCK_REVIEWS.slice(2, 4)
  },
  {
    id: 'e5',
    name: 'Nintendo Switch OLED',
    description: 'White Joy-Cons, pristine screen. Includes dock and all cables. Original packaging.',
    features: ['7-inch OLED', '64GB Storage', 'Wired LAN Port', 'Enhanced Audio'],
    price: 31990,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s1,
    reviews: MOCK_REVIEWS
  },

  // --- FASHION ---
  {
    id: 'f1',
    name: 'Nike Air Jordan 1 High OG',
    description: 'Chicago Colorway. Size 9 UK. Authenticity verified. Never worn, box included.',
    features: ['Original Packaging', 'Never Worn', 'Verified Colorway', 'Size 9 UK'],
    price: 38500,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514989940723-e8875ea6f03f?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s3,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'f2',
    name: 'Burberry Heritage Trench',
    description: 'Classic Honey color, Size M. Double-breasted, belted cuffs. Dry cleaned.',
    features: ['Cotton Gabardine', 'Vintage Check Lining', 'Belted Waist', 'Water Resistant'],
    price: 125000,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s2,
    reviews: []
  },
  {
    id: 'f3',
    name: 'Gucci Marmont Matelassé',
    description: 'Black chevron leather with GG hardware. Gently used, comes with dust bag.',
    features: ['Matelassé Leather', 'Antique Gold Hardware', 'Microfiber Lining', 'Shoulder Strap'],
    price: 185000,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s2,
    reviews: MOCK_REVIEWS.slice(0,1)
  },
  {
    id: 'f4',
    name: 'Ray-Ban Aviator Classic',
    description: 'Gold frame with G-15 Green lenses. Case and cleaning cloth included. Scratch-free.',
    features: ['100% UV Protection', 'Metal Frame', 'G-15 Lenses', 'Made in Italy'],
    price: 9500,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s3,
    reviews: MOCK_REVIEWS
  },

  // --- HOME ---
  {
    id: 'h1',
    name: 'Herman Miller Aeron Chair',
    description: 'Size B, Graphite color. Fully loaded with posture fit and adjustable arms. Minimal usage.',
    features: ['Pellicle Suspension', 'PostureFit SL', 'Tilt Limiter', 'Ergonomic'],
    price: 95000,
    category: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s4,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'h2',
    name: 'Dyson V15 Detect Vacuum',
    description: 'Cordless vacuum with laser illumination. HEPA filtration. All attachments included.',
    features: ['Laser Detect', 'Piezo Sensor', '60min Runtime', 'High Suction'],
    price: 65900,
    category: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1558317374-a354d5f6d4da?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1558317374-a354d5f6d4da?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s1,
    reviews: MOCK_REVIEWS.slice(0, 1)
  },
  {
    id: 'h3',
    name: 'Le Creuset Dutch Oven',
    description: '5.3L Signature Round Casserole in Volcanic Orange. Enamelled cast iron.',
    features: ['Cast Iron', 'Chip Resistant', 'Dishwasher Safe', 'Lifetime Guarantee'],
    price: 32000,
    category: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80',
    images: [
       'https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80',
       'https://images.unsplash.com/photo-1622329868772-23c31804f3db?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s4,
    reviews: []
  },
  {
    id: 'h4',
    name: 'Philips Hue Starter Kit',
    description: 'White and Color Ambiance. Includes 4 A19 bulbs and Hue Bridge. Works with Alexa.',
    features: ['16 Million Colors', 'App Control', 'Voice Compatible', 'Zigbee'],
    price: 14999,
    category: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-10917738179d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1558002038-10917738179d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s1,
    reviews: MOCK_REVIEWS.slice(2, 4)
  },

  // --- BEAUTY ---
  {
    id: 'b1',
    name: 'Dyson Airwrap Multi-styler',
    description: 'Complete Long set. Nickel/Copper. Curl, shape, smooth and hide flyaways with no extreme heat.',
    features: ['Coanda Airflow', 'Intelligent Heat', 'Negative Ions', 'Travel Case'],
    price: 49900,
    category: 'Beauty',
    imageUrl: 'https://images.unsplash.com/photo-1631730486784-5456119f69ae?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1631730486784-5456119f69ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8e6?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s5,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'b2',
    name: 'Chanel No. 5 Eau de Parfum',
    description: '100ml spray. The now and forever fragrance. Factory sealed, verified authentic.',
    features: ['Floral Aldehyde', 'Classic Scent', '100ml Volume', 'Sealed Box'],
    price: 16500,
    category: 'Beauty',
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s5,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'b3',
    name: 'La Mer Crème de la Mer',
    description: '60ml moisturizing cream. Miracle Broth infused. Heals dryness and restores radiance.',
    features: ['Miracle Broth', 'Ultra-Rich', 'Soothing', 'Anti-Aging'],
    price: 32000,
    category: 'Beauty',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s5,
    reviews: []
  },

  // --- SPORTS ---
  {
    id: 'sp1',
    name: 'Callaway Paradym Driver',
    description: '10.5 Degree loft. Stiff shaft. Carbon chassis for distance and forgiveness.',
    features: ['360 Carbon Chassis', 'Jailbreak AI', 'Forged Titanium', 'Adjustable Weight'],
    price: 59990,
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591491640784-3232eb991d4d?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s3,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'sp2',
    name: 'Specialized Allez Road Bike',
    description: 'Size 56cm. E5 Premium Aluminum frame. Carbon fork. Shimano Claris drivetrain.',
    features: ['Aluminum Frame', 'Carbon Fork', 'Shimano Claris', 'Lightweight'],
    price: 85000,
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485965120184-e224f7a1dbfe?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s3,
    reviews: []
  },
  {
    id: 'sp3',
    name: 'Manduka PRO Yoga Mat',
    description: 'Black Sage color. 6mm thick. High density cushion. Lifetime guarantee.',
    features: ['Zero Waste', 'High Density', 'Closed-Cell', 'Non-Slip'],
    price: 12500,
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s4,
    reviews: MOCK_REVIEWS.slice(0, 1)
  },

  // --- AUTOMOTIVE ---
  {
    id: 'auto1',
    name: 'Garmin Dash Cam 67W',
    description: 'Compact, 1440p HD video with 180-degree field of view. Voice control enabled.',
    features: ['1440p HD', '180° FOV', 'Voice Control', 'Cloud Storage'],
    price: 22990,
    category: 'Automotive',
    imageUrl: 'https://images.unsplash.com/photo-1517154596051-c636f6d634f5?auto=format&fit=crop&w=800&q=80',
    images: [
       'https://images.unsplash.com/photo-1517154596051-c636f6d634f5?auto=format&fit=crop&w=800&q=80',
       'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s6,
    reviews: MOCK_REVIEWS.slice(1, 3)
  },
  {
    id: 'auto2',
    name: 'NOCO Boost Plus GB40',
    description: '1000 Amp 12V UltraSafe Lithium Jump Starter. For gasoline engines up to 6L.',
    features: ['1000 Amps', 'Spark-Proof', 'LED Flashlight', 'USB Charging'],
    price: 11500,
    category: 'Automotive',
    imageUrl: 'https://images.unsplash.com/photo-1621255394528-7796d860d5c8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1621255394528-7796d860d5c8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s6,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'auto3',
    name: 'Meguiar\'s Complete Car Care',
    description: '12-Piece Kit. Includes Gold Class Wash, Wax, Detailer, Clay bar and more.',
    features: ['Premium Formula', 'Complete Kit', 'Microfiber Towel', 'Foam Applicator'],
    price: 8999,
    category: 'Automotive',
    imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550523788-e9eb7b37e89e?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s6,
    reviews: []
  },

  // --- ACCESSORIES ---
  {
    id: 'a1',
    name: 'Rolex Submariner Date',
    description: 'Pre-owned verified. Stainless steel, black dial. Oyster bracelet. Box and papers included.',
    features: ['Oystersteel', 'Cerachrom Bezel', '300m Water Resist', 'Calibre 3235'],
    price: 950000,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s2,
    reviews: MOCK_REVIEWS
  },
  {
    id: 'a2',
    name: 'Rimowa Classic Cabin',
    description: 'Silver aluminium suitcase. High-end anodized aluminium alloy. Hand-made leather handles.',
    features: ['Aluminium Shell', 'TSA Locks', 'Flex Divider', 'Multiwheel System'],
    price: 115000,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1565026057447-bc04064bb544?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1565026057447-bc04064bb544?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542867015-81622f9862f1?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s2,
    reviews: []
  },
  {
    id: 'a3',
    name: 'Minimalist Leather Wallet',
    description: 'Full grain leather bi-fold. RFID blocking. Slim profile. Hand-stitched edges.',
    features: ['Full Grain Leather', 'RFID Safe', '6 Card Slots', 'Slim Design'],
    price: 2499,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-18bd758e563d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1627123424574-18bd758e563d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606509036496-01588667b340?auto=format&fit=crop&w=800&q=80'
    ],
    staticVideoUrl: STOCK_VIDEO,
    seller: MOCK_SELLERS.s2,
    reviews: MOCK_REVIEWS.slice(3, 5)
  }
];