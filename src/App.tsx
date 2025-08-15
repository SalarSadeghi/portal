import AppRouter from "./routes";
import CustomThemeProvider from "./theme/CustomThemeProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";

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
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={3000}
          >
            <AppRouter />
          </SnackbarProvider>
        </CustomThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
