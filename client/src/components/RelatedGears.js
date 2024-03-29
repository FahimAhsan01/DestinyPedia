import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";

const RelatedGears = ({ relatedGears, gearId }) => {
  return (
    <>
      {relatedGears && relatedGears.length > 0 && (
        <>
          {relatedGears.length > 1 && <h4>Related Gears</h4>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedGears
              .filter((item) => item._id !== gearId)
              .splice(0, 3)
              .map((item) => (
                <MDBCol>
                  <MDBCard>
                    <Link to={`/gear/${item._id}`}>
                      <MDBCardImage
                        src={item.imageFile}
                        alt={item.title}
                        position="top"
                      />
                    </Link>
                    <span className="text-start tag-card">
                      {item.tags.map((tag) => (
                        <Link to={`/gears/tag${tag}`}> #{tag}</Link>
                      ))}
                    </span>
                    <MDBCardBody>
                      <MDBCardTitle className="text-start">
                        {item.title}
                      </MDBCardTitle>
                      <MDBCardText className="text-start">
                        {excerpt(item.description, 45)}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </>
  );
};

export default RelatedGears;
