export const removeDuplicates = (array) => {
  const uniqueArray = array.filter((obj, index, self) => index === self.findIndex((t) => (
    t.id === obj.id
  )));

  return uniqueArray;
};
