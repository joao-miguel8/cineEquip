function Tab({ tabOption, tabName, children }: { tabOption: string; tabName: string; children: any }) {
	return tabOption === tabName && <>{children}</>;
}

export default Tab;
