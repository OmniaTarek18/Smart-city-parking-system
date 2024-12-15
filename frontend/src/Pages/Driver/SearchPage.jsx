import { useNavigate } from "react-router-dom";
import Header from "../../Components/Driver/Header";

function SearchPage() {
  const navigate = useNavigate();

  return(
    <div>
        <Header />
    </div>
  );
}
export default SearchPage;
