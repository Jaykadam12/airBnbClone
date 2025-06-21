const mongoose = require("mongoose");
const Listing = require("./models/Listing");

const listings = [
  {
    title: "Cozy Cottage in Manali",
    description: "A peaceful wooden cottage with mountain views.",
    price: 2500,
    location: "Manali, Himachal Pradesh",
    images: [
      "/uploads/cottage1.jpg",
      "/uploads/cottage2.jpg",
      "/uploads/cottage3.jpg",
    ],
    features: ["wifi", "free parking", "tv", "heater", "2 beds"],
    hostId: "684d984f5d238fbb470c4f12", // replace with real User ID
  },
  {
    title: "Luxury Villa in Goa",
    description: "Private pool villa just 5 mins from the beach.",
    price: 5500,
    location: "Anjuna, Goa",
    images: [
      "/uploads/villa1.jpg",
      "/uploads/villa2.jpg",
      "/uploads/villa3.jpg",
    ],
    features: ["wifi", "pool", "ac", "3 beds", "private chef"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Studio Apartment in Mumbai",
    description: "Modern apartment near Bandra Station.",
    price: 3200,
    location: "Bandra, Mumbai",
    images: [
      "/uploads/studio1.jpg",
      "/uploads/studio2.jpg",
      "/uploads/studio3.jpg",
    ],
    features: ["wifi", "tv", "ac", "1 bed"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Desert Camp in Jaisalmer",
    description: "Enjoy the stars and sand dunes in a desert tent.",
    price: 1800,
    location: "Sam Sand Dunes, Jaisalmer",
    images: ["/uploads/camp1.jpg", "/uploads/camp2.jpg", "/uploads/camp3.jpg"],
    features: ["bonfire", "traditional food", "tent stay", "1 bed"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Heritage Haveli in Jaipur",
    description: "Stay like royalty in this Rajasthani haveli.",
    price: 4000,
    location: "Pink City, Jaipur",
    images: [
      "/uploads/haveli1.jpg",
      "/uploads/haveli2.jpg",
      "/uploads/haveli3.jpg",
    ],
    features: ["wifi", "tv", "ac", "antique decor", "2 beds"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Hilltop Homestay in Ooty",
    description: "Nestled among the Nilgiris with breathtaking views.",
    price: 3000,
    location: "Ooty, Tamil Nadu",
    images: ["/uploads/ooty1.jpg", "/uploads/ooty2.jpg", "/uploads/ooty3.jpg"],
    features: ["wifi", "balcony", "2 beds", "nature view"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Backwater Villa in Kerala",
    description: "Relax in a peaceful villa right on the water.",
    price: 4200,
    location: "Alleppey, Kerala",
    images: [
      "/uploads/kerala1.jpg",
      "/uploads/kerala2.jpg",
      "/uploads/kerala3.jpg",
    ],
    features: ["wifi", "kayaking", "ac", "pool", "3 beds"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Treehouse Retreat",
    description: "Stay above the trees in a cozy wooden treehouse.",
    price: 2800,
    location: "Wayanad, Kerala",
    images: ["/uploads/tree1.jpg", "/uploads/tree2.jpg", "/uploads/tree3.jpg"],
    features: ["wifi", "forest view", "1 bed", "eco-friendly"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Snow View Chalet",
    description: "A warm chalet with snow-clad mountain views.",
    price: 4500,
    location: "Auli, Uttarakhand",
    images: ["/uploads/snow1.jpg", "/uploads/snow2.jpg", "/uploads/snow3.jpg"],
    features: ["wifi", "fireplace", "3 beds", "heater"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Luxury Tent in Rann",
    description: "Experience white desert in a luxurious setup.",
    price: 3700,
    location: "Rann of Kutch, Gujarat",
    images: ["/uploads/rann1.jpg", "/uploads/rann2.jpg", "/uploads/rann3.jpg"],
    features: ["tent stay", "cultural show", "ac", "2 beds"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Lake View Apartment",
    description: "Panoramic lake view from your living room.",
    price: 3100,
    location: "Udaipur, Rajasthan",
    images: ["/uploads/lake1.jpg", "/uploads/lake2.jpg", "/uploads/lake3.jpg"],
    features: ["wifi", "ac", "tv", "2 beds"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Coastal House in Pondicherry",
    description: "French-style bungalow near the promenade.",
    price: 2900,
    location: "White Town, Pondicherry",
    images: [
      "/uploads/pondy1.jpg",
      "/uploads/pondy2.jpg",
      "/uploads/pondy3.jpg",
    ],
    features: ["wifi", "heritage", "2 beds", "bicycle rental"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Glass House in the Jungle",
    description: "360° nature view with modern glass architecture.",
    price: 4800,
    location: "Chikmagalur, Karnataka",
    images: [
      "/uploads/glass1.jpg",
      "/uploads/glass2.jpg",
      "/uploads/glass3.jpg",
    ],
    features: ["glass walls", "eco-stay", "wifi", "2 beds"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Skyline Apartment",
    description: "City lights and skyline from the 30th floor.",
    price: 3500,
    location: "Kolkata, West Bengal",
    images: ["/uploads/sky1.jpg", "/uploads/sky2.jpg", "/uploads/sky3.jpg"],
    features: ["wifi", "ac", "tv", "1 bed"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Luxury Penthouse",
    description: "Exclusive rooftop penthouse with hot tub.",
    price: 7200,
    location: "Bangalore, Karnataka",
    images: ["/uploads/pent1.jpg", "/uploads/pent2.jpg", "/uploads/pent3.jpg"],
    features: ["jacuzzi", "city view", "3 beds", "wifi"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Cultural Stay in Varanasi",
    description: "Immerse in heritage near the ghats.",
    price: 2600,
    location: "Varanasi, Uttar Pradesh",
    images: [
      "/uploads/varanasi1.jpg",
      "/uploads/varanasi2.jpg",
      "/uploads/varanasi3.jpg",
    ],
    features: ["wifi", "ghat access", "2 beds", "heritage walk"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Modern Home in Hyderabad",
    description: "Central location, sleek design, cozy vibe.",
    price: 3000,
    location: "Banjara Hills, Hyderabad",
    images: ["/uploads/hyd1.jpg", "/uploads/hyd2.jpg", "/uploads/hyd3.jpg"],
    features: ["wifi", "tv", "ac", "1 bed"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Colonial Stay in Shimla",
    description: "Step back in time with comfort.",
    price: 2700,
    location: "Shimla, Himachal Pradesh",
    images: [
      "/uploads/shimla1.jpg",
      "/uploads/shimla2.jpg",
      "/uploads/shimla3.jpg",
    ],
    features: ["wifi", "antique furniture", "heater", "2 beds"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Eco Bamboo House",
    description: "Sustainable living in style.",
    price: 2800,
    location: "Auroville, Tamil Nadu",
    images: [
      "/uploads/bamboo1.jpg",
      "/uploads/bamboo2.jpg",
      "/uploads/bamboo3.jpg",
    ],
    features: ["eco-stay", "wifi", "2 beds", "nature view"],
    hostId: "684d984f5d238fbb470c4f12",
  },
  {
    title: "Artist's Loft",
    description: "A creative space filled with color and light.",
    price: 3300,
    location: "Pune, Maharashtra",
    images: ["/uploads/loft1.jpg", "/uploads/loft2.jpg", "/uploads/loft3.jpg"],
    features: ["wifi", "ac", "workspace", "1 bed"],
    hostId: "684d984f5d238fbb470c4f12",
  },
];

async function seedListings() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // ✅ Use correct DB
    await Listing.deleteMany(); // Optional: clear old data
    await Listing.insertMany(listings);
    console.log("✅ Seeded listings!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding listings:", err);
  }
}

seedListings();
