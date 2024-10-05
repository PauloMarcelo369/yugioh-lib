import { useParams } from "react-router-dom";

export const HomePage = () => {
  const { id } = useParams();
  return <h1>YU-GI-OH! {id}</h1>;
};
