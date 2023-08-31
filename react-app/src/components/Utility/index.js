export function groupBy(arr, groups) {
    let grouped = {};
    // a is the object getting grouped from the array (arr)
    arr?.forEach((a) => {
      // o is the object used to hold objects in each group each loop,
      // g is group category by,
      // i is the index
      groups
        .reduce((o, g, i) => {
          // take existing object,
          o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {}); // or generate new obj, or
          return o[a[g]]; // at last, then an array
        }, grouped)
        .push(a);
    });
    return grouped;
  }
//groupBy(arr, ['age', 'location'])

