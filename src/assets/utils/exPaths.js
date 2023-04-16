const stableHeaderPaths = ["/category"];

const inStableHeaderPaths = (path) => {
  return stableHeaderPaths.includes(path);
};

export { inStableHeaderPaths };
