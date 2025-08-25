// Freighter Debug Script - Run this in browser console
console.log('=== Freighter Debug Script ===');

// Check window object
console.log('Window exists:', typeof window !== 'undefined');

// Check for Freighter at different locations
const checks = [
  { name: 'window.stellar', value: window.stellar },
  { name: 'window.freighter', value: (window as any).freighter },
  { name: 'any.stellar', value: (window as any).stellar },
  { name: 'any.freighter', value: (window as any).freighter }
];

checks.forEach(check => {
  console.log(`${check.name}:`, check.value ? 'Found' : 'Not found');
  if (check.value) {
    console.log(`  Type:`, typeof check.value);
    console.log(`  Methods:`, Object.getOwnPropertyNames(check.value).filter(name => typeof check.value[name] === 'function'));
  }
});

// Test required methods
const requiredMethods = ['isConnected', 'requestAccess', 'getPublicKey', 'getNetwork', 'signTransaction'];

checks.forEach(check => {
  if (check.value) {
    const hasAllMethods = requiredMethods.every(method => typeof check.value[method] === 'function');
    console.log(`${check.name} has all required methods:`, hasAllMethods);
    if (hasAllMethods) {
      console.log('✅ Valid Freighter instance found at:', check.name);
    }
  }
});

// Try to trigger Freighter
console.log('=== Triggering Freighter ===');
window.dispatchEvent(new Event('focus'));
window.dispatchEvent(new Event('blur'));
window.dispatchEvent(new Event('focus'));

try {
  window.postMessage({ type: 'FREIGHTER_DETECT' }, '*');
  console.log('✅ PostMessage sent');
} catch (e) {
  console.log('❌ PostMessage failed:', e);
}

// Wait and check again
setTimeout(() => {
  console.log('=== Re-checking after trigger ===');
  checks.forEach(check => {
    console.log(`${check.name}:`, check.value ? 'Found' : 'Not found');
  });
}, 1000);

console.log('=== Debug complete ===');
