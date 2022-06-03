import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
function Recipe() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("Instructions");
  let params = useParams();

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );

    let detailData = await data.json();

    console.log(detailData);
    setDetails(detailData);
  };

  useEffect(() => {
    console.log(params.id);
    fetchDetails();
  }, [params.id]);
  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <div>
          <Button
            className={activeTab === "Instructions" ? "active" : ""}
            onClick={() => {
              setActiveTab("Instructions");
            }}
          >
            Instructions
          </Button>
        </div>
        <div>
          <Button
            className={activeTab === "Ingredients" ? "active" : ""}
            onClick={() => {
              setActiveTab("Ingredients");
            }}
          >
            Ingredients
          </Button>
        </div>

        {activeTab === "Instructions" && (
          <div>
            <h2>Summary</h2>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h2>Instructions</h2>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}

        {activeTab === "Ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => {
              return <li key={ingredient.id}>{ingredient.original}</li>;
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}
const DetailWrapper = styled.div`
  margin: 10rem 0rem 5rem 0rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  h3 {
    font-size: 1rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px soild black;
  margin-right: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  margin-left: 10rem;
`;
export default Recipe;
