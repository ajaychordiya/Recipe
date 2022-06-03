import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();
  useEffect(() => {
    console.log(params.type);

    getCuisine(params.type);
  }, [params.type]);

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );

    const recipes = await data.json();
    setCuisine(recipes.results);
  };
  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exist={{ opacity: 0 }}
    >
      {cuisine.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={`/recipe/${item.id}`}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    border-radius: 2rem;
    width: 100%;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
