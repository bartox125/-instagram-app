const isInArray = (array, data) => {
  data = JSON.parse(data);
  for (let i = 0; i < array.length; i++) {
    if (array[i].name == data.name) {
      return false;
    }
  }
};
export { isInArray };
