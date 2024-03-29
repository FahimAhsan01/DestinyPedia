import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { getRelatedGears, getGear } from "../redux/features/gearSlice";
import RelatedGears from "../components/RelatedGears";
import DisqusThread from "../components/DisqusThread";

const SingleGear = () => {
  const dispatch = useDispatch();
  const { gear, relatedGears } = useSelector((state) => ({ ...state.gear }));
  const { id } = useParams();
  const navigate = useNavigate();
  const tags = gear?.tags;

  useEffect(() => {
    tags && dispatch(getRelatedGears(tags));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  useEffect(() => {
    if (id) {
      dispatch(getGear(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={gear.imageFile}
            alt={gear.title}
          />
          <MDBCardBody>
            <MDBBtn
              tag="a"
              color="none"
              style={{ float: "left", color: "#000" }}
              onClick={() => navigate("/")}
            >
              <MDBIcon
                fas
                size="lg"
                icon="long-arrow-alt-left"
                style={{ float: "left" }}
              />
            </MDBBtn>
            <h3>{gear.title}</h3>
            <span>
              <p className="text-start gearName">Created By: {gear.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {gear && gear.tags && gear.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(gear.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {gear.description}
            </MDBCardText>
          </MDBCardBody>
          <RelatedGears relatedGears={relatedGears} gearId={id} />
        </MDBCard>
        <DisqusThread id={id} title={gear.title} path={`/gear/${id}`} />
      </MDBContainer>
    </>
  );
};

export default SingleGear;
