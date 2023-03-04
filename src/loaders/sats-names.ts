const fetchSatsNames = async (cursor?: string) => {
  let res = (await !cursor)
    ? fetch(`https://api.sats.id/names`)
    : fetch(`https://api.sats.id/names?cursor=${cursor}`);
  return res;
};

const fetchSatsNamesPromise = (cursor?: number) => {
  let res = !cursor
    ? fetch(`https://api.sats.id/names`)
    : fetch(`https://api.sats.id/names?cursor=${cursor}`);
  return res;
};

const fetchSatsName = async (name?: string) => {
  let res = await fetch(`https://api.sats.id/names/${name}`);
  return res;
};

export { fetchSatsNames, fetchSatsNamesPromise, fetchSatsName };
