import React from "react";

function MainFooter() {
  return (
    <div className="py-3 text-xs bg-secondary z-50">
      {"Designed by "}
      <a href="https://github.com/hainx1610">Harris Nguyen</a>
      {` ${new Date().getFullYear()}.`}
    </div>
  );
}

export default MainFooter;
