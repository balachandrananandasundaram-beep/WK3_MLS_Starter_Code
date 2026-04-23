import express from 'express';
import {
    getAllSubreddits,
    createSubreddit,
    getSubredditWithThreads
} from '../controllers/subredditController.js';

const router = express.Router();

/**
 * TODO: Register the following three routes using the imported controller functions:
 *
 *  GET  /       → getAllSubreddits         (list all subreddits)
 *  POST /       → createSubreddit          (create a new subreddit)
 *  GET  /:id    → getSubredditWithThreads  (get one subreddit + its threads)
 *
 * Note: Paths here are relative. The "/api/subreddits" prefix
 * is already applied in src/app.js via: app.use('/api/subreddits', subredditRoutes)
 */

// -----------------------------------------------
// ROUTES for /api/subreddits
// (prefix already applied in app.js)
// -----------------------------------------------

// GET /api/subreddits → list all subreddits
router.get('/', getAllSubreddits);

// POST /api/subreddits → create a new subreddit
router.post('/', createSubreddit);

// GET /api/subreddits/:id → get subreddit + its threads
router.get('/:id', getSubredditWithThreads);


export default router;
