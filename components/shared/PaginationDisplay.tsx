import Router from "next/router";
import { FC } from "react";
import { Pagination } from "react-bootstrap";
interface IPaginationProps {
  metadata: Record<string, any>;
}
const PaginationDisplay: FC<IPaginationProps> = ({ metadata }) => {
  return (
    <>
      <Pagination style={{ float: "right", marginTop: "20px" }}>
        <Pagination.First
          disabled={!metadata?.links?.first}
          onClick={() => {
            Router.push(`/products${metadata?.links?.first}`);
          }}
        />
        <Pagination.Prev
          disabled={!metadata?.links?.prev}
          onClick={() => {
            Router.push(`/products${metadata?.links?.prev}`);
          }}
        />
        <Pagination.Next
          disabled={!metadata?.links?.next}
          onClick={() => {
            Router.push(`/products${metadata?.links?.next}`);
          }}
        />
        <Pagination.Last
          disabled={!metadata?.links?.last}
          onClick={() => {
            Router.push(`/products${metadata?.links?.last}`);
          }}
        />
      </Pagination>
      <div className="row h-100">
        <div className="col-sm-12 my-auto">
          <div
            style={{
              float: "right",
              color: "#2b7fe0",
              fontSize: "13px",
            }}
          >
            Sowing {metadata?.limit} product of {metadata?.total}{" "}
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default PaginationDisplay;
