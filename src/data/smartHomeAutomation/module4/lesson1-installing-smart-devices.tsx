import type { Lesson } from '@/types/course';

export const lesson1InstallingSmartDevices: Lesson = {
  id: 1,
  title: 'Installing Smart Devices',
  duration: '80 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=WHXYlEB_QmY',
    textContent: `<div class="lesson-content">

<h1>Installing Smart Devices</h1>

<p>Smart devices like lights, plugs, thermostats, and cameras are the core components of a smart home, offering automation, remote control, and enhanced functionality. Proper installation ensures reliable performance and integration with ecosystems like Google Home, Alexa, or SmartThings.</p>

<h2>1. Smart Lights</h2>

<h3>Description</h3>
<p>LED bulbs, strips, or fixtures controlled via apps, voice assistants, or hubs, supporting Wi-Fi, Zigbee, Thread, or Bluetooth.</p>

<h3>Installation Steps</h3>
<ol>
  <li><strong>Screw into Socket:</strong> Install the bulb into a standard socket (e.g., E26, E12), ensuring power is off for safety.</li>
  <li><strong>Connect to Network:</strong>
    <ul>
      <li><strong>Wi-Fi:</strong> Connect via the manufacturer's app (e.g., LIFX, TP-Link Kasa).</li>
      <li><strong>Zigbee/Thread:</strong> Pair with a hub like Philips Hue Bridge or Home Assistant.</li>
      <li><strong>Bluetooth:</strong> Pair directly with a smartphone or hub (e.g., Nanoleaf Essentials).</li>
    </ul>
  </li>
  <li><strong>Configure Settings:</strong> Customize brightness, color temperature (e.g., 2700K warm to 6500K cool), or RGB colors via the app.</li>
  <li><strong>Set Up Automation:</strong> Create schedules (e.g., lights on at sunset) or triggers (e.g., motion sensor activation).</li>
</ol>

<h3>Applications</h3>
<ul>
  <li>Ambiance control (e.g., dimming for movie nights).</li>
  <li>Energy savings with automated shutoff.</li>
  <li>Security via randomized lighting to simulate occupancy.</li>
</ul>

<h3>Examples</h3>
<p>Philips Hue, LIFX, Wyze Bulb, Nanoleaf Shapes.</p>

<h3>Benefits</h3>
<ul>
  <li>Easy installation, no wiring required for most bulbs.</li>
  <li>Highly customizable for aesthetics and functionality.</li>
  <li>Energy-efficient LEDs reduce electricity costs (up to 80% savings, per ENERGY STAR).</li>
</ul>

<h3>Challenges</h3>
<ul>
  <li>Zigbee/Thread lights require a hub, adding cost ($30–100).</li>
  <li>Higher upfront cost ($10–50 per bulb) compared to traditional bulbs.</li>
  <li>Compatibility issues if not matched with the correct ecosystem.</li>
</ul>

<h2>2. Smart Plugs</h2>

<h3>Description</h3>
<p>Devices that plug into wall outlets to control power to connected appliances, typically using Wi-Fi or Zigbee.</p>

<h3>Installation Steps</h3>
<ol>
  <li><strong>Plug into Outlet:</strong> Insert the smart plug into a standard wall socket.</li>
  <li><strong>Connect Appliance:</strong> Plug a device (e.g., lamp, coffee maker) into the smart plug.</li>
  <li><strong>Pair with App:</strong> Use the manufacturer's app (e.g., TP-Link Kasa, Wemo) to connect via Wi-Fi or a hub for Zigbee models.</li>
  <li><strong>Configure Settings:</strong> Set schedules (e.g., turn on at 7 AM) or enable energy monitoring.</li>
</ol>

<h3>Applications</h3>
<ul>
  <li>Transforming non-smart devices (e.g., fans, chargers) into smart devices.</li>
  <li>Automating holiday lights or small appliances.</li>
  <li>Monitoring energy usage for cost savings.</li>
</ul>

<h3>Examples</h3>
<p>TP-Link Kasa Smart Plug, Amazon Smart Plug, Meross Smart Plug.</p>

<h3>Benefits</h3>
<ul>
  <li>Affordable ($10–25) and easy to install with no wiring.</li>
  <li>Versatile for controlling a wide range of devices.</li>
  <li>Supports automation and voice control (e.g., Alexa, Google Home).</li>
</ul>

<h3>Challenges</h3>
<ul>
  <li>Limited to power on/off; cannot control device-specific functions (e.g., fan speed).</li>
  <li>May clutter outlets in multi-device setups.</li>
  <li>Wi-Fi models consume more power than Zigbee alternatives.</li>
</ul>

<h2>3. Smart Thermostats</h2>

<h3>Description</h3>
<p>Devices that regulate HVAC systems, optimizing temperature for comfort and energy efficiency, controlled via apps or voice assistants.</p>

<h3>Installation Steps</h3>
<ol>
  <li><strong>Turn Off Power:</strong> Switch off the HVAC system at the breaker for safety.</li>
  <li><strong>Remove Old Thermostat:</strong> Disconnect wires, noting labels (e.g., R, W, Y, G).</li>
  <li><strong>Wire New Thermostat:</strong> Follow manufacturer instructions (e.g., Nest, Ecobee) to connect wires to terminals (line, load, neutral, ground).</li>
  <li><strong>Mount and Power On:</strong> Secure the thermostat to the wall and restore power.</li>
  <li><strong>Connect to Network:</strong> Pair via Wi-Fi or a hub (e.g., HomeKit, SmartThings) using the app.</li>
  <li><strong>Configure Settings:</strong> Set schedules, enable learning modes, or integrate with sensors for multi-zone control.</li>
</ol>

<h3>Applications</h3>
<ul>
  <li>Energy savings through occupancy-based or weather-adaptive temperature control.</li>
  <li>Remote temperature adjustments via apps.</li>
  <li>Integration with smart home routines (e.g., lower temperature when leaving home).</li>
</ul>

<h3>Examples</h3>
<p>Google Nest, Ecobee SmartThermostat, Honeywell Home T9, Tado.</p>

<h3>Benefits</h3>
<ul>
  <li>Saves 10–15% on energy bills (EPA estimates).</li>
  <li>Enhances comfort with precise, adaptive control.</li>
  <li>Provides energy usage reports for optimization.</li>
</ul>

<h3>Challenges</h3>
<ul>
  <li>Requires compatible HVAC systems (e.g., C-wire for power).</li>
  <li>Installation may need professional help ($100–200).</li>
  <li>High upfront cost ($100–250).</li>
</ul>

<h2>4. Smart Cameras</h2>

<h3>Description</h3>
<p>Security cameras for indoor or outdoor monitoring, offering live streaming, motion detection, and storage options.</p>

<h3>Installation Steps</h3>
<ol>
  <li><strong>Choose Location:</strong> Mount indoors (e.g., living room) or outdoors (e.g., front door), ensuring a clear view and power access.</li>
  <li><strong>Mount Camera:</strong> Use screws, adhesives, or magnetic mounts per manufacturer instructions.</li>
  <li><strong>Connect to Power:</strong> Use batteries, wired power, or solar panels for outdoor models.</li>
  <li><strong>Pair with App:</strong> Connect to Wi-Fi via the app (e.g., Ring, Arlo) or scan a QR code.</li>
  <li><strong>Configure Settings:</strong> Enable motion alerts, set detection zones, and choose cloud or local storage.</li>
</ol>

<h3>Applications</h3>
<ul>
  <li>Real-time monitoring of home entrances or interiors.</li>
  <li>Pet or child monitoring with two-way audio.</li>
  <li>Integration with doorbells or locks for comprehensive security.</li>
</ul>

<h3>Examples</h3>
<p>Ring Stick Up Cam, Arlo Pro, Blink Outdoor, Wyze Cam.</p>

<h3>Benefits</h3>
<ul>
  <li>Enhances security with motion alerts and recorded footage.</li>
  <li>Easy to install (starting at $30–50 for budget models).</li>
  <li>Integrates with ecosystems like Alexa or Google Home.</li>
</ul>

<h3>Challenges</h3>
<ul>
  <li>Cloud storage often requires subscriptions ($3–10/month).</li>
  <li>Wi-Fi dependency can lead to lag or outages.</li>
  <li>Privacy risks from cloud-stored footage.</li>
</ul>

<h2>5. Installation Best Practices</h2>

<h3>Safety First</h3>
<ul>
  <li>Always turn off power at the breaker before working with electrical devices.</li>
  <li>Use a voltage tester to confirm power is off.</li>
  <li>Follow manufacturer instructions exactly.</li>
  <li>Consult a licensed electrician for complex installations.</li>
</ul>

<h3>Network Preparation</h3>
<ul>
  <li>Ensure your Wi-Fi network is stable and has sufficient bandwidth.</li>
  <li>Use 2.4 GHz network for most IoT devices.</li>
  <li>Have your network password ready during setup.</li>
  <li>Consider using a dedicated IoT network for security.</li>
</ul>

<h3>Device Placement</h3>
<ul>
  <li>Position devices for optimal signal strength.</li>
  <li>Avoid placing devices behind thick walls or metal objects.</li>
  <li>Consider the range limitations of your chosen protocol.</li>
  <li>Plan for future expansion and device additions.</li>
</ul>

<h2>6. Troubleshooting Common Issues</h2>

<h3>Device Not Connecting</h3>
<ul>
  <li>Check that the device is in pairing mode.</li>
  <li>Verify network credentials and signal strength.</li>
  <li>Restart the device and try again.</li>
  <li>Update the app to the latest version.</li>
</ul>

<h3>Poor Performance</h3>
<ul>
  <li>Move devices closer to the router or hub.</li>
  <li>Check for interference from other devices.</li>
  <li>Update device firmware.</li>
  <li>Consider using a mesh network for better coverage.</li>
</ul>

<h2>7. Conclusion</h2>

<p>Installing smart devices requires careful planning, proper safety procedures, and attention to detail. By following manufacturer instructions and best practices, you can create a reliable and efficient smart home system. Remember that proper installation is the foundation for a successful smart home experience.</p>

<p>Always prioritize safety, test devices thoroughly after installation, and plan for future expansion as your smart home grows.</p>

</div>`
  }
};
