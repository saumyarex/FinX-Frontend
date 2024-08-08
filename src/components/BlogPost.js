import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import client from './contentfulClient';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import './BlogPost.css'; // Create this CSS file for styling

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await client.getEntry(id);
        setPost(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching post: {error.message}</div>;

  return (
    <div className="post-container">
      <h1>{post.fields.title}</h1>
      {post.fields.featuredImage && (
        <img 
          src={post.fields.featuredImage.fields.file.url} 
          alt={post.fields.featuredImage.fields.title} 
          className="post-image"
        />
      )}
      <div className="post-content">
        {documentToReactComponents(post.fields.content)}
      </div>
    </div>
  );
};

export default BlogPost;
