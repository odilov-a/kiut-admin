import { useState } from "react";
import { Modal, notification, Table } from "antd";
import { Button, DotBtn } from "components";
import { useHooks, usePost } from "hooks";
import Container from "modules/container";
import { CreateDoc } from "assets/images/icons";
import More from "./more";

const Secondment = () => {
  const { mutate } = usePost();
  const { t, get, queryClient, navigate } = useHooks();
  const [moreModal, showMoreModal] = useState({ open: false, data: {} });

  const onDeleteHandler = (row: any) => {
    const id = get(row, "_id");
    Modal.confirm({
      title: t("Do you confirm the deletion") + "?",
      cancelText: t("NO"),
      okType: "danger",
      okText: t("YES"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: any) => {
    if (id) {
      mutate(
        { method: "delete", url: `/secondments/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`secondments`],
            });
            notification["success"]({
              message: t("Deleted successfully!"),
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: t(
                get(error, "response.data.error", "Error occurred")
              ),
              duration: get(error, "response.data.message") ? 4 : 2,
            });
          },
        }
      );
    }
  };

  return (
    <>
      <div className="content-panel">
        <div>
          <Container.All url="/secondments" name="secondments">
            {({ meta, items }) => {
              return (
                <div>
                  <div className="page-heading">
                    <div className="page-heading__right">
                      <Button
                        icon={<CreateDoc />}
                        title={t("Create new secondment")}
                        onClick={() => navigate("/secondments/create")}
                      />
                    </div>
                  </div>
                  <div>
                    <Modal
                      open={moreModal.open}
                      onCancel={() => showMoreModal({ open: false, data: {} })}
                      footer={null}
                      centered
                      title={t("More information")}
                      width={1000}
                      destroyOnClose
                    >
                      <More {...{ showMoreModal, moreModal }} />
                    </Modal>
                  </div>
                  <Table
                    dataSource={items}
                    pagination={{ pageSize: 12 }}
                    className="cursor-pointer"
                    onRow={(record) => ({
                      onClick: () => showMoreModal({ open: true, data: record }),
                    })}
                    columns={[
                      {
                        key: "title",
                        title: t("Title"),
                        dataIndex: "title",
                        className: "w-[80px]",
                        render: (value) => (
                          <div className="flex items-center">{value}</div>
                        ),
                      },
                      {
                        key: "description",
                        title: t("Description"),
                        dataIndex: "description",
                        className: "w-[180px]",
                        render: (value) => (
                          <span
                            className="dark:text-[#e5e7eb] line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: value }}
                          />
                        ),
                      },
                      {
                        title: t("Actions"),
                        align: "center",
                        className: "w-[1px]",
                        render: (value, row) => (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <DotBtn
                              row={row}
                              editFunction={() =>
                                navigate(`/secondments/update/${get(row, "_id")}`)
                              }
                              deleteFunction={() => onDeleteHandler(row)}
                            />
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              );
            }}
          </Container.All>
        </div>
      </div>
    </>
  );
};

export default Secondment;