import type { StaticImageData } from "next/image";

const blogImage1: StaticImageData = {
  src: "https://images.pexels.com/photos/1157096/pexels-photo-1157096.jpeg", // people entering a bus
  height: 400,
  width: 600,
};

const blogImage2: StaticImageData = {
  src: "https://images.pexels.com/photos/1391488/pexels-photo-1391488.jpeg", // scenic road through mountains
  height: 400,
  width: 600,
};

const blogImage3: StaticImageData = {
  src: "https://images.pexels.com/photos/4423467/pexels-photo-4423467.jpeg",
  height: 400,
  width: 600,
};

const blogImage4: StaticImageData = {
  src: "https://images.pexels.com/photos/290653/pexels-photo-290653.jpeg", // bus stop with travelers
  height: 400,
  width: 600,
};
const blogImage5: StaticImageData = {
  src: "https://images.pexels.com/photos/2962109/pexels-photo-2962109.jpeg", // bus interior with travelers
  height: 400,
  width: 600,
};

const blogImage6: StaticImageData = {
  src: "https://images.pexels.com/photos/786003/pexels-photo-786003.jpeg", // scenic road
  height: 400,
  width: 600,
};

const blogImage7: StaticImageData = {
  src: "https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg", // person waiting at station
  height: 400,
  width: 600,
};

const blogImage8: StaticImageData = {
  src: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg", // backpacker traveling
  height: 400,
  width: 600,
};

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: StaticImageData | string;
  imageAlt: string;
  content: string; // Changed to single HTML string
  readTime: string;
  author: string;
  category: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-book-bus-ticket-online-macedonia",
    title: "How to Book a Bus Ticket Online in Macedonia: A Step-by-Step Guide",
    date: "August 2, 2025",
    excerpt:
      "Tired of long queues and uncertain schedules? Discover the easiest way to book bus tickets online in Macedonia and the Balkans with GoBusly.",
    image: blogImage1,
    imageAlt: "Modern bus station with people easily booking tickets online",
    readTime: "5 min read",
    author: "GoBusly Team",
    category: "Travel Guide",
    tags: ["booking guide", "Macedonia", "bus travel", "tutorial"],
    content: `
      <p class="lead">Traveling across Macedonia and the wider Balkan region by bus is a fantastic way to experience the local culture and stunning landscapes. However, the traditional method of buying bus tickets often involves inconvenient trips to the bus station, long queues, and the uncertainty of finding available seats, especially during peak seasons.</p>

      <p>Welcome to <strong>GoBusly.com</strong>, your modern online platform designed to revolutionize how you <strong>book bus tickets online</strong> in Macedonia and the Balkans. We understand the frustrations of traditional booking, which is why we've created a seamless experience that puts convenience and control right at your fingertips.</p>

      <h2>Why Book Bus Tickets Online in Macedonia?</h2>
      
      <p>Before diving into our step-by-step guide, let's explore why online booking has revolutionized <strong>Balkan bus travel</strong>:</p>
      
      <ul>
        <li><strong>No more waiting in line</strong> at crowded bus stations</li>
        <li><strong>24/7 availability</strong> – book anytime, anywhere</li>
        <li><strong>Easy schedule comparison</strong> across multiple operators</li>
        <li><strong>Secure payment processing</strong> with instant confirmation</li>
        <li><strong>Real-time seat selection</strong> and availability updates</li>
        <li><strong>Mobile-friendly</strong> booking from your smartphone</li>
      </ul>

      <h2>Step-by-Step Guide: Booking with GoBusly</h2>

      <h3>Step 1: Visit GoBusly.com</h3>
      <p>Navigate to the <strong>GoBusly homepage</strong> where you'll find our intuitive search interface. The clean, modern design makes finding your perfect route simple and stress-free.</p>

      <div class="image-placeholder">
        <img src="/assets/images/gobusly.png" alt="GoBusly homepage showing bus ticket search form" class="rounded-lg shadow-md" />
        <p class="image-caption">GoBusly homepage with easy-to-use search form</p>
      </div>

      <h3>Step 2: Enter Your Travel Details</h3>
      <ol>
        <li><strong>Select your departure city</strong> (e.g., Tetovo)</li>
        <li><strong>Choose your destination</strong> (e.g., Skopje)</li>
        <li><strong>Pick your travel date</strong> using our calendar widget</li>
        <li><strong>Select number of passengers</strong></li>
        <li>Click <strong>"Search Buses"</strong></li>
      </ol>

      <p>The search form adapts beautifully to both desktop and mobile devices, ensuring a seamless experience regardless of how you access <strong>GoBusly</strong>.</p>

      <h3>Step 3: Browse Available Routes</h3>
      <p>Our results page displays all available <strong>bus tickets Macedonia</strong> options for your selected route. You'll see:</p>

      <ul>
        <li><strong>Departure and arrival times</strong></li>
        <li><strong>Journey duration</strong></li>
        <li><strong>Bus operator information</strong></li>
        <li><strong>Ticket prices</strong></li>
        <li><strong>Available seats</strong></li>
        <li><strong>Amenities</strong> (WiFi, AC, etc.)</li>
      </ul>

      <h3>Step 4: Select Your Preferred Bus</h3>
      <p>Compare different options and click <strong>"Select"</strong> on your preferred departure. Consider factors like:</p>
      <ul>
        <li>Travel time that fits your schedule</li>
        <li>Price point</li>
        <li>Bus amenities</li>
        <li>Operator reputation</li>
      </ul>

      <h3>Step 5: Choose Your Seats</h3>
      <p>Our interactive seat map lets you:</p>
      <ul>
        <li><strong>Select specific seats</strong> for you and your companions</li>
        <li><strong>View seat availability</strong> in real-time</li>
        <li><strong>Choose preferred locations</strong> (window, aisle, front, back)</li>
      </ul>

      <h3>Step 6: Enter Passenger Information</h3>
      <p>Fill in required details:</p>
      <ul>
        <li><strong>Full names</strong> (as they appear on ID)</li>
        <li><strong>Contact information</strong></li>
        <li><strong>Special requirements</strong> if any</li>
      </ul>

      <h3>Step 7: Secure Payment</h3>
      <p><strong>GoBusly</strong> offers multiple secure payment options:</p>
      <ul>
        <li><strong>Credit/Debit cards</strong></li>
        <li><strong>PayPal</strong></li>
        <li><strong>Local payment methods</strong></li>
      </ul>
      <p>All transactions are protected with SSL encryption for your security.</p>

      <h3>Step 8: Receive Your E-Ticket</h3>
      <p>Once payment is confirmed, you'll receive:</p>
      <ul>
        <li><strong>Electronic ticket</strong> via email</li>
        <li><strong>Booking confirmation</strong> with QR code</li>
        <li><strong>SMS confirmation</strong> with booking details</li>
      </ul>

      <h2>Popular Routes in Macedonia</h2>
      <p><strong>GoBusly</strong> covers extensive routes across Macedonia and the Balkans. Some of our most popular destinations include:</p>
      <ul>
        <li><a href="/routes/tetovo-skopje" class="text-[#ff284d] hover:underline"><strong>Tetovo to Skopje</strong></a> - Perfect for daily commuters</li>
        <li><strong>Skopje to Ohrid</strong> - Ideal for weekend getaways</li>
        <li><strong>Bitola to Skopje</strong> - Connecting southern Macedonia</li>
        <li><strong>Kumanovo to Skopje</strong> - Northern corridor route</li>
      </ul>

      <h2>Benefits of Using GoBusly</h2>

      <h3>Time-Saving Convenience</h3>
      <ul>
        <li><strong>Book in under 5 minutes</strong></li>
        <li>No need to visit physical locations</li>
        <li><strong>Instant confirmation</strong> and e-tickets</li>
      </ul>

      <h3>Price Transparency</h3>
      <ul>
        <li><strong>Compare prices</strong> across different operators</li>
        <li><strong>No hidden fees</strong></li>
        <li><strong>Special discounts</strong> for advance bookings</li>
      </ul>

      <div class="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Booking <strong>bus tickets Macedonia</strong> has never been easier with <strong>GoBusly</strong>. Our platform combines convenience, security, and reliability to make your <strong>Balkan bus travel</strong> experience exceptional.</p>
        
        <div class="cta-buttons">
          <a href="/" class="btn btn-primary">Start Your Journey with GoBusly →</a>
          <a href="/routes/tetovo-skopje" class="btn btn-secondary">Book Tetovo to Skopje tickets →</a>
        </div>
      </div>
    `,
  },
  {
    slug: "explore-balkan-bus-travel-tips",
    title: "Explore Balkan Bus Travel: Tips for a Smooth Journey",
    date: "July 15, 2025",
    excerpt:
      "Planning a trip across the Balkans by bus? Get essential tips for a smooth and enjoyable journey, from packing advice to navigating border crossings.",
    image: blogImage2,
    imageAlt: "Scenic view of a bus traveling through Balkan mountains",
    readTime: "4 min read",
    author: "Travel Expert",
    category: "Travel Tips",
    tags: ["Balkans", "travel tips", "bus travel"],
    content: `
      <p class="lead">The Balkans offer a rich tapestry of cultures, histories, and breathtaking landscapes, and traveling by bus is an excellent way to immerse yourself in the region.</p>

      <h2>Plan Your Route in Advance</h2>
      <p>While spontaneous travel has its charm, planning your bus routes, especially for longer journeys or popular destinations, can save you a lot of hassle. Websites like GoBusly allow you to easily find and <strong>book bus tickets online</strong> for various routes across the Balkans.</p>

      <h2>Pack Smart</h2>
      <p>Bus travel often means limited luggage space. Pack light and efficiently. A small backpack for essentials like water, snacks, a book, and your phone charger is always a good idea.</p>

      <h2>Border Crossings</h2>
      <p>If your journey involves crossing international borders, be prepared for potential delays. Have all your travel documents ready, including your passport and any necessary visas.</p>

      <div class="cta-section">
        <h2>Book Your Tickets with GoBusly</h2>
        <p>For the most convenient and secure way to book your <strong>Balkan bus travel</strong>, visit GoBusly.com.</p>
        <a href="/" class="btn btn-primary">Book Now →</a>
      </div>
    `,
  },
  {
    slug: "top-bus-routes-macedonia",
    title: "Top Bus Routes in Macedonia You Must Experience",
    date: "June 20, 2025",
    excerpt:
      "Discover the most popular and scenic bus routes within Macedonia. From bustling cities to serene lakes, explore the best of Macedonian bus travel.",
    image: blogImage3,
    imageAlt: "Map of Macedonia highlighting popular bus routes",
    readTime: "6 min read",
    author: "Route Specialist",
    category: "Routes",
    tags: ["Macedonia", "routes", "destinations"],
    content: `
      <p class="lead">Macedonia, a landlocked country in the heart of the Balkans, boasts a rich history, vibrant culture, and stunning natural beauty. Traveling by bus is an efficient and affordable way to explore its diverse landscapes and cities.</p>

      <h2>Skopje to Ohrid</h2>
      <p>This is arguably the most popular route in Macedonia. The journey from the bustling capital, Skopje, to the serene, ancient city of Ohrid offers picturesque views as you transition from urban landscapes to the tranquil beauty of the lake region.</p>

      <h2>Tetovo to Skopje</h2>
      <p>A frequent and essential route for many commuters and travelers, the <strong>Tetovo to Skopje</strong> connection is vital for daily travel between these two significant cities. GoBusly provides numerous options for this route.</p>

      <h2>Skopje to Bitola</h2>
      <p>Bitola, Macedonia's second-largest city, offers a charming blend of Ottoman and European architecture. The bus journey takes you through central Macedonia, showcasing the country's agricultural heartland.</p>

      <div class="cta-section">
        <h2>Why Choose Bus Travel in Macedonia?</h2>
        <p>Bus travel in Macedonia is not only cost-effective but also allows you to witness the country's diverse scenery up close.</p>
        <a href="/" class="btn btn-primary">Find Your Next Bus Ticket →</a>
      </div>
    `,
  },
  {
    slug: "balkan-bus-travel-destinations",
    title: "Top Balkan Destinations Accessible by Bus from Macedonia",
    date: "May 10, 2025",
    excerpt:
      "Expand your horizons! Discover incredible Balkan destinations you can easily reach by bus from Macedonia, making your international travel seamless.",
    image: blogImage4,
    imageAlt: "Collage of famous Balkan landmarks",
    readTime: "7 min read",
    author: "International Travel Guide",
    category: "Destinations",
    tags: ["Balkans", "international", "destinations"],
    content: `
      <p class="lead">Macedonia's central location in the Balkans makes it an excellent starting point for exploring neighboring countries by bus. <strong>Balkan bus travel</strong> is a popular and affordable way to discover the region's diverse cultures.</p>

      <h2>Skopje to Belgrade, Serbia</h2>
      <p>The capital of Serbia, Belgrade, is a dynamic city known for its nightlife, historical sites, and the confluence of the Sava and Danube rivers. Regular bus services connect Skopje to Belgrade.</p>

      <h2>Skopje to Sofia, Bulgaria</h2>
      <p>Just a few hours east of Skopje lies Sofia, the capital of Bulgaria. This city blends ancient history with modern vibrancy, featuring impressive cathedrals and Roman ruins.</p>

      <h2>Ohrid to Tirana, Albania</h2>
      <p>For those looking to explore Albania, the route from Ohrid to Tirana is a great option. Tirana is a colorful city with unique charm, undergoing rapid modernization.</p>

      <div class="cta-section">
        <h2>Why Choose GoBusly for International Travel?</h2>
        <p>GoBusly simplifies <strong>Balkan bus travel</strong> by allowing you to search, compare, and book tickets for international routes.</p>
        <a href="/" class="btn btn-primary">Start Your International Journey →</a>
      </div>
    `,
  },
  {
    slug: "what-to-pack-balkan-bus-trip",
    title:
      "What to Pack for a Balkan Bus Trip: Essentials You’ll Be Glad You Brought",
    date: "August 1, 2025",
    excerpt:
      "Long bus ride ahead? Here’s exactly what to pack for comfort, safety, and convenience when traveling by bus through the Balkans.",
    image: blogImage5,
    imageAlt: "Traveler packing a backpack at a bus terminal",
    readTime: "4 min read",
    author: "GoBusly Team",
    category: "Travel Tips",
    tags: ["packing tips", "bus travel", "Balkans"],
    content: `
    <p class="lead">Packing for a Balkan bus trip is different from packing for a flight. You’ll want to stay comfortable, prepared, and entertained without overpacking. Here's your complete guide.</p>

    <h2>Essentials You Can't Forget</h2>
    <ul>
      <li><strong>Passport or ID</strong> – required for cross-border travel</li>
      <li><strong>Printed or digital ticket</strong> – always have a backup</li>
      <li><strong>Water bottle</strong> – many buses don’t stop often</li>
      <li><strong>Snacks</strong> – pack something light like fruit, nuts, or crackers</li>
      <li><strong>Power bank</strong> – outlets aren't always available</li>
    </ul>

    <h2>Comfort Items</h2>
    <ul>
      <li><strong>Neck pillow</strong></li>
      <li><strong>Light blanket or scarf</strong></li>
      <li><strong>Headphones</strong></li>
      <li><strong>Wet wipes and hand sanitizer</strong></li>
    </ul>

    <h2>Entertainment</h2>
    <p>Bring an offline playlist or downloaded shows/movies. Some buses offer Wi-Fi, but don’t count on it being reliable.</p>

    <div class="cta-section">
      <h2>Travel Smart with GoBusly</h2>
      <p>Pack like a pro, then book your seat on <strong>GoBusly</strong> for a smoother ride.</p>
      <a href="/" class="btn btn-primary">Search Routes →</a>
    </div>
  `,
  },
  {
    slug: "border-crossing-tips-bus-travel",
    title: "Border Crossing Tips for Bus Travelers in the Balkans",
    date: "July 30, 2025",
    excerpt:
      "Crossing borders by bus in the Balkans? Here’s what to expect, how to prepare, and how to avoid common issues.",
    image: blogImage6,
    imageAlt: "Bus passengers showing passports at a border crossing",
    readTime: "5 min read",
    author: "Travel Expert",
    category: "Guides",
    tags: ["border crossing", "bus travel", "Balkans"],
    content: `
    <p class="lead">Traveling by bus between countries in the Balkans can be smooth if you're prepared. Here's everything you need to know.</p>

    <h2>Documents to Have Ready</h2>
    <ul>
      <li><strong>Valid passport</strong> with at least 6 months left</li>
      <li><strong>Visa (if required)</strong> based on your nationality</li>
      <li><strong>Printed e-ticket</strong> from GoBusly</li>
    </ul>

    <h2>At the Border</h2>
    <p>Expect to wait while all passengers are processed. Sometimes you’ll need to leave the bus for inspection. Follow the driver’s instructions carefully.</p>

    <h2>Travel Tips</h2>
    <ul>
      <li>Carry small bills in local currencies (rest stops might not accept cards)</li>
      <li>Use restrooms when available – stops can be far apart</li>
      <li>Stay calm and polite with border officers</li>
    </ul>

    <div class="cta-section">
      <h2>Travel With Confidence</h2>
      <p>When booking with <strong>GoBusly</strong>, you get updates and tips tailored to your route. Don’t cross borders unprepared!</p>
      <a href="/" class="btn btn-primary">Book Cross-Border Routes →</a>
    </div>
  `,
  },
  {
    slug: "bus-vs-train-vs-taxi-balkans",
    title: "Bus vs Train vs Taxi in the Balkans: What’s Best for Your Trip?",
    date: "July 24, 2025",
    excerpt:
      "Not sure whether to take a bus, train, or taxi for your trip around the Balkans? Here’s a practical comparison to help you choose.",
    image: blogImage7,
    imageAlt: "Bus, train, and taxi options lined up in a Balkan city",
    readTime: "5 min read",
    author: "Route Analyst",
    category: "Comparisons",
    tags: ["transportation", "Balkans", "travel options"],
    content: `
    <p class="lead">Choosing the right mode of travel in the Balkans can save you time and money. Here’s how buses stack up against trains and taxis.</p>

    <h2>Price</h2>
    <p><strong>Buses:</strong> Most affordable for long-distance travel<br />
       <strong>Trains:</strong> Often cheap, but less reliable<br />
       <strong>Taxis:</strong> Convenient but expensive, especially for intercity trips</p>

    <h2>Comfort & Amenities</h2>
    <p>Buses in the Balkans (especially via GoBusly) now offer Wi-Fi, AC, and reclining seats. Trains vary by country, and taxis depend heavily on the driver and vehicle.</p>

    <h2>Convenience</h2>
    <p>Buses offer the best network coverage. You can reach even smaller towns that trains don’t serve. Taxis are best for short trips or off-hours.</p>

    <div class="cta-section">
      <h2>Book the Smarter Way</h2>
      <p>For value and comfort, <strong>bus travel via GoBusly</strong> is a top choice.</p>
      <a href="/" class="btn btn-primary">Search Routes Now →</a>
    </div>
  `,
  },
  {
    slug: "best-weekend-trips-by-bus-macedonia",
    title: "Best Weekend Trips from Skopje by Bus",
    date: "July 12, 2025",
    excerpt:
      "Looking for a weekend escape? These beautiful destinations are just a short, scenic bus ride from Skopje.",
    image: blogImage8,
    imageAlt: "Couple boarding a bus for a weekend getaway",
    readTime: "6 min read",
    author: "Weekend Wanderer",
    category: "Destinations",
    tags: ["weekend travel", "Macedonia", "short trips"],
    content: `
    <p class="lead">Whether you're a local or just visiting Skopje, a weekend getaway by bus is a great way to relax without breaking the bank. Here are our top picks!</p>

    <h2>Ohrid</h2>
    <p>One of the most iconic weekend spots. Enjoy the lake, historic churches, and peaceful views. Buses run daily from Skopje and are easy to book via GoBusly.</p>

    <h2>Kratovo</h2>
    <p>This small, historic town is known for its stone towers and bridges. A hidden gem perfect for a slow weekend stroll and some fresh mountain air.</p>

    <h2>Strumica</h2>
    <p>Known for its delicious food and natural attractions like the Koleshino waterfalls. It’s a great foodie destination just a few hours away.</p>

    <div class="cta-section">
      <h2>Ready to Escape?</h2>
      <p>GoBusly helps you find the perfect bus and the perfect destination — fast.</p>
      <a href="/" class="btn btn-primary">Plan a Weekend Trip →</a>
    </div>
  `,
  },
];
