import { useHooks } from "hooks";

const More = ({ showMoreModal, moreModal }: any) => {
  const data = moreModal?.data;
  const { t, get } = useHooks();
  if (!data) {
    return <p>{t("Loading...")}</p>;
  }
  return (
    <div className="flex-1">
      <p className="font-semibold text-lg mb-2">{get(data, "title")}</p>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: get(data, "description") }}
      />
    </div>
  );
};

export default More;