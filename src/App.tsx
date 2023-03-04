import React from 'react';
import Layout from './components/layout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListRoute from './routes/list';
import SearchPage from './routes/search';
import AmIFirstPage from './routes/am-i-first';
import NoMatchPage from './routes/no-match';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListRoute />} />
          <Route path="list" element={<ListRoute />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="am-i-first" element={<AmIFirstPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
