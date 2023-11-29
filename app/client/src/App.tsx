import { QueryClient, QueryClientProvider } from "react-query";
import AppRouter from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
