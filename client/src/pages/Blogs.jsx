import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  CircularProgress,
  Alert,
  Avatar,
} from "@mui/material";
import {
  Article,
  Search,
  Person,
  CalendarToday,
  Add,
  Edit,
} from "@mui/icons-material";
import {
  fetchBlogs,
  searchBlogs,
  createBlog,
  createBlogByUser,
} from "../redux/slices/blogSlice";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, searchResults, loading, error } = useSelector(
    (state) => state.blogs
  );
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    tags: "",
    published: true,
  });

  const displayedBlogs = isSearching ? searchResults : blogs;

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      dispatch(searchBlogs(query));
    } else {
      setIsSearching(false);
    }
  };

  const handleCreateBlog = async () => {
    if (!newBlog.title.trim() || !newBlog.content.trim()) {
      return;
    }

    const blogData = {
      title: newBlog.title,
      content: newBlog.content,
      tags: newBlog.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      published: newBlog.published,
    };

    try {
      // Use the JWT-authenticated endpoint
      await dispatch(createBlog(blogData)).unwrap();

      setCreateDialogOpen(false);
      setNewBlog({ title: "", content: "", tags: "", published: true });
      dispatch(fetchBlogs()); // Refresh the list
    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading && !isSearching) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          Career Blogs
        </Typography>

        {isAuthenticated && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setCreateDialogOpen(true)}
            sx={{ textTransform: "none" }}
          >
            Write Blog
          </Button>
        )}
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search blogs by title or content..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 600 }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Blogs Grid */}
      {displayedBlogs.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Article sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            {isSearching
              ? "No blogs found for your search"
              : "No blogs available yet"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isSearching
              ? "Try different keywords"
              : "Be the first to share your insights!"}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {displayedBlogs.map((blog) => (
            <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={blog.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    transition: "all 0.3s ease-in-out",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {blog.title}
                  </Typography>

                  {/* Author and Date */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: 12 }}>
                      {blog.author?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mr: 2 }}
                    >
                      {blog.author?.name}
                    </Typography>
                    <CalendarToday
                      sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(blog.createdAt)}
                    </Typography>
                  </Box>

                  {/* Content Preview */}
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {blog.content?.substring(0, 150)}
                    {blog.content?.length > 150 && "..."}
                  </Typography>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                      {blog.tags.length > 3 && (
                        <Chip
                          label={`+${blog.tags.length - 3} more`}
                          size="small"
                          variant="outlined"
                          color="secondary"
                        />
                      )}
                    </Box>
                  )}

                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ textTransform: "none", mt: "auto" }}
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create Blog Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Write a New Blog</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Blog Title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            sx={{ mb: 3, mt: 1 }}
          />

          <TextField
            fullWidth
            multiline
            rows={8}
            label="Content"
            placeholder="Share your insights, experiences, and career advice..."
            value={newBlog.content}
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Tags"
            placeholder="Enter tags separated by commas (e.g., Career, Interview, Programming)"
            value={newBlog.tags}
            onChange={(e) => setNewBlog({ ...newBlog, tags: e.target.value })}
            sx={{ mb: 3 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={newBlog.published}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, published: e.target.checked })
                }
              />
            }
            label="Publish immediately"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleCreateBlog}
            variant="contained"
            disabled={!newBlog.title.trim() || !newBlog.content.trim()}
          >
            {newBlog.published ? "Publish Blog" : "Save as Draft"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Blogs;
