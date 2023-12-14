function Tab({ tabOption, tabName, children }: { tabOption: string | undefined; tabName: string; children: any }) {
	return tabOption === tabName && <>{children}</>;
}

export default Tab;
