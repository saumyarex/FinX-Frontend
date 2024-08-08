// contentfulClient.js
import { createClient } from 'contentful';

const client = createClient({
  space: '0k81zj7co3is',       // Replace with your Contentful space ID
  accessToken: 'M1dxq-GTX8ewXthZxTpLSofZF6DSVLH1sL-sElHeWYw' // Replace with your Contentful access token
});

export default client;
