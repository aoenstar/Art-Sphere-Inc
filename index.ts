import app from './app';

app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening on port ${process.env.PORT || 4000} 🚀`);
  console.log('  Press Control-C to stop\n');
});
