import { useEffect } from "react";
import { getActionAx, postActionAx } from "../api";
import GeoJSONMap from "../components/Map/GeoJSONMap";
import MessageFeedback from "../components/Chat/MessageFeedback";
import FeedbackButtons from "../components/Chat/FeedbackButtons";
import { useSelector } from "react-redux";
const Test = (props) => {
  const set = useSelector((state)=> state.contradiction.messages)

  console.log(set)
  // useEffect(() => {
  //   const getFeedback = async () => {
  //     let messageId = 18;
  //     await getActionAx(`/api/chat/feedback/${messageId}`)
  //       .then((res) => {
  //         console.log("get feedBack", res.data);
  //       })
  //       .catch((err) => {
  //         // errorHandler(err);
  //       });
  //   };

  //   getFeedback();

  //   const postFeedback = async () => {
  //     let feedbackObj = {
  //       message_id: 18,
  //       rating: true,
  //       feedback_text: "very nice!!",
  //     };
  //     await postActionAx("/api/chat/feedback", feedbackObj)
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((err) => {
  //         // errorHandler(err);
  //       });
  //   };

  //   postFeedback();
  // }, []);

  const geojsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Coors Field",
          type: "Baseball Stadium",
          description: "This is where the Rockies play!",
        },
        geometry: {
          type: "Point",
          coordinates: [-104.99404, 39.75621],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Central Park",
          type: "Park",
          description: "Beautiful urban park",
        },
        geometry: {
          type: "Point",
          coordinates: [-73.9688, 40.7812],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Downtown Area",
          type: "Polygon",
          description: "City center area",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-104.995, 39.755],
              [-104.99, 39.755],
              [-104.99, 39.76],
              [-104.995, 39.76],
              [-104.995, 39.755],
            ],
          ],
        },
      },
    ],
  };

  return (
    <>
      {/* map */}
      {/* <div style={{ height: "50vh", width: "100%" }}>
        <GeoJSONMap geojsonData={geojsonData} />
      </div> */}
    
    </>
  );
};
export default Test;
