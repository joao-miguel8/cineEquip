import { useState } from "react";

// Hook Summary:
/*
      -----  This hook is implemented with custom Tab component ------

 - This hook utilizes the tabs object to manage your list of tabs which are of
 { [key: string]: string } within the tabs object.

 - Also it provides a state variable chosenTab defaulted to string to manage which tab is selected, addTab allows for creation of a tab and populating it into the tabs object.

- Hows it's used with Tabs component:
The Tabs component takes two props tabOption and tabName with this hook you can provide the Tab component with both values needed to trigger the boolean value for the Tab component logic

- Example below using with Tab component:
const myTabHook = useTab()
myTabHook.addTab("MY_TAB_KEY", "tab name");

- Use setChosenTab within the button that will control your tab:
<button onClick={() => myTabHook.setChosenTab(MY_TAB_KEY)}>Change Tab button</button>

If you need to show the value of the key to use in a button for example you can do it like this:
<button className="btn-primary">Create {TABS.tabs[TABS.chosenTab]} </button>
<Tab tabOption={myTabHook.chosenTab} tabName={myTabHook.tabs.[tabKey]}>
{children}
</Tab>

- Example of addTab function usage:
tabsFunctionality.addTab("TAB_ONE", "one");
tabsFunctionality.addTab("TEST_TAB", "test");

*/

function useTab() {
	const tabs: { [key: string]: string } = {};
	const [chosenTab, setChosenTab] = useState<string>("");

	const addTab = (key: string, value: string) => {
		tabs[key] = value;
	};

	const handleSetChosenTab = (tabKey: string) => {
		setChosenTab(tabKey);
	};

	return { chosenTab, setChosenTab, tabs, addTab, handleSetChosenTab };
}

export default useTab;
