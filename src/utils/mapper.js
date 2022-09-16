const imageMapper = array => {
  return array.map(({ webformatURL, tags, id, largeImageURL }) => ({
    webformatURL,
    tags,
    id,
    largeImageURL,
  }));
};

export default imageMapper;
