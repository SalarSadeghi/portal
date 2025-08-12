// import { InfinitySpin } from "react-loader-spinner";

function FallbackLazyLoad() {
  return (
    <div className="flex h-[100vh] w-full justify-center items-center gap-4">
      {/* <InfinitySpin color="#1976d2"/> */}
      <span> لطفا صبر کنید ...</span>
    </div>
  );
}

export default FallbackLazyLoad;
