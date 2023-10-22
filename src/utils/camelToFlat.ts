const camelToFlat = (c: string) => (
  (c = c.replace(/[A-Z]/g, " $&")), c[0].toUpperCase() + c.slice(1)
);

export default camelToFlat;
