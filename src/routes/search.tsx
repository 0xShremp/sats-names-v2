import { Field, Form, Formik } from "formik";
import React from "react";
import { fetchSatsName } from "../loaders/sats-names";
import { type SatsName } from "./list";

export type SearchDataType = {
  error?: string;
  data?: SatsName & {
    genesisHeight: number;
    nameIndex: number;
    owner: string;
    registrationOp: { op: "reg"; p: "sns"; name: string };
    timestamp: string;
    inscriptions: Omit<SatsName, "name, owner">[];
  };
};

export default function SearchPage() {
  const [loading, setLoading] = React.useState(false);
  const [actionData, setActionData] = React.useState<SearchDataType>();

  const handleSubmit = React.useCallback(async (values: any) => {
    setLoading(true);

    if (!values.search) {
      setActionData({
        error: "Please fill the form field before submitting.",
      });
      return;
    }

    const response = await fetchSatsName(values.search);

    setLoading(false);

    if (response.status === 500) {
      setActionData({
        error: "API is busy, wait abit.",
      });
      return;
    }

    const data = await response.json();

    if (data.error) {
      setActionData({
        error: data.error,
      });
    } else {
      setActionData({
        data,
      });
    }
  }, []);

  return (
    <div className="flex-grow w-full h-full p-6 space-y-6 bg-white rounded-xl">
      <Formik initialValues={{ search: "" }} onSubmit={handleSubmit}>
        <Form method="post" className="flex flex-col space-y-2">
          <label
            className="ml-2 text-xs font-bold text-gray-500 uppercase"
            htmlFor="search"
          >
            Search for a sats name
          </label>
          <div className="flex w-full">
            <Field
              id="search"
              name="search"
              type="text"
              className="w-full rounded-l-lg"
              placeholder="e.g. names.sats"
            />
            <button
              className="px-4 text-white bg-indigo-500 rounded-r-lg md:px-6"
              type="submit"
              // onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
      {loading && (
        <div className="w-full py-6 text-center animate-pulse">Loading ...</div>
      )}
      {!loading && actionData && actionData.error && (
        <p className="mt-2 ml-1 text-sm text-red-500">{actionData.error}</p>
      )}
      {!loading && actionData && actionData.data && (
        <div className="space-y-2 break-words rounded-lg sm:space-y-1 md:border md:p-6">
          <div className="mb-2 text-lg font-bold">{actionData.data.name}</div>
          <div className="flex flex-col w-full sm:flex-row">
            <div className="pt-1 text-xs font-bold text-gray-500 uppercase sm:sm:w-1/3">
              Inscription Index
            </div>
            <div className="sm:sm:w-2/3">
              {actionData.data.inscriptionIndex}
            </div>
          </div>
          <div className="flex flex-col w-full sm:flex-row">
            <div className="pt-1 text-xs font-bold text-gray-500 uppercase sm:w-1/3">
              Inscription Id
            </div>
            <div className="sm:w-2/3">{actionData.data.inscriptionId}</div>
          </div>
          <div className="flex flex-col w-full sm:flex-row">
            <div className="pt-1 text-xs font-bold text-gray-500 uppercase sm:w-1/3">
              Owner
            </div>
            <div className="sm:w-2/3">{actionData.data.owner}</div>
          </div>
          <div className="flex flex-col w-full sm:flex-row">
            <div className="pt-1 text-xs font-bold text-gray-500 uppercase sm:w-1/3">
              Genesis Height
            </div>
            <div className="sm:w-2/3">{actionData.data.genesisHeight}</div>
          </div>
          <div className="flex flex-col w-full sm:flex-row">
            <div className="pt-1 text-xs font-bold text-gray-500 uppercase sm:w-1/3">
              Registration Operation
            </div>
            <div className="sm:w-2/3">
              {JSON.stringify(actionData.data.registrationOp, null, 2)}
            </div>
          </div>
          <div className="flex flex-col w-full sm:flex-row">
            <div className="pt-1 text-xs font-bold text-gray-500 uppercase sm:w-1/3">
              Name Index
            </div>
            <div className="sm:w-2/3">{actionData.data.nameIndex}</div>
          </div>
          <div className="flex flex-col w-full sm:flex-row">
            <div className="pt-1 text-xs font-bold text-gray-500 uppercase sm:w-1/3">
              Timestamp
            </div>
            <div className="sm:w-2/3">{actionData.data.timestamp}</div>
          </div>
          <hr className="!my-4" />
          <div className="flex flex-row flex-wrap w-full">
            <div className="w-full pt-1 mb-2 text-xs font-bold text-gray-500 uppercase">
              Inscriptions
            </div>
            {actionData.data.inscriptions &&
              actionData.data.inscriptions.map(
                (i: Omit<SatsName, "name, owner">) => (
                  <div className="w-full" key={i.inscriptionId}>
                    <div className="flex flex-col w-full sm:flex-row">
                      <div className="pt-1 text-xs font-bold text-gray-500 uppercase sm:w-1/3">
                        Inscription Index
                      </div>
                      <div className="sm:w-2/3">{i.inscriptionIndex}</div>
                    </div>
                    <div className="flex flex-col w-full sm:flex-row">
                      <div className="pt-1 text-xs font-bold text-gray-500 uppercase sm:w-1/3">
                        Inscription Id
                      </div>
                      <div className="sm:w-2/3">{i.inscriptionId}</div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      )}
    </div>
  );
}
