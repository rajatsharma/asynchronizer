if (process.env.NODE_ENV === 'development') {
  require('./scripts/start');
}

if (process.env.NODE_ENV === 'production') {
  require('./build/main');
}
