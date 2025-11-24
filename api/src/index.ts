import express from 'express';
import cors from 'cors';
import { profileLibrary } from './profile-data';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // For parsing application/json

// Endpoint to get a list of all profiles (summary)
app.get('/api/profiles', (req, res) => {
  const profileSummaries = Object.entries(profileLibrary).map(([slug, data]) => ({
    slug,
    name: data.profile.name,
    title: data.profile.title,
    heroImage: data.profile.heroImage,
  }));
  res.json(profileSummaries);
});

// Endpoint to get a single profile by slug
app.get('/api/profiles/:slug', (req, res) => {
  const { slug } = req.params;
  const profileData = profileLibrary[slug];

  if (profileData) {
    res.json(profileData);
  } else {
    res.status(404).json({ message: 'Profile not found' });
  }
});

app.listen(port, () => {
  console.log(`Express.js API listening at http://localhost:${port}`);
});