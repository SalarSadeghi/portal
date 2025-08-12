import AppRouter from "./routes";
import CustomThemeProvider from "./theme/CustomThemeProvider";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CustomThemeProvider>
          <AppRouter />
        </CustomThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
