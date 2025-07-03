// src/services/api.ts

// Define the API base URL (live backend)
const BASE_URL = "http://3.128.160.75:8000/api/generate-report/";

// Create a function to send POST requests using the `fetch` API
const api = async (formData: FormData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data', // Important to set for file uploads
      },
      body: formData, // Attach the FormData object
    });

    if (!response.ok) {
      throw new Error(`Failed to generate report: ${response.statusText}`);
    }

    return await response.blob();  // Return the blob (file) response
  } catch (error) {
    console.error("Error during report generation:", error);
    throw error;  // Rethrow the error for handling elsewhere
  }
};

export default api;
