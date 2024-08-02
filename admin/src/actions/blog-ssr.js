import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function getPosts() {
  const res = await axios.get(endpoints.post.list);

  return res.data;
}


export async function getPostData() {
  const res = await axios.get(endpoints.post.data);

  return res.data;
}


// ----------------------------------------------------------------------

export async function getPost(title) {
  const URL = title ? `${endpoints.post.details}?title=${title}` : '';

  const res = await axios.get(URL);

  return res.data;
}

// ----------------------------------------------------------------------

export async function getLatestPosts(title) {
  const URL = title ? `${endpoints.post.latest}?title=${title}` : '';

  const res = await axios.get(URL);

  return res.data;
}


// New function to create a post
export async function createPost(postData) {
  try {
    const res = await axios.post(endpoints.post.list, postData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to create post:', error);
    throw error;
  }
}


// New function to create a blog category
export async function createBlogCategory(categoryData) {
  try {
    const res = await axios.post(endpoints.blogcategory.list, categoryData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to create blog category:', error);
    throw error;
  }
}

// New function to create a blog tag
export async function createBlogTag(tagData) {
  try {
    const res = await axios.post(endpoints.blogtag.list, tagData);
    return res.data;
  } catch (error) {
    console.error('Failed to create blog tag:', error);
    throw error;
  }
}


// New function to create an author
export async function createAuthor(authorData) {
  try {
    const res = await axios.post(endpoints.author.list, authorData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to create author:', error);
    throw error;
  }
}


// New function to create an policypage
export async function createPolicyPage(policypageData) {
  try {
    const res = await axios.post(endpoints.policypage.list, policypageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to create policypage:', error);
    throw error;
  }
}



export async function createGeneraleInfo(generaleinfoData) {
  try {
    const res = await axios.post(endpoints.generaleinfo.list, generaleinfoData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to create generaleinfo:', error);
    throw error;
  }
}


export async function createAbout(aboutData) {
  try {
    const res = await axios.post(endpoints.about.list, aboutData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to create generaleinfo:', error);
    throw error;
  }
}
