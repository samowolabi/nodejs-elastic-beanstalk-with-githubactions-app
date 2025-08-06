const assert = require('assert');

// Simple test: 1 + 1 = 2
console.log('🧪 Running simple test...');

try {
    assert.strictEqual(1 + 1, 2, '1 + 1 should equal 2');
    console.log('✅ Test passed: 1 + 1 = 2');
    process.exit(0);
} catch (error) {
    console.log('❌ Test failed:', error.message);
    process.exit(1);
}
