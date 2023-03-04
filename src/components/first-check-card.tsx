import classNames from "classnames";
import React from "react";
import IconCheck from "../icons/check";
import IconX from "../icons/x";
import { type AmIFirstActionDataType } from "../routes/am-i-first";

export interface FirstCheckCardProps {
  data: AmIFirstActionDataType["data"];
}

const FirstCheckCard = ({ data }: FirstCheckCardProps) => {
  const isFirst = React.useMemo(() => {
    return data!.expected_inscription_index === data!.inscriptionIndex;
  }, [data]);

  return (
    <div
      className={classNames([
        "rounded-xl border p-5",
        {
          "border-green-200 bg-green-100": isFirst,
          "border-red-200 bg-red-100": !isFirst,
        },
      ])}
    >
      {isFirst ? (
        <div className="flex items-center space-x-4">
          <IconCheck className="w-12 h-12 text-green-500" />
          <div className="text-green-700">
            Congrats, you were the first to inscribe this Sats Name!
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <IconX className="w-12 h-12 text-red-500" />
          <div className="red-green-700">
            Sorry, you were not the first to inscribe this Sats Name.
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstCheckCard;
