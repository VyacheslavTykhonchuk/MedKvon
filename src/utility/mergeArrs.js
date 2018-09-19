export const mergeArrays = (oldArr, newArr) => {
  var mergedArr = [];
  for (var i in oldArr) {
    var shared = false;
    for (var j in newArr)
      if (newArr[j].id === oldArr[i].id) {
        shared = true;
        break;
      }
    if (!shared) mergedArr.push(oldArr[i]);
  }
  mergedArr = mergedArr.concat(newArr);
  return mergedArr;
};
