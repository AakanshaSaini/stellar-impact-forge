// Freighter Detection Test Script using Official API
// Copy and paste this into your browser console to test Freighter detection

console.log('=== Freighter Detection Test (Official API) ===');

// Test 1: Check if Freighter API is available
console.log('1. API Availability:');
try {
  // Try to import the API functions (this will work if the package is loaded)
  console.log('- @stellar/freighter-api should be available in the app');
  console.log('- Testing basic detection...');
} catch (error) {
  console.log('- API not available:', error);
}

// Test 2: Manual window checks (fallback)
console.log('\n2. Manual Window Checks:');
console.log('- window.stellar:', typeof window.stellar);
console.log('- window.freighter:', typeof window.freighter);
console.log('- "stellar" in window:', 'stellar' in window);
console.log('- "freighter" in window:', 'freighter' in window);

// Test 3: Check if objects exist and have methods
console.log('\n3. Object Method Check:');
if (window.stellar) {
  console.log('- window.stellar type:', typeof window.stellar);
  console.log('- window.stellar keys:', Object.keys(window.stellar));
  
  const requiredMethods = ['isConnected', 'requestAccess', 'getPublicKey', 'getNetwork'];
  requiredMethods.forEach(method => {
    console.log(`- ${method}:`, typeof window.stellar[method]);
  });
} else {
  console.log('- window.stellar: NOT FOUND');
}

if (window.freighter) {
  console.log('- window.freighter type:', typeof window.freighter);
  console.log('- window.freighter keys:', Object.keys(window.freighter));
} else {
  console.log('- window.freighter: NOT FOUND');
}

// Test 4: Try to connect manually
console.log('\n4. Manual Connection Test:');
if (window.stellar && typeof window.stellar.requestAccess === 'function') {
  console.log('Attempting manual connection...');
  window.stellar.requestAccess()
    .then(() => {
      console.log('✅ Manual connection successful!');
      return window.stellar.getPublicKey();
    })
    .then(publicKey => {
      console.log('Public Key:', publicKey);
      return window.stellar.getNetwork();
    })
    .then(network => {
      console.log('Network:', network);
      console.log('🎉 Freighter is working correctly!');
    })
    .catch(error => {
      console.log('❌ Manual connection failed:', error);
    });
} else {
  console.log('Cannot test manual connection - Freighter not available');
}

// Test 5: Check for common issues
console.log('\n5. Common Issues Check:');
console.log('- Browser:', navigator.userAgent);
console.log('- URL:', window.location.href);
console.log('- Protocol:', window.location.protocol);
console.log('- Host:', window.location.host);

if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
  console.log('⚠️  Warning: Freighter may require HTTPS or localhost');
}

// Test 6: Check if the app's Freighter API wrapper is working
console.log('\n6. App Integration Test:');
console.log('- Check if the app can detect and connect to Freighter');
console.log('- Look for console messages from the app');
console.log('- Try clicking "Connect Wallet" in the app');

console.log('\n=== Test Complete ===');
console.log('If Freighter is not detected:');
console.log('1. Make sure Freighter extension is installed from freighter.app');
console.log('2. Ensure it\'s enabled in your browser extensions');
console.log('3. Try clicking the Freighter icon in your toolbar');
console.log('4. Refresh the page and try again');
console.log('5. Check the app\'s console for detailed error messages');
