const { execSync } = require('child_process');

console.log('🚀 Pushing to GitHub...\n');

try {
  // Add all changes
  console.log('📁 Adding all changes...');
  execSync('git add .', { stdio: 'inherit' });
  
  // Commit changes
  console.log('\n💾 Committing changes...');
  execSync('git commit -m "Updated enrollment system with email confirmation and instructor approval flow"', { stdio: 'inherit' });
  
  // Push to GitHub
  console.log('\n📤 Pushing to GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('\n✅ Successfully pushed to GitHub!');
  console.log('🌐 Your repository: https://github.com/Rapid89tech/Skillslaunch.git');
  
} catch (error) {
  console.error('❌ Error pushing to GitHub:', error.message);
  process.exit(1);
}
