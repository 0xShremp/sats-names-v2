import { Field, Form, Formik } from "formik";
import React from "react";
import FirstCheckCard from "../components/first-check-card";
import { fetchSatsName } from "../loaders/sats-names";
import { type SatsName } from "./list";

export type AmIFirstActionDataType = {
  error?: string;
  data?: SatsName & {
    genesisHeight: number;
    nameIndex: number;
    owner: string;
    registrationOp: { op: "reg"; p: "sns"; name: string };
    timestamp: string;
    inscriptions: Omit<SatsName, "name, owner">[];
    expected_inscription_index: number;
  };
};

// export async function action({ request }: ActionArgs) {
//   let formData = await request.formData();

//   if (
//     formData.get("sats_name") === "" ||
//     formData.get("inscription_index") === ""
//   ) {
//     return json({ type: "error", data: "Fill all fields, please" }, 400);
//   }

//   const sats_name: string = formData.get("sats_name") as string;
//   const inscription_index = parseInt(
//     formData.get("inscription_index") as string,
//     10
//   );

//   const response = await fetchSatsName(sats_name as string);
//   const data = await response.json();

//   redirect(".");

//   if (data.error) {
//     return json({ type: "error", data: data.error }, 400);
//   } else {
//     return json(
//       {
//         type: "data",
//         data: { ...data, expected_inscription_index: inscription_index },
//       } as ActionReturnType,
//       200
//     );
//   }
// }

export default function AmIFirstPage() {
  const [loading, setLoading] = React.useState(false);
  const [actionData, setActionData] = React.useState<AmIFirstActionDataType>();

  const handleSubmit = React.useCallback(async (values: any) => {
    setLoading(true);

    console.log("values", values);

    if (!values.sats_name || !values.inscription_index) {
      setActionData({
        error: "Please fill all the form fields before submitting",
      });
      return;
    }

    const sats_name = values.sats_name;
    const inscription_index = parseInt(values.inscription_index, 10);

    const response = await fetchSatsName(sats_name as string);

    console.log(response);
    setLoading(false);

    if (response.status === 500) {
      setActionData({
        error: "API is busy, wait abit.",
      });
      return;
    }

    const data = await response.json();
    console.log(data);

    if (data.error) {
      setActionData({ error: data.error });
    } else {
      setActionData({
        data: { ...data, expected_inscription_index: inscription_index },
      });
    }
  }, []);

  return (
    <div className="flex-grow w-full h-full p-6 space-y-6 bg-white rounded-xl">
      <Formik
        initialValues={{ sats_name: "", inscription_index: "" }}
        onSubmit={handleSubmit}
      >
        <Form
          method="post"
          className="flex flex-col space-y-6 sm:flex-row sm:space-x-2 sm:space-y-0"
        >
          <label htmlFor="sats_name" className="w-full">
            <span className="block mb-2 ml-2 text-xs font-bold text-gray-500 uppercase">
              Sats Name
            </span>
            <Field
              id="sats_name"
              name="sats_name"
              type="text"
              className="w-full rounded-lg"
              placeholder="e.g. names.sats"
            />
          </label>
          <label htmlFor="inscription_index" className="w-full">
            <span className="block mb-2 ml-2 text-xs font-bold text-gray-500 uppercase">
              Inscription Index
            </span>
            <Field
              id="inscription_index"
              name="inscription_index"
              type="text"
              className="w-full rounded-lg"
              placeholder="e.g. 162787"
            />
          </label>
          <div className="w-full sm:pt-6">
            <button
              className="h-[42px] w-full min-w-[128px] rounded-lg bg-indigo-500 px-4 text-white md:px-6"
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      </Formik>
      {!loading && actionData && (
        <p className="mt-2 ml-1 text-sm text-red-500">{actionData.error}</p>
      )}
      {loading && (
        <div className="w-full py-6 text-center animate-pulse">Loading ...</div>
      )}
      {!loading && actionData && actionData.data && (
        <FirstCheckCard data={actionData.data} />
      )}
    </div>
  );
}
