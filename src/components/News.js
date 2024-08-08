// src/News.js
import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import './News.css'; // Create this CSS file for styling
import Spinner from './Spinner';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('general');
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState(''); // default country can be set as needed
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const articlesPerPage = 20;

  const categories = [
    { code: 'business', name: 'Business' },
    { code: 'entertainment', name: 'Entertainment' },
    { code: 'general', name: 'General' },  
    { code: 'health', name: 'Health' }, 
    { code: 'science', name: 'Science' }, 
    { code: 'sports', name: 'Sports' }, 
    { code: 'technology', name: 'Technology' }];

  const languages = [
    { code: 'ar', name: 'Arabic' },
    { code: 'de', name: 'German' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'he', name: 'Hebrew' },
    { code: 'it', name: 'Italian' },
    { code: 'nl', name: 'Dutch' },
    { code: 'no', name: 'Norwegian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'sv', name: 'Swedish' },
    { code: 'ud', name: 'Urdu' },
    { code: 'zh', name: 'Chinese' },
  ];

  const countries = [
    { code: '', name: 'All' },
    { code: 'ae', name: 'United Arab Emirates' },
    { code: 'ar', name: 'Argentina' },
    { code: 'at', name: 'Austria' },
    { code: 'au', name: 'Australia' },
    { code: 'be', name: 'Belgium' },
    { code: 'bg', name: 'Bulgaria' },
    { code: 'br', name: 'Brazil' },
    { code: 'ca', name: 'Canada' },
    { code: 'ch', name: 'Switzerland' },
    { code: 'cn', name: 'China' },
    { code: 'co', name: 'Colombia' },
    { code: 'cu', name: 'Cuba' },
    { code: 'cz', name: 'Czech Republic' },
    { code: 'de', name: 'Germany' },
    { code: 'eg', name: 'Egypt' },
    { code: 'fr', name: 'France' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'gr', name: 'Greece' },
    { code: 'hk', name: 'Hong Kong' },
    { code: 'hu', name: 'Hungary' },
    { code: 'id', name: 'Indonesia' },
    { code: 'ie', name: 'Ireland' },
    { code: 'il', name: 'Israel' },
    { code: 'in', name: 'India' },
    { code: 'it', name: 'Italy' },
    { code: 'jp', name: 'Japan' },
    { code: 'kr', name: 'South Korea' },
    { code: 'lt', name: 'Lithuania' },
    { code: 'lv', name: 'Latvia' },
    { code: 'ma', name: 'Morocco' },
    { code: 'mx', name: 'Mexico' },
    { code: 'my', name: 'Malaysia' },
    { code: 'ng', name: 'Nigeria' },
    { code: 'nl', name: 'Netherlands' },
    { code: 'no', name: 'Norway' },
    { code: 'nz', name: 'New Zealand' },
    { code: 'ph', name: 'Philippines' },
    { code: 'pl', name: 'Poland' },
    { code: 'pt', name: 'Portugal' },
    { code: 'ro', name: 'Romania' },
    { code: 'rs', name: 'Serbia' },
    { code: 'ru', name: 'Russia' },
    { code: 'sa', name: 'Saudi Arabia' },
    { code: 'se', name: 'Sweden' },
    { code: 'sg', name: 'Singapore' },
    { code: 'si', name: 'Slovenia' },
    { code: 'sk', name: 'Slovakia' },
    { code: 'th', name: 'Thailand' },
    { code: 'tr', name: 'Turkey' },
    { code: 'tw', name: 'Taiwan' },
    { code: 'ua', name: 'Ukraine' },
    { code: 'us', name: 'United States' },
    { code: 've', name: 'Venezuela' },
    { code: 'za', name: 'South Africa' },
  ];

  useEffect(() => {
    const fetchNews = async () => {
        setLoading(true);
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            category: category,
            language: language,
            country: country,
            page: page,
            pageSize: articlesPerPage,
            apiKey: '63359c1a860f4d699398a8766f9cce3c', // Replace with your actual API key
          },
        });
        setArticles(response.data.articles);
        setTotalResults(response.data.totalResults);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchNews();
  }, [category, language, country, page]);

  const handleNextPage = () => {
    if (page < Math.ceil(totalResults / articlesPerPage)) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

//   if (loading) return <div>Loading...</div>;
if (loading) return <Spinner></Spinner>;
  if (error) return <div>Error fetching news: {error.message}</div>;


  return (
    <div>
            <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#000",
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ffcc00",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: 3,
              random: { enable: true, minimumValue: 1 },
            },
            links: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 2,
            },
            life: {
              duration: {
                sync: false,
                value: 3,
              },
              count: 0,
              delay: {
                random: {
                  enable: true,
                  minimumValue: 0.5,
                },
                value: 1,
              },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
          <div className='main-container' style={{position:"absolute", zIndex:0,}}>
              <div className="news-container">
        <h1 style={{color:"white"}}>Top Headlines</h1>
        <div className="filter-container" style={{color:"white"}}>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat.code} value={cat.code}>{cat.name}</option>
            ))}
          </select>
        </label>
        <label>
          Language:
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </label>
        <label>
          Country:
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            {countries.map((cnt) => (
              <option key={cnt.code} value={cnt.code}>{cnt.name}</option>
            ))}
          </select>
        </label>
      </div>
        {articles.map((article) => (
          <div key={article.url} className="news-article">
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="news-image" />
            )}
            <div className="news-content">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
            
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <button className="page" onClick={handlePrevPage} disabled={page <= 1}>Previous</button>
        <span style={{color:"white"}}>{page} of {Math.ceil(totalResults / articlesPerPage)}</span>
        <button className='page' onClick={handleNextPage} disabled={articles.length === 0}>Next</button>
      </div>
    </div>
    </div>
    
  );
};

export default News;
