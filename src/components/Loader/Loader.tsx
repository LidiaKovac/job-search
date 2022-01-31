// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from "react-loader-spinner";
export const Loader = () => {
  return (
    <>
      <Oval
        ariaLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={5}
        color="#5299D3"
        secondaryColor="#212738"
      />
    </>
  );
};
