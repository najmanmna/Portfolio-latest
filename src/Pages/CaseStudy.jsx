// src/pages/CaseStudy.jsx
import { useParams } from "react-router-dom";
import PHHCaseStudy from "../content/phhwa"; // import your custom file
import Navbar from "../components/Navbar";

const components = {
  phhwa: PHHCaseStudy,
  // future ones: anotherProject: AnotherProjectCaseStudy
};

const CaseStudy = () => {
  const { id } = useParams();
  const Component = components[id];

  return (
    <div>
      <Navbar variant="minimal" />
      Component ? <Component /> : <p className="text-white"></p>
    </div>
  );
};

export default CaseStudy;
