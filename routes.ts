import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Submissions Routes
  app.post(api.submissions.create.path, async (req, res) => {
    try {
      const input = api.submissions.create.input.parse(req.body);
      const submission = await storage.createSubmission(input);
      res.status(201).json(submission);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.get(api.submissions.list.path, async (req, res) => {
    const list = await storage.getSubmissions();
    res.json(list);
  });

  // Admin Login Route
  app.post(api.admin.login.path, async (req, res) => {
    const { password } = req.body;
    if (password === "admin123") {
      res.json({ success: true });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  });

  return httpServer;
}