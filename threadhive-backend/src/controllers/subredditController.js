import {
  fetchAllSubreddits,
  createNewSubreddit,
  fetchSubredditWithThreads,
} from "../services/subredditService.js";

// ------------------------------------------------------
// 1. GET /api/subreddits
// ------------------------------------------------------
export const getAllSubreddits = async (req, res) => {
  try {
    const subreddits = await fetchAllSubreddits();

    if (!subreddits || subreddits.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subreddits found",
      });
    }
 
    return res.status(200).json({
      success: true,
      message: "Subreddits fetched successfully",
      data: subreddits,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch subreddits",
    });
  }
};

// ------------------------------------------------------
// 2. POST /api/subreddits
// ------------------------------------------------------
export const createSubreddit = async (req, res) => {
  try {
    const { name, description, author } = req.body;

    // Validate required fields
    if (!name || !description || !author) {
      return res.status(400).json({
        success: false,
        message: "Name, description, and author are required",
      });
    }

    const newSubreddit = await createNewSubreddit(name, description, author);

    // Service returns null if duplicate name exists
    if (!newSubreddit) {
      return res.status(409).json({
        success: false,
        message: "A subreddit with this name already exists",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Subreddit created successfully",
      data: newSubreddit,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create subreddit",
    });
  }
};

// ------------------------------------------------------
// 3. GET /api/subreddits/:id
// ------------------------------------------------------
export const getSubredditWithThreads = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await fetchSubredditWithThreads(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Subreddit not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subreddit and threads fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch subreddit",
    });
  }
};

