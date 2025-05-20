import { useHooks } from "hooks";

const More = ({ showMoreModal, moreModal }: any) => {
  const data = moreModal?.data;
  const { t, get } = useHooks();
  if (!data) {
    return <p>{t("Loading...")}</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {Array.isArray(get(data, "photoUrl")) &&
          get(data, "photoUrl").map((url: string, idx: number) => (
            <img
              key={idx}
              src={url}
              alt={get(data, "fullName")}
              className="w-24 h-24 object-cover rounded"
            />
          ))}
        <div>
          <p className="font-semibold text-lg mb-1">{get(data, "fullName")}</p>
          <p className="text-gray-500 mb-1">{get(data, "position")}</p>
          <p className="text-gray-400">{get(data, "role")}</p>
        </div>
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: get(data, "description") }}
      />
    </div>
  );
};

export default More;