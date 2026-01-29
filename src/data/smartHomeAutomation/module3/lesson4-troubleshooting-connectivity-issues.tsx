import type { Lesson } from '@/types/course';

export const lesson4TroubleshootingConnectivityIssues: Lesson = {
  id: 4,
  title: 'Troubleshooting Connectivity Issues',
  duration: '60 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=1i3XdhC2ZAs',
    textContent: `<div class="lesson-content">

<h1>Troubleshooting Connectivity Issues</h1>

<p>Connectivity issues can disrupt smart home functionality, causing devices to go offline or automations to fail. Understanding common problems and their solutions is essential for maintaining a reliable smart home network.</p>

<h2>1. Common Connectivity Issues</h2>

<h3>Device Offline/Not Responding</h3>
<p>Device loses connection to the router, hub, or app, preventing control and automation.</p>

<h3>Interference</h3>
<p>Wi-Fi or Bluetooth signals disrupted by walls, appliances, or other 2.4 GHz devices.</p>

<h3>IP Conflicts</h3>
<p>Multiple devices assigned the same IP address, causing communication failures.</p>

<h3>Firmware Outdated</h3>
<p>Older firmware on routers or devices leads to compatibility or security issues.</p>

<h3>Range Limitations</h3>
<p>Devices outside Wi-Fi or hub range fail to connect.</p>

<h3>Protocol Mismatch</h3>
<p>Devices using different protocols (e.g., Zigbee vs. Wi-Fi) fail to integrate without a hub.</p>

<h2>2. Troubleshooting Steps</h2>

<h3>Step 1: Restart Devices</h3>
<ul>
  <li>Power cycle the router, hub, and affected devices to reset connections</li>
  <li>Wait 1–2 minutes before reconnecting to allow network stabilization</li>
  <li>Start with the router, then hub, then individual devices</li>
</ul>

<h3>Step 2: Reconnect to Network</h3>
<ul>
  <li>Ensure the device is on the correct Wi-Fi band (2.4 GHz for most IoT devices)</li>
  <li>Re-pair Zigbee/Z-Wave devices to the hub or re-scan Bluetooth devices</li>
  <li>Check network credentials and signal strength</li>
</ul>

<h3>Step 3: Assign Static IP</h3>
<ul>
  <li>Check for IP conflicts in the router's admin interface</li>
  <li>Assign unique static IPs to critical devices (e.g., hubs, cameras)</li>
  <li>Use IP ranges outside the DHCP pool to avoid conflicts</li>
</ul>

<h3>Step 4: Update Firmware</h3>
<ul>
  <li>Update router and device firmware via apps or admin interfaces</li>
  <li>Address bugs and security issues with latest firmware</li>
  <li>Check manufacturer websites for firmware updates</li>
</ul>

<h3>Step 5: Check Range and Interference</h3>
<ul>
  <li>Move devices closer to the router or hub</li>
  <li>Add a range extender/mesh node if needed</li>
  <li>Change Wi-Fi channels (e.g., 1, 6, 11 for 2.4 GHz) to reduce interference</li>
</ul>

<h3>Step 6: Verify Protocol Compatibility</h3>
<ul>
  <li>Ensure devices and hubs support the same protocols (e.g., Zigbee with SmartThings)</li>
  <li>Use Matter-compatible devices for easier integration</li>
  <li>Check device specifications for protocol requirements</li>
</ul>

<h3>Step 7: Monitor Logs</h3>
<ul>
  <li>Check router or hub logs for errors (e.g., dropped connections, authentication failures)</li>
  <li>Use diagnostic tools to identify network issues</li>
  <li>Review device status and error reports</li>
</ul>

<h2>3. Troubleshooting Tools</h2>

<h3>Router Admin Interface</h3>
<ul>
  <li>Access via IP (e.g., 192.168.0.1) to view connected devices</li>
  <li>Check IP assignments and logs</li>
  <li>Monitor network traffic and performance</li>
</ul>

<h3>Network Scanners</h3>
<ul>
  <li>Apps like Fing or NetSpot to identify interference or IP conflicts</li>
  <li>Wi-Fi analyzer tools to check signal strength and channel usage</li>
  <li>Network monitoring software for detailed analysis</li>
</ul>

<h3>Hub Diagnostics</h3>
<ul>
  <li>Home Assistant or SmartThings apps provide device status</li>
  <li>Error reports and connection logs</li>
  <li>Built-in diagnostic tools for troubleshooting</li>
</ul>

<h2>4. Example Troubleshooting Scenario</h2>

<h3>Issue: Wi-Fi Smart Camera Goes Offline Frequently</h3>

<h4>Steps to Resolve:</h4>
<ol>
  <li>Restart the camera and router</li>
  <li>Verify the camera is on 2.4 GHz Wi-Fi</li>
  <li>Assign a static IP to the camera</li>
  <li>Update camera firmware</li>
  <li>Move the camera closer to the router or add a mesh node</li>
</ol>

<h4>Expected Outcome:</h4>
<p>Stable connection with consistent video streaming and reliable motion detection.</p>

<h2>5. Prevention Strategies</h2>

<h3>Regular Maintenance</h3>
<ul>
  <li>Schedule regular firmware updates for all devices</li>
  <li>Monitor network performance and device status</li>
  <li>Keep documentation of device configurations</li>
</ul>

<h3>Network Planning</h3>
<ul>
  <li>Plan device placement for optimal signal strength</li>
  <li>Use appropriate protocols for different device types</li>
  <li>Consider network capacity when adding new devices</li>
</ul>

<h3>Security Best Practices</h3>
<ul>
  <li>Use strong passwords and encryption</li>
  <li>Enable two-factor authentication where available</li>
  <li>Regularly review connected devices</li>
</ul>

<h2>6. Conclusion</h2>

<p>Effective troubleshooting of connectivity issues requires a systematic approach, starting with simple solutions like restarting devices and progressing to more complex network analysis. By understanding common problems and having the right tools, you can quickly resolve connectivity issues and maintain a reliable smart home network.</p>

<p>Regular maintenance and preventive measures can help minimize connectivity problems and ensure your smart home devices operate smoothly and reliably.</p>

</div>`
  }
};
