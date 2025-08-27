import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import AppRouter from "./routes";
import CustomThemeProvider from "./theme/CustomThemeProvider";
import { ConfirmDialog } from "./components/ui/ConfirmDialog";

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
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            autoHideDuration={3000}
          >
            <AppRouter />
            <ConfirmDialog />
          </SnackbarProvider>
        </CustomThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
