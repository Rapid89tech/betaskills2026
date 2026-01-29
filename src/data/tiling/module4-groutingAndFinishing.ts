
import { Module } from '@/types/course';

export const module4GroutingAndFinishing: Module = {
  id: 4,
  title: 'Module 4: Grouting and Finishing',
  description: 'Learn proper grouting techniques, grout selection, application methods, and finishing touches for professional tile installations.',
  lessons: [
    {
      id: 31,
      title: 'Choosing and Mixing Grout',
      duration: '75 minutes',
      type: 'video',
      content: {
        videoUrl: 'JiNWo0fjjsY',
        textContent: `
# 4.1 Choosing and Mixing Grout

## Types of Grout

### Sanded Grout
<div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-blue-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🏗️</span>
    What It Is
  </h4>
  <ul class="modern-bullet-list">
    <li>Contains fine sand particles for added strength and durability</li>
  </ul>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-green-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">✅</span>
    Best Uses
  </h4>
  <ul class="modern-bullet-list">
    <li>Joints wider than 1/8 inch (large-format tiles, uneven surfaces)</li>
    <li>High-traffic areas like floors and entryways</li>
  </ul>
</div>

<div class="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-emerald-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">👍</span>
    Advantages
  </h4>
  <ul class="modern-bullet-list">
    <li>Resists cracking and shrinkage in wider joints</li>
    <li>Affordable and widely available</li>
  </ul>
</div>

<div class="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-orange-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">⚠️</span>
    Disadvantages
  </h4>
  <ul class="modern-bullet-list">
    <li>May scratch delicate surfaces like polished marble or glass tiles</li>
  </ul>
</div>

### Unsanded Grout
<div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-blue-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🏗️</span>
    What It Is
  </h4>
  <p>• A smooth grout without sand particles</p>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-green-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">✅</span>
    Best Uses
  </h4>
  <p>• Joints smaller than 1/8 inch</p>
  <p>• Delicate materials such as glass, polished stone, or soft ceramic</p>
</div>

<div class="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-emerald-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">👍</span>
    Advantages
  </h4>
  <p>• Creates a smooth, even finish in narrow grout lines</p>
  <p>• Ideal for walls and delicate surfaces</p>
</div>

<div class="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-orange-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">⚠️</span>
    Disadvantages
  </h4>
  <p>• Can shrink more than sanded grout in wider joints</p>
</div>

### Epoxy Grout
<div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-blue-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🏗️</span>
    What It Is
  </h4>
  <p>• A two-part grout made of epoxy resin and hardener, offering superior durability and resistance to stains</p>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-green-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">✅</span>
    Best Uses
  </h4>
  <p>• Areas prone to staining or chemical exposure (kitchens, bathrooms, countertops)</p>
  <p>• Locations requiring high-strength joints (commercial settings, outdoor patios)</p>
</div>

<div class="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-emerald-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">👍</span>
    Advantages
  </h4>
  <p>• Stain-resistant, waterproof, and incredibly durable</p>
  <p>• Does not require sealing</p>
</div>

<div class="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-orange-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">⚠️</span>
    Disadvantages
  </h4>
  <p>• Higher cost than traditional grouts</p>
  <p>• Can be harder to work with, especially for beginners</p>
</div>

## Mixing Grout

<div class="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-purple-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">⚖️</span>
    Mixing Ratios and Consistency
  </h4>
  <p>• Follow manufacturer instructions precisely—do not guess or improvise</p>
  <p>• Aim for a consistency that resembles creamy peanut butter</p>
  <p>• Mix in small batches to avoid premature drying</p>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-red-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">❌</span>
    Common Mixing Mistakes
  </h4>
  <p>• <strong>Too Much Water:</strong> Leads to weak grout that cracks or crumbles</p>
  <p>• <strong>Too Little Water:</strong> Results in dry, crumbly grout</p>
  <p>• <strong>Inadequate Mixing:</strong> Can lead to uneven color and texture</p>
  <p>• <strong>Not Letting Grout Slake:</strong> Allow 5-10 minutes rest before final mixing</p>
</div>
        `
      }
    },
    {
      id: 32,
      title: 'Epoxy Grout Applications',
      duration: '30 minutes',
      type: 'video',
      content: {
        videoUrl: 'NElJMUNex7g',
        textContent: `# Working with Epoxy Grout

Learn the specialized techniques for applying epoxy grout systems.`
      }
    },
    {
      id: 33,
      title: 'Mixing Ratios and Consistency',
      duration: '25 minutes',
      type: 'video',
      content: {
        videoUrl: 'K4edaClzVIY',
        textContent: `# Proper Grout Mixing Techniques

Master the correct ratios and consistency for different grout types.`
      }
    },
    {
      id: 34,
      title: 'Common Mixing Mistakes',
      duration: '20 minutes',
      type: 'video',
      content: {
        videoUrl: 'K4edaClzVIY',
        textContent: `# Avoiding Grout Mixing Mistakes

Learn common mistakes and how to prevent them in grout preparation.`
      }
    },
    {
      id: 35,
      title: 'Grout Application and Cleanup',
      duration: '75 minutes',
      type: 'video',
      content: {
        videoUrl: 'XexdqvCuYm4',
        textContent: `
# 4.2 Grout Application and Cleanup

## Grout Application Techniques

<div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-blue-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🛠️</span>
    Using a Grout Float
  </h4>
  <p>• A flat, rubber tool designed to spread grout and fill tile joints evenly</p>
  <p>• Spread grout diagonally across joints at a 45-degree angle</p>
  <p>• Push firmly into gaps and move in different directions for full coverage</p>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-green-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🧹</span>
    Removing Excess Grout
  </h4>
  <p>• Hold the float nearly vertical and scrape off excess grout</p>
  <p>• Work methodically, section by section</p>
  <p>• Avoid letting grout dry too much on tiles</p>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-yellow-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🎯</span>
    Handling Challenging Areas
  </h4>
  <p>• For textured tiles, apply grout more carefully</p>
  <p>• Use smaller margin float for tight corners</p>
  <p>• Consider grout bag for intricate patterns</p>
</div>

## Cleaning Grout Haze

<div class="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-indigo-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">⏰</span>
    When to Clean the Haze
  </h4>
  <p>• Wait until grout has firmed up slightly (10-15 minutes)</p>
  <p>• Grout should no longer feel wet but still be pliable</p>
</div>

<div class="bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-cyan-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🧽</span>
    Tools for Cleaning
  </h4>
  <p>• <strong>Damp Sponge:</strong> Well-wrung, rinse often</p>
  <p>• <strong>Microfiber Cloth:</strong> For final polishing after curing</p>
  <p>• <strong>Grout Haze Remover:</strong> For stubborn residue</p>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-red-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">⚠️</span>
    Avoiding Common Mistakes
  </h4>
  <p>• Do not use too much water—it can weaken the grout</p>
  <p>• Avoid pressing too hard on joints</p>
  <p>• Work in small sections and clean as you go</p>
</div>

## Sealing Grout Lines

<div class="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-purple-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🛡️</span>
    Why Seal Grout?
  </h4>
  <p>• Protects against moisture, stains, and mold growth</p>
  <p>• Helps maintain grout color and appearance over time</p>
</div>

<div class="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-teal-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">📅</span>
    When to Apply Sealer
  </h4>
  <p>• Allow grout to cure fully—usually 48-72 hours</p>
  <p>• Follow manufacturer's guidelines</p>
</div>

<div class="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-emerald-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🧪</span>
    Types of Grout Sealers
  </h4>
  <p>• <strong>Penetrating Sealers:</strong> Absorbed into grout, invisible protection</p>
  <p>• <strong>Topical Sealers:</strong> Form protective layer, higher stain resistance</p>
</div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-blue-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🖌️</span>
    Sealing Process
  </h4>
  <p>• Apply sealer evenly using brush, applicator bottle, or sponge</p>
  <p>• Wipe away excess sealer from tile surface before it dries</p>
  <p>• Allow sufficient drying time before using the area</p>
</div>
        `
      }
    },
    {
      id: 36,
      title: 'Handling Challenging Areas',
      duration: '25 minutes',
      type: 'video',
      content: {
        videoUrl: '3ji9qVfQJRY',
        textContent: `# Working in Challenging Areas

Learn techniques for grouting in difficult-to-reach areas.`
      }
    },
    {
      id: 37,
      title: 'Cleaning Grout Haze',
      duration: '20 minutes',
      type: 'video',
      content: {
        videoUrl: 'TVRJXlyAIN4',
        textContent: `# Removing Grout Haze

Master the techniques for cleaning grout haze effectively.`
      }
    },
    {
      id: 38,
      title: 'Sealing Grout Lines',
      duration: '25 minutes',
      type: 'video',
      content: {
        videoUrl: 'YkmErGLH1DY',
        textContent: `# Proper Grout Sealing

Learn the importance and techniques of grout line sealing.`
      }
    },
    {
      id: 39,
      title: 'Finishing Touches',
      duration: '60 minutes',
      type: 'video',
      content: {
        videoUrl: 'tile-trim-installation',
        textContent: `
# 4.3 Finishing Touches

## Installing Tile Trim and Edging

<div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-blue-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">✨</span>
    Professional Finish
  </h4>
  <p>• Tile trim provides polished edges and protects tile edges</p>
  <p>• Creates clean transitions between different surfaces</p>
  <p>• Adds aesthetic appeal to the installation</p>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-green-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🔧</span>
    Types of Trim
  </h4>
  <p>• <strong>Metal Profiles:</strong> Best for modern designs</p>
  <p>• <strong>Bullnose Tiles:</strong> Rounded edge tiles</p>
  <p>• <strong>Plastic (PVC) Trim:</strong> Cost-effective option</p>
  <p>• <strong>Wood Molding:</strong> Traditional finish</p>
</div>

<div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-yellow-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">📐</span>
    Installation Tips
  </h4>
  <p>• Make mitered cuts at corners for clean joints</p>
  <p>• Align carefully before setting</p>
  <p>• Use painter's tape for straight edges</p>
  <p>• Measure twice, cut once</p>
</div>

## Applying Caulk in Corners and Expansion Joints

<div class="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-purple-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🔫</span>
    Using a Caulking Gun
  </h4>
  <p>• Essential tool for applying caulk evenly into corner joints</p>
  <p>• Maintain steady pressure for consistent bead</p>
  <p>• Cut tip at 45-degree angle for optimal flow</p>
</div>

<div class="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-teal-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">💧</span>
    Curing Process
  </h4>
  <p>• Allow caulk to cure before exposing to water</p>
  <p>• Ensures waterproof seal</p>
  <p>• Prevents shrinkage and discoloration</p>
  <p>• Follow manufacturer's curing time recommendations</p>
</div>

## Final Cleaning and Inspection

<div class="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-indigo-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🧽</span>
    Final Cleaning Methods
  </h4>
  <p>• Remove any remaining grout haze with damp sponge</p>
  <p>• Clean tiles once grout has firmed up</p>
  <p>• Avoid using too much water to prevent grout weakening</p>
  <p>• Work diagonally across tiles for best results</p>
</div>

<div class="bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-cyan-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🔍</span>
    Final Inspection Checklist
  </h4>
  <p>• Verify all tiles are securely set and properly aligned</p>
  <p>• Check that grout lines are consistent and complete</p>
  <p>• Ensure caulk is properly applied in all joints</p>
  <p>• Confirm trim is straight and securely attached</p>
  <p>• Remove any remaining adhesive or debris</p>
</div>

<div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-6 shadow-lg">
  <h4 class="font-bold text-green-800 mb-3 flex items-center text-lg">
    <span class="text-2xl mr-3">🎯</span>
    Quality Standards
  </h4>
  <p>• Professional installations meet strict quality standards</p>
  <p>• Attention to detail separates amateur from professional work</p>
  <p>• Proper finishing ensures long-lasting installation</p>
  <p>• Client satisfaction depends on these final touches</p>
</div>
        `
      }
    },
    {
      id: 40,
      title: 'Quiz: Grouting and Finishing',
      duration: '20 minutes',
      type: 'quiz',
      content: {
        questions: [
          {
            question: 'Which type of grout is recommended for joints smaller than 1/8 inch?',
            options: [
              'Sanded grout',
              'Unsanded grout',
              'Epoxy grout',
              'Pre-mixed grout'
            ],
            correct: 1,
            explanation: 'Unsanded grout is specifically designed for narrow joints smaller than 1/8 inch and works well with delicate surfaces like glass and polished stone.'
          },
          {
            question: 'What is a key advantage of using epoxy grout?',
            options: [
              'It is easier to mix than traditional grout',
              'It does not require sealing and is highly stain-resistant',
              'It is the least expensive option for large-scale projects',
              'It works best with uneven tiles and wide joints'
            ],
            correct: 1,
            explanation: 'Epoxy grout offers superior durability, stain resistance, and waterproof properties without requiring sealing, making it ideal for high-exposure areas.'
          },
          {
            question: 'Why is it important to follow the manufacturer\'s instructions when mixing grout?',
            options: [
              'To ensure the grout sets faster than recommended',
              'To achieve a proper consistency and avoid common problems like cracking or discoloration',
              'To reduce the amount of grout needed for the project',
              'To ensure that no cleaning is required after application'
            ],
            correct: 1,
            explanation: 'Following manufacturer instructions ensures proper water-to-grout ratios, preventing common issues like cracking, shrinkage, or weak grout that can compromise the installation.'
          },
          {
            question: 'What tool is commonly used to spread grout and fill joints evenly?',
            options: [
              'Notched trowel',
              'Margin trowel',
              'Grout float',
              'Rubber mallet'
            ],
            correct: 2,
            explanation: 'A grout float is specifically designed with a flat rubber surface to spread grout evenly across tile surfaces and push it into joints effectively.'
          },
          {
            question: 'What is grout haze, and when should it be cleaned?',
            options: [
              'A type of waterproof membrane applied before grouting; clean immediately after installation',
              'A residue left on the tile surface after grouting; clean after the grout has firmed but not fully dried',
              'A protective coating applied to the grout; clean once it has fully cured',
              'A sign that the grout mix is too wet; clean before applying the grout'
            ],
            correct: 1,
            explanation: 'Grout haze is the thin film of grout residue left on tile surfaces during application. It should be cleaned when the grout has firmed up but is still workable (typically 10-15 minutes after application).'
          },
          {
            question: 'How can you avoid pulling grout out of the joints when cleaning haze?',
            options: [
              'Use a dry sponge and scrub the surface aggressively',
              'Press lightly with a damp sponge and wipe diagonally across the tiles',
              'Allow the grout to fully cure before cleaning',
              'Use an acid-based cleaner immediately after grouting'
            ],
            correct: 1,
            explanation: 'Light pressure with a well-wrung damp sponge, wiping diagonally across tiles, prevents disturbing the grout in the joints while effectively removing surface haze.'
          },
          {
            question: 'What is the purpose of sealing grout lines?',
            options: [
              'To make the grout easier to remove in the future',
              'To protect against stains, moisture, and mold growth',
              'To speed up the drying process',
              'To darken the grout color permanently'
            ],
            correct: 1,
            explanation: 'Grout sealer provides a protective barrier against moisture penetration, staining, and mold growth, significantly extending the life and appearance of the grout.'
          },
          {
            question: 'How long should you typically wait before applying sealer to grout?',
            options: [
              '12–24 hours',
              '48–72 hours',
              'Immediately after cleaning haze',
              'One full week'
            ],
            correct: 1,
            explanation: 'Grout must be fully cured before sealing, which typically takes 48-72 hours depending on the manufacturer\'s specifications and environmental conditions.'
          },
          {
            question: 'Why is tile trim used in tile installations?',
            options: [
              'To reduce grout lines',
              'To provide a polished edge and protect tile edges',
              'To help grout dry faster',
              'To keep the adhesive from spreading'
            ],
            correct: 1,
            explanation: 'Tile trim provides a finished, professional appearance while protecting exposed tile edges from damage and creating clean transitions between surfaces.'
          },
          {
            question: 'What is the best method for removing grout haze after grouting?',
            options: [
              'Using a dry cloth immediately after applying grout',
              'Rinsing with a strong acid cleaner before the grout has set',
              'Wiping with a damp sponge once the grout has firmed up',
              'Waiting 24 hours before cleaning it with water'
            ],
            correct: 2,
            explanation: 'The optimal time to clean grout haze is when the grout has firmed up but not fully hardened, using a clean, damp sponge with gentle pressure.'
          }
        ]
      }
    }
  ]
};
