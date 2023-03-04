import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import AboutPage from "./routes/about";
import AmIFirstPage from "./routes/am-i-first";
import ListPage from "./routes/list";
import NoMatchPage from "./routes/no-match";
import SearchPage from "./routes/search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/list" />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="list" element={<ListPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="am-i-first" element={<AmIFirstPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
