import { useHooks } from "hooks";

const More = ({ showMoreModal, moreModal }: any) => {
  const data = moreModal?.data;
  const { t, get } = useHooks();
  if (!data) {
    return <p>{t("Loading...")}</p>;
  }
  return (
    <div className="flex-1">
      <strong>{get(data, "title")}</strong>
      <p>{get(data, "description")}</p><br/>
      <div>
        {get(data, "photoUrl", []).map((url: string, index: number) => (
          <a key={index} href={url} target="_blank" rel="noopener noreferrer">
            {url}<br/>
          </a>
        ))}
      </div>
    </div>
  );
};

export default More;