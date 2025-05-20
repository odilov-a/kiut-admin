import { notification, Spin } from "antd";
import { Container } from "modules";
import { useGet, useHooks } from "hooks";
import { gen4 } from "services/helpers";
import Form from "./form";

const TestCreate = (): JSX.Element => {
  const { get, t, params, queryClient, navigate } = useHooks();
  const id = get(params, "id");

  const { data: testData } = useGet({
    name: `test-${id}`,
    url: `/tests/test/${id}`,
    onSuccess: () => {},
    onError: () => {},
  });

  const data = get(testData, "data");

  return (
    <div>
      <Container.Form
        name="tests"
        url={id ? `/tests/${id}` : "/tests"}
        method={id ? "put" : "post"}
        fields={[
          {
            name: "name",
            type: "string",
            value: get(data, "name", ""),
          },
          {
            name: "questions",
            type: "array",
            value: get(data, "questions", []).length > 0
              ? get(data, "questions", []).map((curr: any) => ({
                  uid: gen4(), // Temporary client-side ID
                  _id: curr._id, // Preserve backend ID
                  title: curr.title || "",
                  photoUrl: curr.photoUrl || "",
                  answers: get(curr, "answers", []).map((item: any) => ({
                    uid: gen4(), // Temporary client-side ID
                    _id: item._id, // Preserve backend ID
                    answer: item.answer || "",
                    isCorrect: item.isCorrect || false,
                  })),
                }))
              : [
                  {
                    uid: gen4(),
                    title: "",
                    photoUrl: "",
                    answers: [
                      {
                        uid: gen4(),
                        answer: "",
                        isCorrect: false,
                      },
                    ],
                  },
                ],
            onSubmitValue: (value) =>
              value.map((item: any) => ({
                _id: item._id || undefined, // Include _id if it exists
                title: item.title,
                photoUrl: item.photoUrl,
                answers: get(item, "answers", []).map((ans: any) => ({
                  _id: ans._id || undefined, // Include _id if it exists
                  answer: ans.answer,
                  isCorrect: ans.isCorrect,
                })),
              })),
          },
        ]}
        onSuccess={(data) => {
          navigate("/test");
          queryClient.invalidateQueries({ queryKey: [`test-${id}`] });
          notification["success"]({
            message: id ? t("Successfully changed!") : t("Successfully added!"),
            duration: 2,
          });
        }}
        onError={(error) => {
          notification["error"]({
            message: t(get(error, "response.data.error", "An error occurred!")),
            duration: get(error, "response.data.message") ? 4 : 2,
          });
        }}
      >
        {({ isLoading, setFieldValue, values }) => {
          return (
            <Spin spinning={isLoading} tip={t("Verifying")}>
              <Form {...{ setFieldValue, values }} />
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default TestCreate;