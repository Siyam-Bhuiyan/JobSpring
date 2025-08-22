import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Button,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  CalendarToday,
  Person,
  MoreVert,
  Edit,
  Delete,
} from "@mui/icons-material";
import { blogAPI } from "../api/services";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedBlog, setEditedBlog] = useState({
    title: "",
    content: "",
    tags: "",
    published: true,
  });

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getById(id);
      setBlog(response.data);
      setEditedBlog({
        title: response.data.title,
        content: response.data.content,
        tags: response.data.tags?.join(", ") || "",
        published: response.data.published,
      });
    } catch (error) {
      setError("Failed to load blog post");
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
      const updatedData = {
        title: editedBlog.title,
        content: editedBlog.content,
        tags: editedBlog.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        published: editedBlog.published,
      };

      await blogAPI.update(id, updatedData);
      setEditDialogOpen(false);
      fetchBlog(); // Refresh the blog data
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await blogAPI.delete(id);
        navigate("/blogs");
      } catch (error) {
        console.error("Failed to delete blog:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isAuthor = isAuthenticated && user?.userId === blog?.author?.id;

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !blog) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error || "Blog post not found"}</Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/blogs")}
          sx={{ mt: 2 }}
        >
          Back to Blogs
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Header with back button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/blogs")}
          sx={{ textTransform: "none" }}
        >
          Back to Blogs
        </Button>
      </Box>

      {/* Blog Content */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          {/* Title and Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 3,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 600, flex: 1 }}
            >
              {blog.title}
            </Typography>

            {isAuthor && (
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVert />
              </IconButton>
            )}
          </Box>

          {/* Author and Date Info */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
              {blog.author?.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {blog.author?.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CalendarToday
                  sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(blog.createdAt)}
                  {blog.updatedAt !== blog.createdAt && " (edited)"}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <Box sx={{ mb: 3 }}>
              {blog.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  sx={{ mr: 1, mb: 1 }}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          )}

          <Divider sx={{ mb: 3 }} />

          {/* Blog Content */}
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              fontSize: "1.1rem",
              whiteSpace: "pre-wrap", // Preserve line breaks
            }}
          >
            {blog.content}
          </Typography>
        </CardContent>
      </Card>

      {/* Author Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setEditDialogOpen(true);
          }}
        >
          <Edit sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            handleDelete();
          }}
          sx={{ color: "error.main" }}
        >
          <Delete sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Blog Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Blog Title"
            value={editedBlog.title}
            onChange={(e) =>
              setEditedBlog({ ...editedBlog, title: e.target.value })
            }
            sx={{ mb: 3, mt: 1 }}
          />

          <TextField
            fullWidth
            multiline
            rows={12}
            label="Content"
            value={editedBlog.content}
            onChange={(e) =>
              setEditedBlog({ ...editedBlog, content: e.target.value })
            }
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Tags"
            placeholder="Enter tags separated by commas"
            value={editedBlog.tags}
            onChange={(e) =>
              setEditedBlog({ ...editedBlog, tags: e.target.value })
            }
            sx={{ mb: 3 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={editedBlog.published}
                onChange={(e) =>
                  setEditedBlog({ ...editedBlog, published: e.target.checked })
                }
              />
            }
            label="Published"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleEdit}
            variant="contained"
            disabled={!editedBlog.title.trim() || !editedBlog.content.trim()}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BlogDetail;
