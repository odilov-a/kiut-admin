import { useHooks } from "hooks";

const More = ({ showMoreModal, moreModal }: any) => {
  const data = moreModal?.data;
  const { t, get } = useHooks();
  if (!data) {
    return <p>{t("Loading...")}</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-semibold text-lg mb-1">{get(data, "title")}</p>
      </div>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: get(data, "description") }}
      />
    </div>
  );
};

export default More;