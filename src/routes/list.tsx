import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { useCopyToClipboard } from "usehooks-ts";
import { fetchSatsNamesPromise } from "../loaders/sats-names";

export type SatsNames = {
  names: SatsName[];
};

export type SatsName = {
  name: string;
  inscriptionId: string;
  inscriptionIndex: number;
  owner: string;
};

export default function ListPage() {
  const [inited, setInited] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<SatsName[]>([]);
  const [earliestInscription, setEarliestInscription] =
    React.useState<number>();

  const [value, copy] = useCopyToClipboard();

  const loadMoreRows = React.useCallback(async () => {
    if (!loading) {
      console.log("loading rows starting at", earliestInscription);

      setLoading(true);

      const response = await fetchSatsNamesPromise(earliestInscription);
      const d: SatsNames = await response.json();

      //console.log("loaded data", d);
      if (d.names) {
        setData([...data, ...d.names]);
        setEarliestInscription(d.names[d.names.length - 1].inscriptionIndex);
      }
      setLoading(false);
    }
  }, [loading, data, earliestInscription]);

  React.useEffect(() => {
    // console.log("load initial data");
    if (!inited) {
      loadMoreRows();
      setInited(true);
    }
  }, [inited]);

  const isItemLoaded = (index: number) => (data ? index < data.length : false);

  const Item = ({ index, style }: { index: number; style: {} }) => (
    <div
      className="flex items-center px-4 py-2 space-x-3 text-sm border-b sm:space-x-6"
      style={style}
    >
      {!isItemLoaded(index) ? (
        <div className="text-gray-500 animate-pulse">Loading ...</div>
      ) : (
        <>
          <div className="flex-grow w-1/4 font-mono font-bold text-gray-900">
            {data[index].name}
          </div>
          <div className="w-12 font-mono text-right text-gray-700 sm:w-32">
            {data[index].inscriptionIndex}
          </div>
          <div
            className="w-12 overflow-hidden font-mono text-gray-700 cursor-pointer  sm:w-32"
            title="click to copy"
            onClick={() => copy(data[index].inscriptionId)}
          >
            {data[index].inscriptionId.slice(0, 12)}...
          </div>
          <div
            className="w-12 overflow-hidden font-mono text-gray-700 cursor-pointer  sm:w-32"
            title="click to copy"
            onClick={() => copy(data[index].owner)}
          >
            {data[index].owner.slice(0, 12)}...
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      <div className="flex-grow w-full h-full bg-white rounded-xl">
        <div className="flex flex-row items-center h-12 px-4 py-2 space-x-3 border-b sm:space-x-6">
          <div className="flex-grow text-xs font-bold text-gray-500 uppercase">
            Name
          </div>
          <div className="w-12 text-xs font-bold text-right text-gray-500 uppercase sm:w-32">
            <span className="hidden sm:inline">Inscription Index</span>
            <span className="sm:hidden">#</span>
          </div>
          <div className="w-12 overflow-hidden text-xs font-bold text-gray-500 uppercase  sm:w-32">
            <span className="hidden sm:inline">Inscription Id</span>
            <span className="sm:hidden">Id</span>
          </div>
          <div className="w-12 overflow-hidden text-xs font-bold text-gray-500 uppercase  sm:w-32">
            <span className="hidden sm:inline">Owner Id</span>
            <span className="sm:hidden">Owner</span>
          </div>
        </div>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={data.length + 50}
          loadMoreItems={loading ? () => {} : loadMoreRows}
        >
          {({ onItemsRendered, ref }) => (
            <AutoSizer>
              {({ width, height }) => (
                <FixedSizeList
                  ref={ref}
                  onItemsRendered={onItemsRendered}
                  itemCount={data.length + 50}
                  itemSize={48}
                  height={height - 48}
                  width={width}
                >
                  {Item}
                </FixedSizeList>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
      {loading && (
        <div className="absolute z-50 px-4 py-2 text-indigo-400 -translate-x-1/2 rounded-full bottom-12 left-1/2 bg-indigo-50">
          Loading ...
        </div>
      )}
    </>
  );
}
