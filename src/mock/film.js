const COMMENTS_COUNT = 15;
const MAX_DAYS_GAP = 7;

const FILM_NAMES = [
  `Побег из Шоушенка`,
  `Криминальное чтиво`,
  `Бойцовский клуб`,
  `Форрест Гамп`,
  `Жизнь прекрасна`,
  `Спасти рядового Райана`
];
const POSTERS = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-man-with-the-golden-arm.jpg`
];
const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`
];
const COMMENTS_TEXT = [
  `Никакого кемпинга,я тебя понял.`,
  `Илюха,  говори даты, хотя-бы в начале видоса.. так интереснее будет`,
  `Топ! Уровень фильма — картинка, атмосфера оч круто!`,
  `Илья уже не тот, Илья стал лучше.`,
  `Атмосфера как в старые добрые...`
];
const COMMENT_USERS = [`Vlad`, `Andrew`, `Yurii`, `Oleg`, `Olga`];

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateNames = () => {
  const randomIndex = getRandomInteger(0, FILM_NAMES.length - 1);
  return FILM_NAMES[randomIndex];
};

const generatePoster = () => {
  const randomIndex = getRandomInteger(0, POSTERS.length - 1);
  return POSTERS[randomIndex];
};

const generateDescriptions = () => {
  const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);
  let description = ``;
  for (let i = 0; i <= randomIndex; i++) {
    description += DESCRIPTIONS[i];
  }

  return description;
};


const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateComment = (filmId) => {
  const date = generateDate();

  const randomIndex = getRandomInteger(0, COMMENTS_TEXT.length - 1);

  const comment = {
    id: generateId(),
    filmId,
    name: COMMENT_USERS[randomIndex],
    date,
    text: COMMENTS_TEXT[randomIndex],
    emoji: `puke`,
  };

  return comment;
};

const generateGenres = () => {

  const genres = [`Sci-Fi`, `Animation`, `Fantasy`, `Comedy`, `TV Series`, `Horror`, `Adventures`, `Drama`, `Musical`, `Western`];
  const randomIndexOne = getRandomInteger(2, genres.length - 1);
  const randomIndexTwo = getRandomInteger(1, randomIndexOne);
  const filmGenres = genres.slice(randomIndexTwo, randomIndexOne);

  return filmGenres;
};


export const generateComments = (id) => {
  const randomIndex = getRandomInteger(1, COMMENTS_COUNT - 1);
  const comments = [];
  for (let i = 0; i < randomIndex; i++) {
    comments.push(generateComment(id));
  }
  return comments;
};

export const generateFilms = () => {
  const name = generateNames();
  const poster = generatePoster();
  const description = generateDescriptions();

  return {
    "id": generateId(),
    "comments": [],
    "film_info": {
      "title": name,
      "alternative_title": name,
      "total_rating": getRandomInteger(0, 10),
      "poster": poster,
      "age_rating": 0,
      "director": `Tom Ford`,
      "writers": [
        `Takeshi Kitano`
      ],
      "actors": [
        `Morgan Freeman`
      ],
      "release": {
        "date": getRandomInteger(1960, 2020),
        "release_country": `Finland`
      },
      "runtime": getRandomInteger(50, 187),
      "genre": generateGenres(),
      "description": description
    },
    "user_details": {
      "watchlist": getRandomInteger(0, 1),
      "already_watched": getRandomInteger(0, 1),
      "watching_date": `2019-04-12T16:12:32.554Z`,
      "favorite": getRandomInteger(0, 1)
    }
  };
};
