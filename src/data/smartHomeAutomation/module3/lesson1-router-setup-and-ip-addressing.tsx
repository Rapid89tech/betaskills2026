import type { Lesson } from '@/types/course';

export const lesson1RouterSetupAndIpAddressing: Lesson = {
  id: 1,
  title: 'Router Setup and IP Addressing',
  duration: '75 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=h6VfR_2mhcY&t=11s',
    textContent: `<div class="lesson-content">

<h1>Router Setup and IP Addressing</h1>

<p>Routers serve as the gateway between smart home devices and the internet, managing connectivity for Wi-Fi, Zigbee, Z-Wave, Thread, or Bluetooth devices. Proper setup and IP addressing are critical for reliable performance and security.</p>

<h2>1. Router Setup</h2>

<h3>Role and Function</h3>
<p>Routers act as the central hub for internet connectivity, routing data between smart devices, hubs, and external servers (e.g., cloud services for Alexa or Google Home).</p>

<h3>Key Settings</h3>

<h4>SSID (Service Set Identifier)</h4>
<ul>
  <li>The Wi-Fi network name, which should be unique to avoid confusion with neighboring networks.</li>
  <li>Choose a descriptive name that identifies your network (e.g., "Smith_Home_Network").</li>
  <li>Avoid using personal information in the SSID for security reasons.</li>
</ul>

<h4>Password and Encryption</h4>
<ul>
  <li>Use WPA2 or WPA3 for strong security.</li>
  <li>WPA3 offers enhanced encryption and protection against brute-force attacks.</li>
  <li>Create a strong, unique password with a mix of letters, numbers, and special characters.</li>
  <li>Never use default passwords provided by manufacturers.</li>
</ul>

<h4>Wi-Fi Bands</h4>

<h5>2.4 GHz</h5>
<ul>
  <li>Longer range, better wall penetration, but slower (up to 300–600 Mbps with Wi-Fi 5).</li>
  <li>Most IoT devices (e.g., smart plugs, bulbs) use 2.4 GHz due to compatibility.</li>
  <li>Ideal for devices that don't require high bandwidth but need reliable connectivity.</li>
  <li>More susceptible to interference from other 2.4 GHz devices.</li>
</ul>

<h5>5 GHz</h5>
<ul>
  <li>Faster (up to 1–10 Gbps with Wi-Fi 6), but shorter range and less wall penetration.</li>
  <li>Ideal for high-bandwidth devices like cameras and smart TVs.</li>
  <li>Less interference due to more available channels.</li>
  <li>Better performance in dense urban environments.</li>
</ul>

<h5>6 GHz (Wi-Fi 6E)</h5>
<ul>
  <li>Emerging for ultra-fast, low-latency connections.</li>
  <li>Limited device support currently.</li>
  <li>Provides additional bandwidth for future smart home devices.</li>
</ul>

<h4>Guest Network</h4>
<ul>
  <li>Isolates smart devices from personal devices, enhancing security.</li>
  <li>Provides separate internet access for visitors without exposing your main network.</li>
  <li>Can be used to segment IoT devices for better security management.</li>
</ul>

<h4>Quality of Service (QoS)</h4>
<ul>
  <li>Prioritizes bandwidth for critical devices (e.g., security cameras over smart plugs).</li>
  <li>Ensures smooth video streaming and real-time monitoring.</li>
  <li>Can be configured to prioritize specific applications or device types.</li>
</ul>

<h3>Advanced Features</h3>

<h4>Firewall Settings</h4>
<ul>
  <li>Block unauthorized access to your network.</li>
  <li>Configure rules to allow or deny specific types of traffic.</li>
  <li>Monitor incoming and outgoing connections for suspicious activity.</li>
</ul>

<h4>Parental Controls</h4>
<ul>
  <li>Manage bandwidth allocation for different devices or users.</li>
  <li>Set time limits for internet access.</li>
  <li>Block access to inappropriate content.</li>
</ul>

<h4>DMZ or Port Forwarding</h4>
<ul>
  <li>Configure for specific smart home applications (e.g., remote camera access).</li>
  <li>Use with caution as it can expose devices to the internet.</li>
  <li>Consider using VPN instead for remote access.</li>
</ul>

<h3>Popular Router Examples</h3>
<ul>
  <li><strong>Netgear Nighthawk:</strong> High-performance routers with advanced features.</li>
  <li><strong>TP-Link Archer:</strong> Affordable routers with good performance.</li>
  <li><strong>Google Nest Wi-Fi:</strong> Mesh-capable routers with smart features.</li>
  <li><strong>Eero Pro:</strong> Mesh networking routers with easy setup.</li>
</ul>

<h2>2. IP Addressing</h2>

<h3>Definition and Purpose</h3>
<p>Each device on a network is assigned an IP address (e.g., 192.168.0.101) to identify it for communication. IP addresses enable devices to find and communicate with each other on the network.</p>

<h3>Types of IP Addresses</h3>

<h4>Dynamic IP (DHCP)</h4>
<ul>
  <li>Routers use Dynamic Host Configuration Protocol (DHCP) to assign temporary IP addresses.</li>
  <li>Simplifies setup but potentially causes connectivity issues if addresses change.</li>
  <li>Ideal for most smart home devices that don't require consistent addressing.</li>
  <li>Automatically manages IP address allocation and renewal.</li>
</ul>

<h4>Static IP</h4>
<ul>
  <li>Fixed IP addresses assigned manually or reserved in the router's DHCP settings.</li>
  <li>Ideal for hubs, cameras, or devices requiring consistent connectivity.</li>
  <li>Prevents connectivity issues caused by IP address changes.</li>
  <li>Requires manual configuration and management.</li>
</ul>

<h3>Applications</h3>

<h4>Dynamic IPs</h4>
<ul>
  <li>Used for most devices (e.g., smart bulbs, plugs) to reduce setup complexity.</li>
  <li>Automatically managed by the router's DHCP server.</li>
  <li>Suitable for devices that don't need to be accessed by specific IP addresses.</li>
</ul>

<h4>Static IPs</h4>
<ul>
  <li>Used for hubs (e.g., SmartThings) or cameras to ensure reliable remote access.</li>
  <li>Essential for devices that need consistent network addressing.</li>
  <li>Required for port forwarding or remote access configurations.</li>
</ul>

<h3>Benefits of Proper IP Management</h3>
<ul>
  <li>Ensures devices can communicate within the network and with external servers.</li>
  <li>Static IPs prevent disruptions from IP changes during device discovery or automation.</li>
  <li>Enables reliable remote access to smart home devices.</li>
  <li>Facilitates troubleshooting and network management.</li>
</ul>

<h3>Challenges</h3>

<h4>IP Conflicts</h4>
<ul>
  <li>Occur when two devices share the same address, causing connectivity issues.</li>
  <li>Can be resolved by assigning unique static IPs or expanding DHCP range.</li>
  <li>May require network scanning tools to identify conflicts.</li>
</ul>

<h4>Managing Static IPs</h4>
<ul>
  <li>Requires manual configuration or router expertise.</li>
  <li>Needs documentation to avoid conflicts and maintain organization.</li>
  <li>May require router admin access for configuration.</li>
</ul>

<h3>Best Practices</h3>

<h4>Reserve Static IPs</h4>
<ul>
  <li>Use the router's admin interface to reserve static IPs for critical devices.</li>
  <li>This prevents DHCP from assigning the same address to other devices.</li>
  <li>Ensures consistent addressing without manual configuration on each device.</li>
</ul>

<h4>Use IP Ranges</h4>
<ul>
  <li>Use IP ranges outside the DHCP pool (e.g., 192.168.0.200–255) for static assignments.</li>
  <li>This prevents conflicts between DHCP and static IP assignments.</li>
  <li>Makes it easier to identify static vs. dynamic devices.</li>
</ul>

<h4>Document IP Assignments</h4>
<ul>
  <li>Keep a record of all static IP assignments to avoid conflicts.</li>
  <li>Include device names, IP addresses, and MAC addresses in documentation.</li>
  <li>Update documentation when adding or removing devices.</li>
</ul>

<h2>3. Router Configuration Steps</h2>

<h3>Accessing Router Admin Interface</h3>
<ol>
  <li>Connect to your router's Wi-Fi network or via Ethernet cable.</li>
  <li>Open a web browser and navigate to the router's IP address (typically 192.168.0.1 or 192.168.1.1).</li>
  <li>Enter the admin username and password (check router documentation for defaults).</li>
  <li>Change default credentials immediately for security.</li>
</ol>

<h3>Basic Configuration</h3>
<ol>
  <li><strong>Set SSID:</strong> Choose a unique network name.</li>
  <li><strong>Configure Security:</strong> Enable WPA3 encryption and set a strong password.</li>
  <li><strong>Separate Bands:</strong> Create separate SSIDs for 2.4 GHz and 5 GHz if needed.</li>
  <li><strong>Enable Guest Network:</strong> Set up isolated network for visitors or IoT devices.</li>
  <li><strong>Configure QoS:</strong> Prioritize bandwidth for critical devices.</li>
</ol>

<h3>Advanced Configuration</h3>
<ol>
  <li><strong>DHCP Settings:</strong> Configure IP address range and lease times.</li>
  <li><strong>Static IP Reservations:</strong> Reserve IPs for hubs and critical devices.</li>
  <li><strong>Firewall Rules:</strong> Configure security settings and access controls.</li>
  <li><strong>Port Forwarding:</strong> Set up for remote access if needed.</li>
  <li><strong>Firmware Updates:</strong> Check for and install latest firmware.</li>
</ol>

<h2>4. Security Considerations</h2>

<h3>Router Security</h3>
<ul>
  <li><strong>Change Default Credentials:</strong> Always change default admin username and password.</li>
  <li><strong>Use Strong Encryption:</strong> Enable WPA3 or at minimum WPA2 encryption.</li>
  <li><strong>Regular Updates:</strong> Keep router firmware updated to patch security vulnerabilities.</li>
  <li><strong>Disable WPS:</strong> Turn off Wi-Fi Protected Setup to prevent unauthorized access.</li>
</ul>

<h3>Network Segmentation</h3>
<ul>
  <li><strong>Guest Network:</strong> Isolate IoT devices from personal devices.</li>
  <li><strong>VLANs:</strong> Use virtual LANs to separate different types of devices.</li>
  <li><strong>Firewall Rules:</strong> Configure rules to control traffic between network segments.</li>
</ul>

<h2>5. Troubleshooting Common Issues</h2>

<h3>Connection Problems</h3>
<ul>
  <li><strong>Check Physical Connections:</strong> Ensure cables are properly connected.</li>
  <li><strong>Verify IP Configuration:</strong> Check that devices have valid IP addresses.</li>
  <li><strong>Test Connectivity:</strong> Use ping or traceroute to identify connection issues.</li>
  <li><strong>Restart Devices:</strong> Power cycle router and affected devices.</li>
</ul>

<h3>Performance Issues</h3>
<ul>
  <li><strong>Check Bandwidth:</strong> Monitor network usage and identify bottlenecks.</li>
  <li><strong>Optimize Channel Selection:</strong> Choose optimal Wi-Fi channels to reduce interference.</li>
  <li><strong>Update Firmware:</strong> Ensure router and devices have latest firmware.</li>
  <li><strong>Consider Mesh Network:</strong> For large homes, consider upgrading to mesh networking.</li>
</ul>

<h2>6. Conclusion</h2>

<p>Proper router setup and IP addressing are fundamental to building a reliable smart home network. By understanding the key settings, implementing best practices for security, and following proper configuration procedures, you can create a robust foundation for your smart home ecosystem. Regular maintenance, including firmware updates and security reviews, ensures your network remains secure and performs optimally as you add more smart devices.</p>

<p>Remember that your router is the gateway to your smart home, and investing time in proper setup and configuration will pay dividends in reliability, security, and performance as your smart home grows.</p>

</div>`
  }
};
