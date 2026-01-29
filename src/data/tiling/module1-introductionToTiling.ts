
import { Module } from '@/types/course';

export const module1IntroductionToTiling: Module = {
  id: 1,
  title: 'Introduction to Tiling',
  description: 'Master the fundamentals of tiling including tile materials, essential tools, and proper surface preparation techniques.',
  lessons: [
    {
      id: 1,
      title: 'Basics of Tile Materials',
      duration: '45 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=UMu_gChL1xY',
        textContent: `
          <div class="space-y-8">
            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">🔧 Introduction to Tiling – Basics of Tile Materials</h2>
              <p class="text-gray-700 leading-relaxed">
                Understanding different types of tiles is fundamental to successful tiling projects. This comprehensive lesson covers ceramic, porcelain, stone, glass, and mosaic tiles, helping you make informed decisions for your installations.
              </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🎯 Learning Objectives</h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start gap-2">
                  <span class="text-blue-500 font-bold">•</span>
                  <span>Gain a clear understanding of the most common tile materials</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-500 font-bold">•</span>
                  <span>Learn the key characteristics, benefits, and drawbacks of each material</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-500 font-bold">•</span>
                  <span>Understand which tile types are best suited for various applications</span>
                </li>
              </ul>
            </div>

            <div class="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🏺 A. Ceramic Tiles</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-gray-800 mb-2">Overview:</h4>
                  <p class="text-gray-700 mb-3">Made from natural clay, kiln-fired, and typically glazed to create a durable, easy-to-clean surface. Often used in residential bathrooms, kitchens, and entryways.</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="bg-green-100 p-4 rounded-lg">
                    <h5 class="font-semibold text-gray-800 mb-2">✅ Advantages:</h5>
                    <ul class="space-y-1 text-gray-700 text-sm">
                      <li>• <strong>Affordable:</strong> Generally more cost-effective than other materials</li>
                      <li>• <strong>Wide Range of Designs:</strong> Available in countless colors, patterns, and finishes</li>
                      <li>• <strong>Easy to Cut and Install:</strong> A great choice for DIY projects</li>
                    </ul>
                  </div>
                  
                  <div class="bg-red-100 p-4 rounded-lg">
                    <h5 class="font-semibold text-gray-800 mb-2">❌ Disadvantages:</h5>
                    <ul class="space-y-1 text-gray-700 text-sm">
                      <li>• <strong>Less Durable Than Porcelain:</strong> More prone to chipping and cracking</li>
                      <li>• <strong>Limited Water Resistance:</strong> Not ideal for areas subject to heavy moisture unless properly sealed</li>
                    </ul>
                  </div>
                </div>
                
                <div class="bg-blue-100 p-3 rounded-lg">
                  <h5 class="font-semibold text-gray-800 mb-1">Applications:</h5>
                  <p class="text-gray-700 text-sm">Best for indoor floors and walls in low to moderate traffic areas.</p>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">💎 B. Porcelain Tiles</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-gray-800 mb-2">Overview:</h4>
                  <p class="text-gray-700 mb-3">A type of ceramic tile made from denser, more refined clay and fired at higher temperatures. Known for its durability and versatility.</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="bg-green-100 p-4 rounded-lg">
                    <h5 class="font-semibold text-gray-800 mb-2">✅ Advantages:</h5>
                    <ul class="space-y-1 text-gray-700 text-sm">
                      <li>• <strong>Extremely Durable:</strong> Resists wear and tear, ideal for high-traffic areas</li>
                      <li>• <strong>Waterproof:</strong> Can be used indoors and outdoors, including showers, patios, and pool decks</li>
                      <li>• <strong>Low Maintenance:</strong> Stain-resistant and easy to clean</li>
                    </ul>
                  </div>
                  
                  <div class="bg-red-100 p-4 rounded-lg">
                    <h5 class="font-semibold text-gray-800 mb-2">❌ Disadvantages:</h5>
                    <ul class="space-y-1 text-gray-700 text-sm">
                      <li>• <strong>Higher Cost:</strong> Typically more expensive than standard ceramic tiles</li>
                      <li>• <strong>Challenging to Cut:</strong> Requires specialized tools due to its density</li>
                    </ul>
                  </div>
                </div>
                
                <div class="bg-blue-100 p-3 rounded-lg">
                  <h5 class="font-semibold text-gray-800 mb-1">Applications:</h5>
                  <p class="text-gray-700 text-sm">Perfect for kitchens, bathrooms, outdoor spaces, and areas with heavy foot traffic.</p>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🪨 C. Stone Tiles</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-gray-800 mb-2">Overview:</h4>
                  <p class="text-gray-700 mb-3">Includes natural materials such as marble, granite, slate, limestone, and travertine. Each tile has unique patterns, colors, and textures.</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="bg-green-100 p-4 rounded-lg">
                    <h5 class="font-semibold text-gray-800 mb-2">✅ Advantages:</h5>
                    <ul class="space-y-1 text-gray-700 text-sm">
                      <li>• <strong>Natural Beauty:</strong> Adds a luxurious, high-end look to any space</li>
                      <li>• <strong>Long-Lasting:</strong> With proper care, stone tiles can last for decades</li>
                      <li>• <strong>Versatility:</strong> Available in various finishes, such as polished, honed, or tumbled</li>
                    </ul>
                  </div>
                  
                  <div class="bg-red-100 p-4 rounded-lg">
                    <h5 class="font-semibold text-gray-800 mb-2">❌ Disadvantages:</h5>
                    <ul class="space-y-1 text-gray-700 text-sm">
                      <li>• <strong>Higher Maintenance:</strong> Requires sealing and regular upkeep to prevent stains and damage</li>
                      <li>• <strong>Expensive:</strong> Often the most costly option due to material rarity and installation complexity</li>
                      <li>• <strong>Porous:</strong> Some stone tiles are more absorbent, requiring extra care in wet areas</li>
                    </ul>
                  </div>
                </div>
                
                <div class="bg-blue-100 p-3 rounded-lg">
                  <h5 class="font-semibold text-gray-800 mb-1">Applications:</h5>
                  <p class="text-gray-700 text-sm">Best for luxurious interiors, fireplace surrounds, and accent walls. Suitable for flooring if sealed and maintained.</p>
                </div>
              </div>
            </div>

            <div class="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🔮 D. Glass Tiles</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-gray-800 mb-2">Overview:</h4>
                  <p class="text-gray-700 mb-3">Made from translucent or transparent glass, often used as decorative accents. Available in a wide range of colors, shapes, and finishes.</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="bg-green-100 p-4 rounded-lg">
                    <h5 class="font-semibold text-gray-800 mb-2">✅ Advantages:</h5>
                    <ul class="space-y-1 text-gray-700 text-sm">
                      <li>• <strong>Visually Stunning:</strong> Reflects light, adding depth and brightness to spaces</li>
                      <li>• <strong>Stain-Resistant:</strong> Non-porous surface is easy to clean and doesn't absorb liquids</li>
                      <li>• <strong>Eco-Friendly Options:</strong> Many glass tiles are made from recycled materials</li>
                    </ul>
                  </div>
                  
                  <div class="bg-red-100 p-4 rounded-lg">
                    <h5 class="font-semibold text-gray-800 mb-2">❌ Disadvantages:</h5>
                    <ul class="space-y-1 text-gray-700 text-sm">
                      <li>• <strong>Fragility:</strong> More prone to chipping and cracking during installation</li>
                      <li>• <strong>Higher Cost for Some Designs:</strong> Intricate glass mosaics can be expensive</li>
                      <li>• <strong>Slippery When Wet:</strong> Not ideal for floors unless textured or treated for slip resistance</li>
                    </ul>
                  </div>
                </div>
                
                <div class="bg-blue-100 p-3 rounded-lg">
                  <h5 class="font-semibold text-gray-800 mb-1">Applications:</h5>
                  <p class="text-gray-700 text-sm">Ideal for backsplashes, shower walls, and decorative borders. Adds a modern touch to kitchens and bathrooms.</p>
                </div>
              </div>
            </div>

            <div class="bg-pink-50 p-6 rounded-lg border-l-4 border-pink-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🎨 E. Mosaic Tiles</h3>
              <div class="space-y-4">
                <div>
                  <h4 class="font-semibold text-gray-800 mb-2">Overview:</h4>
                  <p class="text-gray-700 mb-3">Typically small tiles (made of ceramic, porcelain, glass, or stone) arranged in intricate patterns. Often pre-attached to mesh backing for easier installation.</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="bg-green-100 p-4 rounded-lg">
                    <h5 class="font-semibold text-gray-800 mb-2">✅ Advantages:</h5>
                    <ul class="space-y-1 text-gray-700 text-sm">
                      <li>• <strong>Design Versatility:</strong> Allows for creative patterns and decorative accents</li>
                      <li>• <strong>Great for Small Spaces:</strong> Adds visual interest without overwhelming a room</li>
                      <li>• <strong>Slip-Resistant in Some Cases:</strong> Many mosaics have textured surfaces</li>
                    </ul>
                  </div>
                  
                  <div class="bg-red-100 p-4 rounded-lg">
                    <h5 class="font-semibold text-gray-800 mb-2">❌ Disadvantages:</h5>
                    <ul class="space-y-1 text-gray-700 text-sm">
                      <li>• <strong>Labor-Intensive Installation:</strong> Requires careful grouting and attention to detail</li>
                      <li>• <strong>Cost Can Add Up:</strong> High-quality mosaics, especially custom designs, can be expensive</li>
                    </ul>
                  </div>
                </div>
                
                <div class="bg-blue-100 p-3 rounded-lg">
                  <h5 class="font-semibold text-gray-800 mb-1">Applications:</h5>
                  <p class="text-gray-700 text-sm">Perfect for backsplashes, shower floors, and feature walls. Can be used to highlight certain areas or create intricate designs.</p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-lg">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">📝 Section Summary</h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start gap-2">
                  <span class="text-blue-500 font-bold">•</span>
                  <span><strong>Ceramic tiles</strong> are affordable and versatile, suitable for residential spaces</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-500 font-bold">•</span>
                  <span><strong>Porcelain tiles</strong> offer unmatched durability and water resistance, ideal for high-traffic and outdoor areas</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-500 font-bold">•</span>
                  <span><strong>Stone tiles</strong> provide a luxurious, natural aesthetic but require more maintenance</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-500 font-bold">•</span>
                  <span><strong>Glass tiles</strong> are perfect for decorative touches, adding light and elegance</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-blue-500 font-bold">•</span>
                  <span><strong>Mosaic tiles</strong> enable intricate patterns and artistic designs, making them a great choice for accents and focal points</span>
                </li>
              </ul>
            </div>

            <div class="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
              <h3 class="text-xl font-semibold text-gray-800 mb-3">🏆 Key Takeaways</h3>
              <p class="text-gray-700 leading-relaxed">
                Understanding the characteristics of each tile type will help you make informed decisions based on aesthetics, functionality, and budget. By choosing the right material for the job, you'll ensure long-lasting, professional-quality results.
              </p>
            </div>
          </div>
        `
      }
    },
    {
      id: 2,
      title: 'Porcelain Tiles',
      duration: '30 minutes',
      type: 'video',
      content: {
        videoUrl: 'JtxDw2TdNps',
        textContent: `# Understanding Porcelain Tiles

Learn about the properties, benefits, and applications of porcelain tiles in professional installations.`
      }
    },
    {
      id: 3,
      title: 'Stone Tiles',
      duration: '30 minutes',
      type: 'video',
      content: {
        videoUrl: 'Ydo3-DgP2kY',
        textContent: `# Working with Stone Tiles

Master the techniques for installing natural stone tiles and understand their unique properties.`
      }
    },
    {
      id: 4,
      title: 'Glass Tiles',
      duration: '25 minutes',
      type: 'video',
      content: {
        videoUrl: 'eM7nyqA-a70',
        textContent: `# Glass Tile Installation

Learn the specialized techniques required for installing glass tiles safely and effectively.`
      }
    },
    {
      id: 5,
      title: 'Mosaic Tiles',
      duration: '25 minutes',
      type: 'video',
      content: {
        videoUrl: 'LJhSMPUfrbk',
        textContent: `# Mosaic Tile Techniques

Understand the unique challenges and methods for installing mosaic tile patterns.`
      }
    },
    {
      id: 6,
      title: 'Tile Materials Quiz',
      duration: '15 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'What is one of the primary advantages of ceramic tiles?',
            options: [
              'They are highly porous and require frequent sealing',
              'They are affordable and available in a wide variety of designs',
              'They are harder to cut, making them more durable',
              'They are ideal for heavy outdoor use without special treatment'
            ],
            correct: 1,
            explanation: 'Ceramic tiles are known for being affordable and offering a wide variety of design options, making them popular for residential applications.'
          },
          {
            question: 'Which type of tile is fired at higher temperatures and made from denser clay, resulting in greater durability?',
            options: [
              'Ceramic',
              'Porcelain',
              'Glass',
              'Mosaic'
            ],
            correct: 1,
            explanation: 'Porcelain tiles are made from denser clay and fired at higher temperatures, resulting in superior durability compared to ceramic tiles.'
          },
          {
            question: 'Why might someone choose stone tiles over ceramic or porcelain?',
            options: [
              'They are less expensive than ceramic or porcelain tiles',
              'They offer a unique, natural appearance that adds a luxurious look',
              'They require less maintenance than other tile materials',
              'They come in more color options than glass tiles'
            ],
            correct: 1,
            explanation: 'Stone tiles are chosen primarily for their natural beauty and luxurious appearance, despite requiring more maintenance and higher costs.'
          },
          {
            question: 'What is a potential disadvantage of glass tiles?',
            options: [
              'They are prone to staining',
              'They do not reflect light well',
              'They can be more fragile and challenging to install',
              'They are not available in many colors or patterns'
            ],
            correct: 2,
            explanation: 'Glass tiles are more fragile than other tile types and can be challenging to install due to their tendency to chip or crack.'
          },
          {
            question: 'What makes mosaic tiles a popular choice for backsplashes and decorative accents?',
            options: [
              'Their large size makes them easy to install quickly',
              'Their intricate patterns and ability to create unique designs',
              'Their low cost and high durability',
              'Their suitability for large, high-traffic flooring areas'
            ],
            correct: 1,
            explanation: 'Mosaic tiles are popular for decorative applications because they allow for intricate patterns and unique artistic designs.'
          },
          {
            question: 'Which type of tile is often considered the most water-resistant and suitable for wet environments like showers?',
            options: [
              'Ceramic',
              'Porcelain',
              'Stone',
              'Mosaic'
            ],
            correct: 1,
            explanation: 'Porcelain tiles are the most water-resistant due to their dense composition and low porosity, making them ideal for wet environments.'
          },
          {
            question: 'What is a common drawback of using natural stone tiles in a project?',
            options: [
              'They are prone to cracking if not sealed frequently',
              'They offer limited design options',
              'They require additional maintenance, including regular sealing',
              'They are not durable enough for most flooring applications'
            ],
            correct: 2,
            explanation: 'Natural stone tiles require regular maintenance including sealing to prevent stains and damage, making them more high-maintenance than other options.'
          }
        ]
      }
    },
    {
      id: 7,
      title: 'Manual Tile Cutters',
      duration: '20 minutes',
      type: 'video',
      content: {
        videoUrl: 'gsJCx19tnBc',
        textContent: `# Manual Tile Cutters

Learn how to use manual tile cutters effectively for precise straight cuts.`
      }
    },
    {
      id: 8,
      title: 'Electric Tile Cutters (Wet Saws)',
      duration: '25 minutes',
      type: 'video',
      content: {
        videoUrl: 'QYo0cTRaNoY',
        textContent: `# Electric Tile Cutters and Wet Saws

Master the use of electric tile cutters and wet saws for professional results.`
      }
    },
    {
      id: 9,
      title: 'Spacers and Layout Tools',
      duration: '15 minutes',
      type: 'video',
      content: {
        videoUrl: 'QwhCJimCWOo',
        textContent: `# Using Spacers for Consistent Layout

Learn how to use tile spacers to maintain uniform grout lines.`
      }
    },
    {
      id: 10,
      title: 'Notched Trowels',
      duration: '20 minutes',
      type: 'video',
      content: {
        videoUrl: 'hQp3Jpo1Iuk',
        textContent: `# Notched Trowel Techniques

Understand how to select and use the right notched trowel for different tile installations.`
      }
    },
    {
      id: 11,
      title: 'Margin Trowels',
      duration: '15 minutes',
      type: 'video',
      content: {
        videoUrl: 'SWXZvs1O38Q',
        textContent: `# Using Margin Trowels

Learn the proper techniques for using margin trowels in tile work.`
      }
    },
    {
      id: 12,
      title: 'Grout Floats',
      duration: '15 minutes',
      type: 'video',
      content: {
        videoUrl: 'zdImFIiTzXM',
        textContent: `# Working with Grout Floats

Master the use of grout floats for professional grouting results.`
      }
    },
    {
      id: 13,
      title: 'Wet Saw Safety and Operation',
      duration: '25 minutes',
      type: 'video',
      content: {
        videoUrl: 'jQuUYczIG00',
        textContent: `# Wet Saw Safety and Advanced Techniques

Learn safe operation procedures and advanced techniques for wet saws.`
      }
    },
    {
      id: 14,
      title: 'Blades and Scoring Wheels',
      duration: '20 minutes',
      type: 'video',
      content: {
        videoUrl: 'YdWnYpcG0g8',
        textContent: `# Understanding Blades and Scoring Wheels

Learn about different blade types and scoring wheel maintenance.`
      }
    },
    {
      id: 15,
      title: 'Trowel Edge Maintenance',
      duration: '15 minutes',
      type: 'video',
      content: {
        videoUrl: 'Yk9KCkGlYww',
        textContent: `# Maintaining Trowel Edges

Keep your trowels in optimal condition for professional results.`
      }
    },
    {
      id: 16,
      title: 'Workspace Setup',
      duration: '20 minutes',
      type: 'video',
      content: {
        videoUrl: 'ArA1VCKPG6U',
        textContent: `# Proper Workspace Setup

Learn how to organize your workspace for efficient and safe tile installation.`
      }
    },
    {
      id: 17,
      title: 'Wet Saw Safety Procedures',
      duration: '20 minutes',
      type: 'video',
      content: {
        videoUrl: '5pE430RStHQ',
        textContent: `# Wet Saw Safety Procedures

Essential safety protocols for operating wet saws in tiling projects.`
      }
    },
    {
      id: 18,
      title: 'Manual Tile Cutter Techniques',
      duration: '20 minutes',
      type: 'video',
      content: {
        videoUrl: 'h6x8o4IZldg',
        textContent: `# Advanced Manual Tile Cutter Techniques

Master advanced techniques for manual tile cutters.`
      }
    },
    {
      id: 19,
      title: 'Electrical Safety in Tiling',
      duration: '15 minutes',
      type: 'video',
      content: {
        videoUrl: '5pE430RStHQ',
        textContent: `# Electrical Safety for Tilers

Important electrical safety considerations when using power tools.`
      }
    },
    {
      id: 20,
      title: 'Trowel and Float Maintenance',
      duration: '15 minutes',
      type: 'video',
      content: {
        videoUrl: 'eP17EFPWdZk',
        textContent: `# Maintaining Trowels and Grout Floats

Proper care and maintenance of your essential tiling tools.`
      }
    },
    {
      id: 21,
      title: 'Tools and Equipment for Tiling',
      duration: '60 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=c6F_Y6vAo-w',
        textContent: `
          <div class="space-y-8">
            <div class="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border-l-4 border-orange-500">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">🛠️ Tools and Equipment for Tiling</h2>
              <p class="text-gray-700 leading-relaxed">
                Master the essential tools required for professional tiling work. This comprehensive guide covers everything from basic hand tools to advanced equipment, including proper maintenance and safety protocols.
              </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🎯 Learning Objectives</h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start gap-2">
                  <span class="text-orange-500 font-bold">•</span>
                  <span>Gain a clear understanding of essential tools used in tiling and their purposes</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-orange-500 font-bold">•</span>
                  <span>Learn how to maintain tiling tools to ensure consistent performance and longevity</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-orange-500 font-bold">•</span>
                  <span>Understand safety guidelines for working with both manual and power tools</span>
                </li>
              </ul>
            </div>

            <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">✂️ A. Tile Cutters</h3>
              <div class="space-y-4">
                <div class="bg-blue-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">Manual Tile Cutters:</h4>
                  <ul class="space-y-2 text-gray-700 text-sm">
                    <li>• Designed to score and snap tiles cleanly along straight lines</li>
                    <li>• Ideal for smaller, straight cuts and standard ceramic or porcelain tiles</li>
                    <li>• Features include a scoring wheel, guide rails, and a breaking mechanism</li>
                  </ul>
                </div>
                
                <div class="bg-blue-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">Electric Tile Cutters (Wet Saws):</h4>
                  <ul class="space-y-2 text-gray-700 text-sm">
                    <li>• Use a water-cooled diamond blade to make precise cuts</li>
                    <li>• Suitable for larger or harder tiles like stone or glass</li>
                    <li>• Capable of complex cuts, including L-shaped or circular openings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">📏 B. Spacers and Levels</h3>
              <div class="space-y-4">
                <div class="bg-green-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">Spacers:</h4>
                  <ul class="space-y-2 text-gray-700 text-sm">
                    <li>• Ensure consistent spacing between tiles</li>
                    <li>• Available in various thicknesses to match desired grout joint width</li>
                  </ul>
                </div>
                
                <div class="bg-green-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">Levels and Straightedges:</h4>
                  <ul class="space-y-2 text-gray-700 text-sm">
                    <li>• Essential for ensuring the surface is flat and tiles are laid evenly</li>
                    <li>• Laser levels or bubble levels can be used to check alignment, both horizontally and vertically</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🔧 C. Trowels</h3>
              <div class="space-y-4">
                <div class="bg-purple-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">Notched Trowels:</h4>
                  <ul class="space-y-2 text-gray-700 text-sm">
                    <li>• Used to spread tile adhesive evenly</li>
                    <li>• Notch size varies based on the tile size and adhesive type</li>
                    <li>• Square-notched and V-notched trowels are common for different tiling projects</li>
                  </ul>
                </div>
                
                <div class="bg-purple-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">Margin Trowels:</h4>
                  <ul class="space-y-2 text-gray-700 text-sm">
                    <li>• Smaller, flat-edged trowels for detailed adhesive application in tight spaces</li>
                    <li>• Handy for cleaning up edges and smoothing small areas of adhesive</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🧽 D. Grout Floats</h3>
              <div class="bg-yellow-100 p-4 rounded-lg">
                <ul class="space-y-2 text-gray-700 text-sm">
                  <li>• Used to spread grout across the tile surface, pushing it into the joints</li>
                  <li>• Rubber or foam surfaces prevent scratching the tiles while filling joints evenly</li>
                  <li>• Ensure a clean finish by using the float at an angle and wiping away excess grout</li>
                </ul>
              </div>
            </div>

            <div class="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">⚙️ E. Wet Saws</h3>
              <div class="bg-red-100 p-4 rounded-lg">
                <ul class="space-y-2 text-gray-700 text-sm">
                  <li>• A powered cutting tool with a water-cooled blade</li>
                  <li>• Ideal for precision cuts, intricate designs, and thicker materials</li>
                  <li>• Features include adjustable cutting guides, a water reservoir, and a diamond-tipped blade for smooth cuts</li>
                </ul>
              </div>
            </div>

            <div class="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🧹 Proper Tool Maintenance</h3>
              <div class="space-y-4">
                <div class="bg-gray-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">Cleaning and Storing Tools:</h4>
                  <div class="space-y-3">
                    <div>
                      <h5 class="font-medium text-gray-800">Manual Tile Cutters:</h5>
                      <ul class="text-gray-700 text-sm space-y-1 mt-1">
                        <li>• Wipe down after each use to remove dust and tile debris</li>
                        <li>• Lubricate guide rails periodically to ensure smooth scoring</li>
                      </ul>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-800">Trowels and Floats:</h5>
                      <ul class="text-gray-700 text-sm space-y-1 mt-1">
                        <li>• Wash off adhesive or grout immediately after use to prevent buildup</li>
                        <li>• Store in a dry place to prevent rust and maintain their shape</li>
                      </ul>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-800">Wet Saws:</h5>
                      <ul class="text-gray-700 text-sm space-y-1 mt-1">
                        <li>• Empty the water reservoir after use to avoid mineral deposits</li>
                        <li>• Clean the blade and guard to remove tile dust and slurry</li>
                        <li>• Inspect the blade regularly for wear and replace if dull</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">⚠️ Safety Guidelines</h3>
              <div class="space-y-4">
                <div class="bg-orange-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">General Safety Precautions:</h4>
                  <div class="space-y-2">
                    <h5 class="font-medium text-gray-800">Wear Personal Protective Equipment (PPE):</h5>
                    <ul class="text-gray-700 text-sm space-y-1">
                      <li>• Safety glasses or goggles to protect against flying tile fragments</li>
                      <li>• Gloves to prevent cuts from sharp tiles or tools</li>
                      <li>• Ear protection when using power tools like wet saws</li>
                    </ul>
                  </div>
                </div>
                
                <div class="bg-orange-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">Safe Use of Power Tools:</h4>
                  <div class="space-y-2">
                    <h5 class="font-medium text-gray-800">Wet Saw Safety:</h5>
                    <ul class="text-gray-700 text-sm space-y-1">
                      <li>• Keep hands clear of the blade. Use push sticks or guides when necessary</li>
                      <li>• Ensure the saw is on a stable surface and the water supply is functioning properly</li>
                      <li>• Disconnect the saw from power when changing the blade or performing maintenance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-lg">
              <h3 class="text-xl font-semibold text-gray-800 mb-3">🏆 Key Takeaways</h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start gap-2">
                  <span class="text-orange-500 font-bold">✓</span>
                  <span>Using the right tools for each step ensures accuracy, efficiency, and professional finish</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-orange-500 font-bold">✓</span>
                  <span>Regular tool maintenance extends tool life and improves results</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-orange-500 font-bold">✓</span>
                  <span>Following safety guidelines reduces injury risk and ensures smooth projects</span>
                </li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 4,
      title: 'Tools and Equipment Quiz',
      duration: '15 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'Which tool is used to spread tile adhesive evenly across the surface before placing tiles?',
            options: [
              'Tile cutter',
              'Notched trowel',
              'Grout float',
              'Spacer'
            ],
            correct: 1,
            explanation: 'A notched trowel is specifically designed to spread tile adhesive evenly, with notches that create ridges for proper adhesion.'
          },
          {
            question: 'What is the primary purpose of a tile spacer?',
            options: [
              'To cut tiles to the correct size',
              'To maintain consistent gaps between tiles',
              'To spread grout into joints',
              'To level the substrate'
            ],
            correct: 1,
            explanation: 'Tile spacers are used to maintain consistent gaps between tiles, ensuring uniform grout lines throughout the installation.'
          },
          {
            question: 'How do wet saws differ from manual tile cutters?',
            options: [
              'Wet saws rely on hand pressure, while manual tile cutters use an electric motor',
              'Wet saws use a water-cooled blade to cut through harder materials and perform more precise cuts',
              'Wet saws are only for cutting wood, not tiles',
              'Manual tile cutters are more suitable for cutting intricate shapes'
            ],
            correct: 1,
            explanation: 'Wet saws use water-cooled diamond blades that allow for precise cuts through harder materials like stone and glass, unlike manual cutters that rely on scoring and snapping.'
          },
          {
            question: 'What is a grout float used for?',
            options: [
              'Cutting tiles to fit around edges',
              'Spreading grout into tile joints',
              'Measuring tile alignment',
              'Scraping away excess adhesive'
            ],
            correct: 1,
            explanation: 'A grout float is used to spread grout across the tile surface and push it into the joints between tiles.'
          },
          {
            question: 'Why is it important to clean trowels and floats after use?',
            options: [
              'To improve their cutting accuracy',
              'To prevent the buildup of hardened adhesive or grout',
              'To reduce the chance of electrical shock',
              'To make the tiles easier to remove later'
            ],
            correct: 1,
            explanation: 'Cleaning trowels and floats immediately after use prevents hardened adhesive or grout buildup, which can affect their performance and durability.'
          },
          {
            question: 'Which safety measure is recommended when using a wet saw?',
            options: [
              'Use a dry blade to avoid slippery surfaces',
              'Always wear safety glasses to protect your eyes from flying fragments',
              'Disconnect the water supply for better visibility',
              'Hold tiles directly with your hand close to the blade'
            ],
            correct: 1,
            explanation: 'Safety glasses are essential when using a wet saw to protect your eyes from flying tile fragments and water spray.'
          },
          {
            question: 'How can you ensure that a manual tile cutter continues to produce clean cuts?',
            options: [
              'Apply more pressure with each cut',
              'Replace the scoring wheel when it becomes dull',
              'Use a thicker adhesive layer under the tiles',
              'Clean the grout lines before cutting'
            ],
            correct: 1,
            explanation: 'Replacing the scoring wheel when it becomes dull is essential for maintaining clean, precise cuts with a manual tile cutter.'
          },
          {
            question: 'What should you check before using a wet saw?',
            options: [
              'Ensure the water reservoir is filled and the blade is securely mounted',
              'Test the grout for correct consistency',
              'Verify that the trowel notches match the tile size',
              'Confirm that the spacers are evenly distributed'
            ],
            correct: 0,
            explanation: 'Before using a wet saw, always check that the water reservoir is filled and the blade is securely mounted for safe and effective operation.'
          }
        ]
      }
    },
    {
      id: 5,
      title: 'Surface Preparation Basics',
      duration: '90 minutes',
      type: 'video',
      content: {
        videoUrl: 'https://www.youtube.com/watch?v=5BO1RrDqzG8',
        textContent: `
          <div class="space-y-8">
            <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-l-4 border-green-500">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">🏗️ Surface Preparation Basics for Tiling</h2>
              <p class="text-gray-700 leading-relaxed">
                Proper surface preparation is the foundation of any successful tiling project. Learn to identify suitable substrates and understand the critical importance of level, clean, and dry surfaces for optimal tile adhesion.
              </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🎯 Learning Objectives</h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start gap-2">
                  <span class="text-green-500 font-bold">•</span>
                  <span>Understand various substrate materials that can support tile installations</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500 font-bold">•</span>
                  <span>Learn to identify when a substrate is suitable for tiling and when additional preparation is needed</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500 font-bold">•</span>
                  <span>Recognize the critical importance of having a level, clean, and dry surface for proper tile adhesion</span>
                </li>
              </ul>
            </div>

            <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🧱 A. Cement Backer Boards</h3>
              <div class="space-y-4">
                <div class="bg-blue-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-2">What They Are:</h4>
                  <p class="text-gray-700 text-sm mb-3">Also known as cementitious backer units (CBUs), these boards are made from a combination of cement and reinforcing fibers. Designed specifically to be a stable base for tile installations.</p>
                  
                  <h4 class="font-semibold text-gray-800 mb-2">Why They're Suitable:</h4>
                  <ul class="text-gray-700 text-sm space-y-1">
                    <li>• Highly resistant to moisture and mold, making them ideal for wet areas like bathrooms and kitchens</li>
                    <li>• Provide a stable, non-flexing surface that prevents tiles from cracking over time</li>
                  </ul>
                  
                  <h4 class="font-semibold text-gray-800 mb-2 mt-3">Installation Considerations:</h4>
                  <ul class="text-gray-700 text-sm space-y-1">
                    <li>• Must be installed over a sturdy framework or existing subfloor</li>
                    <li>• Seams should be taped and sealed with thinset mortar before tiling</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🏠 B. Drywall</h3>
              <div class="space-y-4">
                <div class="bg-yellow-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-2">What It Is:</h4>
                  <p class="text-gray-700 text-sm mb-3">A common wall material composed of gypsum sandwiched between layers of paper.</p>
                  
                  <div class="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 class="font-semibold text-gray-800 mb-2">When It's Suitable:</h4>
                      <ul class="text-gray-700 text-sm space-y-1">
                        <li>• Can be used in dry, non-wet areas (e.g., residential backsplashes or feature walls)</li>
                        <li>• Must be clean, smooth, and free of loose paint or wallpaper</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 class="font-semibold text-gray-800 mb-2">When It's Not Suitable:</h4>
                      <ul class="text-gray-700 text-sm space-y-1">
                        <li>• Should never be used in consistently wet areas (showers, steam rooms)</li>
                        <li>• Consider replacing with cement backer board in moisture-prone environments</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🏢 C. Concrete and Masonry</h3>
              <div class="space-y-4">
                <div class="bg-gray-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-2">Why They're Suitable:</h4>
                  <ul class="text-gray-700 text-sm space-y-1 mb-3">
                    <li>• Concrete floors and walls provide a solid, non-flexing base that holds up well under heavy tiles</li>
                    <li>• Ideal for outdoor installations, commercial settings, and basements</li>
                  </ul>
                  
                  <h4 class="font-semibold text-gray-800 mb-2">Preparation Requirements:</h4>
                  <ul class="text-gray-700 text-sm space-y-1 mb-3">
                    <li>• Must be fully cured (at least 28 days for new concrete)</li>
                    <li>• Should be free of cracks, dust, and loose debris</li>
                    <li>• Leveling may be necessary if the surface is uneven</li>
                  </ul>
                  
                  <h4 class="font-semibold text-gray-800 mb-2">Masonry Walls:</h4>
                  <ul class="text-gray-700 text-sm space-y-1">
                    <li>• Bricks or blocks can be tiled if they are stable, clean, and level</li>
                    <li>• May require a skim coat of mortar to smooth out irregularities</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🪵 D. Plywood</h3>
              <div class="space-y-4">
                <div class="bg-amber-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-2">What It Is:</h4>
                  <p class="text-gray-700 text-sm mb-3">A wood-based material often used as subflooring.</p>
                  
                  <div class="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 class="font-semibold text-gray-800 mb-2">When It's Suitable:</h4>
                      <ul class="text-gray-700 text-sm space-y-1">
                        <li>• Only in areas with very low moisture exposure</li>
                        <li>• Should be exterior-grade or marine-grade plywood for better durability</li>
                        <li>• Requires a reinforcing layer (like a backer board) on top for best results</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 class="font-semibold text-gray-800 mb-2">When It's Not Suitable:</h4>
                      <ul class="text-gray-700 text-sm space-y-1">
                        <li>• Not recommended for directly adhering tile due to potential for movement and moisture absorption</li>
                        <li>• In wet areas, plywood should be avoided as a direct substrate</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">⚖️ Importance of a Level, Clean, and Dry Surface</h3>
              <div class="space-y-4">
                <div class="bg-purple-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">Why a Level Surface Is Crucial:</h4>
                  <div class="space-y-3">
                    <div>
                      <h5 class="font-medium text-gray-800">Even Tile Installation:</h5>
                      <ul class="text-gray-700 text-sm space-y-1 mt-1">
                        <li>• An uneven substrate can lead to lippage (height differences between adjacent tiles)</li>
                        <li>• Makes grout lines appear inconsistent</li>
                      </ul>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-800">Structural Integrity:</h5>
                      <ul class="text-gray-700 text-sm space-y-1 mt-1">
                        <li>• Uneven surfaces place stress on tiles, causing cracks over time</li>
                        <li>• A level base ensures tiles remain firmly adhered and evenly supported</li>
                      </ul>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-800">How to Check for Level:</h5>
                      <ul class="text-gray-700 text-sm space-y-1 mt-1">
                        <li>• Use a long spirit level or laser level to identify high and low spots</li>
                        <li>• Apply self-leveling compound to correct uneven floors before tiling</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div class="bg-purple-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">The Importance of Cleanliness:</h4>
                  <div class="space-y-3">
                    <div>
                      <h5 class="font-medium text-gray-800">Good Adhesion:</h5>
                      <ul class="text-gray-700 text-sm space-y-1 mt-1">
                        <li>• Dust, grease, or old adhesive residues interfere with the bond between tile and substrate</li>
                        <li>• Clean surfaces ensure the thinset mortar or adhesive grips properly</li>
                      </ul>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-800">Best Practices for Cleaning:</h5>
                      <ul class="text-gray-700 text-sm space-y-1 mt-1">
                        <li>• Sweep or vacuum thoroughly to remove dust</li>
                        <li>• Wash the surface with a mild detergent and water if grease or residues are present</li>
                        <li>• Allow to dry completely before proceeding</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div class="bg-purple-100 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-800 mb-3">Ensuring a Dry Surface:</h4>
                  <div class="space-y-3">
                    <div>
                      <h5 class="font-medium text-gray-800">Moisture Issues in Tiling:</h5>
                      <ul class="text-gray-700 text-sm space-y-1 mt-1">
                        <li>• A damp substrate can weaken adhesive bonds</li>
                        <li>• Excess moisture may lead to mold growth and eventual tile delamination</li>
                      </ul>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-800">Checking for Moisture:</h5>
                      <ul class="text-gray-700 text-sm space-y-1 mt-1">
                        <li>• Conduct a moisture test using a plastic sheet taped to the surface</li>
                        <li>• If condensation appears after 24 hours, the substrate is too damp</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg">
              <h3 class="text-xl font-semibold text-gray-800 mb-3">🏆 Key Takeaways</h3>
              <ul class="space-y-2 text-gray-700">
                <li class="flex items-start gap-2">
                  <span class="text-green-500 font-bold">✓</span>
                  <span>Cement backer boards are the most reliable choice for wet areas</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500 font-bold">✓</span>
                  <span>Drywall can only be used in dry areas, while plywood is suitable only with proper reinforcement and low moisture exposure</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500 font-bold">✓</span>
                  <span>Concrete and masonry provide a stable base but must be clean, level, and crack-free</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-green-500 font-bold">✓</span>
                  <span>A level, clean, and dry substrate is essential for long-lasting tile installations</span>
                </li>
              </ul>
            </div>
          </div>
        `
      }
    },
    {
      id: 6,
      title: 'Surface Preparation Quiz',
      duration: '15 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'Which of the following is the most moisture-resistant substrate for tiling in wet areas?',
            options: [
              'Drywall',
              'Cement backer board',
              'Plywood',
              'Regular wood paneling'
            ],
            correct: 1,
            explanation: 'Cement backer board is specifically designed to be moisture-resistant and is the ideal substrate for wet areas like bathrooms and kitchens.'
          },
          {
            question: 'What is the minimum curing time recommended for new concrete before tiling?',
            options: [
              '48 hours',
              '7 days',
              '28 days',
              '90 days'
            ],
            correct: 2,
            explanation: 'New concrete must cure for at least 28 days to reach adequate strength and stability before tile installation.'
          },
          {
            question: 'Which substrate is generally NOT suitable for direct tiling in wet environments?',
            options: [
              'Cement backer board',
              'Marine-grade plywood',
              'Regular drywall',
              'Concrete'
            ],
            correct: 2,
            explanation: 'Regular drywall is not suitable for wet environments as it can be damaged by moisture, leading to mold and structural issues.'
          },
          {
            question: 'Why is it important to have a clean substrate before tiling?',
            options: [
              'To improve the appearance of the tiles before grouting',
              'To ensure the adhesive bonds properly to the substrate',
              'To reduce the number of grout lines needed',
              'To make the tiles easier to cut'
            ],
            correct: 1,
            explanation: 'A clean substrate is essential for proper adhesive bonding. Dust, grease, or residues can interfere with the adhesion between tile and substrate.'
          },
          {
            question: 'Which tool would you most commonly use to check if a surface is level before tiling?',
            options: [
              'Notched trowel',
              'Laser level or spirit level',
              'Wet saw',
              'Tile cutter'
            ],
            correct: 1,
            explanation: 'A laser level or spirit level is the appropriate tool for checking if a surface is level before tiling to ensure proper tile installation.'
          },
          {
            question: 'What should be done if the substrate is found to be uneven?',
            options: [
              'Begin tiling anyway, as the grout will fill in any gaps',
              'Use a self-leveling compound to create a flat surface',
              'Sand down the tiles to match the uneven substrate',
              'Switch to a different type of tile'
            ],
            correct: 1,
            explanation: 'Self-leveling compound should be used to correct uneven surfaces before tiling to ensure proper tile installation and prevent future problems.'
          },
          {
            question: 'Why is it critical for the substrate to be dry before tiling?',
            options: [
              'Dry substrates prevent the tiles from sticking too quickly',
              'Moisture can weaken the adhesive bond and lead to tile delamination',
              'Wet substrates make grouting more difficult',
              'Dry substrates reduce the need for spacers'
            ],
            correct: 1,
            explanation: 'Moisture in the substrate can weaken adhesive bonds and lead to tile delamination, mold growth, and other serious problems.'
          },
          {
            question: 'If you need to tile over plywood, what type of plywood should you use?',
            options: [
              'Interior-grade plywood',
              'Softwood plywood',
              'Exterior or marine-grade plywood',
              'Decorative veneer plywood'
            ],
            correct: 2,
            explanation: 'Exterior or marine-grade plywood has better moisture resistance and durability, making it more suitable for tiling applications.'
          }
        ]
      }
    }
  ]
};
