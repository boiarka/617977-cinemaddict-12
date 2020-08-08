const COMMENTS_COUNT = 5;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateNames = () => {
  const names = [
    `Побег из Шоушенка`,
    `Криминальное чтиво`,
    `Бойцовский клуб`,
    `Форрест Гамп`,
    `Жизнь прекрасна`,
    `Спасти рядового Райана`
  ];
  const randomIndex = getRandomInteger(0, names.length - 1);
  return names[randomIndex];
};

const generatePoster = () => {
  const posters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ];
  const randomIndex = getRandomInteger(0, posters.length - 1);
  return posters[randomIndex];
};

const generateDescriptions = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  let description = ``;
  for (let i = 0; i <= randomIndex; i++) {
    description += descriptions[i];
  }

  return description;
};

const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateComments = () => {
  const texts = [
    `Никакого кемпинга,я тебя понял.`,
    `Илюха,  говори даты, хотя-бы в начале видоса.. так интереснее будет`,
    `Топ! Уровень фильма — картинка, атмосфера оч круто!`,
    `Илья уже не тот, Илья стал лучше.`,
    `Атмосфера как в старые добрые...`
  ];

  const names = [`Vlad`, `Andrew`, `Yurii`, `Oleg`, `Olga`];
  const date = generateDate();

  const randomIndex = getRandomInteger(0, texts.length - 1);

  const comment = {
    name: names[randomIndex],
    date,
    text: texts[randomIndex],
  };

  return comment;
};

export const generateFilms = () => {
  const name = generateNames();
  const poster = generatePoster();
  const description = generateDescriptions();

  const randomIndex = getRandomInteger(0, COMMENTS_COUNT - 1);
  const comments = new Array(randomIndex).fill().map(generateComments);

  return {
    name,
    poster,
    description,
    comments,
    isWatchlist: getRandomInteger(0, 1),
    isWatched: getRandomInteger(0, 1),
    isFavorites: getRandomInteger(0, 1),
  };
};
