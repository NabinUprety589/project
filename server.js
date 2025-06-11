/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Nabin Uprety Student ID: 172005233 Date: 2025-06-25
*
* Published URL: [Your deployed URL]
*
********************************************************************************/

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


const projects = [
  {
    id: 1,
    title: 'Project One',
    summary_short: 'This is a short summary for project one.',
    feature_img_url: 'https://via.placeholder.com/400x200?text=Project+1',
    sector: 'energy',
  },
  {
    id: 2,
    title: 'Project Two',
    summary_short: 'This is a short summary for project two.',
    feature_img_url: 'https://via.placeholder.com/400x200?text=Project+2',
    sector: 'industry',
  },
  {
    id: 3,
    title: 'Project Three',
    summary_short: 'This is a short summary for project three.',
    feature_img_url: 'https://via.placeholder.com/400x200?text=Project+3',
    sector: 'transportation',
  },
];

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});


app.get('/solutions/projects', (req, res) => {
  const sector = req.query.sector;
  try {
    if (sector) {
      const filteredProjects = projects.filter(p => p.sector === sector.toLowerCase());
      if (filteredProjects.length === 0) {
        return res.status(404).send(`No projects found for sector: ${sector}`);
      }
      return res.json(filteredProjects);
    } else {
      return res.json(projects);
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
});


app.get('/solutions/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const project = projects.find(p => p.id === id);
    if (!project) {
      return res.status(404).send(`Project with id ${id} not found.`);
    }
    return res.json(project);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`🚀  Server running at: http://localhost:${PORT}`);
});
