const authRouter = require('./src/routes/auth');

console.log('🔍 Checking auth router structure:');
console.log('Type:', typeof authRouter);
console.log('Is function:', typeof authRouter === 'function');
console.log('Router stack length:', authRouter.stack?.length || 0);

if (authRouter.stack && authRouter.stack.length > 0) {
  console.log('\n📋 Registered auth routes:');
  authRouter.stack.forEach(layer => {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase()).join(', ');
      const path = layer.route.path;
      console.log(`   ${methods} ${path}`);
    }
  });
} else {
  console.log('❌ No routes found in auth router!');
}