import AppRouter from "./routes";
import CustomThemeProvider from "./theme/CustomThemeProvider";

function App() {
  return (
    <>
      <CustomThemeProvider>
        <AppRouter />
      </CustomThemeProvider>
    </>
  );
}

export default App;
