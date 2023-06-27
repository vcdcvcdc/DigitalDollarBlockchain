import React, { useState } from "react";

import Tab1 from "../tab1";
import Tab2 from "../tab2";
import Tab3 from "../tab3";
import Tab4 from "../tab4";
import Tab5 from "../tab5";
import Tab6 from "../tab6";

const DescriptionSection = (props) => {
  const { activeTab, setActiveTab } = props;

  return (
    <>
      {/* TRANSFORMING FINANCE  */}
      {activeTab === "tab1" && <Tab1 />}
      {/* MISSION/COMMITMENT  */}
      {activeTab === "tab2" && <Tab2 />}
      {/* INNOVATIVE FEATURES  */}
      {activeTab === "tab3" && <Tab3 />}
      {/* OUR TOKENS  */}
      {activeTab === "tab4" && <Tab4 />}

      {/* Testing DDBC  */}
      {activeTab === "tab5" && <Tab5 />}
      {/* Contracts */}
      {activeTab === "tab6" && <Tab6 />}
    </>
  );
};

export default DescriptionSection;
