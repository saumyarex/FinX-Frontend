import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import client from './contentfulClient';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import './Blog.css';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await client.getEntries({
          content_type: 'pageBlogPost', // Replace with your Contentful content type ID
        });
        setPosts(response.items);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts: {error.message}</div>;

  return (
    <div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: '#000',
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
              value: '#ffcc00',
            },
            shape: {
              type: 'circle',
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
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <div className="main-container" style={{position:"absolute", zIndex:0,}}>
        <div className="blog-container">
          <h1 style={{color:"white"}}>The Financial Blog</h1>
          <h4 style={{color:"white"}}>Keep you financially sane</h4>
          {posts.map((post) => {
            const previewText = post.fields.content.content[0].content[0].value.slice(0, 150); // Get the first 150 characters
            return (
              <div
                key={post.sys.id}
                className="blog-article"
                onClick={() => handlePostClick(post.sys.id)}
              >
                {post.fields.featuredImage && (
                  <img
                    src={post.fields.featuredImage.fields.file.url}
                    alt={post.fields.featuredImage.fields.title}
                    className="blog-image"
                  />
                )}
                <div className="blog-content">
                  <h2>{post.fields.title}</h2>
                  {expandedPostId === post.sys.id ? (
                    <div>{documentToReactComponents(post.fields.content)}</div>
                  ) : (
                    <p>{previewText}...</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
