import React from "react";

function MainFooter() {
  return (
    <div>
      {"Designed by "}
      <a href="https://github.com/hainx1610">Harris Nguyen</a>
      {` ${new Date().getFullYear()}.`}
    </div>
  );
}

export default MainFooter;
