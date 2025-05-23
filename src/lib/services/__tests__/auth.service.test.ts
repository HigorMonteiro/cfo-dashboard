import { AuthService } from "../auth.service";

describe("AuthService", () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe("login", () => {
    it("should return success response with valid credentials", async () => {
      // Arrange
      const credentials = {
        email: "test@example.com",
        password: "password123",
      };

      // Act
      const response = await authService.login(credentials);

      // Assert
      expect(response.success).toBe(true);
      expect(response.message).toBe("Login successful");
      expect(response.token).toBeDefined();
      expect(response.user).toEqual({
        id: "1",
        email: credentials.email,
        name: "John Doe",
      });
    });

    it("should handle errors and return failure response", async () => {
      // Arrange
      const credentials = {
        email: "invalid@example.com",
        password: "wrongpassword",
      };

      // Mock the service to throw an error
      jest.spyOn(authService, "login").mockRejectedValueOnce(new Error("Authentication failed"));

      // Act
      const response = await authService.login(credentials);

      // Assert
      expect(response.success).toBe(false);
      expect(response.message).toBe("Authentication failed");
      expect(response.token).toBeUndefined();
      expect(response.user).toBeUndefined();
    });
  });
}); 