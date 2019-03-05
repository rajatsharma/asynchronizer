import app from './app';

app.listen(process.env.PORT, error => {
  if (error) {
    console.log('Something Went Wrong');
    return;
  }
  console.log(`Server running at ${process.env.PORT}`);
});
