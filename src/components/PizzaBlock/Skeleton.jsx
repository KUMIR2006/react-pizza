import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    className="content__skeleton"
    speed={2}
    width={280}
    height={531}
    viewBox="0 0 280 531"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="137" cy="129" r="127" /> 
    <rect x="0" y="271" rx="10" ry="10" width="280" height="30" /> 
    <rect x="0" y="321" rx="10" ry="10" width="280" height="78" /> 
    <rect x="0" y="429" rx="10" ry="10" width="90" height="30" /> 
    <rect x="128" y="421" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
)
export default Skeleton