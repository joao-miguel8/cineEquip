import React from "react";

function Tab({ tabOption, tabName, children }: { tabOption: string; tabName: string; children: any }) {
	return tabOption === tabName && <React.Fragment>{children}</React.Fragment>;
}

export default Tab;
