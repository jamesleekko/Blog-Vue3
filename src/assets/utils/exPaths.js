const stableHeaderPaths = ["/category"];

const inStableHeaderPaths = (path) => {
  console.log('stable result: ', stableHeaderPaths.includes(path))
  return stableHeaderPaths.includes(path);
};

export { inStableHeaderPaths };
