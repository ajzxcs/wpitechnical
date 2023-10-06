import React from "react";

import PageLayout from "examples/LayoutContainers/PageLayout";
import Private from "./ForumAdmin"

function AdminForum() {
  return (
    <div>
      <PageLayout>
        <Private/>
      </PageLayout>
    </div>
  );
}

export default AdminForum;
