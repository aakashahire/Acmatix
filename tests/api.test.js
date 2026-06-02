import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const HTTPBIN_URL = 'https://httpbin.org';

test.describe('API Testing Assignment', () => {

  // 1. GET /posts
  test('GET /posts - validate list response structure', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);

    expect(response.status()).toBe(200);

    const posts = await response.json();

    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);

    for (const post of posts) {
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('body');
      expect(post).toHaveProperty('userId');
    }
  });

  // 2. GET /posts/1
  test('GET /posts/1 - validate single post shape', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);

    expect(response.status()).toBe(200);

    const post = await response.json();

    expect(post.id).toBeTruthy();
    expect(post.userId).toBeTruthy();
    expect(post.title.trim().length).toBeGreaterThan(0);
    expect(post.body.trim().length).toBeGreaterThan(0);
  });

  // 3. GET /posts/99999
  test('GET /posts/99999 - should return 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/99999`);

    expect(response.status()).toBe(404);
  });

  // 4. POST /posts
  test('POST /posts - create new post', async ({ request }) => {
    const payload = {
      title: 'Playwright API Testing',
      body: 'This is a test post',
      userId: 1
    };

    const response = await request.post(`${BASE_URL}/posts`, {
      data: payload
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);
    expect(body.userId).toBe(payload.userId);
  });

  // 5. PUT /posts/1
  test('PUT /posts/1 - update post', async ({ request }) => {
    const payload = {
      id: 1,
      title: 'Updated Title',
      body: 'Updated Body',
      userId: 1
    };

    const response = await request.put(`${BASE_URL}/posts/1`, {
      data: payload
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.title).toBe(payload.title);
    expect(body.body).toBe(payload.body);
    expect(body.userId).toBe(payload.userId);
  });

  // 6. DELETE /posts/1
  test('DELETE /posts/1', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/posts/1`);

    expect(response.status()).toBe(200);
  });

  // 7. GET /posts?userId=1
  test('GET /posts?userId=1 - verify all posts belong to userId=1', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts?userId=1`);

    expect(response.status()).toBe(200);

    const posts = await response.json();

    expect(posts.length).toBeGreaterThan(0);

    for (const post of posts) {
      expect(post.userId).toBe(1);
    }
  });

  // 8. GET /posts/1/comments
  test('GET /posts/1/comments - validate email field', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1/comments`);

    expect(response.status()).toBe(200);

    const comments = await response.json();

    expect(comments.length).toBeGreaterThan(0);

    for (const comment of comments) {
      expect(comment.email).toBeTruthy();
      expect(comment.email.trim().length).toBeGreaterThan(0);
    }
  });

  // 9. GET httpbin.org/status/500
  test('GET /status/500 - handle server error gracefully', async ({ request }) => {
  let response;

  try {
    response = await request.get(`${HTTPBIN_URL}/status/500`);

    expect(response.status()).toBe(500);

    console.log(`Server returned expected error: ${response.status()}`);
  } catch (error) {
    throw new Error(`Request crashed unexpectedly: ${error.message}`);
  }

  expect(response).toBeDefined();
});

  // 10. GET httpbin.org/delay/3
  test('GET /delay/3 - request timeout validation', async () => {
    const apiContext = await request.newContext({
      timeout: 2000 // 2 seconds
    });

    let errorOccurred = false;

    try {
      await apiContext.get(`${HTTPBIN_URL}/delay/3`);
    } catch (error) {
      errorOccurred = true;
      console.log('Expected timeout occurred');
      console.log(error.message);
      expect(error.message).toContain('timeout');
    }

    expect(errorOccurred).toBeTruthy();

    await apiContext.dispose();
  });

});