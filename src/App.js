import { useState, useCallback, useEffect, useMemo } from "react";
import { debounce } from "lodash";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import ProductGrid from "./components/ProductGrid";
import PaginationBar from "./components/PaginationBar";
import EmptyState from "./components/EmptyState";
import { buildSearchURL } from "./utils/buildSearchURL";
import "./index.css";

const scrollToResults = () => {
  const el = document.getElementById("results");
  if (!el) return;

  const header = document.querySelector(".site-header");
  const headerH = header ? header.getBoundingClientRect().height : 72;
  const EXTRA_GAP = 16;

  const elTop = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: elTop - headerH - EXTRA_GAP, behavior: "smooth" });
};

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [catalogue, setCatalogue] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [basketMap, setBasketMap] = useState({});

  const totalInBasket = useMemo(
    () => Object.values(basketMap).reduce((sum, qty) => sum + qty, 0),
    [basketMap]
  );

  const fetchCatalogue = useCallback(async (searchTerm, pageNum) => {
    setIsFetching(true);
    try {
      const endpoint = buildSearchURL(searchTerm, pageNum);
      const res = await fetch(endpoint);
      const data = await res.json();
      setCatalogue(data.results || []);
      setPageInfo(data.pagination || null);
    } catch (err) {
      console.error("Search fetch failed:", err);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const debouncedFetch = useMemo(
    () => debounce((term, page) => fetchCatalogue(term, page), 450),
    [fetchCatalogue]
  );

  useEffect(() => {
    fetchCatalogue("", 1);
    return () => debouncedFetch.cancel();
  }, [fetchCatalogue, debouncedFetch]);

  const onKeywordChange = (e) => {
    const val = e.target.value;
    setKeyword(val);
    debouncedFetch(val, 1);
  };

  const onSearchSubmit = () => {
    debouncedFetch.cancel();
    fetchCatalogue(keyword, 1);
    setTimeout(scrollToResults, 120);
  };

  const onPageSelect = (num) => {
    fetchCatalogue(keyword, num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onReset = () => {
    setKeyword("");
    fetchCatalogue("", 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onClear = () => {
    setKeyword("");
    fetchCatalogue("", 1);
  };

  const onCategoryClick = (term) => {
    setKeyword(term);
    debouncedFetch.cancel();
    fetchCatalogue(term, 1);
    setTimeout(scrollToResults, 150);
  };

  const adjustBasket = (itemId, remove = false) => {
    setBasketMap((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + (remove ? -1 : 1)),
    }));
  };

  return (
    <div className="app-root">
      <Header
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        onSearchSubmit={onSearchSubmit}
        onClear={onClear}
        onReset={onReset}
        totalInBasket={totalInBasket}
      />

      <HeroBanner onCategoryClick={onCategoryClick} />

      <main className="main-container" id="results">
        {!isFetching && catalogue.length > 0 && (
          <PaginationBar pageInfo={pageInfo} onPageSelect={onPageSelect} />
        )}

        <ProductGrid
          items={catalogue}
          isFetching={isFetching}
          basketMap={basketMap}
          adjustBasket={adjustBasket}
        />

        {!isFetching && catalogue.length > 0 && (
          <PaginationBar pageInfo={pageInfo} onPageSelect={onPageSelect} />
        )}

        {!isFetching && catalogue.length === 0 && (
          <EmptyState keyword={keyword} />
        )}
      </main>
    </div>
  );
};

export default App;