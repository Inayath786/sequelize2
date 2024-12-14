const express = require('express');
let { sequelize } = require('./lib/index2.js');
let { track } = require('./models/track.model.js');
let app = express();
app.use(express.json());

const users = [
  {
    id: 1,
    name: 'bahubali',
    year: 2020,
    hero: 'prabhas',
  },
  {
    id: 2,
    name: 'pushpa',
    year: 2022,
    hero: 'Allu arjun',
  },
  {
    id: 3,
    name: 'Hello',
    year: 2021,
    hero: 'Akhil',
  },
  {
    id: 4,
    name: 'dussera',
    year: 2022,
    hero: 'Nani',
  },
];

app.get('/seed', async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await track.bulkCreate(users);
    res.status(200).json({ message: 'Data entered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding data' });
  }
});

//fetch all data
async function fetchAll() {
  let tracks = await track.findAll();
  return { tracks };
}
app.get('/data', async (req, res) => {
  try {
    let response = await fetchAll();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//find by id

async function findById(id) {
  let tracks = await track.findOne({ where: { id } });
  return { tracks };
}

app.get('/data/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let response = await findById(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//fetch by artist
async function fetchByArtist(hero) {
  let tracks = await track.findAll({ where: { hero } });
  return { tracks };
}

app.get('/data/:hero', async (req, res) => {
  try {
    let hero = req.params.hero;
    let response = await fetchByArtist(hero);
    // if (response.tracks.length === 0) {
    //   return res.status(404).json({ message: 'no tracks found' });
    // }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//sort by order
async function sortByOrder(order) {
  let tracks = await track.findAll({ order: [['year', order]] });
  return { tracks };
}
app.get('/data/sort/year', async (req, res) => {
  try {
    let order = req.query.order;
    let sorted = await sortByOrder(order);
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//insert new data
async function addNewTrack(newdata) {
  let track = await track.create(newdata);
  return { track };
}

app.post('/data/new', async (req, res) => {
  try {
    let newdata = req.body.newdata;
    let response = await addNewTrack(newdata);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server started...');
});
