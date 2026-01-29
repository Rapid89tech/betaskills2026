import type { Lesson } from '@/types/course';

export const lesson4QrCodePairingDeviceNamingAndRoomMapping: Lesson = {
  id: 4,
  title: 'QR Code Pairing, Device Naming & Room Mapping',
  duration: '55 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=G_msBUGD2iM',
    textContent: `<div class="lesson-content">

<h1>QR Code Pairing, Device Naming & Room Mapping</h1>

<p>Proper device configuration enhances usability and automation in smart homes.</p>

<h2>1. QR Code Pairing</h2>

<h3>Description</h3>
<p>Scanning a QR code on a device or its manual to register it with an app or hub.</p>

<h3>Process</h3>
<ol>
  <li>Open the app and select "Add Device."</li>
  <li>Scan the QR code using the smartphone camera.</li>
  <li>Follow prompts to connect the device to Wi-Fi or a hub.</li>
</ol>

<h3>Examples</h3>
<p>Ring cameras, Philips Hue bulbs, Ecobee thermostats.</p>

<h3>Benefits</h3>
<ul>
  <li>Fast, secure pairing without manual entry.</li>
  <li>Reduces errors in device registration.</li>
  <li>Simplifies the setup process for users.</li>
</ul>

<h3>Challenges</h3>
<ul>
  <li>QR codes may be damaged or inaccessible (e.g., on installed devices).</li>
  <li>Requires compatible apps and devices.</li>
  <li>May not work if device is not in pairing mode.</li>
</ul>

<h2>2. Device Naming</h2>

<h3>Description</h3>
<p>Assigning clear, descriptive names to devices for easy identification.</p>

<h3>Best Practices</h3>
<ul>
  <li>Use intuitive names (e.g., "Living Room Lamp," "Front Door Camera").</li>
  <li>Avoid generic names (e.g., "Device 1") to prevent confusion with voice assistants.</li>
  <li>Include room or function in names (e.g., "Kitchen Plug").</li>
  <li>Be consistent with naming conventions across all devices.</li>
</ul>

<h3>Benefits</h3>
<ul>
  <li>Simplifies voice commands (e.g., "Alexa, turn on Living Room Lamp").</li>
  <li>Enhances automation clarity in apps.</li>
  <li>Makes device management easier.</li>
  <li>Reduces confusion in multi-device setups.</li>
</ul>

<h3>Challenges</h3>
<ul>
  <li>Inconsistent naming across apps can cause confusion.</li>
  <li>Renaming devices may disrupt existing automations.</li>
  <li>Voice assistants may have difficulty with complex names.</li>
</ul>

<h2>3. Room Mapping</h2>

<h3>Description</h3>
<p>Grouping devices by room or zone in the app for organized control.</p>

<h3>Process</h3>
<ol>
  <li>In the app, assign devices to rooms (e.g., "Bedroom," "Kitchen").</li>
  <li>Create group commands (e.g., "Turn off all Bedroom lights").</li>
  <li>Integrate with ecosystems for room-based automation.</li>
  <li>Set up room-specific scenes and routines.</li>
</ol>

<h3>Benefits</h3>
<ul>
  <li>Enables group control for efficiency (e.g., turning off all lights in a room).</li>
  <li>Improves user experience with organized interfaces.</li>
  <li>Simplifies automation setup and management.</li>
  <li>Enables location-based automations.</li>
</ul>

<h3>Challenges</h3>
<ul>
  <li>Apps may have different room naming conventions.</li>
  <li>Moving devices to new rooms requires reconfiguration.</li>
  <li>Some devices may not fit clearly into room categories.</li>
</ul>

<h2>4. Example Setup</h2>

<h3>Scenario</h3>
<p>Add a Philips Hue bulb via QR code in the Hue app, name it "Living Room Ceiling," and assign it to the "Living Room" in Google Home.</p>

<h3>Outcome</h3>
<p>Voice command "Hey Google, dim Living Room Ceiling" works seamlessly, and the bulb integrates into a "Goodnight" routine.</p>

<h2>5. Best Practices</h2>

<h3>Naming Conventions</h3>
<ul>
  <li>Use descriptive but concise names.</li>
  <li>Include location information when helpful.</li>
  <li>Avoid special characters that may confuse voice assistants.</li>
  <li>Be consistent across all platforms and apps.</li>
</ul>

<h3>Room Organization</h3>
<ul>
  <li>Use standard room names (Bedroom, Kitchen, Living Room, etc.).</li>
  <li>Create logical groupings for multi-purpose spaces.</li>
  <li>Consider creating zones for outdoor or special areas.</li>
  <li>Plan room structure before adding many devices.</li>
</ul>

<h3>Automation Integration</h3>
<ul>
  <li>Use room-based automations for efficiency.</li>
  <li>Create scenes that work across multiple rooms.</li>
  <li>Test voice commands after setup.</li>
  <li>Document your naming and room structure.</li>
</ul>

<h2>6. Troubleshooting</h2>

<h3>Common Issues</h3>
<ul>
  <li><strong>QR Code Not Scanning:</strong> Check lighting and camera focus.</li>
  <li><strong>Device Not Recognized:</strong> Verify device is in pairing mode.</li>
  <li><strong>Voice Commands Not Working:</strong> Check device names and pronunciation.</li>
  <li><strong>Room Assignments Missing:</strong> Verify app permissions and settings.</li>
</ul>

<h3>Solutions</h3>
<ul>
  <li>Ensure good lighting when scanning QR codes.</li>
  <li>Use manual entry if QR code scanning fails.</li>
  <li>Test voice commands with simple names first.</li>
  <li>Check app settings and permissions.</li>
</ul>

<h2>7. Conclusion</h2>

<p>Proper device configuration through QR code pairing, thoughtful device naming, and logical room mapping creates a foundation for an efficient and user-friendly smart home. These steps may seem simple, but they significantly impact the daily usability and automation capabilities of your smart home system.</p>

<p>Take time to plan your naming conventions and room structure before adding many devices, as changing these later can be time-consuming and may require updating existing automations.</p>

</div>`
  }
};
