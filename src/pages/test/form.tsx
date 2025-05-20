import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Field } from "formik";
import { Fields, Button } from "components";
import { useHooks } from "hooks";
import { gen4 } from "services/helpers";
import { Checkbox } from "antd";

const Form = ({ setFieldValue, values }: any) => {
  const { get, t } = useHooks();

  const removeMultiBox = (uid: any) => {
    const newArray = values.questions.filter((f: any) => f.uid !== uid);
    setFieldValue("questions", newArray);
  };

  const addMultiBox = () => {
    setFieldValue("questions", [
      ...values.questions,
      {
        uid: gen4(),
        title: "",
        photoUrl: "",
        answers: [{ answer: "", isCorrect: false, uid: gen4() }],
      },
    ]);
  };

  const removeAnsBox = (uid: any, ansId: any) => {
    values.questions.forEach((item: any, idx: number) => {
      if (uid === item.uid) {
        const newArray = get(values.questions[idx], "answers").filter(
          (f: any) => f.uid !== ansId
        );
        setFieldValue(`questions[${idx}].answers`, newArray);
      }
    });
  };

  const addAnsBox = (uid: any) => {
    values.questions.forEach((item: any, idx: number) => {
      if (uid === item.uid) {
        setFieldValue(`questions[${idx}].answers`, [
          ...values.questions[idx].answers,
          {
            uid: gen4(),
            answer: "",
            isCorrect: false,
          },
        ]);
      }
    });
  };

  return (
    <>
      <div>
        <div className="flex justify-between mb-[30px]">
          <div className="w-[49%]">
            <Field
              name="name"
              type="text"
              label={t("Test name")}
              placeholder={t("Test name")}
              component={Fields.Input}
            />
          </div>
        </div>
        <div className="mb-[24px]">
          <p className="mb-[10px] font-bold text-[18px]">{t("Questions")}</p>
          {get(values, "questions", []).map((item: any, index: number) => (
            <div
              key={item.uid}
              className="flex justify-between flex-col w-full border-2 border-dashed rounded-[10px] p-2 mb-[10px]"
            >
              <div className="w-full flex justify-between">
                <div className="w-[48%] flex flex-col">
                  <div className="w-full">
                    <Field
                      rootClassName="w-full mr-[10px] mb-[15px]"
                      component={Fields.Input}
                      name={`questions[${index}].title`}
                      type="text"
                      placeholder={t("Question")}
                      label={t("Question")}
                      size="large"
                      onChange={(e: any) =>
                        setFieldValue(`questions[${index}].title`, e.target.value)
                      }
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-[#9EA3B5] px-[12px] py-[6px] bg-[#fbe6fe] rounded-[6px] inline-block mb-[12px] mr-[10px]">
                      {t("Question as photo format")}
                    </p>
                    <Field
                      rootClassName="mb-[10px]"
                      component={Fields.FileUpload3}
                      name={`questions[${index}].photoUrl`}
                      type="file"
                      accept="image/*"
                      value={undefined} // Reset default value handling
                      onChange={(event: any) => {
                        const files = event.target.files;
                        if (files && files.length > 0) {
                          setFieldValue(`questions[${index}].photoUrl`, files[0]); // Store file object
                        }
                      }}
                    />
                    {item.photoUrl && typeof item.photoUrl === "string" && (
                      <div className="mt-2">
                        <img
                          src={item.photoUrl}
                          alt="Preview"
                          className="max-w-[200px] rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-[48%]">
                  {get(item, "answers", []).map((ans: any, idx: number) => (
                    <div key={ans.uid} className="flex mb-[30px]">
                      <div className="w-full">
                        <Field
                          rootClassName="w-full mr-[10px] mb-[15px]"
                          component={Fields.Input}
                          name={`questions[${index}].answers[${idx}].answer`}
                          type="text"
                          placeholder={t("Answer")}
                          label={t("Answer")}
                          size="large"
                          onChange={(e: any) =>
                            setFieldValue(
                              `questions[${index}].answers[${idx}].answer`,
                              e.target.value
                            )
                          }
                        />
                        <Checkbox
                          className="mt-[20px]"
                          checked={values.questions[index].answers[idx].isCorrect}
                          onChange={(e: any) => {
                            const updatedAnswers = values.questions[index].answers.map(
                              (ans: any, ansIdx: number) => ({
                                ...ans,
                                isCorrect: ansIdx === idx ? e.target.checked : false,
                              })
                            );
                            setFieldValue(`questions[${index}].answers`, updatedAnswers);
                          }}
                        >
                          {t("True answer")}
                        </Checkbox>
                      </div>
                      <div className="h-full contents">
                        <div className="ml-[8px] flex flex-col justify-center">
                          {get(item, "answers", []).length > 1 && (
                            <button
                              type="button"
                              className="w-[30px] h-[100%] border-2 rounded-[5px] mb-[6px]"
                              onClick={() => removeAnsBox(item.uid, ans.uid)}
                            >
                              <MinusCircleOutlined style={{ color: "red" }} />
                            </button>
                          )}
                          {get(item, "answers", []).length - 1 === idx && (
                            <button
                              type="button"
                              className="w-[30px] h-[100%] border-2 rounded-[5px]"
                              onClick={() => addAnsBox(item.uid)}
                            >
                              <PlusCircleOutlined style={{ color: "#40a9ff" }} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full">
                <div className="mr-[8px] mt-[12px] flex justify-center w-full">
                  {get(values, "questions", []).length > 1 && (
                    <button
                      type="button"
                      className="h-[30px] w-full border-2 rounded-[5px] mr-[6px]"
                      onClick={() => removeMultiBox(item.uid)}
                    >
                      <MinusCircleOutlined style={{ color: "red" }} />
                    </button>
                  )}
                  {get(values, "questions", []).length - 1 === index && (
                    <button
                      type="button"
                      className="h-[30px] w-full border-2 rounded-[5px]"
                      onClick={() => addMultiBox()}
                    >
                      <PlusCircleOutlined style={{ color: "#40a9ff" }} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        size="large"
        htmlType="submit"
        title={t("Save")}
        className="mt-[10px] w-full"
      />
    </>
  );
};

export default Form;