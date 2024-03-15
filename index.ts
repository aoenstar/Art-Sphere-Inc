import app from './app';

app.listen(4000, () => {
  console.log(`Listening on port ${app.get('port')} 🚀`);
  console.log('  Press Control-C to stop\n');
});
