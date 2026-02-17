import type { Lesson } from '@/types/course';

export const lesson2DomainHosting: Lesson = {
  id: 2,
  title: 'Domain Names and Hosting',
  duration: '40 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/qO5qcQgiNX4',
    textContent: `
# Domain Names and Hosting

Domain names and hosting form the essential foundation for establishing your online presence. Your domain name is your web address—the memorable URL customers type to find you—while hosting provides the server space that stores your website files and makes them accessible online.

Together, they create a professional digital storefront that you own and control, independent of social media platforms or marketplaces.

https://youtu.be/qO5qcQgiNX4

## Understanding Domain Names

A domain name is your unique web address, like www.yourbusiness.co.za. It's how customers find you online and an important part of your brand identity. Choose something memorable that matches your business name when possible.

Domain names consist of the name itself and an extension (.co.za, .com, .africa). The extension can signal your location or business type, with .co.za being popular for South African businesses.

### Domain Name Best Practices:
- Keep it short and memorable
- Match your business name
- Easy to spell and pronounce
- Avoid numbers and hyphens
- Choose appropriate extension
- Check availability early
- Consider buying variations
- Protect your brand

### Popular Domain Extensions:
- .co.za - South African businesses
- .com - International/commercial
- .africa - African businesses
- .store - Online stores
- .shop - Ecommerce sites
- .online - General online presence

## Registering Your Domain

Register your domain through accredited registrars that offer competitive pricing in rands and good customer support. Popular options include local providers familiar with .co.za domains or international registrars like Namecheap or GoDaddy.

Domain registration typically costs between R50-R200 per year depending on the extension. Register for multiple years to lock in pricing and avoid forgetting to renew.

### Registration Steps:
1. Search for available domain names
2. Choose your preferred extension
3. Check pricing and renewal costs
4. Add privacy protection
5. Complete purchase
6. Set up auto-renewal
7. Configure DNS settings
8. Verify ownership

### Domain Privacy Protection:
- Hides personal contact information
- Prevents spam and unwanted contact
- Protects against domain theft
- Usually costs R20-R50 extra per year
- Highly recommended for all domains

## Understanding Web Hosting

Web hosting provides server space where your website files live and the technology that makes them accessible to visitors. When someone types your domain name, hosting delivers your website to their browser.

Different hosting types suit different needs and budgets, from affordable shared hosting for small sites to powerful dedicated servers for high-traffic stores.

### Hosting Types:

**Shared Hosting**
- Multiple websites share one server
- Most affordable (R50-R150/month)
- Good for starting out
- Limited resources
- Suitable for low-traffic sites

**VPS Hosting**
- Virtual private server with dedicated resources
- More control and power
- Mid-range pricing (R200-R500/month)
- Scalable as you grow
- Better performance

**Cloud Hosting**
- Resources scale automatically
- Pay for what you use
- Excellent reliability
- Handles traffic spikes
- Flexible pricing

**Managed WordPress Hosting**
- Optimized for WordPress/WooCommerce
- Automatic updates and backups
- Expert support
- Higher cost (R300-R800/month)
- Best performance for WordPress sites

## Choosing a Hosting Provider

Select a hosting provider with good uptime guarantees (99.9%+), fast loading speeds, reliable customer support, and pricing in rands. Look for providers with data centers in South Africa or nearby for faster local access.

Consider what's included: SSL certificates for security, email accounts, automatic backups, and easy installation of ecommerce platforms like WooCommerce or Shopify integration.

### Hosting Selection Criteria:
- Uptime guarantee (99.9%+)
- Loading speed and performance
- Customer support quality and hours
- Pricing in rands
- Included features (SSL, email, backups)
- Scalability options
- Data center locations
- Easy platform installation
- Money-back guarantee

### Recommended South African Hosts:
- Afrihost
- Hetzner
- Xneelo
- HostAfrica
- WebAfrica

## Connecting Domain and Hosting

Once you have both domain and hosting, connect them by pointing your domain's DNS (Domain Name System) settings to your hosting provider's nameservers. Your hosting provider will give you specific nameserver addresses to enter in your domain registrar's control panel.

This process can take 24-48 hours to fully propagate, after which your domain will display your website.

### Connection Steps:
1. Get nameserver details from host
2. Log into domain registrar
3. Find DNS/nameserver settings
4. Enter hosting nameservers
5. Save changes
6. Wait for propagation (24-48 hours)
7. Verify connection works

## Setting Up Email

Professional email addresses using your domain (like info@yourbusiness.co.za) build credibility. Most hosting plans include email accounts, or you can use services like Google Workspace or Zoho Mail.

Custom email addresses look more professional than free Gmail or Yahoo addresses and reinforce your brand in every communication.

### Email Setup Options:

**Hosting Email**
- Included with most hosting plans
- Basic functionality
- Access via webmail or email client
- Free with hosting

**Google Workspace**
- Professional Gmail interface
- Includes Google Drive, Docs, Calendar
- R100-R200 per user per month
- Excellent reliability and features

**Zoho Mail**
- Affordable alternative
- Good features
- R50-R100 per user per month
- Free tier available for small businesses

## SSL Certificates for Security

SSL certificates encrypt the connection between your website and visitors, protecting sensitive information like payment details. They're essential for ecommerce and show a padlock icon in browsers, building trust.

Most hosting providers now include free SSL certificates through Let's Encrypt. Ensure yours is installed and set your site to use HTTPS (not HTTP).

### SSL Benefits:
- Encrypts sensitive data
- Required for payment processing
- Improves search rankings
- Builds customer trust
- Shows padlock in browser
- Prevents security warnings

## Website Performance Optimization

Choose hosting with SSD storage for faster loading, enable caching, and use a CDN (Content Delivery Network) if available. Fast-loading sites keep visitors engaged and rank better in search results.

Monitor your site speed using free tools like Google PageSpeed Insights and work with your host to optimize performance.

### Performance Tips:
- Choose SSD storage hosting
- Enable caching plugins
- Optimize image sizes
- Use CDN for global reach
- Minimize plugins
- Keep software updated
- Monitor loading speeds
- Upgrade hosting as traffic grows

## Backup and Security

Regular backups protect against data loss from technical failures, hacking, or mistakes. Choose hosting that includes automatic daily backups, or set up your own backup solution.

Keep your website software, themes, and plugins updated to patch security vulnerabilities. Use strong passwords and consider additional security plugins for WordPress sites.

### Security Checklist:
- Automatic daily backups
- Strong, unique passwords
- Two-factor authentication
- Regular software updates
- Security plugins installed
- Malware scanning
- Firewall protection
- Limited user access

## Scaling as You Grow

Start with affordable shared hosting, but be ready to upgrade as your traffic and sales increase. Monitor your site performance and upgrade to VPS or cloud hosting when you notice slowdowns during busy periods.

Most hosts make upgrading easy, often with just a few clicks and minimal downtime. Plan for growth by choosing a host with clear upgrade paths.

Domain names and hosting create your owned digital foundation, giving you control and credibility that social media alone cannot provide. By choosing wisely and maintaining your online infrastructure properly, you build a reliable, professional presence that supports long-term business growth.
    `
  }
};
