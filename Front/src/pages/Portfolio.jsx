import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Portfolio = () => {
  const [data, setData] = useState([]);
  const [shuffledData, setShuffledData] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const queryParams = new URLSearchParams(location.search);
  const isFullView = decodeURIComponent(queryParams.get("category") || "");

  // FETCH DATA
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/portfolio");
        let portfolio = [];

        if (Array.isArray(res.data)) {
          portfolio = res.data;
        } else {
          const arr = Object.values(res.data).find(Array.isArray);
          if (arr) portfolio = arr;
        }

        setData(portfolio);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  // SHUFFLE DATA
  useEffect(() => {
    if (!data.length) return;

    const grouped = data.reduce((acc, item) => {
      if (!item?.categoryName || !item?.groupId) return acc;
      if (!acc[item.categoryName]) acc[item.categoryName] = {};
      if (!acc[item.categoryName][item.groupId]) acc[item.categoryName][item.groupId] = [];
      acc[item.categoryName][item.groupId].push(item);
      return acc;
    }, {});

    const shuffled = {};
    Object.keys(grouped).forEach((cat) => {
      const groups = shuffleArray(Object.keys(grouped[cat]));
      shuffled[cat] = {};
      groups.forEach((gid) => {
        shuffled[cat][gid] = shuffleArray(grouped[cat][gid]);
      });
    });

    setShuffledData(shuffled);
  }, [data]);

  // HANDLE ACTIVE CATEGORY
  useEffect(() => {
    if (!Object.keys(shuffledData).length) return;

    // DEFAULT "All" ON FIRST LOAD
    if (!isFullView) {
      setActiveCategory("All");
      return;
    }

    // MATCH CATEGORY FROM URL
    const matchedCategory = Object.keys(shuffledData).find(
      (c) => c.trim().toLowerCase() === isFullView.trim().toLowerCase()
    );

    if (matchedCategory) {
      setActiveCategory(matchedCategory);

      const section = document.getElementById("portfolio");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setActiveCategory("All");
    }
  }, [isFullView, shuffledData]);

  const categories = ["All", ...Object.keys(shuffledData)];

  const openModal = (group) => {
    setSelectedGroup(group);
    setCurrentIndex(0);
  };

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % selectedGroup.length);
  }, [selectedGroup]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + selectedGroup.length) % selectedGroup.length);
  }, [selectedGroup]);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedGroup) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelectedGroup(null);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedGroup, nextImage, prevImage]);

  // Swipe navigation
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) nextImage();
    else prevImage();
  };

  const getThumbnail = (url) => {
    if (!url || !url.includes("cloudinary")) return "";
    return url.replace("/upload/", "/upload/so_9/").replace(/\.(mp4|mov|webm)$/, ".jpg");
  };

  if (loading) return <section className="text-white text-center py-20">Loading...</section>;
  if (!data.length) return <section className="text-gray-400 text-center py-20">No data found</section>;

  return (
    <section id="portfolio" className="bg-[#000000] text-white py-16 md:py-24">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-8 md:mb-10"
      >
        <p className="text-yellow-500 tracking-[4px] text-xs md:text-sm mb-3">OUR WORK</p>
        <h2 className="text-3xl md:text-5xl font-serif font-semibold">
          Portfolio <span className="text-yellow-500">Gallery</span>
        </h2>
      </motion.div>

      {/* CATEGORY BUTTONS */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 px-4 md:px-6">
        {categories.map((cat, i) => (
          <motion.button
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.05 }}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 md:px-7 py-2 text-xs md:text-sm tracking-widest uppercase border transition-all duration-300 ${
              activeCategory === cat
                ? "bg-yellow-500 text-black border-yellow-500 shadow-[0_0_10px_rgba(250,204,21,0.4)]"
                : "border-gray-700 text-gray-300 hover:border-yellow-500 hover:text-yellow-500"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {activeCategory && (() => {
          let displayGroups = [];

          if (activeCategory === "All") {
            Object.keys(shuffledData).forEach((cat) => {
              const groups = Object.keys(shuffledData[cat] || {}).slice(0, 3);
              groups.forEach((gid) => displayGroups.push({ groupId: gid, items: shuffledData[cat][gid] }));
            });
            displayGroups = shuffleArray(displayGroups).slice(0, 3);
          } else {
            const groups = Object.keys(shuffledData[activeCategory] || {});
            const visible = isFullView ? groups : groups.slice(0, 3);
            displayGroups = visible.map((gid) => ({ groupId: gid, items: shuffledData[activeCategory][gid] }));
          }

          return (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {displayGroups.map(({ groupId, items: group }, index) => {
                  const firstItem = group?.[0];
                  if (!firstItem) return null;

                  return (
                    <motion.div
                      key={groupId}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
                      onClick={() => openModal(group)}
                      className="cursor-pointer border border-[#2a2a2a] bg-black rounded-lg overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(250,204,21,0.15)]"
                    >
                      <div className="w-full h-52 md:h-60 flex items-center justify-center overflow-hidden">
                        {firstItem.type === "video" ? (
                          <video
                            poster={getThumbnail(firstItem.url)}
                            muted
                            loop
                            playsInline
                            className="max-h-full max-w-full"
                            onMouseEnter={(e) => {
                              const v = e.target;
                              if (v.readyState >= 2) v.currentTime = 2;
                              else v.addEventListener("loadeddata", () => (v.currentTime = 2), { once: true });
                              v.play();
                            }}
                            onMouseLeave={(e) => {
                              const v = e.target;
                              v.pause();
                              v.load();
                            }}
                          >
                            <source src={firstItem.url} />
                          </video>
                        ) : (
                          <img src={firstItem.url} loading="lazy" alt="" className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-110" />
                        )}
                      </div>
                      <div className="p-4">
                        <p className="font-semibold text-sm md:text-base tracking-wide bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                          {groupId}
                        </p>
                        <p className="text-gray-400 text-xs md:text-sm">{group.length} items</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* BUTTONS */}
              <div className="text-center mt-10 md:mt-12">
                {!isFullView ? (
                  <button
                    onClick={() => {
                      if (activeCategory === "All") {
                        const firstCategory = Object.keys(shuffledData)[0];
                        navigate(`/portfolio?category=${firstCategory}`);
                        setActiveCategory(firstCategory);
                      } else {
                        navigate(`/portfolio?category=${activeCategory}`);
                      }
                    }}
                    className="px-6 md:px-8 py-2 md:py-3 text-xs md:text-sm uppercase tracking-widest bg-yellow-500 text-black border border-yellow-500 transition-all duration-300 hover:bg-transparent hover:text-yellow-500"
                  >
                    View More →
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate(`/portfolio`);
                      setActiveCategory("All");
                    }}
                    className="px-6 md:px-8 py-2 md:py-3 text-xs md:text-sm uppercase tracking-widest border border-yellow-500 text-yellow-500 transition-all duration-300 hover:bg-yellow-500 hover:text-black"
                  >
                    ← View Less
                  </button>
                )}
              </div>
            </>
          );
        })()}
      </div>

      {/* MODAL */}
      {selectedGroup && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button onClick={() => setSelectedGroup(null)} className="absolute top-4 right-4 text-white text-2xl">✕</button>

          {selectedGroup.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 text-3xl">‹</button>
              <button onClick={nextImage} className="absolute right-4 text-3xl">›</button>
            </>
          )}

          <div className="flex flex-col items-center">
            {selectedGroup[currentIndex]?.type === "video" ? (
              <video controls className="max-h-[70vh] max-w-[95vw]">
                <source src={selectedGroup[currentIndex]?.url} />
              </video>
            ) : (
              <img src={selectedGroup[currentIndex]?.url} alt="" className="max-h-[70vh] max-w-[95vw] object-contain" />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;