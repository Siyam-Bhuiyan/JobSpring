// Enhanced debug script - Run this in browser console at http://localhost:5173
// This will help us identify exactly where the 403 error is coming from

console.log("=== Enhanced Authentication Debug ===");

const token = localStorage.getItem("authToken");
console.log("1. Token check:", !!token);

if (!token) {
  console.error("No token found! Please login first.");
} else {
  console.log("2. Token preview:", token.substring(0, 30) + "...");

  // Test 1: Simple authenticated GET request
  console.log("\n3. Testing simple GET request...");
  fetch("http://localhost:8080/api/profiles/my-profile", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(
        "GET /api/profiles/my-profile:",
        response.status,
        response.statusText
      );
      if (response.status === 200) {
        console.log("✅ Basic authentication working");
        return response.json();
      } else {
        console.log("❌ Basic authentication failed");
        return response.text();
      }
    })
    .then((data) => console.log("Profile data:", data))
    .catch((error) => console.error("GET Error:", error));

  // Test 2: File upload test
  console.log("\n4. Testing file upload...");

  // Create a tiny test image file
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  canvas.toBlob((blob) => {
    const testFile = new File([blob], "test.png", { type: "image/png" });
    const formData = new FormData();
    formData.append("file", testFile);

    console.log(
      "File created:",
      testFile.name,
      testFile.type,
      testFile.size,
      "bytes"
    );
    console.log("FormData created with file");

    // Make the upload request
    fetch("http://localhost:8080/api/profiles/my-profile/profile-picture", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Deliberately NOT setting Content-Type for FormData
      },
      body: formData,
    })
      .then((response) => {
        console.log(
          "POST profile-picture:",
          response.status,
          response.statusText
        );

        if (response.status === 403) {
          console.log(
            "❌ 403 Forbidden - Authentication failed for file upload"
          );
          console.log(
            "This suggests the JWT isn't being processed correctly for multipart requests"
          );
        } else if (response.status === 200) {
          console.log("✅ File upload successful!");
        } else {
          console.log("❓ Unexpected status:", response.status);
        }

        return response.text();
      })
      .then((data) => {
        console.log("Upload response:", data);

        // Test 3: Check if it's a CSRF issue by trying with different headers
        console.log("\n5. Testing with explicit CSRF bypass...");

        const formData2 = new FormData();
        formData2.append("file", testFile);

        fetch("http://localhost:8080/api/profiles/my-profile/profile-picture", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Requested-With": "XMLHttpRequest",
          },
          body: formData2,
        })
          .then((response) => {
            console.log(
              "POST with X-Requested-With:",
              response.status,
              response.statusText
            );
            return response.text();
          })
          .then((data) => console.log("Second upload response:", data))
          .catch((error) => console.error("Second upload error:", error));
      })
      .catch((error) => console.error("Upload error:", error));
  }, "image/png");
}
