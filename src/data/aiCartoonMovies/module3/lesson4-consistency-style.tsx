export default function Lesson4() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1>Maintaining Consistency and Style Across Designs</h1>

      <p>
        One of the biggest challenges when using AI for character and world design is maintaining visual consistency across multiple generations. Animated projects require characters and environments to look cohesive throughout the production, which can be difficult when AI tools generate variations with each prompt. This lesson explores strategies and techniques for achieving consistent style and design across your AI-assisted animation project.
      </p>

      <h2>Understanding the Consistency Challenge</h2>

      <p>
        AI image generators create unique outputs each time, even with identical prompts. This variability can lead to:
      </p>
      <ul>
        <li>Characters looking different in various scenes</li>
        <li>Inconsistent color palettes across environments</li>
        <li>Varying art styles within the same project</li>
        <li>Mismatched lighting and atmospheric effects</li>
      </ul>

      <h2>Strategies for Maintaining Consistency</h2>

      <h3>1. Create a Comprehensive Style Guide</h3>
      <p>
        Before generating multiple assets, establish a clear style guide that includes:
      </p>
      <ul>
        <li><strong>Color Palette:</strong> Define primary, secondary, and accent colors with specific hex codes</li>
        <li><strong>Art Style Keywords:</strong> Document the exact style descriptors that work best (e.g., "Studio Ghibli style," "flat design," "cel-shaded")</li>
        <li><strong>Character Sheets:</strong> Create detailed reference sheets for main characters showing multiple angles and expressions</li>
        <li><strong>Environment Templates:</strong> Establish visual rules for different location types</li>
        <li><strong>Lighting Guidelines:</strong> Define how lighting should appear in different scenes</li>
      </ul>

      <h3>2. Use Reference Images Effectively</h3>
      <p>
        Most AI tools support image-to-image generation, which is crucial for consistency:
      </p>
      <ul>
        <li>Generate your first successful character or environment</li>
        <li>Use it as a reference image for subsequent generations</li>
        <li>Combine reference images with text prompts for better control</li>
        <li>Create a library of approved reference images for your project</li>
      </ul>

      <h3>3. Standardize Your Prompts</h3>
      <p>
        Develop a prompt template system:
      </p>
      <ul>
        <li><strong>Base Prompt:</strong> Core style and quality descriptors used in every generation</li>
        <li><strong>Subject Prompt:</strong> Specific character or environment details</li>
        <li><strong>Technical Prompt:</strong> Camera angle, lighting, composition details</li>
      </ul>

      <p><strong>Example Template:</strong></p>
      <p className="bg-gray-100 p-4 rounded">
        [Base: "2D animation style, vibrant colors, clean linework, Studio Ghibli inspired"] + [Subject: "young wizard character with blue robes"] + [Technical: "front view, soft lighting, white background"]
      </p>

      <h3>4. Leverage AI Tool Features</h3>

      <h4>MidJourney Consistency Features:</h4>
      <ul>
        <li>Use the same seed number for related generations</li>
        <li>Utilize the --style parameter to maintain aesthetic consistency</li>
        <li>Use --cref (character reference) for character consistency</li>
        <li>Apply --sref (style reference) for environmental consistency</li>
      </ul>

      <h4>Leonardo AI Consistency Features:</h4>
      <ul>
        <li>Use the same model for all generations in a project</li>
        <li>Lock specific parameters (color palette, style strength)</li>
        <li>Utilize the "Image Guidance" feature with reference images</li>
      </ul>

      <h4>Stable Diffusion Consistency Features:</h4>
      <ul>
        <li>Use ControlNet for pose and composition consistency</li>
        <li>Apply LoRA models trained on your specific style</li>
        <li>Maintain consistent sampling settings</li>
      </ul>

      <h3>5. Post-Processing for Uniformity</h3>
      <p>
        Even with careful generation, post-processing is essential:
      </p>

      <h4>In Photoshop:</h4>
      <ul>
        <li>Apply consistent color grading using adjustment layers</li>
        <li>Use the same filter settings across all assets</li>
        <li>Create and apply custom actions for repetitive adjustments</li>
        <li>Maintain consistent line weights and edge treatments</li>
      </ul>

      <h4>In Illustrator:</h4>
      <ul>
        <li>Trace AI outputs with consistent stroke settings</li>
        <li>Apply the same color swatches across all designs</li>
        <li>Use graphic styles for uniform effects</li>
        <li>Maintain consistent shape and path treatments</li>
      </ul>

      <h2>Character Consistency Techniques</h2>

      <h3>1. Character Turnaround Sheets</h3>
      <p>
        Create comprehensive character sheets showing:
      </p>
      <ul>
        <li>Front, side, back, and 3/4 views</li>
        <li>Multiple facial expressions</li>
        <li>Different poses and gestures</li>
        <li>Costume details and variations</li>
        <li>Size comparisons with other characters</li>
      </ul>

      <h3>2. Feature Locking</h3>
      <p>
        Identify and document key character features that must remain consistent:
      </p>
      <ul>
        <li>Distinctive facial features (eye shape, nose, mouth)</li>
        <li>Hair style and color</li>
        <li>Body proportions</li>
        <li>Signature clothing or accessories</li>
        <li>Color scheme</li>
      </ul>

      <h3>3. Expression Library</h3>
      <p>
        Generate a complete set of expressions for each character:
      </p>
      <ul>
        <li>Happy, sad, angry, surprised, confused, etc.</li>
        <li>Use the same base character image for all expressions</li>
        <li>Maintain consistent facial structure across emotions</li>
      </ul>

      <h2>Environment Consistency Techniques</h2>

      <h3>1. Location Master Shots</h3>
      <p>
        For each location, create a master establishing shot that defines:
      </p>
      <ul>
        <li>Overall color scheme and lighting</li>
        <li>Architectural or natural features</li>
        <li>Atmospheric conditions</li>
        <li>Time of day</li>
      </ul>

      <h3>2. Modular Environment Building</h3>
      <p>
        Generate reusable environment elements:
      </p>
      <ul>
        <li>Sky and cloud patterns</li>
        <li>Ground textures and terrain</li>
        <li>Building facades and structures</li>
        <li>Vegetation and natural elements</li>
      </ul>
      <p>
        Combine these modular pieces to create new scenes while maintaining visual consistency.
      </p>

      <h3>3. Lighting Consistency</h3>
      <p>
        Establish lighting rules for your world:
      </p>
      <ul>
        <li>Define light source direction and intensity</li>
        <li>Maintain consistent shadow styles</li>
        <li>Use the same color temperature across scenes</li>
        <li>Apply uniform atmospheric effects</li>
      </ul>

      <h2>Quality Control Workflow</h2>

      <h3>1. Review and Approval Process</h3>
      <ul>
        <li>Compare new generations against approved references</li>
        <li>Check for style drift over time</li>
        <li>Maintain a "reject" folder to learn what doesn't work</li>
        <li>Document successful prompt variations</li>
      </ul>

      <h3>2. Batch Processing</h3>
      <p>
        Generate multiple assets in batches:
      </p>
      <ul>
        <li>Use the same settings and prompts for related assets</li>
        <li>Process all character variations in one session</li>
        <li>Apply post-processing uniformly across batches</li>
      </ul>

      <h3>3. Version Control</h3>
      <p>
        Maintain organized files:
      </p>
      <ul>
        <li>Number and date all generations</li>
        <li>Keep raw AI outputs separate from edited versions</li>
        <li>Document which prompts and settings produced each result</li>
        <li>Create backup copies of approved assets</li>
      </ul>

      <h2>Tools for Consistency Management</h2>

      <h3>1. Asset Management Software</h3>
      <ul>
        <li><strong>Adobe Bridge:</strong> Organize and tag AI-generated assets</li>
        <li><strong>Eagle:</strong> Visual asset library with tagging and search</li>
        <li><strong>PureRef:</strong> Create reference boards for consistency checking</li>
      </ul>

      <h3>2. Color Management Tools</h3>
      <ul>
        <li><strong>Adobe Color:</strong> Extract and save color palettes</li>
        <li><strong>Coolors:</strong> Generate and manage consistent color schemes</li>
        <li><strong>Paletton:</strong> Create harmonious color combinations</li>
      </ul>

      <h3>3. Comparison Tools</h3>
      <ul>
        <li>Use Photoshop's layer comparison modes</li>
        <li>Create contact sheets to view multiple versions side-by-side</li>
        <li>Overlay new generations on approved references to check alignment</li>
      </ul>

      <h2>Common Consistency Pitfalls and Solutions</h2>

      <h3>Pitfall: Style Drift Over Time</h3>
      <p><strong>Solution:</strong> Regularly review early approved designs and recalibrate your prompts and processes.</p>

      <h3>Pitfall: Inconsistent Character Proportions</h3>
      <p><strong>Solution:</strong> Create a proportion guide and overlay it on new generations to verify accuracy.</p>

      <h3>Pitfall: Varying Levels of Detail</h3>
      <p><strong>Solution:</strong> Standardize detail levels in post-processing rather than trying to control it in generation.</p>

      <h3>Pitfall: Color Palette Variations</h3>
      <p><strong>Solution:</strong> Use Photoshop's "Match Color" feature or apply consistent color grading to all assets.</p>

      <h2>Best Practices Summary</h2>
      <ul>
        <li>Invest time upfront in creating comprehensive style guides and references</li>
        <li>Use the same AI tool and settings throughout your project</li>
        <li>Generate character and environment assets in batches</li>
        <li>Always use reference images when available</li>
        <li>Apply consistent post-processing to all AI outputs</li>
        <li>Regularly review and compare new assets against approved references</li>
        <li>Document everything: prompts, settings, and successful techniques</li>
        <li>Be prepared to manually adjust or redraw elements for perfect consistency</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        Maintaining consistency in AI-generated designs requires a combination of careful planning, systematic workflows, and strategic post-processing. While AI tools can introduce variability, the techniques covered in this lesson will help you create cohesive, professional-looking animated projects. Remember that some manual refinement is often necessary—the goal is to use AI to accelerate your workflow while preserving your artistic vision and maintaining the visual consistency that quality animation demands.
      </p>
    </div>
  );
}
