import { useEffect, useState } from "react";

// Hook Summary:
/*
 - This custom hook, useTab, is designed to work with a custom Tab component.
 
 - It utilizes the tabs object to manage a list of tabs, each represented by a key-value pair within the tabs object.
 
 - The hook provides a state variable chosenTab, defaulted to an empty string, to manage which tab is currently selected.

 * It also includes the addTab function, allowing for the creation of a new tab and populating it into the tabs object.
 
- It also utilizes useEffect to add the first value in the tabs object as the chosenTab chosenTab is empty string

- Hows it's used with Tabs component:
// The Tabs component takes two props tabOption and tabName with this hook you can provide the Tab component with both values needed to trigger the boolean value for the Tab component logic

- Example below using with Tab component:

const TABS = useTab({ KITS_TAB: "kits", GEAR_TAB: "gear" });

- Use handleSetChosenTab within the button that will control your tab:
<button onClick={() => TABS.handleSetChosenTab("kits")}>Change Tab button</button>

If you need to show the value of the key to use in a button for example you can do it like this:
<button className="btn-primary">Create {myTabHook.chosenTab}</button>
<Tab tabOption={myTabHook.chosenTab} tabName={myTabHook.tabs.MY_TAB_KEY}>
{children}
</Tab>

*/

function useTab({ ...tabs }) {
	type TabType = {
		[key: string]: string;
	};

	const tabsList: TabType = tabs;
	const [chosenTab, setChosenTab] = useState("");

	// Set the first tab in the tabs object as the default tab on initial render
	useEffect(() => {
		if (chosenTab === "") {
			const firstTab = Object.values(tabsList)[0];
			setChosenTab(firstTab);
		}
	}, [tabsList, chosenTab]);

	//  Handle setting the chosen tab by the keys value
	const handleSetChosenTab = (tabValue: TabType[string]) => {
		setChosenTab(tabValue);
	};

	return { chosenTab, handleSetChosenTab, tabs };
}

export default useTab;
