
/**
 * Utility functions for API communication
 */

// The base URL for API requests
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // In production, API requests are served from the same origin
  : 'http://localhost:8000'; // In development, API runs on a different port

/**
 * Send a chat message to the API
 */
export const sendChatMessage = async (messages: { role: string; content: string }[]) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
